import { mount } from '@vue/test-utils'

import { initialize, Helper as Wrapper } from '../utils'

initialize()

// import Wrapper from './Helper.vue'
// import VueSchemaForm from '../..'

// Vue.config.productionTip = false
// Vue.use(VueSchemaForm)

describe('string renderer default values', () => {
  it('should use `default` as default value when value is undefined', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          default: 'text',
        },
        value: undefined,
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value).toMatch('text')
  })

  it('should use `default` as default value when value is empty string', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          default: 'text',
        },
        value: '',
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value).toMatch('text')
  })

  it('should use `default` as default value when in object', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              default: 'text',
            },
          },
        },
        value: {},
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.name).toMatch('text')
  })

  it('should not create default value when `default` not provided', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
          },
        },
        value: {},
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.name).toBeUndefined()
  })

  it('should use object default value as default', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
          },
          default: {
            name: 'text',
          },
        },
        value: null,
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.name).toMatch('text')
  })
})
