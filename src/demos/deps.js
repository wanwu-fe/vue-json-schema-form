export default {
  name: '依赖关系',
  schema: {
    type: 'object',
    propertiesOrder: ['selected', 'name1', 'name2', 'name3', 'others'],
    properties: {
      selected: {
        type: 'number',
        title: '是否选中',
        enum: [1, 2, 3],
        default: 2,
      },
      others: {
        type: 'string',
      },
    },
    dependencies: {
      selected: {
        oneOf: [
          {
            properties: {
              selected: {
                // const: 1,

                const: 1,
              },
              name1: {
                type: 'string',
                title: '名字1',
              },
            },
            required: ['name1'],
          },
          {
            properties: {
              selected: {
                const: 2,
              },
              name2: {
                type: 'string',
                title: '名字2',
              },
            },
            required: ['name2'],
          },
          {
            properties: {
              selected: {
                const: 3,
              },
              name3: {
                type: 'string',
                title: '名字3',
              },
            },
            required: ['name3'],
          },
        ],
      },
    },
  },
}
