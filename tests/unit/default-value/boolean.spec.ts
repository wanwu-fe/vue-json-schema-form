import { mount } from '@vue/test-utils'

import { initialize, Helper as Wrapper } from '../utils'

initialize()

describe('boolean renderer default values', () => {
  it('should use `false` when no default', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'boolean',
        },
        value: undefined,
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value).toBe(false)
  })

  it('should use `!!default` when default provided', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'boolean',
          default: 1,
        },
        value: undefined,
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value).toBe(true)
  })

  it('should use `value` when value provided', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'boolean',
          default: 1,
        },
        value: false,
      }),
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value).toBe(false)
  })
})
