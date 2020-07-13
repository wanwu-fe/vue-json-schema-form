import { JsonSchemFormPlugin } from './core/types'

/**
 * Ajv custom keyword doc: https://ajv.js.org/custom.html
 */

const plugin: JsonSchemFormPlugin = {
  customKeywords: [
    {
      name: 'test',
      definition: {
        // validate(schema: any, data: any) {
        //   return typeof data === 'object' && data.x === 1
        // },
        macro(schema: any) {
          return {
            ...schema,
            type: 'object',
            properties: {
              x: {
                type: 'number',
                minimum: 5,
              },
            },
          }
        },
        errors: true,
      },
      transformSchema(schema: any) {
        return {
          ...schema,
          type: 'object',
          properties: {
            x: {
              type: 'number',
              vjsf: {
                title: '测试数字',
              },
            },
          },
        }
      },
    },
  ],
}

export default plugin
