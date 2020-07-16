import { shallowMount, mount } from '@vue/test-utils'

import SchemaItem from '../../../src/core/SchemaItem.vue'

import { initialize, Helper as Wrapper, Custom } from '../utils'

initialize()

describe('datetime', () => {
  it('format `date` should render datepicker', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          format: 'date',
        },
      }),
    })
    const picker = wrapper.find({ name: 'JsfDatePicker' })
    expect(picker.vm).not.toBeUndefined()
  })

  it('value should update when el-date-picker fire input event', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          format: 'date',
        },
        value: undefined,
      }),
    })
    // const now = new Date()
    const elPicker = wrapper.find({ name: 'ElDatePicker' })
    elPicker.vm.$emit('input', '123')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value).toBe('123')
  })
})
