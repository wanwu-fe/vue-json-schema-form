import Vue from 'vue'

import ImageUploader, { plugin } from './image-uploader'

export default {
  install(vue: typeof Vue) {
    vue.use(ImageUploader)
  },
}

export { plugin as imagePlugin }
