<template>
  <jsf-form-item v-bind="formItemProps">
    <jsf-selection
      v-bind="rendererProps"
      :options="getOptions()"
      @input="handleChange"
      placeholder="请选择"
      v-if="isSelect"
    ></jsf-selection>
    <component
      :is="component"
      v-bind="rendererProps"
      @input="handleChange"
      v-else
    />
  </jsf-form-item>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { RendererBaseClass } from '../mixins'

@Component
export default class JsfStringRenderer extends Mixins(RendererBaseClass) {
  created() {
    // TODO: 创建时我们认为 *空字符串也需要被赋予默认值*
    if (
      this.schema.default &&
      (this.value === undefined || this.value === '')
    ) {
      this.handleChange(this.schema.default)
    }
  }
  get isSelect() {
    return this.schema.enum || this.schema.enumKeyValue
  }
  get format() {
    return this.schema.format || 'text'
  }
  get component() {
    return this.formatMaps[this.format] || this.formatMaps.default
  }
  get formatMaps() {
    return this.form.formatMaps.string
  }
  // get commonProps() {
  //   return {
  //     value: this.value || '',
  //     onChange: this.handleChange,
  //     format: this.format,
  //     schema: this.schema,
  //     errors: this.errors,
  //   }
  // }

  get rules() {
    const rules = []
    if (this.required) {
      rules.push({ required: true, message: '必须选择', trigger: 'blur' })
    }
    return rules
  }
  getOptions() {
    if (this.schema.enumKeyValue) return this.schema.enumKeyValue
    else if (this.schema.enum)
      return this.schema.enum.map((e: any) => ({ key: e, value: e }))
    else return []
  }
  handleChange(value: string | undefined) {
    // console.log(value)
    // this.$emit('input', value || undefined)
    this.onChange(value || undefined)
  }
}
</script>
