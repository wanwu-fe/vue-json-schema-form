<template>
  <form-item v-bind="formItemProps">
    <el-input
      :value="value || ''"
      @input="handleChange"
      :type="type"
      :placeholder="placeholder"
      v-bind="additionProps"
    ></el-input>
  </form-item>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { Input as ElInput } from 'element-ui'

import { TextInputBase } from './form-component-props'
import FormItem from './FormItem.vue'

@Component({
  name: 'JsfTextInput',
  components: {
    ElInput,
    FormItem,
  },
})
export default class JsfTextInput extends TextInputBase {
  handleChange(v: any) {
    this.$emit('input', v)
  }

  get type() {
    const t = this.format
    switch (t) {
      case 'email': {
        return t
      }
      default: {
        const props = this.vjsf.additionProps

        if (props && props.type) return props.type
        return 'text'
      }
    }
  }
}
</script>
