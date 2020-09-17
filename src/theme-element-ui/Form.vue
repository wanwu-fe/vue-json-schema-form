<template>
  <el-form v-bind="$attrs">
    <slot />
  </el-form>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import { Form as ElForm } from 'element-ui'

  @Component({
    name: 'JsfForm',
    components: {
      ElForm,
    },
  })
  export default class JsfForm extends Vue {}
</script>
