<template>
  <date-picker
    v-bind="{ ...passProps }"
    @input="handleChange"
    type="date"
    :placeholder="placeholder"
  ></date-picker>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import DatePicker from './base/DatePicker.vue'

@Component({
  name: 'JsfDatePicker',
  components: {
    DatePicker,
  },
})
export default class JsfDatePicker extends Vue {
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
