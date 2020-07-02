import { mount } from '@vue/test-utils'

import { initialize, Helper as Wrapper } from '../utils'

initialize()

describe('number renderer default values', () => {
  it('should use `default` as default value when value is undefined', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
          default: 10,
        },
        value: undefined,
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value).toEqual(10)
  })

  it('should use value when value is not undefined', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
          default: 10,
        },
        value: 0,
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value).toEqual(0)
  })

  it('should use `default` as default value when in object', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'object',
          properties: {
            age: {
              type: 'number',
              default: 10,
            },
          },
        },
        value: {},
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.age).toEqual(10)
  })

  it('should not create default value when `default` not provided', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'object',
          properties: {
            age: {
              type: 'number',
            },
          },
        },
        value: {},
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.age).toBeUndefined()
  })

  it('should use object default value as default', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'object',
          properties: {
            age: {
              type: 'number',
            },
          },
          default: {
            age: 20,
          },
        },
        // value: {}, // 如果object赋予对象，则不会使用default
        value: '123',
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.age).toEqual(20)
  })
})
