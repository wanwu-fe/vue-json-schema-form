export default {
  name: 'Custom Component',
  schema: {
    type: 'object',
    properties: {
      custom: {
        type: 'string',
        minLength: 5,
        default: '123',
        /**
         * string: 组件
         * object: full config
         */
        jsfCustom: 'custom-input',
      },
      fullCustom: {
        type: 'string',
        minLength: 5,
        jsfCustom: {
          component: 'custom-input',
          withFormItem: true, // default true
        },
      },
      customVjsf: {
        type: 'string',
        vjsf: {
          component: 'custom-input',
        },
      },
      customKeyword: {
        type: 'object',
        test: true,
        vjsf: {
          title: '自定义关键字',
        },
      },
    },
  },
}
