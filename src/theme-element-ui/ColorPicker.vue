<template>
  <form-item v-bind="formItemProps">
    <el-color-picker
      :value="value || ''"
      @input="handleChange"
      v-bind="additionProps"
    ></el-color-picker>
  </form-item>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { ColorPicker as ElColorPicker } from 'element-ui'

import { ColorPickBase } from './form-component-props'
import FormItem from './FormItem.vue'

@Component({
  name: 'JsfColorPicker',
  components: {
    ElColorPicker,
    FormItem,
  },
})
export default class JsfColorPicker extends ColorPickBase {
  handleChange(v: any) {
    this.$emit('input', v)
  }
}
</script>
