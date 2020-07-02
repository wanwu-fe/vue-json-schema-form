import { shallowMount, mount } from '@vue/test-utils'

import SchemaItem from '../../../src/core/SchemaItem.vue'

import { initialize, Helper as Wrapper, Custom } from '../utils'

initialize()

describe('ui schema', () => {
  it('should render as expect when use ui-schema', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          default: 1,
        },
        uiSchema: {
          component: 'my-custom',
          additionProps: {
            a: 'b',
          },
          title: 'test title',
        },
        value: undefined,
      }),
    })
    await wrapper.vm.$nextTick()
    const test = wrapper.find({ name: 'MyCustom' })
    const attrs = test.attributes()
    expect(attrs.a).toBe('b')
    expect(attrs.title).toBe('test title')
  })

  it('should pass down ui-schema correctly', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            age: {
              type: 'number',
            },
            pets: {
              type: 'array',
              items: {
                type: 'string',
              },
              default: ['123'],
            },
          },
        },
        uiSchema: {
          title: 'object',
          properties: {
            name: {
              additionProps: {
                a: 'b',
              },
              title: 'name',
            },
            age: {
              title: 'age',
            },
            pets: {
              title: 'pets',
              items: {
                title: 'ptname',
              },
            },
          },
        },
        value: undefined,
      }),
    })
    await wrapper.vm.$nextTick()
    const obj = wrapper.find({ name: 'JsfObjectRenderer' })
    const str = wrapper.find({ name: 'JsfStringRenderer' })
    const num = wrapper.find({ name: 'JsfNumberRenderer' })
    const arr = wrapper.find({ name: 'JsfArrayRenderer' })
    // const attrs = test.attributes()
    expect(obj.props().uiSchema.title).toBe('object')
    // expect(obj.vm.vjsf.title).toBe('object')
    expect(str.props().uiSchema.title).toBe('name')
    expect(str.vm.vjsf.title).toBe('name')
    expect(num.props().uiSchema.title).toBe('age')
    expect(num.vm.vjsf.title).toBe('age')
    expect(arr.props().uiSchema.title).toBe('pets')
    expect(arr.vm.vjsf.title).toBe('pets')

    const arrSubStr = arr.find({ name: 'JsfStringRenderer' })
    expect(arrSubStr.props().uiSchema.title).toBe('ptname')
    // expect(attrs.title).toBe('test title')
  })
})
