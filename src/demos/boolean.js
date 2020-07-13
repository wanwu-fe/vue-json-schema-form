export default {
  name: 'Boolean',
  schema: {
    type: 'object',
    properties: {
      selected: {
        type: 'boolean',
        title: '是否选中',
      },
      defaultTrue: {
        type: 'boolean',
        default: true,
        title: '默认选中',
      },
    },
  },
}
