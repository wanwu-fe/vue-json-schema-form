<template>
  <jsf-form-item v-if="withFormItem" v-bind="formItemProps">
    <component :is="comp" v-bind="rendererProps" @input="handleChange" />
  </jsf-form-item>
  <component :is="comp" v-bind="rendererProps" @input="handleChange" v-else />
  <!-- <component :is="comp" v-else /> -->
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

  get withFormItem() {
    return this.config.withFormItem
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
