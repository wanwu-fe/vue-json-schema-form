import { shallowMount, mount } from '@vue/test-utils'

import { initialize, Helper as Wrapper, Custom } from '../utils'

initialize()

describe('datetime', () => {
  it('format `datetime` should render datetimepicker', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          format: 'date-time',
        },
      }),
    })
    const picker = wrapper.find({ name: 'JsfDateTimePicker' })
    await wrapper.vm.$nextTick()
    expect(picker.vm).not.toBeUndefined()
  })

  it('when the format of date-time is string, el value should be the same as default', async () => {
    const datetime = '2020-07-17 10:20:30'
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          format: 'date-time',
          default: datetime,
        },
        value: undefined,
      }),
    })
    const elPicker = wrapper.find({ name: 'ElDatePicker' })
    await wrapper.vm.$nextTick()
    expect(elPicker.vm.value).toBe(datetime)
  })

  it('when the format of date-time is string, el value should be the same as value', async () => {
    const datetime = '2020-07-17 10:20:30'
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          format: 'date-time',
        },
        value: datetime,
      }),
    })
    const elPicker = wrapper.find({ name: 'ElDatePicker' })
    expect(elPicker.vm.value).toBe(datetime)
  })

  it('when the format of date-time is string, value should update when el-date-picker change input', async () => {
    const datetime = '2020-07-17 10:20:30'
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          format: 'date-time',
        },
        value: undefined,
      }),
    })
    const elPicker = wrapper.find({ name: 'ElDatePicker' })
    elPicker.vm.$emit('input', datetime)
    expect(wrapper.vm.value).toBe('2020-07-17T02:20:30.000Z')
  })

  it('when the format of date-time is number, el value should be the same as value', async () => {
    const time = new Date('2020-07-15 10:10:10').getTime()
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
          format: 'date-time',
        },
        value: time,
      }),
    })
    const picker = wrapper.find({ name: 'ElDatePicker' })
    expect(picker.vm.value).toBe(time)
  })
  it('when the format of date-time is number, value should update when el change input', async () => {
    const time = new Date('2020-07-15 10:20:30').getTime()
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
          format: 'date-time',
        },
        value: undefined,
      }),
    })
    const elPicker = wrapper.find({ name: 'ElDatePicker' })
    elPicker.vm.$emit('input', time)
    expect(wrapper.vm.value).toBe(time)
  })
})
