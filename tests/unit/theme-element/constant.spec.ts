import { mount } from '@vue/test-utils'

import { initialize, Helper as Wrapper } from '../utils'

initialize()

describe('constant component', () => {
  it('format `const` should render constant component', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          const: 'const-value',
        },
      }),
    })
    const picker = wrapper.find({ name: 'JsfConstant' })
    expect(picker.vm).not.toBeUndefined()
  })
  it('when type of value is string, el value should be the same as const', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          const: 'const-value',
        },
      }),
    })
    const picker = wrapper.find({ name: 'JsfConstant' })
    await wrapper.vm.$nextTick()
    expect(picker.vm.value).toBe('const-value')
  })
  it('when type of value is number, el value should be the same as const', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'string',
          const: 12,
        },
      }),
    })
    const picker = wrapper.find({ name: 'JsfConstant' })
    await wrapper.vm.$nextTick()
    expect(picker.vm.value).toBe(12)
  })
})
