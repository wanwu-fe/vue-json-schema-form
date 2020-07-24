import { mount } from '@vue/test-utils'

import { initialize, Helper as Wrapper } from '../utils'

initialize()

describe('selection', () => {
  it('format `number` with `enumKeyValue` should render selection component', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
          enumKeyValue: [
            {
              key: 'option1',
              value: 1,
            },
            {
              key: 'option2',
              value: 2,
            },
            {
              key: 'option3',
              value: 3,
            },
          ],
        },
      }),
    })
    const picker = wrapper.find({ name: 'JsfSelection' })
    expect(picker.vm).not.toBeUndefined()
  })
  it('el value should be the same as value', () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
          enumKeyValue: [
            {
              key: 'option1',
              value: 1,
            },
            {
              key: 'option2',
              value: 2,
            },
            {
              key: 'option3',
              value: 3,
            },
          ],
        },
        value: 1,
      }),
    })
    const picker = wrapper.find({ name: 'JsfSelection' })
    expect(picker.vm.value).toBe(1)
  })
  it('el value should be the same as default', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
          enumKeyValue: [
            {
              key: 'option1',
              value: 1,
            },
            {
              key: 'option2',
              value: 2,
            },
            {
              key: 'option3',
              value: 3,
            },
          ],
          default: 1,
        },
        value: undefined,
      }),
    })
    const picker = wrapper.find({ name: 'JsfSelection' })
    await wrapper.vm.$nextTick()
    expect(picker.vm.value).toBe(1)
  })
  it('value should change when el emit input event', () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'number',
          enumKeyValue: [
            {
              key: 'option1',
              value: 1,
            },
            {
              key: 'option2',
              value: 2,
            },
            {
              key: 'option3',
              value: 3,
            },
          ],
        },
        value: undefined,
      }),
    })
    const picker = wrapper.find({ name: 'JsfSelection' })
    picker.vm.$emit('input', 1)
    expect(wrapper.vm.value).toBe(1)
  })
  it('when type of selection is multiple, el value should be the same as value', () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          default: null,
          items: {
            type: 'string',
            enumKeyValue: [
              {
                key: 'option1',
                value: '1',
              },
              {
                key: 'option2',
                value: '2',
              },
              {
                key: 'option3',
                value: '3',
              },
            ],
          },
        },
        value: ['1', '2'],
      }),
    })
    const picker = wrapper.find({ name: 'JsfSelection' })
    expect(picker.vm.value).toStrictEqual(['1', '2'])
  })
  it('when type of selection is multiple, el value should be the same as default', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          default: ['1', '2'],
          items: {
            type: 'string',
            enumKeyValue: [
              {
                key: 'option1',
                value: '1',
              },
              {
                key: 'option2',
                value: '2',
              },
              {
                key: 'option3',
                value: '3',
              },
            ],
          },
        },
        value: undefined,
      }),
    })
    const picker = wrapper.find({ name: 'JsfSelection' })
    await wrapper.vm.$nextTick()
    expect(picker.vm.value).toStrictEqual(['1', '2'])
  })
  it('when type of selection is multiple, value should change when el emit input event', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          default: null,
          items: {
            type: 'string',
            enumKeyValue: [
              {
                key: 'option1',
                value: '1',
              },
              {
                key: 'option2',
                value: '2',
              },
              {
                key: 'option3',
                value: '3',
              },
            ],
          },
        },
        value: undefined,
      }),
    })
    const elPicker = wrapper.find({ name: 'JsfSelection' })
    elPicker.vm.$emit('input', ['1', '2'])
    expect(wrapper.vm.value).toStrictEqual(['1', '2'])
  })
})
