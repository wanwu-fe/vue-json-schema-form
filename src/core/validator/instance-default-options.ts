import { CreateInstanceOptions, EnumKeyValueItem } from './types'
import {
  DateRangeKeyword,
  DateTimeRangeKeyword,
} from './date-time-range-keyword'

const COLOR_REG = /^(rgb\s*?\(\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?,\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?,\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?\))$|^(rgba\s*?\(\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?,\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?,\s*?(000|0?\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\s*?,\s*?(0|0\.\d*|1|1.0*)\s*?\))$|^(transparent)$|^(#([a-fA-F0-9]){3})$|^(#([a-fA-F0-9]){6}$)|(^hsl\s*?\(\s*?(000|0?\d{1,2}|[1-2]\d\d|3[0-5]\d|360)\s*?,\s*?(000|100|0?\d{2}|0?0?\d)%\s*?,\s*?(000|100|0?\d{2}|0?0?\d)%\s*?\)$)|(^hsla\s*?\(\s*?(000|0?\d{1,2}|[1-2]\d\d|3[0-5]\d|360)\s*?,\s*?(000|100|0?\d{2}|0?0?\d)%\s*?,\s*?(000|100|0?\d{2}|0?0?\d)%\s*?,\s*?(0|0\.\d*|1|1.0*)\s*?\)$)$/

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
