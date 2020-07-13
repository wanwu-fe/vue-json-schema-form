<template>
  <!-- <component :is="customComponent" v-if="customComponent" v-bind="$props" @input="handleInput" /> -->
  <component
    :is="componentType"
    v-bind="{ ...$props, schema: transformedSchema }"
  ></component>
</template>

<script lang="ts">
import { Component, Inject, Watch } from 'vue-property-decorator'
import StringRenderer from './schme-type-renderers/StringRenderer.vue'
import NumberRenderer from './schme-type-renderers/NumberRenderer.vue'
import BooleanRenderer from './schme-type-renderers/BooleanRenderer.vue'
import ObjectRenderer from './schme-type-renderers/ObjectRenderer.vue'
import ArrayRenderer from './schme-type-renderers/ArrayRenderer.vue'
import CustomRenderer from './schme-type-renderers/CustomRenderer.vue'
import ConstantRenderer from './schme-type-renderers/ConstantRenderer.vue'

import { CommonBaseClass } from './mixins'
import { getVJSFConfig, getSchemaType } from './utils'

@Component({
  name: 'JsfItem',
  components: {
    StringRenderer,
    NumberRenderer,
    BooleanRenderer,
    ObjectRenderer,
    ArrayRenderer,
    CustomRenderer,
    ConstantRenderer,
    IntegerRenderer: NumberRenderer,
  },
})
export default class JsfItem extends CommonBaseClass {
  // @Inject('formContext') form: any
  @Inject('transformSchema') readonly transformSchema: any

  get isConst() {
    return this.schema.const
  }
  get schemaType() {
    if (!this.schema.type) {
      console.warn('there is no type of schema, we will guess it', this.schema)
    }
    if (Array.isArray(this.schema.type)) {
      console.error(this.schema)
      throw new Error('multi type of schema is not supported')
    }
    return getSchemaType(this.schema)
  }
  get componentType() {
    if (this.isConst) {
      return 'constant-renderer'
    }
    return this.isCustomComponent
      ? 'custom-renderer'
      : `${this.schemaType}-renderer`
  }

  get transformedSchema() {
    return this.transformSchema(this.schema)
  }

  // 是否没有声明类型
  // 如果有则报错
  get isNoType() {
    return !this.schema.type
  }
  get isCustomComponent() {
    const vjsf = getVJSFConfig(this.schema, this.uiSchema)
    return !!(vjsf.component || this.schema[this.form.customRendererKey])
  }
}
</script>
