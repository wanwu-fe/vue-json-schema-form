import { mount } from '@vue/test-utils'

import { initialize, Helper as Wrapper } from '../utils'

initialize()

describe('when reset value to {}', () => {
  it('reset to expect value when value reset', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'object',
          properties: {
            n: {
              type: 'number',
              default: 10,
            },
            s: {
              type: 'string',
              default: '123',
            },
            b: {
              type: 'boolean',
              default: true,
            },
            a: {
              type: 'array',
              items: {
                type: 'string',
              },
              default: ['123'],
            },
          },
        },
        value: undefined,
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.n).toEqual(10)
    expect(wrapper.vm.value.s).toBe('123')
    expect(wrapper.vm.value.b).toBe(true)
    expect(wrapper.vm.value.a).toEqual(['123'])
    wrapper.vm.value = {}
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.n).toBeUndefined()
    expect(wrapper.vm.value.s).toBeUndefined()
    expect(wrapper.vm.value.b).toBe(false)
    expect(wrapper.vm.value.a).toBeUndefined()
  })

  it('number should become undefined when value reset', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'object',
          properties: {
            n: {
              type: 'number',
              default: 10,
            },
          },
        },
        value: undefined,
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.n).toEqual(10)
    wrapper.vm.value = {}
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.n).toBeUndefined()
  })

  it('string should become undefined when value reset', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'object',
          properties: {
            n: {
              type: 'string',
              default: 'text',
            },
          },
        },
        value: undefined,
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.n).toMatch('text')
    wrapper.vm.value = {}
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.n).toBeUndefined()
  })

  it('reset nest object should work fine', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'object',
          properties: {
            obj: {
              type: 'object',
              default: {
                a: 'text',
              },
              properties: {
                a: {
                  type: 'string',
                },
              },
            },
          },
        },
        value: undefined,
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.obj.a).toMatch('text')
    wrapper.vm.value = {}
    await wrapper.vm.$nextTick()
    const text = wrapper.find({ name: 'JsfTextInput' })
    expect(wrapper.vm.value.obj).toBeUndefined()
    expect(text.props().value).toBeUndefined()
    text.vm.onChange('111')
    await wrapper.vm.$nextTick()
    expect(text.props().value).toBe('111')
    expect(wrapper.vm.value.obj.a).toBe('111')
  })

  it('should not change object default value', async () => {
    const schema = {
      type: 'object',
      default: {
        text: '1',
      },
      properties: {
        text: {
          type: 'string',
        },
      },
    }
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema,
        value: undefined,
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.text).toMatch('1')
    const text = wrapper.find({ name: 'JsfTextInput' })
    text.vm.onChange('2')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.text).toMatch('2')
    expect(schema.default.text).toBe('1')
  })
})
