export default {
  name: 'Required',
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      age: {
        type: 'number',
      },
    },
    required: ['name', 'age'],
  },
}
