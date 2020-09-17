<template>
  <jsf-selection
    v-bind="rendererProps"
    @input="handleChange"
    :options="options"
    v-if="isSelect"
  ></jsf-selection>
  <component
    :is="component"
    v-bind="rendererProps"
    @input="handleChange"
    v-else
  ></component>
</template>

<script lang="ts">
  import { Component, Watch } from 'vue-property-decorator'
  import { RendererBaseClass, errorMessage, selectMixin } from '../mixins'

  @Component({
    mixins: [selectMixin],
  })
  export default class JsfNumberRenderer extends RendererBaseClass {
    created() {
      if (typeof this.schema.default === 'number' && this.value === undefined) {
        // console.log('change number to default', this.schema.default)
        this.handleChange(this.schema.default)
      }
    }
    get min() {
      return this.schema.minimum || -Infinity
    }
    get max() {
      return this.schema.maximum || Infinity
    }
    get component() {
      return (
        this.form.formatMaps.number[
          this.schema.format || '__impossible_key__'
        ] || this.form.formatMaps.number.default
      )
    }

    handleChange(v: any) {
      this.onChange(typeof v === 'number' ? v : undefined)
    }
  }
</script>
