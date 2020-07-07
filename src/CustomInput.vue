<template>
  <FormItem v-bind="formItemProps">
    <input type="text" :value="value" @input="handleChange" />
  </FormItem>
</template>

<script>
import { FormItem, FormItemPropsMixin } from './theme-element-ui'
import { ThemeBaseMixin } from './core'

export default {
  props: ['value'],
  inject: ['fireEvent'],
  mixins: [FormItemPropsMixin, ThemeBaseMixin],
  components: {
    FormItem,
  },
  methods: {
    handleChange(v) {
      this.$emit('input', v.target.value)
      this.fireEvent('test', 123)
    },
  },
}
</script>
