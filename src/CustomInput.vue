<template>
  <div>
    <input type="text" :value="value" @input="handleChange" />
  </div>
</template>

<script>
export default {
  props: ['value'],
  inject: ['fireEvent'],
  methods: {
    handleChange(v) {
      this.$emit('input', v.target.value)
      this.fireEvent('test', 123)
    },
  },
}
</script>
