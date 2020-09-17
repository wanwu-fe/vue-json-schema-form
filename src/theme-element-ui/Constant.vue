<template>
  <form-item v-bind="formItemProps">
    <span>{{ value }}</span>
  </form-item>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator'
  import { Input as ElInput } from 'element-ui'

  import { CommonBase } from './form-component-props'
  import FormItem from './FormItem.vue'

  @Component({
    name: 'JsfConstant',
    components: {
      FormItem,
    },
  })
  export default class JsfTextInput extends CommonBase {}
</script>
