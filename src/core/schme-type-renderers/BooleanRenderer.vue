<template>
  <jsf-form-item v-bind="formItemProps">
    <jsf-switch v-bind="rendererProps" @input="handleChange"></jsf-switch>
  </jsf-form-item>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { RendererBaseClass } from '../mixins'

@Component
export default class BolleanRenderer extends RendererBaseClass {
  // name: 'JSFBooleanRenderer',
  created() {
    if (typeof this.value !== 'boolean') {
      this.handleChange(this.schema.default || this.value)
    }
  }
  updated() {
    if (typeof this.value !== 'boolean') {
      this.handleChange(this.value)
    }
  }
  handleChange(v: any) {
    // this.currentValue = v
    // this.$emit('input', v)
    this.onChange(!!v)
  }
}
</script>
