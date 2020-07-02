import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
class CommonBasePorps extends Vue {
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
}

const commonBasePropsMixin = {
  props: {
    value: {},
    onChange: {
      type: Function,
      required: true,
    },
    format: String,
    schema: Object,
    errors: {},
    title: String,
    required: Boolean,
    requiredError: Boolean,
    description: String,
    vjsf: Object,
  },
}

export { CommonBasePorps, commonBasePropsMixin }
