<template>
  <el-date-picker
    v-bind="{ ...$props, ...$attrs }"
    :value="value"
    @input="handleChange"
    :format="showFormat"
    :value-format="valueFormat"
  ></el-date-picker>
</template>

<script lang="ts">
// import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { DatePicker as ElDatePicker } from 'element-ui'

import { DatePickerBase } from '../form-component-props'

function parsedDateTime(arg: any) {
  if (Array.isArray(arg)) {
    return arg.map((v: any) => {
      return v instanceof Date ? v.toJSON() : new Date(v).toJSON()
    })
  }
  return arg instanceof Date ? arg.toJSON() : new Date(arg).toJSON()
}

@Component({
  // name: 'JsfFormItem', name是class名字
  components: {
    ElDatePicker,
  },
})
export default class BaseDatePicker extends DatePickerBase {
  handleChange(v: any) {
    this.$emit(
      'input',
      !this.isNumber && this.isDateTime ? parsedDateTime(v) : v
    )
  }

  get valueFormat() {
    return this.isNumber ? 'timestamp' : this.isDateTime ? '' : 'yyyy-MM-dd'
  }

  get isNumber() {
    return (
      this.schema.type === 'number' ||
      (this.schema.type === 'array' && this.schema.items.type === 'number')
    )
  }

  get showFormat() {
    return this.isDateTime ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'
  }

  get isDateTime() {
    return this.type === 'datetime' || this.type === 'datetimerange'
  }
}
</script>
