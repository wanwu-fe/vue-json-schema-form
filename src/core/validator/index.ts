import Ajv, { Options } from 'ajv'
import ajvErrors from 'ajv-errors'

import { CreateInstanceOptions, ConstantCreateInstanceOptions } from './types'
import defaultOptions from './instance-default-options'

export * from './types'

function mergeMaybeArray(a1: any, a2: any) {
  const f1 = a1 ? (Array.isArray(a1) ? a1 : [a1]) : []
  const f2 = a2 ? (Array.isArray(a2) ? a2 : [a2]) : []
  return [...f1, ...f2]
}

function mergerOptions(
  op1: CreateInstanceOptions,
  op2: CreateInstanceOptions
): ConstantCreateInstanceOptions {
  const ajvOption: Options = {
    ...op1.options,
    ...op2.options,
  }

  const formats = mergeMaybeArray(op1.formats, op2.formats) // TODO: 去除 name 相同的？考虑名称相同但是 `number` 和 `string` 不同
  const keywords = mergeMaybeArray(op1.keywords, op2.keywords)

  return {
    // locale: op2.locale || op1.locale || 'zh',
    options: ajvOption,
    formats,
    keywords,
  }
}

export function createInstance(opts: CreateInstanceOptions = {}) {
  const options = mergerOptions(defaultOptions, opts)

  const { options: instanceOptions, formats, keywords } = options

  const ajv = new Ajv(instanceOptions)
  ajvErrors(ajv as any)

  formats.forEach(({ name, definition }) => ajv.addFormat(name, definition))
  keywords.forEach(({ name, definition }) => ajv.addKeyword(name, definition))

  // ajv.validate

  return ajv
}

const defaultInstance = createInstance({})

export function validateData(schema: any, data: any) {
  const valid = defaultInstance.validate(schema, data)
  return {
    valid,
    errors: defaultInstance.errors,
  }
}
