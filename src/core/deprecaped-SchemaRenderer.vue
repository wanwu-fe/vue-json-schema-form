<template>
  <SchemaItem
    :schema="schema"
    :root-schema="rootSchema"
    :value="value"
    @input="handleChange"
    :path="path || ''"
  ></SchemaItem>
</template>

<script>
  import SchemaItem from './SchemaItem'

  import { commonProps } from './mixins'

  // import { getDefaultValueOfSchema } from './utils'

  export default {
    name: 'JsfSchemaRenderer',
    mixins: [commonProps],
    components: {
      SchemaItem,
    },
    props: {
      path: {
        required: false,
      },
    },
    methods: {
      handleChange(v) {
        this.$emit('input', v)
      },
    },
  }
</script>
