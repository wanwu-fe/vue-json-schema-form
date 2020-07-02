import { CreateInstanceOptions, EnumKeyValueItem } from './types'
import {
  DateRangeKeyword,
  DateTimeRangeKeyword,
} from './date-time-range-keyword'

const COLOR_REG = /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/

// const URL_REG = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ // eslint-disable-line

const defaultOptions: CreateInstanceOptions = {
  options: {
    allErrors: true,
    jsonPointers: true,
  },
  formats: [
    {
      name: 'color',
      definition: (v) => v === '' || COLOR_REG.test(v),
    },
    // {
    //   name: 'image',
    //   definition: (v) => v === '' || URL_REG.test(v),
    // },
  ],
  keywords: [
    {
      name: 'dateRange',
      definition: DateRangeKeyword,
    },
    {
      name: 'dateTimeRange',
      definition: DateTimeRangeKeyword,
    },
    {
      name: 'enumKeyValue',
      definition: {
        type: ['number', 'string'],
        errors: 'full',
        compile: (sch) => {
          const values = sch.map(
            (s: EnumKeyValueItem<number | string>) => s.value
          )
          // const multi = parentSchema.multiple

          return function doValidate(data) {
            const flag = values.indexOf(data) > -1

            if (!flag) {
              const fun: any = doValidate
              const errors = fun.errors || []
              errors.push({
                keyword: 'enumKeyValue',
                message: '请选择一个正确的选项',
                params: {
                  keyword: 'enumKeyValue',
                },
              })
              fun.errors = errors
            }

            return flag
          }
        },
        metaSchema: {
          type: 'array',
          items: {
            oneOf: [
              {
                type: 'object',
                properties: {
                  key: { type: 'string' },
                  value: { type: 'string' },
                },
              },
              {
                type: 'object',
                properties: {
                  key: { type: 'string' },
                  value: { type: 'number' },
                },
              },
            ],
          },
        },
      },
    },
  ],
}

export default defaultOptions
