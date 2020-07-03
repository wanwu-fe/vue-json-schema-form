<template>
  <form-item v-bind="formItemProps">
    <el-switch
      :value="value"
      @input="handleChange"
      :active-color="activeColor"
      :inactive-color="inactiveColor"
      v-bind="additionProps"
    ></el-switch>
  </form-item>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Switch as ElSwitch } from 'element-ui'

import { SwitchBase } from './form-component-props'
import FormItem from './FormItem.vue'

@Component({
  name: 'JsfSwitch',
  components: {
    ElSwitch,
    FormItem,
  },
})
export default class JsfSwitch extends SwitchBase {
  handleChange(v: any) {
    this.$emit('input', v)
  }
}
</script>
