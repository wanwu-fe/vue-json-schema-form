<template>
  <form-item v-bind="formItemProps">
    <TimePicker
      v-bind="{ ...$props, ...$attrs }"
      :placeholder="placeholder"
      :value="value"
      @input="handleChange"
      :value-format="valueFormat"
      format="HH:mm:ss"
    ></TimePicker>
  </form-item>
</template>

<script lang="ts">
// import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { TimePicker } from 'element-ui'

// import { DatePickerBase } from '../form-component-props'
import { TimePickerBase } from './form-component-props'
import FormItem from './FormItem.vue'

@Component({
  name: 'JsfTimePicker', //name是class名字
  components: {
    TimePicker,
    FormItem,
  },
})
export default class BaseDatePicker extends TimePickerBase {
  handleChange(v: any) {
    this.$emit('input', v)
  }

  get valueFormat() {
    return this.isNumber ? 'timestamp' : 'HH:mm:ss'
  }

  get isNumber() {
    return (
      this.schema.type === 'number' ||
      (this.schema.type === 'array' && this.schema.items.type === 'number')
    )
  }
}
</script>
