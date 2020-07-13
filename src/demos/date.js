export default {
  name: 'Date Time',
  schema: {
    type: 'object',
    properties: {
      simpleDate: {
        type: 'string',
        format: 'date',
        title: '日期',
      },
      numberDate: {
        type: 'number',
        format: 'date',
        title: '时间戳',
        // vjsf: {
        //   additionProps: {
        //     readonly: true,
        //   },
        // },
      },
      simpleDateTime: {
        type: 'string',
        format: 'date-time',
        title: '日期时间',
      },
      simpleTime: {
        type: 'string',
        format: 'time',
        vjsf: {
          title: '时间字符串',
          placeholder: '选择时间',
        },
      },
      simpleTimeStamp: {
        type: 'number',
        format: 'time',
        title: '只有时间时间戳',
      },
      numberDateTime: {
        type: 'number',
        format: 'date-time',
        title: '日期时间时间戳',
      },
      simpleDateRange: {
        type: 'array',
        items: {
          type: 'string',
          format: 'date',
        },
        dateRange: true,
        title: '日期区间',
      },
      simpleDateTimeRange: {
        type: 'array',
        items: {
          type: 'string',
          format: 'date-time',
        },
        dateRange: true,
        title: '日期时间区间',
      },
      numberDateTimeRange: {
        type: 'array',
        items: {
          type: 'number',
          format: 'date-time',
        },
        dateRange: true,
        title: '日期时间区间时间戳',
      },
      timeRange: {
        type: 'array',
        items: {
          type: 'number',
          format: 'time',
        },
        dateTimeRange: true,
        vjsf: {
          title: '时间区间',
        },
      },
    },
  },
}
