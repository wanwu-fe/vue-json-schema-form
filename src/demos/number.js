module.exports = {
  name: 'Number',
  schema: {
    type: 'object',
    properties: {
      const: {
        type: 'number',
        const: 12,
        vjsf: {
          title: '固定值',
        },
      },
      simple: {
        type: 'number',
        default: 5,
        vjsf: {
          placeholder: '普通',
          title: '普通数字',
        },
      },
      minMax: {
        type: 'number',
        title: '最大最小值',
        minimum: 10,
        maximum: 20,
      },
      integer: {
        type: 'integer',
        title: '整数',
      },
      select: {
        type: 'number',
        title: '选择',
        default: 5,
        enumKeyValue: [
          {
            key: 'option1',
            value: 0,
          },
          {
            key: 'option2',
            value: 2,
          },
          {
            key: 'option3',
            value: 3,
          },
        ],
      },
    },
  },
}
