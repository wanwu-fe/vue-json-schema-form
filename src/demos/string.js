module.exports = {
  name: 'String',
  schema: {
    type: 'object',
    vjsf: {
      title: 'string demo',
    },
    default: {
      simple: '123',
    },
    required: ['simple'],
    properties: {
      const: {
        type: 'string',
        const: 'jokcy',
        vjsf: {
          title: '固定值',
        },
      },
      simple: {
        type: 'string',
        minLength: 2,
        default: 'haha',
        pattern: '/^abc&/',
        errorMessage: {
          pattern: '请填写正确的内容',
        },
        vjsf: {
          placeholder: '请输入普通字符串',
          title: '普通字符串',
        },
      },
      color: {
        type: 'string',
        format: 'color',
        title: '颜色选择',
      },
      select: {
        type: 'string',
        vjsf: {
          title: '选择',
          placeholder: '选择框啦',
        },
        enumKeyValue: [
          {
            key: 'option1',
            value: '1',
          },
          {
            key: 'option2',
            value: '2',
          },
          {
            key: 'option3',
            value: '3',
          },
        ],
      },
    },
  },
}
