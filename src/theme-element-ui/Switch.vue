<template>
  <el-switch
    :value="value"
    @input="handleChange"
    :active-color="activeColor"
    :inactive-color="inactiveColor"
    v-bind="additionProps"
  ></el-switch>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Switch as ElSwitch } from 'element-ui'

import { SwitchBase } from './form-component-props'

@Component({
  name: 'JsfSwitch',
  components: {
    ElSwitch,
  },
})
export default class JsfSwitch extends SwitchBase {
  handleChange(v: any) {
    this.$emit('input', v)
  }
}
</script>
