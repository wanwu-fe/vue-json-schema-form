import { shallowMount, mount } from '@vue/test-utils'

import SchemaItem from '../../../src/core/SchemaItem.vue'

import { initialize, Helper as Wrapper, Custom } from '../utils'

initialize()

describe('custom component', () => {
  it('should render expect props to form components', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          default: 1,
          vjsf: {
            additionProps: {
              a: 'b',
            },
          },
        },
        value: undefined,
      }),
    })
    await wrapper.vm.$nextTick()
    const test = wrapper.find({ name: 'JsfTextInput' })
    const props = test.props()
    expect(props.value).toBe(1)
    expect(typeof props.onChange).toBe('function')
    expect(props.schema.default).toBe(1)
    expect(props.format).toBe('text')
    expect(props.title).toBe('')
  })

  it('schema item `.isCustomComponent` should be true when custom component provided', async () => {
    const wrapper: any = shallowMount(SchemaItem, {
      propsData: {
        schema: {
          type: 'string',
          vjsf: {
            component: 'input',
          },
        },
        path: '',
        rootSchema: {},
        onChange: () => {},
        value: undefined,
      },
      provide: {
        formContext: {
          errors: [],
        },
        transformSchema: (s: any) => s,
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isCustomComponent).toBe(true)
  })

  it('should pass additionProps to custom component', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          default: 1,
          vjsf: {
            component: 'my-custom',
            additionProps: {
              a: 'b',
            },
          },
        },
        value: undefined,
      }),
    })
    await wrapper.vm.$nextTick()
    const test = wrapper.find({ name: 'MyCustom' })
    const attrs = test.attributes()
    expect(attrs.a).toBe('b')
  })

  it('should pass additionProps to normal component', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          default: 1,
          vjsf: {
            additionProps: {
              a: 'b',
            },
          },
        },
        value: undefined,
      }),
    })
    await wrapper.vm.$nextTick()
    const test = wrapper.find({ name: 'JsfTextInput' })
    const attrs = test.attributes()
    expect(attrs.a).toBe('b')
  })
})
