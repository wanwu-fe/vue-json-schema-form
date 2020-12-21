import jsonpointer from 'jsonpointer'
import union from 'lodash.union'

import { isObject, hasOwnProperty, getSchemaType } from './common'
import { validateData } from '../validator'

enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean',
}

export interface VueJsonSchemaConfig {
  title?: string
  description?: string
  component?: string
  additionProps?: {
    [key: string]: any
  }
  withFormItem?: boolean
  disabled?: boolean
}

// type Schema = any
export interface Schema {
  type: SchemaTypes
  const: any
  format?: string
  properties?: {
    [key: string]: Schema
  }
  items?: Schema | Schema[]
  dependencies?: {
    [key: string]: string[] | Schema
  }
  oneOf?: Schema[]
  vjsf?: VueJsonSchemaConfig
  required?: string[]
  enum: any[]
  enumKeyValue: any[]
  additionalProperties: any
}

// function resolveSchema(schema: any, data: any = {}) {}

export function resolveSchema(schema: any, rootSchema = {}, formData = {}) {
  if (hasOwnProperty(schema, '$ref')) {
    return resolveReference(schema, rootSchema, formData)
  } else if (hasOwnProperty(schema, 'dependencies')) {
    const resolvedSchema = resolveDependencies(schema, rootSchema, formData)
    return retrieveSchema(resolvedSchema, rootSchema, formData)
  }
  // else if (hasOwnProperty(schema, "allOf")) {
  //   return {
  //     ...schema,
  //     allOf: schema.allOf.map((allOfSubschema: any) =>
  //       retrieveSchema(allOfSubschema, rootSchema, formData)
  //     ),
  //   };
  // }
  else {
    // No $ref or dependencies attribute found, returning the original schema.
    return schema
  }
}

export function retrieveSchema(
  schema: any,
  rootSchema = {},
  formData = {}
): Schema {
  if (!isObject(schema)) {
    return {} as Schema
  }
  let resolvedSchema = resolveSchema(schema, rootSchema, formData)

  // TODO: allOf and additionalProperties not implemented
  // if ("allOf" in schema) {
  //   try {
  //     resolvedSchema = mergeAllOf({
  //       ...resolvedSchema,
  //       allOf: resolvedSchema.allOf,
  //     });
  //   } catch (e) {
  //     console.warn("could not merge subschemas in allOf:\n" + e);
  //     const { allOf, ...resolvedSchemaWithoutAllOf } = resolvedSchema;
  //     return resolvedSchemaWithoutAllOf;
  //   }
  // }
  // const hasAdditionalProperties =
  //   resolvedSchema.hasOwnProperty("additionalProperties") &&
  //   resolvedSchema.additionalProperties !== false;
  // if (hasAdditionalProperties) {
  //   return stubExistingAdditionalProperties(
  //     resolvedSchema,
  //     rootSchema,
  //     formData
  //   );
  // }
  return resolvedSchema
}

// export function processSchema(
//   schema: any,
//   rootSchema: any = {},
//   data: any = {}
// ): Schema {
//   if (hasOwnProperty(schema, '$ref')) {
//     return resolveReference(schema, rootSchema, data)
//   }
//   if (hasOwnProperty(schema, 'dependencies')) {
//     const resolvedSchema = resolveSchema(schema)
//   }
// }

function resolveReference(schema: any, rootSchema: any, formData: any): Schema {
  // Retrieve the referenced schema definition.
  const $refSchema = findSchemaDefinition(schema.$ref, rootSchema)
  // Drop the $ref property of the source schema.
  const { $ref, ...localSchema } = schema
  // Update referenced schema definition with local schema properties.
  return retrieveSchema({ ...$refSchema, ...localSchema }, rootSchema, formData)
}

export function findSchemaDefinition($ref: string, rootSchema = {}): Schema {
  const origRef = $ref
  if ($ref.startsWith('#')) {
    // Decode URI fragment representation.
    $ref = decodeURIComponent($ref.substring(1))
  } else {
    throw new Error(`Could not find a definition for ${origRef}.`)
  }
  const current = jsonpointer.get(rootSchema, $ref)
  if (current === undefined) {
    throw new Error(`Could not find a definition for ${origRef}.`)
  }
  if (hasOwnProperty(current, '$ref')) {
    // return { ...current, findSchemaDefinition(current.$ref, rootSchema) }  ?
    return findSchemaDefinition(current.$ref, rootSchema)
  }
  return current
}

function resolveDependencies(
  schema: any,
  rootSchema: any,
  formData: any
): Schema {
  // Drop the dependencies from the source schema.
  let { dependencies = {}, ...resolvedSchema } = schema
  // if ("oneOf" in resolvedSchema) {
  //   resolvedSchema =
  //     resolvedSchema.oneOf[
  //       getMatchingOption(formData, resolvedSchema.oneOf, rootSchema)
  //     ];
  // } else if ("anyOf" in resolvedSchema) {
  //   resolvedSchema =
  //     resolvedSchema.anyOf[
  //       getMatchingOption(formData, resolvedSchema.anyOf, rootSchema)
  //     ];
  // }
  return processDependencies(dependencies, resolvedSchema, rootSchema, formData)
}
function processDependencies(
  dependencies: any,
  resolvedSchema: any,
  rootSchema: any,
  formData: any
): Schema {
  // Process dependencies updating the local schema properties as appropriate.
  for (const dependencyKey in dependencies) {
    // Skip this dependency if its trigger property is not present.
    if (formData[dependencyKey] === undefined) {
      continue
    }
    // Skip this dependency if it is not included in the schema (such as when dependencyKey is itself a hidden dependency.)
    if (
      resolvedSchema.properties &&
      !(dependencyKey in resolvedSchema.properties)
    ) {
      continue
    }
    const {
      [dependencyKey]: dependencyValue,
      ...remainingDependencies
    } = dependencies
    if (Array.isArray(dependencyValue)) {
      resolvedSchema = withDependentProperties(resolvedSchema, dependencyValue)
    } else if (isObject(dependencyValue)) {
      resolvedSchema = withDependentSchema(
        resolvedSchema,
        rootSchema,
        formData,
        dependencyKey,
        dependencyValue
      )
    }
    return processDependencies(
      remainingDependencies,
      resolvedSchema,
      rootSchema,
      formData
    )
  }
  return resolvedSchema
}

function withDependentProperties(schema: any, additionallyRequired: any) {
  if (!additionallyRequired) {
    return schema
  }
  const required = Array.isArray(schema.required)
    ? Array.from(new Set([...schema.required, ...additionallyRequired]))
    : additionallyRequired
  return { ...schema, required: required }
}

function withDependentSchema(
  schema: any,
  rootSchema: any,
  formData: any,
  dependencyKey: any,
  dependencyValue: any
) {
  // retrieveSchema
  let { oneOf, ...dependentSchema } = retrieveSchema(
    dependencyValue,
    rootSchema,
    formData
  )
  schema = mergeSchemas(schema, dependentSchema)
  // Since it does not contain oneOf, we return the original schema.
  if (oneOf === undefined) {
    return schema
  } else if (!Array.isArray(oneOf)) {
    throw new Error(`invalid: it is some ${typeof oneOf} instead of an array`)
  }
  // Resolve $refs inside oneOf.
  const resolvedOneOf = oneOf.map((subschema) =>
    hasOwnProperty(subschema, '$ref')
      ? resolveReference(subschema, rootSchema, formData)
      : subschema
  )
  return withExactlyOneSubschema(
    schema,
    rootSchema,
    formData,
    dependencyKey,
    resolvedOneOf
  )
}

function withExactlyOneSubschema(
  schema: any,
  rootSchema: any,
  formData: any,
  dependencyKey: any,
  oneOf: any
) {
  const validSubschemas = oneOf.filter((subschema: any) => {
    if (!subschema.properties) {
      return false
    }
    const { [dependencyKey]: conditionPropertySchema } = subschema.properties
    if (conditionPropertySchema) {
      const conditionSchema = {
        type: 'object',
        properties: {
          [dependencyKey]: conditionPropertySchema,
        },
      }
      // TODO: validate formdata
      const { errors } = validateData(conditionSchema, formData)
      return !errors || errors.length === 0
    }
  })
  if (validSubschemas.length !== 1) {
    console.warn(
      "ignoring oneOf in dependencies because there isn't exactly one subschema that is valid"
    )
    return schema
  }
  // debugger
  const subschema = validSubschemas[0]
  const {
    [dependencyKey]: conditionPropertySchema,
    ...dependentSubschema
  } = subschema.properties
  const dependentSchema = { ...subschema, properties: dependentSubschema }
  return mergeSchemas(
    schema,
    // retrieveSchema
    retrieveSchema(dependentSchema, rootSchema, formData)
  )
}

// Recursively merge deeply nested schemas.
// The difference between mergeSchemas and mergeObjects
// is that mergeSchemas only concats arrays for
// values under the "required" keyword, and when it does,
// it doesn't include duplicate values.
export function mergeSchemas(obj1: any, obj2: any) {
  var acc = Object.assign({}, obj1) // Prevent mutation of source object.
  return Object.keys(obj2).reduce((acc, key) => {
    const left = obj1 ? obj1[key] : {},
      right = obj2[key]
    if (obj1 && hasOwnProperty(obj1, key) && isObject(right)) {
      acc[key] = mergeSchemas(left, right)
    } else if (
      obj1 &&
      obj2 &&
      (getSchemaType(obj1) === 'object' || getSchemaType(obj2) === 'object') &&
      key === 'required' &&
      Array.isArray(left) &&
      Array.isArray(right)
    ) {
      // Don't include duplicate values when merging
      // "required" fields.
      acc[key] = union(left, right)
    } else {
      acc[key] = right
    }
    return acc
  }, acc)
}

export function getVJSFConfig(
  schema: Schema,
  uiSchema: VueJsonSchemaConfig | undefined
): VueJsonSchemaConfig {
  if (uiSchema) return uiSchema
  return schema.vjsf || {}
}
