<template>
  <div class="vjsf-array-add-action">
    <a href="void:0" @click="handleClick">
      <i class="el-icon-plus"></i>
      <span> 添加{{ name }}</span>
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Button as ElButton, ButtonGroup } from 'element-ui'

@Component({
  name: 'JsfArrayItemAddAction',
  components: {
    ButtonGroup,
    ElButton,
  },
})
export default class JsfAlert extends Vue {
  @Prop({ required: true, type: Function }) onClick: any
  @Prop({ required: true, type: String }) name: any

  handleClick(e: MouseEvent) {
    e.preventDefault()
    this.onClick()
  }
}
</script>

<style lang="stylus" scoped>
.vjsf-array-add-action{
  & > a {
    display block
    height 40px
    text-align center
    line-height 40px
    background-color #E6E6E6
    color: #333
    font-size 14px
    text-decoration none
  }
}
</style>
