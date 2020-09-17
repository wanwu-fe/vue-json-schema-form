<template>
  <form-item v-bind="formItemProps">
    <el-select
      :value="value"
      @input="handleChange"
      :placeholder="placeholder"
      :multiple-limit="multipleLimit"
      :multiple="multiple"
      v-bind="additionProps"
      :style="{ width: '100%' }"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.key"
        :value="item.value"
      ></el-option>
    </el-select>
  </form-item>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator'
  import { Select as ElSelect, Option as ElOption } from 'element-ui'

  import { SelectionBase } from './form-component-props'
  import FormItem from './FormItem.vue'

  @Component({
    name: 'JsfSelection',
    components: {
      ElSelect,
      ElOption,
      FormItem,
    },
  })
  export default class JsfSelection extends SelectionBase {
    handleChange(v: any) {
      this.$emit('input', v)
    }
  }
</script>
