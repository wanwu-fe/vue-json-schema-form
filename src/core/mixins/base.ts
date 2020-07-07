import Vue from 'vue'
import { Component, Inject, Prop } from 'vue-property-decorator'
import { getVJSFConfig, escapeJsonPointer } from '../utils'

// @Component()
// const CommonBase = Vue.extend({
//   props: {
//     schema: {
//       type: Object,
//       required: true,
//     },
//     value: {
//       required: false,
//     },
//     rootSchema: {
//       type: Object,
//       required: true,
//     },
//     path: {
//       type: String,
//       required: true,
//     },
//     onChange: {
//       type: Function,
//       required: true,
//     },
//     required: Boolean,
//     requiredError: Boolean,
//   },

//   inject: {
//     form: 'formContext',
//   },
// })

// export default CommonBase

@Component
class CommonBaseClass extends Vue {
  @Prop({ type: Object, required: true }) schema: any
  @Prop({ required: false }) value: any
  @Prop({ type: Object, required: true }) rootSchema: any
  @Prop({ type: String, required: true }) path: any
  @Prop({ type: Function, required: true }) onChange: any
  @Prop({ type: Boolean }) required: any
  @Prop({ type: Boolean }) requiredError: any
  @Prop({ type: Boolean }) isDependenciesKey: any
  @Prop({ type: Object }) uiSchema: any

  @Inject('formContext') form: any

  handleChange(v: any) {}

  getPath(name: string) {
    return this.path + '/' + escapeJsonPointer(name)
  }
}

function isDependenciesError(schemaPath: string) {
  return schemaPath.indexOf('/dependencies/') > 0
}

@Component
class RendererBaseClass extends CommonBaseClass {
  get format() {
    return this.schema.format || 'text'
  }

  // get errorMessage() {
  //   if (this.requiredError) return '必须填写'
  //   // const errors = this.form.errors.filter(
  //   //   (e: any) => e.dataPath === (this as any).path
  //   // )
  //   // return error ? error.message : ''
  //   // return this.errors[0] ? this.errors[0].message : ''
  //   return this.firstMatchedError ? this.firstMatchedError.message : ''
  // }

  // get firstMatchedError() {
  //   return this.errors.find((e: any) => {
  //     const schemaPath = e.schemaPath
  //     if (this.isDependenciesKey && isDependenciesError(schemaPath)) {
  //       return false
  //     }
  //     return true
  //   })
  // }

  get errors() {
    const errors = this.form.errors.filter(
      (e: any) => e.dataPath === (this as any).path
    )
    return errors
  }

  get rendererProps() {
    return {
      value: this.value,
      onChange: this.handleChange,
      format: this.format,
      schema: this.schema,
      errors: this.errors,
      title: this.title,
      required: this.required,
      requiredError: this.requiredError,
      description: this.description,
      vjsf: this.vjsf,
      path: this.path,
      isDependenciesKey: this.isDependenciesKey,
      ...this.vjsf.additionProps,
    }
  }

  // get formItemProps() {
  //   return {
  //     required: this.required,
  //     schema: this.schema,
  //     firstMatchedError: this.firstMatchedError,
  //     requiredError: this.requiredError,
  //     errors: this.errors,
  //     label: this.title,
  //     description: this.description,
  //   }
  // }

  get vjsf() {
    return getVJSFConfig(this.schema, this.uiSchema)
  }

  get title() {
    return this.schemaTitle || this.path
  }

  get schemaTitle() {
    if (this.schema.title) {
      console.warn(
        'the usage of `title` in schema will be deprecated soon use `vjsf.title` instead'
      )
      return this.schema.title
    }
    return this.vjsf.title
  }

  get description() {
    return this.vjsf.descrription
  }
}

export { CommonBaseClass, RendererBaseClass }
