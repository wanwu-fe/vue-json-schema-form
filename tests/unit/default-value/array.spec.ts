import { mount } from '@vue/test-utils'

import { initialize, Helper as Wrapper } from '../utils'

initialize()

describe('array renderer default values', () => {
  it('should update value to `[]` if other type provided', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        value: '',
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value).toBeUndefined()
  })

  it('should update value to `[]` if other type provided with value given', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        value: 'text',
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value).toBeUndefined()
  })

  it('should use default as default value if `default` provided', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        value: ['text'],
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.length).toBe(1)
    expect(wrapper.vm.value[0]).toBe('text')
  })

  it('in object should use default as default value if `default` provided', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'object',
          properties: {
            array: {
              type: 'array',
              items: {
                type: 'string',
              },
              default: ['text'],
            },
          },
        },
        value: '',
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.array.length).toBe(1)
    expect(wrapper.vm.value.array[0]).toBe('text')
  })

  it('in object should use default as default value if object has default', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'object',
          properties: {
            array: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
          default: {
            array: ['text'],
          },
        },
        value: '',
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.array.length).toBe(1)
    expect(wrapper.vm.value.array[0]).toBe('text')
  })

  /****************** fixed array *********************/
  it('should use default as default value if has default', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
          default: ['text'],
        },
        value: '',
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.length).toBe(1)
    expect(wrapper.vm.value[0]).toBe('text')
    expect(wrapper.vm.value[1]).toBeUndefined()
  })

  it('with fixed array should use `[]` as default value if no default', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
        },
        value: '',
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value).toEqual([])
    // expect(wrapper.vm.value[0]).toBeUndefined()
    // expect(wrapper.vm.value[1]).toBeUndefined()
  })

  it('should use value as `currentValue` when created and follow value change', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          },
        },
        value: [
          {
            name: '123',
          },
        ],
      }),
    })
    await wrapper.vm.$nextTick()
    const ar = wrapper.find({ name: 'JsfArrayRenderer' })
    expect(ar.vm.currentValue).toBe(ar.vm.value)
    expect(ar.vm.currentValue).toEqual([{ name: '123' }])
    wrapper.vm.value = [{ name: '456' }]
    await wrapper.vm.$nextTick()
    expect(ar.vm.currentValue).toBe(ar.vm.value)
    expect(ar.vm.currentValue).toEqual([{ name: '456' }])
    // expect(wrapper.vm.value[0]).toBeUndefined()
    // expect(wrapper.vm.value[1]).toBeUndefined()
  })
})
