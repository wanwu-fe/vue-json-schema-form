import { mount } from '@vue/test-utils'
import JsfForm from '@/theme-element-ui/Form.vue'
import JsfSwitch from '@/theme-element-ui/Switch.vue'

let wrapper: any

describe('test whether the switch will work properly', () => {
  beforeEach(() => {
    // const formWrapper = {
    //   render(h: any) {
    //     return h(JsfForm, {
    //       scopedSlots: {
    //         default: (props: any) => {
    //           console.log('props', props)
    //           return h(JsfSwitch, {
    //             props: {
    //               value: props.value,
    //               errors: [],
    //               vjsf: {},
    //             },
    //           })
    //         },
    //       },
    //     })
    //   },
    // }

    const wrapperCom = {
      data() {
        return {
          value: false,
        }
      },
      template: `<JsfForm>
          <JsfSwitch v-model="value" :errors=[] :vjsf={}></JsfSwitch>
        </JsfForm>`,
      components: { JsfForm, JsfSwitch },
    }

    wrapper = mount(wrapperCom)
  })
  afterEach(() => {
    wrapper && wrapper.destroy && wrapper.destroy()
  })

  it('default', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.find(JsfSwitch).vm.value).toBeFalsy()
  })
  it('change', async () => {
    await wrapper.vm.$nextTick()
    wrapper.find({ name: 'ElSwitch' }).trigger('click')
    await wrapper.vm.$nextTick()
    // console.log('w1', wrapper.vm.value, wrapper.find(JsfSwitch).vm.value)
    expect(wrapper.vm.value).toBeTruthy()
  })
})
