import { mount } from '@vue/test-utils'

import { initialize, Helper as Wrapper } from '../utils'

initialize()

describe('numberInput', () => {
  it('format `number` should render numberInput component', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
        },
      }),
    })
    const picker = wrapper.find({ name: 'JsfNumberInput' })
    expect(picker.vm).not.toBeUndefined()
  })
  it('el value should be the same as value', () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
        },
        value: 67,
      }),
    })
    const picker = wrapper.find({ name: 'JsfNumberInput' })
    expect(picker.vm.value).toBe(67)
  })
  it('el value should be the same as default', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
          default: 83,
        },
        value: undefined,
      }),
    })
    const picker = wrapper.find({ name: 'JsfNumberInput' })
    await wrapper.vm.$nextTick()
    expect(picker.vm.value).toBe(83)
  })
  it('value should change when el emit input event', () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
        },
        value: undefined,
      }),
    })
    const elPicker = wrapper.find({ name: 'JsfNumberInput' })
    elPicker.vm.$emit('input', 35)
    expect(wrapper.vm.value).toBe(35)
  })
})
