<template>
  <form-item v-bind="formItemProps">
    <date-picker
      v-bind="{ ...passProps }"
      @input="handleChange"
      type="date"
      :placeholder="placeholder"
    ></date-picker>
  </form-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import DatePicker from './base/DatePicker.vue'
import FormItem from './FormItem.vue'
import { CommonBase } from './form-component-props'

@Component({
  name: 'JsfDatePicker',
  components: {
    DatePicker,
    FormItem,
  },
})
export default class JsfDatePicker extends CommonBase {
  @Prop() schema: any
  handleChange(v: any) {
    this.$emit('input', v)
  }

  get passProps() {
    return {
      ...this.$props,
      ...this.$attrs,
    }
  }

  get placeholder() {
    return this.schema.placeholder || '请选择'
  }
}
</script>
