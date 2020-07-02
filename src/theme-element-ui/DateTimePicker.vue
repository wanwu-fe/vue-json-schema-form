<template>
  <date-picker
    v-bind="{ ...$attrs }"
    @input="handleChange"
    type="datetime"
    :schema="schema"
    :placeholder="placeholder"
  ></date-picker>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import DatePicker from './base/DatePicker.vue'

@Component({
  name: 'JsfDateTimePicker',
  components: {
    DatePicker,
  },
})
export default class JsfDateTimePicker extends Vue {
  @Prop() schema: any
  handleChange(v: any) {
    this.$emit('input', v)
  }

  get placeholder() {
    return this.schema.placeholder || '请选择'
  }
}
</script>
