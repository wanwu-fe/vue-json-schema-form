<template>
  <form-item v-bind="formItemProps">
    <el-input-number
      :placeholder="placeholder"
      :value="value"
      @change="handleChange"
      :min="min"
      :max="max"
      :precision="precision"
      v-bind="additionProps"
      :controls="!!showControls"
    ></el-input-number>
  </form-item>
</template>

<script lang="ts">
  // import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import { InputNumber as ElInputNumber } from 'element-ui'

  import { NumberInputBase } from './form-component-props'
  import FormItem from './FormItem.vue'

  @Component({
    name: 'JsfNumberInput',
    components: {
      ElInputNumber,
      FormItem,
    },
  })
  export default class JsfNumberInput extends NumberInputBase {
    handleChange(v: any, ov: any) {
      // number input should use change event
      // if use input event, it will fire undefined at beginning
      this.$emit('input', v)
    }
    get min() {
      return -Infinity
    }
    get max() {
      return Infinity
    }

    get showControls() {
      return (
        this.vjsf && this.vjsf.additionProps && this.vjsf.additionProps === true
      )
    }

    get precision() {
      // if (this.vjsf && this.vjsf.precision) {
      //   return this.vjsf.precision
      // }
      if (this.schema.type === 'integer') {
        return 0
      }
      return undefined
    }
  }
</script>

<style lang="stylus">
  .vjsf{
    .el-input-number {
      width: 100%;

      .el-input__inner {
        text-align: left;
      }
    }
  }
</style>
