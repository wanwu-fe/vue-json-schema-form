<template>
  <el-alert type="error" :title="title" :closable="false"></el-alert>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { Alert as ElAlert } from 'element-ui'

  @Component({
    name: 'JsfAlert',
    components: {
      ElAlert,
    },
  })
  export default class JsfAlert extends Vue {
    @Prop() title: any
  }
</script>
