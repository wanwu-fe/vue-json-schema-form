export function isObject(thing: any) {
  return typeof thing === 'object' && thing !== null && !Array.isArray(thing)
}

export function isEmptyObject(thing: any) {
  return isObject(thing) && Object.keys(thing).length === 0
}

export function hasOwnProperty(obj: any, key: string) {
  /**
   * 直接调用`obj.hasOwnProperty`有可能会因为
   * obj 覆盖了 prototype 上的 hasOwnProperty 而产生错误
   */
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/* Gets the type of a given schema. */
export function getSchemaType(schema: any) {
  let { type } = schema

  if (type) return type

  if (!type && schema.const) {
    return guessType(schema.const)
  }

  if (!type && schema.enum) {
    return 'string'
  }

  if (!type && (schema.properties || schema.additionalProperties)) {
    return 'object'
  }

  console.warn('can not guess schema type, just use object', schema)
  return 'object'

  // if (type instanceof Array && type.length === 2 && type.includes('null')) {
  //   return type.find((type) => type !== 'null')
  // }
}

// In the case where we have to implicitly create a schema, it is useful to know what type to use
//  based on the data we are defining
export const guessType = function guessType(value: any) {
  if (Array.isArray(value)) {
    return 'array'
  } else if (typeof value === 'string') {
    return 'string'
  } else if (value == null) {
    return 'null'
  } else if (typeof value === 'boolean') {
    return 'boolean'
  } else if (!isNaN(value)) {
    return 'number'
  } else if (typeof value === 'object') {
    return 'object'
  }
  // Default to string if we can't figure it out
  return 'string'
}
