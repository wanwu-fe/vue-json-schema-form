import { mount } from '@vue/test-utils'

import { initialize, Helper as Wrapper } from '../utils'

initialize()

describe('colorPicker', () => {
  it('format `color` should render colorpicker', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          format: 'color',
        },
      }),
    })
    const picker = wrapper.find({ name: 'JsfColorPicker' })
    expect(picker.vm).not.toBeUndefined()
  })
  it('el value should be the same as value', () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          format: 'color',
        },
        value: 'red',
      }),
    })
    const picker = wrapper.find({ name: 'JsfColorPicker' })
    expect(picker.vm.value).toBe('red')
  })
  it('el value should be the same as default', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          format: 'color',
          default: 'red',
        },
        value: undefined,
      }),
    })
    const picker = wrapper.find({ name: 'JsfColorPicker' })
    await wrapper.vm.$nextTick()
    expect(picker.vm.value).toBe('red')
  })
  it('value should change when el emit input event', () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          format: 'color',
        },
        value: undefined,
      }),
    })
    const elPicker = wrapper.find({ name: 'JsfColorPicker' })
    elPicker.vm.$emit('input', 'red')
    expect(wrapper.vm.value).toBe('red')
  })
})
