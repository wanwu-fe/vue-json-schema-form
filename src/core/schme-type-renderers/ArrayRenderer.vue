<template>
  <!-- <jsf-form-item v-bind="formItemProps"> -->
  <jsf-selection
    v-bind="rendererProps"
    :multiple-limit="multipleLimit"
    multiple
    :value="currentValue"
    @input="handleChange"
    :options="options"
    placeholder="请选择"
    v-if="isMultiSelection"
  ></jsf-selection>
  <jsf-date-time-range-picker
    v-else-if="isDateRange"
    v-bind="rendererProps"
    @input="handleChange"
    :type="dateTimeType"
  ></jsf-date-time-range-picker>
  <div v-else-if="isMultiType" v-show="show">
    <jsf-item
      :schema="item"
      :ui-schema="arrayUiSchema.items && arrayUiSchema.items[index]"
      :root-schema="rootSchema"
      :path="`${path}/${index}`"
      v-for="(item, index) of schema.items"
      :key="index"
      :value="currentValue[index]"
      :on-change="(v) => handleValueChange(index, v)"
    ></jsf-item>
  </div>
  <div :style="containerStyle" v-else>
    <template v-if="isSingleType">
      <jsf-single-type-array-wrapper
        :list="currentValue || []"
        :title="title"
        :onDelete="handleDelete"
        :onAdd="handleAdd"
        :onDown="handleDown"
        :onUp="handleUp"
      >
        <template v-slot:default="item">
          <jsf-item
            :schema="schema.items"
            :ui-schema="arrayUiSchema.items"
            :root-schema="rootSchema"
            :path="`${path}/${item.index}`"
            :value="item.data"
            :on-change="(v) => handleValueChange(item.index, v)"
          ></jsf-item>
        </template>
      </jsf-single-type-array-wrapper>
    </template>
  </div>
  <!-- </jsf-form-item> -->
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
const clone = require('lodash.clonedeep')
// import { getDefaultValueOfSchema } from '../utils'
import { RendererBaseClass } from '../mixins'

@Component
export default class JsfArrayRenderer extends RendererBaseClass {
  currentValue: any[] | undefined = []
  show: boolean = true
  // @Watch('currentValue')
  // onCurrentValueChange(v: any) {
  //   let change = v
  //   if (!v || (v && v.length === 0)) {
  //     change = undefined
  //   }
  //   this.onChange(change)
  // }
  @Watch('value')
  onValueChange(newV: any) {
    /**
     * 一开始就是`undefined`的，就不会触发
     * 如果是 fixed 数组，则要初始化一个空数组
     */
    if (newV === undefined) {
      this.handleChange(this.isMultiType ? [] : newV)
    } else {
      // this.handleChange(newV)
      this.currentValue = newV
    }
  }

  created() {
    if (!this.value || !Array.isArray(this.value)) {
      // this.$emit('input', this.schema.default || [])
      const defaultValue = this.isMultiType ? [] : undefined
      this.handleChange(
        this.schema.default ? clone(this.schema.default) : defaultValue
      )
    } else {
      this.currentValue = this.value
    }
  }

  get containerStyle() {
    const style: any = {
      marginBottom: '20px',
    }

    if (!this.isMultiSelection && !this.isDateRange) {
      // style.border = '1px solid #eee'
      style.paddingBottom = '15px'
    }

    return style
  }
  get arrayUiSchema() {
    return this.uiSchema || {}
  }
  get isMultiSelection() {
    const items = this.schema.items
    return !!(items.enum || items.enumKeyValue)
  }
  get multipleLimit() {
    return this.schema.maxItems || 0
  }
  get isSingleType() {
    return (
      typeof this.schema.items === 'object' && !Array.isArray(this.schema.items)
    )
  }
  get isDateRange() {
    if (this.schema.dateRange) {
      console.warn(
        'dateRange will be deprecated in the future, switch to dateTimeRange instead'
      )
    }
    return this.schema.dateRange || this.schema.dateTimeRange
  }
  get dateTimeComponent() {
    if (!this.isDateRange) return ''
    return this.schema.items.formate === 'date-time'
      ? 'jsf-date-time-picker'
      : 'jsf-date-picker'
  }
  get dateTimeType() {
    if (!this.isDateRange) return ''

    switch (this.schema.items.format) {
      case 'date-time': {
        return 'datetimerange'
      }
      case 'time': {
        return 'timerange'
      }
      default: {
        return 'daterange'
      }
    }

    // return this.schema.items.format === 'date-time'
    //   ? 'datetimerange'
    //   : 'daterange'
  }
  get isMultiType() {
    return Array.isArray(this.schema.items)
  }
  get options() {
    if (!this.isMultiSelection) return []
    const { enum: enums, enumKeyValue } = this.schema.items
    if (enums) return enums.map((e: any) => ({ key: e, value: e }))
    return enumKeyValue
  }

  toggleShow() {
    this.show = !this.show
  }
  getItemDefault() {
    const items = this.schema.items
    return items.default
  }

  handleUp(item: any, index: number) {
    if (index === 0) return
    this.currentValue = this.currentValue || []
    const buf = this.currentValue[index - 1]
    this.currentValue[index - 1] = item
    this.currentValue[index] = buf
    // make array action wrapper force update
    this.currentValue = [...this.currentValue]
    // this.$forceUpdate()
    this.fireOnChange()
  }
  handleDown(item: any, index: number) {
    this.currentValue = this.currentValue || []
    if (index >= this.currentValue.length - 1) return
    const buf = this.currentValue[index + 1]
    this.currentValue[index + 1] = item
    this.currentValue[index] = buf
    this.currentValue = [...this.currentValue]
    // this.$forceUpdate()
    this.fireOnChange()
  }
  handleAdd(item: any, index: number) {
    this.currentValue = this.currentValue || []
    // this.currentValue.push(this.getItemDefault())
    this.currentValue.splice(index + 1, 0, this.getItemDefault())
    this.fireOnChange()
  }
  addWhenEmpty() {
    this.currentValue = this.currentValue || []
    this.currentValue.push(this.getItemDefault())
    this.fireOnChange()
  }
  handleDelete(item: any, index: number) {
    if (this.currentValue !== undefined) {
      this.currentValue.splice(index, 1)
      if (this.currentValue.length === 0) this.currentValue = undefined
      this.fireOnChange()
    } else {
      console.error('delete error')
    }
  }
  handleValueChange(index: number, v: any) {
    // if (v !== undefined && this.currentValue === undefined) {
    //   this.currentValue = [v]
    // }
    // if (this.currentValue && Array.isArray(this.currentValue)) {
    //   this.$set(this.currentValue, index, v)
    // } else {
    //   this.currentValue = [v]
    // }
    if (this.currentValue === undefined || !Array.isArray(this.currentValue)) {
      this.currentValue = []
    }
    this.$set(this.currentValue, index, v)
    this.fireOnChange()
    // this.currentValue[index] = v
  }
  handleChange(v: any) {
    this.currentValue = v
    this.fireOnChange()
    // this.$emit('input', change)
  }
  fireOnChange() {
    this.onChange(this.currentValue)
  }
}
</script>
