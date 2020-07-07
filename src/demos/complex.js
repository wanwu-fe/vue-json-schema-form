module.exports = {
  name: 'Complex Demo',
  schema: {
    type: 'object',
    propertiesOrder: ['name', 'age', 'fimaly', 'pets', 'petName'],
    properties: {
      name: {
        type: 'string',
        minLength: 5,
      },
      age: {
        type: 'number',
        maximum: 10,
        minimum: 5,
      },
      fimaly: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              title: '名字',
            },
            releation: {
              type: 'string',
              title: '关系',
            },
          },
          required: ['name', 'releation'],
        },
      },
      pets: {
        type: 'string',
        enum: ['NO', 'ONE'],
      },
      nest: {
        type: 'object',
        properties: {
          nest1: {
            type: 'string',
          },
          nest2: {
            type: 'string',
          },
        },
        required: ['nest1'],
      },
    },
    dependencies: {
      pets: {
        oneOf: [
          {
            properties: {
              pets: {
                const: 'NO',
              },
            },
          },
          {
            properties: {
              pets: {
                const: 'ONE',
              },
              petName: {
                type: 'string',
              },
            },
            required: ['petName'],
          },
        ],
      },
    },
    required: ['name', 'age'],
  },
}
