import { mount } from '@vue/test-utils'
import JsfForm from '@/theme-element-ui/Form.vue'
import JsfDatePicker from '@/theme-element-ui/DatePicker.vue'

let wrapper: any

describe('test datepicker the switch will work properly', () => {
  afterEach(() => {
    wrapper && wrapper.destroy && wrapper.destroy()
  })
  it('default value', async () => {
    const wrapperCom = {
      data() {
        return {
          value: '2020-07-16',
          schema: {
            type: 'string',
          },
        }
      },
      template: `<JsfForm>
          <JsfDatePicker v-model="value" :errors=[] :vjsf={} :schema="schema"></JsfDatePicker>
        </JsfForm>`,
      components: { JsfForm, JsfDatePicker },
    }
    wrapper = mount(wrapperCom)
    await wrapper.vm.$nextTick()
    expect(wrapper.find(JsfDatePicker).vm.value).toBe('2020-07-16')
  })

  it('change value when type is number', async () => {
    const wrapperCom = {
      data() {
        return {
          value: undefined,
          schema: {
            type: 'number',
            // placeholder: 'placeholder',
          },
        }
      },
      template: `<JsfForm>
          <JsfDatePicker v-model="value" :errors=[] :vjsf={} :schema="schema"></JsfDatePicker>
        </JsfForm>`,
      components: { JsfForm, JsfDatePicker },
    }

    wrapper = mount(wrapperCom)
    await wrapper.vm.$nextTick()
    const input = wrapper
      .find({ name: 'ElDatePicker' })
      .vm.$el.querySelector('input')

    input.blur()
    input.focus()
    setTimeout(async () => {
      const $el = wrapper.find({ name: 'ElDatePicker' }).vm.$el
      $el.querySelector('td.available').click()
      await wrapper.vm.$nextTick()
      // console.log('value', wrapper.vm.value)
      expect(wrapper.vm.value).toBe(new Date().getDate())
      // expect(input.getAttribute('placeholder')).toBe('placeholder')
    }, 50)
  })
  it('change value when type is string', async () => {
    const wrapperCom = {
      data() {
        return {
          value: undefined,
          schema: {
            type: 'string',
          },
        }
      },
      template: `<JsfForm>
          <JsfDatePicker v-model="value" :errors=[] :vjsf={} :schema="schema"></JsfDatePicker>
        </JsfForm>`,
      components: { JsfForm, JsfDatePicker },
    }

    wrapper = mount(wrapperCom)
    await wrapper.vm.$nextTick()
    const input = wrapper
      .find({ name: 'ElDatePicker' })
      .vm.$el.querySelector('input')

    input.blur()
    input.focus()
    setTimeout(async () => {
      const $el = wrapper.find({ name: 'ElDatePicker' }).vm.$el
      $el.querySelector('td.available').click()
      await wrapper.vm.$nextTick()
      // console.log('value', wrapper.vm.value)

      expect(wrapper.vm.value).toBe(formatDate(new Date()))
      // expect(input.getAttribute('placeholder')).toBe('placeholder')
      function formatDate(date: any) {
        return `${date.getFullYear()}-${
          date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1
        }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
      }
    }, 50)
  })

  it('clear value', async () => {
    const wrapperCom = {
      data() {
        return {
          value: undefined,
          schema: {
            type: 'number',
            vjsf: {
              additionProps: {
                clearable: true,
              },
            },
          },
        }
      },
      template: `<JsfForm>
          <JsfDatePicker v-model="value" :errors=[] :vjsf={} :schema="schema"></JsfDatePicker>
        </JsfForm>`,
      components: { JsfForm, JsfDatePicker },
    }
    wrapper = mount(wrapperCom)
    await wrapper.vm.$nextTick()
    const input = wrapper
      .find({ name: 'ElDatePicker' })
      .vm.$el.querySelector('input')

    input.blur()
    input.focus()
    setTimeout(async () => {
      const $el = wrapper.find({ name: 'ElDatePicker' }).vm.$el
      $el.querySelector('td.available').click()
      setTimeout(async () => {
        wrapper
          .find({ name: 'ElDatePicker' })
          .vm.handleClickIcon({ stopPropagation: () => null })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.value).toBeNull()
      }, 50)
    }, 50)
  })
})
