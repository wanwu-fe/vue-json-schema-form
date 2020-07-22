import { mount } from '@vue/test-utils'

import { initialize, Helper as Wrapper } from '../utils'

initialize()

describe('switch component', () => {
  it('format `switch` should render switch component', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'boolean',
        },
      }),
    })
    const picker = wrapper.find({ name: 'JsfSwitch' })
    expect(picker.vm).not.toBeUndefined()
  })
  it('el value should be the same as value', () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'boolean',
        },
        value: true,
      }),
    })
    const picker = wrapper.find({ name: 'JsfSwitch' })
    expect(picker.vm.value).toBe(true)
  })
  it('el value should be the same as default', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'boolean',
          default: true,
        },
        value: undefined,
      }),
    })
    const picker = wrapper.find({ name: 'JsfSwitch' })
    await wrapper.vm.$nextTick()
    expect(picker.vm.value).toBe(true)
  })
  it('value should change when el emit input event', () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'boolean',
        },
        value: undefined,
      }),
    })
    const elPicker = wrapper.find({ name: 'JsfSwitch' })
    elPicker.vm.$emit('input', true)
    expect(wrapper.vm.value).toBe(true)
  })
})
