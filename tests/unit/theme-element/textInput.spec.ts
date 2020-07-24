import { mount } from '@vue/test-utils'

import { initialize, Helper as Wrapper } from '../utils'

initialize()

describe('textInput', () => {
  it('format `string` should render textInput component', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
        },
      }),
    })
    const picker = wrapper.find({ name: 'JsfTextInput' })
    expect(picker.vm).not.toBeUndefined()
  })
  it('el value should be the same as value', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
        },
        value: 'yes',
      }),
    })
    const picker = wrapper.find({ name: 'JsfTextInput' })
    expect(picker.vm.value).toBe('yes')
  })
  it('el value should be the same as default', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          default: 'yes',
        },
        value: undefined,
      }),
    })
    const picker = wrapper.find({ name: 'JsfTextInput' })
    await wrapper.vm.$nextTick()
    expect(picker.vm.value).toBe('yes')
  })
  it('value should change when el emit input event', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
        },
        value: undefined,
      }),
    })
    const picker = wrapper.find({ name: 'JsfTextInput' })
    picker.vm.$emit('input', 'yes')
    expect(wrapper.vm.value).toBe('yes')
  })
})
