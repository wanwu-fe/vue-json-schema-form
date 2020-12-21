<template>
  <el-form-item
    v-bind="$attrs"
    :label="label"
    :error="errorMessage"
    :required="required"
  >
    <el-tooltip
      class="item"
      effect="dark"
      content="Top Left 提示文字"
      placement="top"
      v-if="description"
    >
      <slot />
    </el-tooltip>
    <slot v-else />
  </el-form-item>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import { FormItem as ElFormItem, Tooltip as ElTooltip } from 'element-ui'

  import { FormItemBase } from './form-component-props'

  @Component({
    name: 'JsfFormItem', // name是class名字
    components: {
      ElFormItem,
      ElTooltip,
    },
  })
  export default class JsfFormItem extends FormItemBase {
    get errorMessage() {
      if (this.requiredError) return '必须填写'
      return this.firstMatchedError && this.firstMatchedError.message
    }
  }
</script>
