import { mount } from '@vue/test-utils'

import { initialize, Helper as Wrapper } from '../utils'

initialize()

describe('dateTimeRange', () => {
  it('format `date-time-range` should render datetimepicker', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'string',
            format: 'date-time',
          },
          dateTimeRange: true,
        },
      }),
    })
    const picker = wrapper.find({ name: 'JsfDateTimeRangePicker' })
    await wrapper.vm.$nextTick()
    expect(picker.vm).not.toBeUndefined()
  })

  it('items format `date` is string, el value should be the same as value', () => {
    const date = ['2020-07-17', '2020-07-18']
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'string',
            format: 'date',
          },
          dateTimeRange: true,
        },
        value: date,
      }),
    })
    const picker = wrapper.find({ name: 'JsfDateTimeRangePicker' })
    expect(picker.vm.value).toBe(date)
  })
  it('items format `date` is string, el value should be the same as default', async () => {
    const date = ['2020-07-17', '2020-07-18']
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'string',
            format: 'date',
          },
          dateTimeRange: true,
          default: date,
        },
        value: undefined,
      }),
    })
    const picker = wrapper.find({ name: 'JsfDateTimeRangePicker' })
    await wrapper.vm.$nextTick()
    expect(picker.vm.value).toBe(date)
  })
  it('items format `date` is string, value should update when el emit input event', () => {
    const date = ['2020-07-17', '2020-07-18']
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'string',
            format: 'date',
          },
          dateTimeRange: true,
        },
        value: undefined,
      }),
    })
    const picker = wrapper.find({ name: 'JsfDateTimeRangePicker' })
    picker.vm.$emit('input', date)
    expect(wrapper.vm.value).toBe(date)
  })

  it('items format `date` is number, el value should be the same as value', () => {
    const date = [
      new Date('2020-07-17').getTime(),
      new Date('2020-07-18').getTime(),
    ]
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'number',
            format: 'date',
          },
          dateTimeRange: true,
        },
        value: date,
      }),
    })
    const picker = wrapper.find({ name: 'JsfDateTimeRangePicker' })
    expect(picker.vm.value).toBe(date)
  })
  it('items format `date` is number, el value should be the same as default', async () => {
    const date = [
      new Date('2020-07-17').getTime(),
      new Date('2020-07-18').getTime(),
    ]
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'number',
            format: 'date',
          },
          dateTimeRange: true,
          default: date,
        },
        value: undefined,
      }),
    })
    const picker = wrapper.find({ name: 'JsfDateTimeRangePicker' })
    await wrapper.vm.$nextTick()
    expect(picker.vm.value).toBe(date)
  })
  it('items format `date` is number, value should update when el emit input event', () => {
    const date = [
      new Date('2020-07-17').getTime(),
      new Date('2020-07-18').getTime(),
    ]
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'number',
            format: 'date',
          },
          dateTimeRange: true,
        },
        value: undefined,
      }),
    })
    const picker = wrapper.find({ name: 'JsfDateTimeRangePicker' })
    picker.vm.$emit('input', date)
    expect(wrapper.vm.value).toBe(date)
  })

  it('items format `date-time` is string, el value should be the same as value', () => {
    const date = ['2020-07-17 10:20:30', '2020-07-18 10:20:30']
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'string',
            format: 'date-time',
          },
          dateTimeRange: true,
        },
        value: date,
      }),
    })
    const picker = wrapper.find({ name: 'JsfDateTimeRangePicker' })
    expect(picker.vm.value).toBe(date)
  })
  it('items format `date-time` is string, el value should be the same as default', async () => {
    const date = ['2020-07-17 10:20:30', '2020-07-18 10:20:30']
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'string',
            format: 'date-time',
          },
          dateTimeRange: true,
          default: date,
        },
        value: undefined,
      }),
    })
    const picker = wrapper.find({ name: 'JsfDateTimeRangePicker' })
    await wrapper.vm.$nextTick()
    expect(picker.vm.value).toBe(date)
  })
  it('items format `date-time` is string, value should update when el emit input event', () => {
    const date = ['2020-07-17 10:20:30', '2020-07-18 10:20:30']
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'string',
            format: 'date-time',
          },
          dateTimeRange: true,
        },
        value: undefined,
      }),
    })
    const picker = wrapper.find({ name: 'JsfDateTimeRangePicker' })
    picker.vm.$emit('input', date)
    expect(wrapper.vm.value).toBe(date)
  })

  it('items format `date-time` is number, el value should be the same as value', () => {
    const date = [
      new Date('2020-07-17 10:20:30').getTime(),
      new Date('2020-07-18 10:20:30').getTime(),
    ]
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'number',
            format: 'date-time',
          },
          dateTimeRange: true,
        },
        value: date,
      }),
    })
    const picker = wrapper.find({ name: 'JsfDateTimeRangePicker' })
    expect(picker.vm.value).toBe(date)
  })
  it('items format `date-time` is number, el value should be the same as default', async () => {
    const date = [
      new Date('2020-07-17 10:20:30').getTime(),
      new Date('2020-07-18 10:20:30').getTime(),
    ]
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'number',
            format: 'date-time',
          },
          dateTimeRange: true,
          default: date,
        },
        value: undefined,
      }),
    })
    const picker = wrapper.find({ name: 'JsfDateTimeRangePicker' })
    await wrapper.vm.$nextTick()
    expect(picker.vm.value).toBe(date)
  })
  it('items format `date-time` is number, value should update when el emit input event', () => {
    const date = [
      new Date('2020-07-17 10:20:30').getTime(),
      new Date('2020-07-18 10:20:30').getTime(),
    ]
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'number',
            format: 'date-time',
          },
          dateTimeRange: true,
        },
        value: undefined,
      }),
    })
    const picker = wrapper.find({ name: 'JsfDateTimeRangePicker' })
    picker.vm.$emit('input', date)
    expect(wrapper.vm.value).toBe(date)
  })
})
