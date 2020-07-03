<template>
  <jsf-constant v-bind="rendererProps" />
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { RendererBaseClass } from '../mixins'

@Component
export default class ConstantRenderer extends RendererBaseClass {
  // name: 'JSFBooleanRenderer',
  created() {
    this.onChange(this.schema.const)
  }
  updated() {
    this.onChange(this.schema.const)
  }
}
</script>
