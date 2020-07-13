<template>
  <form-item v-bind="formItemProps">
    <date-picker
      v-bind="{ ...$props, ...$attrs }"
      @input="handleChange"
      type="datetime"
      :schema="schema"
      :placeholder="placeholder"
    ></date-picker>
  </form-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import DatePicker from './base/DatePicker.vue'
import { CommonBase } from './form-component-props'
import FormItem from './FormItem.vue'

@Component({
  name: 'JsfDateTimePicker',
  components: {
    DatePicker,
    FormItem,
  },
})
export default class JsfDateTimePicker extends CommonBase {
  @Prop() schema: any
  handleChange(v: any) {
    this.$emit('input', v)
  }

  get placeholder() {
    return this.schema.placeholder || '请选择'
  }
}
</script>
