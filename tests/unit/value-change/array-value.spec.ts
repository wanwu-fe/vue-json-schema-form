import { mount } from '@vue/test-utils'

import { initialize, Helper as Wrapper } from '../utils'

initialize()

describe('array value change', () => {
  it('sort down should work', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        value: ['a', 'b'],
      }),
    })
    const aw = wrapper.find({ name: 'JsfSingleTypeArrayWrapper' })
    expect(aw).not.toBeUndefined()
    aw.vm.onDown('a', 0)
    expect(wrapper.vm.value).toEqual(['b', 'a'])
  })

  it('sort up should work', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        value: ['a', 'b'],
      }),
    })
    const aw = wrapper.find({ name: 'JsfSingleTypeArrayWrapper' })
    expect(aw).not.toBeUndefined()
    aw.vm.onUp('b', 1)
    expect(wrapper.vm.value).toEqual(['b', 'a'])
  })

  it('delete should work', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        value: ['a', 'b'],
      }),
    })
    const aw = wrapper.find({ name: 'JsfSingleTypeArrayWrapper' })
    expect(aw).not.toBeUndefined()
    aw.vm.onDelete('a', 0)
    expect(wrapper.vm.value).toEqual(['b'])
  })

  it('add should work', async () => {
    const wrapper: any = mount(Wrapper, {
      data: () => ({
        schema: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        value: ['a', 'b'],
      }),
    })
    const aw = wrapper.find({ name: 'JsfSingleTypeArrayWrapper' })
    expect(aw).not.toBeUndefined()
    aw.vm.onAdd('a', 0)
    expect(wrapper.vm.value).toEqual(['a', undefined, 'b'])
  })
})
