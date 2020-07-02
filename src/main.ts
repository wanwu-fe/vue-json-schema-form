import Vue from 'vue'

import 'element-ui/lib/theme-chalk/index.css'

import CustomInput from './CustomInput.vue'
import schemaForm from './core'
import JsonSchemaFormThemeElementUI from './theme-element-ui'
import JsfImageUploader from './plugins/image-uploader'

import App from './App.vue'

Vue.config.productionTip = false

Vue.component('custom-input', CustomInput)
Vue.use(schemaForm)
Vue.use(JsonSchemaFormThemeElementUI)
Vue.use(JsfImageUploader)

// Vue.component('jsf-image-uploader', ImageUploader)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
