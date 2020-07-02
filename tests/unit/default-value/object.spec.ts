import { mount } from '@vue/test-utils'

import { initialize, Helper as Wrapper } from '../utils'

initialize()

describe('object renderer default values', () => {
  it('should update value to `{}` if other type provided', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'object',
          properties: {
            aaa: {
              type: 'string',
              default: 'text',
            },
          },
        },
        value: '',
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.aaa).toMatch('text')
  })

  it('should update value to `{}` if other type provided with value given', async () => {
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
        value: 'text',
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.name).toMatch('text')
  })

  it('should use default as default value if `default` provided', async () => {
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
        value: 'text',
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.name).toMatch('text')
  })

  it('should use value when create with value provided', async () => {
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
        value: {
          name: 'jokcy',
        },
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.name).toMatch('jokcy')
  })

  it('should match expected result', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              default: 'text',
            },
            age: {
              type: 'number',
              default: 10,
            },
            pets: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
          default: {
            pets: ['kiki'],
          },
        },
        value: '',
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value.name).toMatch('text')
    expect(wrapper.vm.value.age).toEqual(10)
    expect(wrapper.vm.value.pets).toEqual(['kiki'])
  })
})
