import { mount } from '@vue/test-utils'

import { initialize, Helper as Wrapper } from '../utils'

initialize()

describe('date', () => {
  // string
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
    const elPicker = wrapper.find({ name: 'ElDatePicker' })
    elPicker.vm.$emit('input', '123')
    expect(wrapper.vm.value).toBe('123')
  })
  //TODO: <ElDatePicker> at packages/date-picker/src/picker.vue
  // TypeError: dateStr.match is not a function
  // 值类型传参有误
  // it('get number when type is string', async () => {
  //   const wrapper: any = mount(Wrapper, {
  //     data: () => ({
  //       schema: {
  //         type: 'string',
  //         format: 'date',
  //       },
  //       value: new Date('2020-07-15 10:10:10').getTime(),
  //     }),
  //   })
  //   const picker = wrapper.find({ name: 'JsfDatePicker' })
  //   expect(picker.vm.value).toBeUndefined()
  // })
  it('value should be the same as value', async () => {
    const date = '2020-07-15'
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          format: 'date',
        },
        value: date,
      }),
    })
    const picker = wrapper.find({ name: 'JsfDatePicker' })
    expect(picker.vm.value).toBe(date)
  })
  it('value should be the same as default', async () => {
    const date = '2020-07-15'
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          format: 'date',
          default: date,
        },
        value: undefined,
      }),
    })
    const picker = wrapper.find({ name: 'JsfDatePicker' })
    await wrapper.vm.$nextTick()
    expect(picker.vm.value).toBe(date)
  })
  // TODO:type传参有误
  // it('set datetime when type is date', async () => {
  //   const wrapper: any = mount(Wrapper, {
  //     data: () => ({
  //       schema: {
  //         type: 'string',
  //         format: 'date',
  //       },
  //       value: '2020-07-15 10:20:30',
  //     }),
  //   })
  //   await wrapper.vm.$nextTick()
  //   expect(wrapper.vm.value).toBe('2020-07-15')
  // })

  // number
  it('when the format of date is number, value should update when el-date-picker change input', async () => {
    const time = new Date('2020-07-15 10:10:10').getTime()
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
          format: 'date',
        },
        value: undefined,
      }),
    })
    const elPicker = wrapper.find({ name: 'ElDatePicker' })
    elPicker.vm.$emit('input', time)
    expect(wrapper.vm.value).toBe(time)
  })
  it('when the format of date is number, value should be the same as value', async () => {
    const time = new Date('2020-07-15 10:10:10').getTime()
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
          format: 'date',
        },
        value: time,
      }),
    })
    const picker = wrapper.find({ name: 'ElDatePicker' })
    expect(picker.vm.value).toBe(time)
  })
  // TODO:值类型传参有误
  // it('get string when type is number', async () => {
  //   const wrapper: any = mount(Wrapper, {
  //     data: () => ({
  //       schema: {
  //         type: 'number',
  //         format: 'date',
  //       },
  //       value: '2020-07-15',
  //     }),
  //   })
  //   await wrapper.vm.$nextTick()
  //   expect(wrapper.vm.value).toBe(new Date('2020-07-15').getTime())
  // })
})
