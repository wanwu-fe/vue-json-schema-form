<template>
  <el-form-item
    v-bind="$attrs"
    :label="label"
    :error="errorMessage"
    :required="required"
  >
    <slot />
  </el-form-item>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { FormItem as ElFormItem } from 'element-ui'

import { FormItemBase } from './form-component-props'

@Component({
  name: 'JsfFormItem', // name是class名字
  components: {
    ElFormItem,
  },
})
export default class JsfFormItem extends FormItemBase {
  get errorMessage() {
    if (this.requiredError) return '必须填写'
    return this.firstMatchedError && this.firstMatchedError.message
  }
}
</script>
