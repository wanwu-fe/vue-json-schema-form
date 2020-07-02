// import { getDefaultValueOfSchema } from '../utils'

export default function(createWithSchema = false, defaultValue) {
  const mixin = {
    data() {
      return {
        currentValue: createWithSchema ? null : defaultValue,
      }
    },
    watch: {
      currentValue(newV) {
        if (newV !== this.value) this.$emit('input', newV)
      },
    },
  }

  // mixin.created = function() {
  //   // get default value from schema
  //   this.currentValue =
  //     this.value || getDefaultValueOfSchema(this.schema) || defaultValue
  // }

  // if (createWithSchema) {
  //   mixin.created = function() {
  //     // get default value from schema
  //     this.currentValue = getDefaultValueOfSchema(this.schema)
  //   }
  // } else {
  //   mixin.created = function() {
  //     // get default value from schema
  //     this.currentValue = this.value
  //   }
  // }
  return mixin
}
