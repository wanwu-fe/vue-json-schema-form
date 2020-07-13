<template>
  <jsf-form v-bind="finalFormProps" class="vjsf">
    <SchemaItem
      :schema="schema"
      :root-schema="schema"
      :ui-schema="uiSchema"
      :on-change="handleChange"
      :value="form"
      path
    ></SchemaItem>
    <!-- <el-button type="primary" @click="handleSubmit">提 交</el-button> -->
  </jsf-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch, Prop, Provide } from 'vue-property-decorator'

const i18n = require('ajv-i18n')

// import { Schema } from './utils'
import { createInstance, CreateInstanceOptions } from './validator'
import SchemaItem from './SchemaItem.vue'
import { JsonSchemFormPlugin } from './types'
import {
  stringFormatComponentMap,
  numberFormatComponentMap,
} from './format-component-map'
import { Schema, isObject } from './utils'

@Component({
  name: 'JsonSchemaForm',
  components: {
    // ElForm: Form,
    SchemaItem: SchemaItem,
  },
})
export default class JsonSchemaForm extends Vue {
  @Prop(Object) readonly schema: any
  @Prop() readonly value: any
  @Prop({ default: () => [] }) readonly plugins: any
  @Prop() readonly formProps: any
  @Prop({ default: 'zh' }) readonly locale: any
  @Prop() readonly uiSchema: any
  @Prop() formatMaps: any
  form: any = {}
  validator: any = null
  // inject: any =
  created() {
    this.form = this.value
    // this.validator = createInstance({})
  }

  get keys() {
    return Object.keys(this.schema.properties)
  }
  get popts() {
    return this.schema.properties
  }
  get requires() {
    return this.schema.required || []
  }
  // get retrievedSchema() {
  //   return retrieveSchema(this.schema, this.schema, this.form)
  // }
  get finalFormProps() {
    return this.formProps || {}
  }
  get transformedPluginsOptions() {
    // debugger
    const ajvOptions: CreateInstanceOptions = {
      formats: [],
      keywords: [],
    }
    // const stringMap = { ...stringFormatComponentMap }
    // const numberMap = { ...numberFormatComponentMap }

    const formatMaps: any = {
      string: { ...stringFormatComponentMap },
      number: { ...numberFormatComponentMap },
    }

    if (this.formatMaps) {
      const { string, number }: any = this.formatMaps
      if (string && Array.isArray(string)) {
        string.forEach((s: any) => {
          formatMaps.string[s] = string[s]
        })
      }
      if (number && Array.isArray(number)) {
        number.forEach((n: any) => {
          formatMaps.number[n] = number[n]
        })
      }
    }

    const keywordTransforms: Record<string, any> = {}

    const plugins = Array.isArray(this.plugins) ? this.plugins : [this.plugins]

    this.plugins.forEach((plugin: JsonSchemFormPlugin) => {
      const { customFormats, customKeywords } = plugin
      if (customFormats && Array.isArray(customFormats)) {
        customFormats.forEach(({ name, definition, component }) => {
          const type: string =
            typeof definition === 'object'
              ? (definition as any).type || 'string'
              : 'string'
          if (component) {
            formatMaps[type][name] = component
          }
          const formats: any = ajvOptions.formats || []
          formats.push({
            name,
            definition,
          })
        })
      }

      if (customKeywords && Array.isArray(customKeywords)) {
        customKeywords.forEach(({ name, definition, transformSchema }) => {
          const keywords: any = ajvOptions.keywords || []

          keywords.push({
            name,
            definition,
          })

          if (transformSchema && typeof transformSchema === 'function') {
            if (keywordTransforms[name]) {
              console.warn(
                `keyword ${name} already registered, please conside change to another keyword`
              )
            }
            keywordTransforms[name] = transformSchema
          }
        })
      }
    })

    return {
      ajvOptions,
      formatMaps,
      keywordTransforms,
    }
  }

  @Provide('formContext') inject = {
    errors: [],
    formatMaps: {
      string: { ...stringFormatComponentMap },
      number: { ...numberFormatComponentMap },
    },
    customRendererKey: 'jsfCustom',
  }
  @Provide('validate') validate(schema: any, data: any) {
    const valid = this.validator.validate(schema, data)

    i18n[this.locale](this.validator.errors)

    const errors = this.validator.errors

    return {
      valid,
      errors,
    }
  }
  @Provide('fireEvent') fireEvent(event: string, data: any) {
    this.$emit(event, data)
  }
  @Provide('transformSchema') transformSchema(schema: Schema) {
    if (!isObject(schema)) {
      return schema
    }
    let transformedSchema: Schema = schema
    Object.keys(schema).forEach((k: string) => {
      if (this.transformedPluginsOptions.keywordTransforms[k]) {
        transformedSchema = this.transformedPluginsOptions.keywordTransforms[k](
          transformedSchema
        )
      }
    })
    return transformedSchema
  }

  @Watch('value')
  onValueChange(newV: any) {
    if (newV !== this.form) {
      this.form = newV
      // this.$nextTick(() => {
      //   this.$forceUpdate()
      // })
    }
  }

  @Watch('transformedPluginsOptions.formatMaps', {
    immediate: true,
    deep: true,
  })
  onFormatMapsChange(newV: any) {
    this.inject.formatMaps = newV
    // this.validator = createInstance(newV.ajvOptions)
  }

  @Watch('transformedPluginsOptions.ajvOptions', {
    immediate: true,
    deep: true,
  })
  onAjvOptionsChange(newV: any) {
    // this.inject.formatMaps = newV.formatMaps
    this.validator = createInstance(newV)
  }

  doValidate() {
    const { errors, valid } = this.validate(this.schema, this.form)

    this.inject.errors = errors || []

    return {
      errors,
      valid,
    }
  }
  clearErrors() {
    this.inject.errors = []
  }
  handleChange(v: any) {
    this.$emit('input', v)
  }
}
</script>
