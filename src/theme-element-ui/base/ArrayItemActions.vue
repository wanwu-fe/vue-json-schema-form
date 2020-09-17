<template>
  <div>
    <a
      class="vjsf-array-action-item"
      @click="handleClick('onDown', $event)"
      :disabled="length - 1 <= index"
    >
      <i class="el-icon-sort-down"></i>
    </a>
    <a
      class="vjsf-array-action-item"
      @click="handleClick('onUp', $event)"
      :disabled="index <= 0"
    >
      <i class="el-icon-sort-up"></i>
    </a>
    <a class="vjsf-array-action-item" @click="handleClick('onDelete', $event)">
      <i class="el-icon-delete"></i>
    </a>
    <a class="vjsf-array-action-item" @click="handleClick('onAdd', $event)">
      <i class="el-icon-plus"></i>
    </a>
    <!-- <el-button @click="handleClick('onAdd')" icon="el-icon-d-caret"></el-button> -->
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { Button as ElButton, ButtonGroup } from 'element-ui'

  @Component({
    name: 'JsfArrayItemActions',
    components: {
      ButtonGroup,
      ElButton,
    },
  })
  export default class JsfAlert extends Vue {
    @Prop({ required: true, type: Function }) onDelete: any
    @Prop({ required: true, type: Function }) onAdd: any
    @Prop({ required: true, type: Function }) onUp: any
    @Prop({ required: true, type: Function }) onDown: any
    // @Prop({ required: true, type: Function }) onToggle: any
    @Prop({ required: true }) item: any
    @Prop({ required: true, type: Number }) index: any
    @Prop({ required: true, type: Number }) length: any
    // @Prop({ required: true, type: Boolean }) show: any

    handleClick(type: string, e: any) {
      e.preventDefault()
      const self: any = this
      self[type](this.item, this.index)
    }
  }
</script>

<style lang="stylus" scoped>
  .vjsf-array-action-item {
    display: inline-block;
    color: inherit;
    cursor pointer

    & + & {
      margin-left: 10px;
    }
  }
</style>
