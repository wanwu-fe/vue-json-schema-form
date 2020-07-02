<template>
  <jsf-form-item
    :label="schema.title || path"
    :error="errorMessage"
    :required="required"
    :schema="schema"
  >
    <slot />
  </jsf-form-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Inject } from 'vue-property-decorator'

const Base = Vue.extend({
  props: {
    requiredError: Boolean,
    schema: Object,
    path: String,
    required: Boolean,
  },
})

@Component
export default class FormItem extends Base {
  @Inject('formContext') readonly form: any

  get errorMessage() {
    if (this.requiredError) return '必须填写'
    const error = this.form.errors.find(
      (e: any) => e.dataPath === (this as any).path
    )
    return error ? error.message : ''
  }
}
</script>
