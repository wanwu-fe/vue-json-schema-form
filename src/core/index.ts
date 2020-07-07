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
  @Prop({ type: Boolean }) isDependenciesKey: any

  defaultPlaceholder: string = '请输入'

  get placeholder() {
    return this.vjsf.placeholder || this.defaultPlaceholder
  }

  get additionProps() {
    return this.vjsf.additionProps || {}
  }

  get firstMatchedError() {
    return this.errors.find((e: any) => {
      const schemaPath = e.schemaPath
      if (this.isDependenciesKey && isDependenciesError(schemaPath)) {
        return false
      }
      return true
    })
  }
  get formItemProps() {
    return {
      required: this.required,
      schema: this.schema,
      firstMatchedError: (this as any).firstMatchedError,
      requiredError: this.requiredError,
      errors: this.errors,
      label: this.title,
      description: this.description,
    }
  }
}

function isDependenciesError(schemaPath: string) {
  return schemaPath.indexOf('/dependencies/') > 0
}

const ThemeBaseMixin = Vue.extend({
  props: {
    value: {},
    onChange: Function,
    format: String,
    schema: Object,
    errors: Array,
    title: String,
    required: Boolean,
    requiredError: Boolean,
    description: String,
    vjsf: Object,
    isDependenciesKey: Boolean,
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
    firstMatchedError() {
      return this.errors.find((e: any) => {
        const schemaPath = e.schemaPath
        if (this.isDependenciesKey && isDependenciesError(schemaPath)) {
          return false
        }
        return true
      })
    },
    formItemProps() {
      return {
        required: this.required,
        schema: this.schema,
        firstMatchedError: (this as any).firstMatchedError,
        requiredError: this.requiredError,
        errors: this.errors,
        label: this.title,
        description: this.description,
      }
    },
  },
})

export { utils, SchemaForm as JsonSchemaForm, ThemeBaseClass, ThemeBaseMixin }
