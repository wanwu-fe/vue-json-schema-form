import Vue from 'vue'
import { JsonSchemFormPlugin } from '../core/types'
import ImageUploader from './ImageUploader.vue'

const URL_REG = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ // eslint-disable-line

const plugin: JsonSchemFormPlugin = {
  customFormats: [
    {
      name: 'image',
      definition: URL_REG,
      component: 'jsf-image-uploader',
    },
  ],
}

export { plugin }
export default {
  install(vue: typeof Vue) {
    vue.component('jsf-image-uploader', ImageUploader)
  },
}
