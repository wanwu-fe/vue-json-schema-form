<template>
  <div class="vjsf-array-single-type-wrapper">
    <div
      v-for="(item, index) of list"
      :key="index"
      class="vjsf-array-single-type-item"
    >
      <div class="vjsf-array-item-header">
        <span>{{ title }}#{{ index }}</span>
        <div class="common-actions">
          <array-item-actions
            :item="item"
            :index="index"
            :length="list.length"
            :onDelete="onDelete"
            :onAdd="onAdd"
            :onUp="onUp"
            :onDown="onDown"
          />
        </div>
      </div>
      <div class="vjsf-array-item-content">
        <slot :data="item" :index="index" />
        <div style="height: 1px;"></div>
      </div>
    </div>
    <div class="vjsf-array-add-action">
      <a href="javascript:void(0);" @click="handleAddToLast">
        <i class="el-icon-plus"></i>
        <span> 添加{{ title }}</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { Button as ElButton, ButtonGroup } from 'element-ui'

  import ArrayItemActions from './base/ArrayItemActions.vue'

  @Component({
    name: 'JsfSingleTypeArrayWrapper',
    components: {
      ElButton,
      ArrayItemActions,
    },
  })
  export default class JsfAlert extends Vue {
    @Prop({ required: true, type: Array }) list: any
    @Prop({ required: true, type: String }) title: any

    @Prop({ required: true, type: Function }) onDelete: any
    @Prop({ required: true, type: Function }) onAdd: any
    @Prop({ required: true, type: Function }) onUp: any
    @Prop({ required: true, type: Function }) onDown: any

    handleAddToLast() {
      this.onAdd(null, this.list.length - 1)
    }
  }
</script>

<style lang="stylus">
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
  .vjsf-array-single-type-wrapper + .vjsf-array-single-type-wrapper {
    margin-top: 20px;
  }
  .vjsf-array-item-header{
    display: flex
    align-items: center
    justify-content space-between
    background-color #999
    padding 10px 25px
    color #eee

    & > span {
      font-size 14px
    }
  }
  .vjsf-array-item-content{
    padding: 20px;
    padding-bottom 0
    border 1px solid #999
    border-top-width: 0
  }

  .vjsf-array-item-content .vjsf-array-item-content {
    border-width 0
  }

  .vjsf-array-single-type-wrapper .vjsf-array-single-type-wrapper {
    border-width: 0
    .vjsf-array-item-header {
      background-color #E6E6E6
      color #333
      & > span {
        font-size 14px
        color #333
      }
    }
    .vjsf-array-item-content {
      background-color #F9F9F9
    }
  }

  .vjsf-array-single-type-item + .vjsf-array-single-type-item{
    margin-top 20px
    clear both
  }

  .vjsf-array-add-action{
    margin-top 20px
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
