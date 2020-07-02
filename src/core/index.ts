import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'

import * as utils from './utils'

import SchemaForm from './SchemaForm.vue'
import SchemaItem from './SchemaItem.vue'
// import SchemaRenderer from './SchemaRenderer.vue'
// import createValidator from './validator'

export default {
  install(vue: typeof Vue) {
    vue.component('JsonSchemaForm', SchemaForm)
    vue.component('JsfItem', SchemaItem)
    // vue.component(SchemaRenderer.name, SchemaRenderer)

    Promise.resolve().then(() => {
      if (!vue.component('JsfForm')) {
        throw new Error('要使用JsonSchemaForm请至少使用一个主题')
      }
    })
  },
}

@Component
class ThemeBaseClass extends Vue {
  @Prop() value: any
  @Prop({ type: Function }) onChange: any
  @Prop({ type: String }) format: any
  @Prop({ type: Object }) schema: any
  @Prop() errors: any
  @Prop({ type: String }) title: any
  @Prop({ type: Boolean }) required: any
  @Prop({ type: Boolean }) requiredError: any
  @Prop({ type: String }) description: any
  @Prop({ type: Object }) vjsf: any

  defaultPlaceholder: string = '请输入'

  get placeholder() {
    return this.vjsf.placeholder || this.defaultPlaceholder
  }

  get additionProps() {
    return this.vjsf.additionProps || {}
  }
}

const ThemeBaseMixin = Vue.extend({
  props: {
    value: {},
    onChange: Function,
    format: String,
    schema: Object,
    errors: {},
    title: String,
    required: Boolean,
    requiredError: Boolean,
    description: String,
    vjsf: Object,
  },

  data() {
    return {
      defaultPlaceholder: '请输入',
    }
  },

  computed: {
    placeholder() {
      return (this.vjsf as any).placeholder || (this as any).defaultPlaceholder
    },
    additionProps() {
      return (this.vjsf as any).additionProps || {}
    },
  },
})

export { utils, SchemaForm as JsonSchemaForm, ThemeBaseClass, ThemeBaseMixin }
