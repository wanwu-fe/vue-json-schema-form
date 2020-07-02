export default {
  name: 'required',
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
