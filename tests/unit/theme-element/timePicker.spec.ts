import { mount } from '@vue/test-utils'

import { initialize, Helper as Wrapper } from '../utils'

initialize()

describe('time component', () => {
  it('format `time` should render time component', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
          format: 'time',
        },
      }),
    })
    const picker = wrapper.find({ name: 'JsfTimePicker' })
    expect(picker.vm).not.toBeUndefined()
  })

  it('format of time is number, el value should be the same as default', async () => {
    const time = new Date('2020-07-29 15:23:07').getTime()
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
          format: 'time',
          default: time,
        },
        value: undefined,
      }),
    })
    const elPicker = wrapper.find({ name: 'JsfTimePicker' })
    await wrapper.vm.$nextTick()
    expect(elPicker.vm.value).toBe(time)
  })
  it('format of time is number, el value should be the same as value', async () => {
    const time = new Date('2020-07-29 15:23:07').getTime()
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
          format: 'time',
        },
        value: time,
      }),
    })
    const elPicker = wrapper.find({ name: 'JsfTimePicker' })
    expect(elPicker.vm.value).toBe(time)
  })
  it('format of time is number, value should update when el-date-picker emit input event', async () => {
    const time = new Date('2020-07-29 15:23:07').getTime()
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
          format: 'time',
        },
        value: undefined,
      }),
    })
    const elPicker = wrapper.find({ name: 'JsfTimePicker' })
    elPicker.vm.$emit('input', time)
    expect(wrapper.vm.value).toBe(time)
  })

  it('format of time is string, el value should be the same as default', async () => {
    const time = '15:23:07'
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          format: 'time',
          default: time,
        },
        value: undefined,
      }),
    })
    const elPicker = wrapper.find({ name: 'JsfTimePicker' })
    await wrapper.vm.$nextTick()
    expect(elPicker.vm.value).toBe(time)
  })
  it('format of time is string, el value should be the same as value', async () => {
    const time = '15:23:07'
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          format: 'time',
        },
        value: time,
      }),
    })
    const elPicker = wrapper.find({ name: 'JsfTimePicker' })
    expect(elPicker.vm.value).toBe(time)
  })
  it('format of time is string, value should update when el-date-picker emit input event', async () => {
    const time = '15:23:07'
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          format: 'time',
        },
        value: undefined,
      }),
    })
    const elPicker = wrapper.find({ name: 'JsfTimePicker' })
    elPicker.vm.$emit('input', time)
    expect(wrapper.vm.value).toBe(time)
  })
})
