<template>
  <!-- <jsf-form-item v-bind="formItemProps"> -->
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
  <!-- </jsf-form-item> -->
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { RendererBaseClass } from '../mixins'

@Component
export default class JsfStringRenderer extends Mixins(RendererBaseClass) {
  created() {
    /**
     * 我们应该承认，空字符串也是字符串，我们需要承认其类型
     * 如果我们希望这个值不存在，我们就应该直接设置其为`undefined`
     */
    if (
      this.schema.default &&
      (this.value === undefined || typeof this.value !== 'string')
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
    //TODO: 考虑增加配置项目`emitUndefinedOnEmptyString`
    this.onChange(typeof value === 'string' ? value : undefined)
  }
}
</script>
