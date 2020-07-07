<template>
  <component :is="comp" v-bind="rendererProps" @input="handleChange" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Inject } from 'vue-property-decorator'

import FormItem from '../FormItem.vue'

import { RendererBaseClass } from '../mixins'

// const Base = Vue.extend({
//   mixins: [commonProps],
// })

@Component({
  components: { FormItem },
})
export default class CustomRenderer extends RendererBaseClass {
  get comp() {
    return this.config.component
  }

  created() {
    if (this.schema.default && this.value === undefined) {
      this.handleChange(this.uiSchema.default)
    }
  }

  get config() {
    const c = this.schema[this.form.customRendererKey]
    if (c) {
      if (typeof c === 'string') {
        return {
          component: c,
          withFormItem: true,
        }
      }
      return c
    }
    const vjsf = this.vjsf
    return {
      ...vjsf,
      withFormItem: vjsf.withFormItem === false ? false : true,
    }
  }

  handleChange(v: any) {
    // TODO: 让空值变为undefined
    this.onChange(v)
  }
}
</script>
