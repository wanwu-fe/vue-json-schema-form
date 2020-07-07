import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

function isDependenciesError(schemaPath: string) {
  return schemaPath.indexOf('/dependencies/') > 0
}

@Component
export class CommonBase extends Vue {
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
  @Prop({ type: String }) path: any

  defaultPlaceholder: string = '请输入'

  get placeholder() {
    return this.vjsf.placeholder || this.defaultPlaceholder
  }

  get additionProps() {
    return this.vjsf.additionProps || {}
  }

  get firstMatchedError() {
    return this.errors.find((e: any) => {
      // TODO: dataPath是否所有的key都是正确的
      // TODO: 增加所有错误信息种类的test case
      const dataPath = e.dataPath
      if (this.isDependenciesKey && isDependenciesError(dataPath)) {
        return false
      }
      return dataPath === this.path
    })
  }

  get formItemProps() {
    return {
      required: this.required,
      schema: this.schema,
      firstMatchedError: this.firstMatchedError,
      requiredError: this.requiredError,
      errors: this.errors,
      label: this.title,
      description: this.description,
    }
  }
}

@Component
export class FormItemBase extends Vue {
  @Prop({ type: String }) format: any
  @Prop({ type: Object }) schema: any
  @Prop() firstMatchedError: any
  @Prop() errors: any
  @Prop({ type: String }) label: any
  @Prop({ type: Boolean }) required: any
  @Prop({ type: Boolean }) requiredError: any
  @Prop({ type: String }) description: any
}

@Component
export class SelectionBase extends CommonBase {
  defaultPlaceholder = '请选择'

  @Prop({ type: Number }) multipleLimit: any
  @Prop({ type: Boolean }) multiple: any
  @Prop({ type: Array }) options: any
}
export const TextInputBase = CommonBase
export const ColorPickBase = CommonBase
export class SwitchBase extends CommonBase {
  @Prop({ type: String, default: '#13ce66' }) activeColor: any
  @Prop({ type: String, default: '#ff4949' }) inactiveColor: any
}
export const NumberInputBase = CommonBase

@Component
export class DatePickerBase extends CommonBase {
  @Prop({ type: String }) type: any
}
export const DateTimePickerBase = DatePickerBase
export const TimePickerBase = CommonBase
// export const NumberInputBase = CommonBase

// export const SelectionBase = Vue.extend({
//   props: {
//     options: Array,
//     value: [String, Number, Array],
//     placeholder: {
//       type: String,
//       default: '请选择',
//     },
//     multipleLimit: {
//       type: Number,
//       default: 0,
//     },
//     multiple: {
//       type: Boolean,
//       default: false,
//     },
//   },
// })

// export const TextInputBase = Vue.extend({
//   props: {
//     value: {
//       required: false,
//     },
//     format: String,
//     placeholder: String,
//   },
// })

// export const ColorPickBase = Vue.extend({
//   props: {
//     value: {
//       required: false,
//     },
//   },
// })

// export const SwitchBase = Vue.extend({
//   props: {
//     value: {
//       type: Boolean,
//     },
//     activeColor: {
//       type: String,
//       default: '#13ce66',
//     },
//     inactiveColor: {
//       type: String,
//       default: '#ff4949',
//     },
//   },
// })

// export const NumberInputBase = Vue.extend({
//   props: {
//     value: {
//       required: false,
//     },
//     placeholder: String,
//     schema: Object,
//     // min: {
//     //   type: Number,
//     //   default: -Infinity,
//     // },
//     // max: {
//     //   type: Number,
//     //   default: Infinity,
//     // },
//     // precision: Number,
//   },
// })

// export const DatePickerBase = Vue.extend({
//   props: {
//     value: [String, Number, Array],
//     schema: {
//       type: Object,
//       required: true,
//     },
//     type: {
//       type: String,
//       default: '',
//     },
//   },
// })

// export const DateTimePickerBase = Vue.extend({
//   props: {
//     value: [String, Number],
//     schema: {
//       type: Object,
//       required: true,
//     },
//   },
// })
