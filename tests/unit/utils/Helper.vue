<template>
  <json-schema-form :value="value" @input="handleChange" :schema="schema" :ui-schema="uiSchema" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

@Component
export default class Wrapper extends Vue {
  value = ''
  schema = {}
  uiSchema = undefined

  handleChange(v: any) {
    this.value = v
  }
}
</script>
