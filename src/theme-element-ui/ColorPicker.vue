<template>
  <el-color-picker
    :value="value || ''"
    @input="handleChange"
    v-bind="additionProps"
  ></el-color-picker>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { ColorPicker as ElColorPicker } from 'element-ui'

import { ColorPickBase } from './form-component-props'

@Component({
  name: 'JsfColorPicker',
  components: {
    ElColorPicker,
  },
})
export default class JsfColorPicker extends ColorPickBase {
  handleChange(v: any) {
    this.$emit('input', v)
  }
}
</script>
