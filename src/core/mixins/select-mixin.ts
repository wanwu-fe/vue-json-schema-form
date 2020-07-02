import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class SelectMixin extends Vue {
  @Prop() schema: any

  get isSelect() {
    return this.schema.enum || this.schema.enumKeyValue
  }

  get options() {
    if (this.schema.enumKeyValue) return this.schema.enumKeyValue
    else if (this.schema.enum) {
      const options = this.schema.enum.map((e: string | number) => ({
        key: e,
        value: e,
      }))
      return options
    } else return []
  }

  getOptions() {
    if (this.schema.enumKeyValue) return this.schema.enumKeyValue
    else if (this.schema.enmu) {
      const options = this.schema.enum.map((e: string | number) => ({
        key: e,
        value: e,
      }))
      return options
    } else return []
  }
}
