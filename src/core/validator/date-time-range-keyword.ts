import { KeywordDefinition } from 'ajv'
import { isObject } from '../utils'

const DateRangeKeyword: KeywordDefinition = {
  type: 'boolean',
  compile(schema) {
    const items = schema.items
    const type = schema.type

    const validFun = () => true

    if (type !== 'array' || !isObject(items)) {
      // throw new Error('date time range keyword should use single time array')
      return validFun
    }
    const itemType: string = items.type
    const itemFormat: string = items.format

    if (
      (itemType !== 'number' && itemType !== 'string') ||
      (itemFormat !== 'date' && itemFormat !== 'date-time')
    ) {
      // throw new Error('date time must be `number` or `string` type')
      return validFun
    }

    return (data) => {
      const [before, after] = data
      return Date.parse(before) <= Date.parse(after)
    }
  },
  macro() {
    return {
      minItems: 2,
      maxItems: 2,
    }
  },
}

const DateTimeRangeKeyword: KeywordDefinition = {
  type: 'boolean',
  compile(schema) {
    const items = schema.items
    const type = schema.type

    const validFun = () => true

    if (type !== 'array' || !isObject(items)) {
      // throw new Error('date time range keyword should use single time array')
      return validFun
    }
    const itemType: string = items.type
    const itemFormat: string = items.format

    if (
      (itemType !== 'number' && itemType !== 'string') ||
      (itemFormat !== 'date' &&
        itemFormat !== 'date-time' &&
        itemFormat !== 'time')
    ) {
      // throw new Error('date time must be `number` or `string` type')
      return validFun
    }

    return (data) => {
      const [before, after] = data
      return Date.parse(before) <= Date.parse(after)
    }
  },
  macro() {
    return {
      minItems: 2,
      maxItems: 2,
    }
  },
}

export { DateTimeRangeKeyword, DateRangeKeyword }
