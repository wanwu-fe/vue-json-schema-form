module.exports = {
  name: '数组',
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      fixed: {
        type: 'array',
        title: '固定数组',
        items: [
          { type: 'string', title: '名字' },
          { type: 'number', title: '年龄' },
          {
            type: 'object',
            title: '一项',
            properties: {
              'name/1': {
                type: 'string',
                title: '名字',
                minLength: 5,
              },
            },
          },
        ],
        // default: ['Jokcy', 12],
      },
      singleType: {
        type: 'array',
        title: '单一数组',
        items: {
          type: 'string',
        },
        default: ['aaa', 'bbb'],
      },
      nestSingleType: {
        type: 'array',
        title: '嵌套单一数组',
        items: {
          type: 'object',
          properties: {
            singleType: {
              type: 'array',
              title: '单一数组',
              items: {
                type: 'string',
              },
              default: ['aaa', 'bbb'],
            },
          },
        },
        default: ['aaa', 'bbb'],
      },
      multiChoice: {
        type: 'array',
        title: '多选',
        default: null,
        items: {
          type: 'string',
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
      objectArray: {
        type: 'array',
        title: '对象数组',
        default: [
          {
            name: 'aaa',
            age: 12,
          },
        ],
        items: {
          type: 'object',
          // title: '对象',
          properties: {
            name: {
              type: 'string',
              title: '名字',
            },
            age: {
              type: 'number',
              title: '年龄',
            },
          },
        },
      },
    },
  },
}
