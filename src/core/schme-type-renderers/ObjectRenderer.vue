<template>
  <div>
    <!-- <h3 class="object-title" v-if="schemaTitle">
      <span>{{ title }}</span>
      <jsf-button @click="toggleShow" size="small">
        {{ show ? '收起' : '打开' }}
      </jsf-button>
    </h3>-->
    <div v-show="show">
      <div v-if="requiredErrorMessages && requiredErrorMessages.length > 0">
        <jsf-alert
          type="error"
          :title="m"
          v-for="m in requiredErrorMessages"
          :key="m"
          :closable="false"
        ></jsf-alert>
      </div>
      <template v-for="k in propertiesKeys">
        <jsf-item
          :key="k"
          :schema="properties[k]"
          :root-schema="rootSchema"
          :value="currentValue && currentValue[k]"
          :is-dependencies-key="typeof dependencies[k] === 'object'"
          :on-change="(v) => handleObjctChange(k, v)"
          :path="getPath(k)"
          :ui-schema="propertiesUiSchema[k]"
          :required="requires.indexOf(k) > -1"
          :required-error="requiredErrorKeys.indexOf(k) > -1"
        ></jsf-item>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
const cloneDeep = require('lodash.clonedeep')
// import { cloneDeep } from 'lodash'

import { CommonBaseClass } from '../mixins'
import { isEmptyObject, retrieveSchema, getVJSFConfig } from '../utils'

@Component
export default class JsfObjectRenderer extends CommonBaseClass {
  currentValue = {}
  show: boolean = true

  // @Watch('currentValue')
  // onCurrentValueChange(newV: any) {
  //   this.handleChange(newV)
  // }
  @Watch('value', { deep: true })
  onValueChange(newV: any) {
    this.currentValue = newV
  }
  @Watch('schema', { deep: true })
  onSchemaChange() {
    this.createDefaultObjectValue()
  }

  created() {
    if (typeof this.value === 'object' && this.value !== null)
      this.currentValue = this.value
    else this.createDefaultObjectValue()
  }

  get containerStyle() {
    const style: any = {
      // marginBottom: '20px',
    }

    if (this.schemaTitle) {
      style.border = '1px solid #eee'
      // style.paddingBottom = '15px'
    }

    return style
  }
  // get innerStyle() {
  //   const style: any = {
  //     // marginBottom: '20px',
  //   }

  //   if (this.schemaTitle) {
  //     style.padding = '0 10px'
  //     // style.paddingBottom = '15px'
  //   }

  //   return style
  // }
  get title() {
    return this.schemaTitle || this.path
  }

  get schemaTitle() {
    if (this.schema.title) {
      console.warn(
        '在schema直接使用title的方式即将被废弃，请尽快切换至使用`vjsf.title`'
      )
      return this.schema.title
    }
    return this.vjsf.title
  }
  get vjsf() {
    return getVJSFConfig(this.schema, this.uiSchema)
  }

  get dependencies() {
    return this.schema.dependencies || {}
  }
  get propertiesKeys() {
    if (!this.properties || isEmptyObject(this.properties)) return []
    const order = this.schema.propertiesOrder
    if (!order || !Array.isArray(order)) return Object.keys(this.properties)
    const keys = []
    const props = this.properties
    const usedKeys = new Set()
    for (let item of order) {
      if (props[item]) {
        keys.push(item)
        usedKeys.add(item)
      }
    }
    for (let k of Object.keys(props)) {
      if (!usedKeys.has(k)) keys.push(k)
    }
    return keys
  }
  get properties() {
    if (!this.retrievedSchema.properties) {
      console.warn('schema of type object contain no properties', this.schema)
    }
    return this.retrievedSchema.properties
  }
  get requires() {
    return this.retrievedSchema.required || []
  }
  get notSupportedKeywords() {
    const s = this.schema
    const keys = ['oneOf', 'anyOf', 'allOf', 'not', 'if', 'then', 'else']
    return keys.map((k) => s[k])
  }
  get objectErrors() {
    const errors = this.form.errors
    const objErrors = errors.filter((e: any) => e.dataPath === this.path)
    return objErrors
  }
  get objectErrorMessages() {
    return this.objectErrors.map((e: any) => e.message)
  }
  get requiredErrorKeys() {
    const set = new Set()
    this.objectErrors
      .filter((e: any) => e.keyword === 'required')
      .forEach((e: any) => {
        set.add(e.params.missingProperty)
      })
    return Array.from(set)
  }
  get requiredErrorMessages() {
    // const requires = this.objectErrors.filter((e) => e.keyword === 'required')
    // const props = this.properties
    // const messages = requires.map((r) => {
    //   const key = r.params.missingProperty
    //   const title = props[key].title
    //   return `${title || key} 是必填的`
    // })
    return []
  }
  get retrievedSchema() {
    return retrieveSchema(this.schema, this.rootSchema, this.currentValue)
  }
  get propertiesUiSchema() {
    const myUiSchema = this.uiSchema || {}
    return myUiSchema.properties || {}
  }

  toggleShow() {
    this.show = !this.show
  }
  createDefaultObjectValue() {
    if (!this.currentValue || typeof this.currentValue !== 'object') {
      /**
       * BUG1:
       * 在出发`input`事件以更新父组件data之前，没有先更新本地对应副本`currentValue`
       * 似乎vue的props更新不是同步的，本组件仍然继续渲染，导致子组件更新的数据无法添加到对象上
       */
      const v = cloneDeep(this.schema.default) || {}
      this.currentValue = v
      this.onChange(v)
    } else if (isEmptyObject(this.currentValue)) {
      if (this.schema.default && !isEmptyObject(this.schema.default)) {
        const v = cloneDeep(this.schema.default) || {}
        this.currentValue = v
        this.onChange(v)
      }
    }
  }
  handleObjctChange(k: string, v: any) {
    if (v === undefined) {
      this.$delete(this.currentValue, k)
    } else {
      if (this.currentValue === undefined) {
        this.currentValue = {
          [k]: v,
        }
      } else {
        this.$set(this.currentValue, k, v)
      }
    }
    this.onChange(this.currentValue)
  }
  // handleChange(v: any) {
  //   // this.$emit('input', v)
  //   this.onChange(v)
  // }
}
</script>
