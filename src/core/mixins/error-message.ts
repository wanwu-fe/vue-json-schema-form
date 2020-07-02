import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

function isDependenciesError(schemaPath: string) {
  return schemaPath.indexOf('/dependencies/') > 0
}

@Component({
  inject: {
    form: 'formContext',
  },
})
export default class ErrorMessageMixin extends Vue {
  form: any
  @Prop({ type: Boolean }) isDependenciesKey: any
  @Prop() requiredError: any
  get errorMessage() {
    if (this.requiredError) return '必须填写'
    // const errors = this.form.errors.filter(
    //   (e: any) => e.dataPath === (this as any).path
    // )
    // return error ? error.message : ''
    // return this.errors[0] ? this.errors[0].message : ''
    return this.firstMatchedError ? this.firstMatchedError.message : ''
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

  get errors() {
    const errors = this.form.errors.filter(
      (e: any) => e.dataPath === (this as any).path
    )
    return errors
  }
}
