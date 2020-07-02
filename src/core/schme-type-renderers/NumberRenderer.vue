<template>
  <jsf-form-item v-bind="formItemProps">
    <jsf-selection
      v-bind="rendererProps"
      @input="handleChange"
      :options="options"
      v-if="isSelect"
    ></jsf-selection>
    <component
      :is="component"
      v-bind="rendererProps"
      @input="handleChange"
      v-else
    ></component>
  </jsf-form-item>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import { RendererBaseClass, errorMessage, selectMixin } from '../mixins'

@Component({
  mixins: [selectMixin],
})
export default class JsfNumberRenderer extends RendererBaseClass {
  currentValue = null
  created() {
    // TODO: 创建时我们认为 *空字符串也需要被赋予默认值*
    if (typeof this.schema.default === 'number' && this.value === undefined) {
      // console.log('change number to default', this.schema.default)
      this.handleChange(this.schema.default)
    }
  }
  get min() {
    return this.schema.minimum || -Infinity
  }
  get max() {
    return this.schema.maximum || Infinity
  }
  get component() {
    return (
      this.form.formatMaps.number[this.schema.format || '__impossible_key__'] ||
      this.form.formatMaps.number.default
    )
  }

  handleChange(v: any) {
    this.currentValue = v
    // this.$emit('input', v)
    this.onChange(v)
  }
}
</script>
