import Vue from 'vue'

import Helper from './Helper.vue' // @ts-ignore
import Custom from './Custom.vue'

import JsonSchemaForm from '../../../src/core'
import ThemeElement from '../../../src/theme-element-ui'

export function initialize() {
  Vue.use(JsonSchemaForm)
  Vue.use(ThemeElement)
  // Vue.use(Custom)
  Vue.component(Custom.name, Custom)
}

export { Helper, Custom }
