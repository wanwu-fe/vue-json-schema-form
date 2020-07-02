<template>
  <div>
    <div class="image-item-container">
      <el-input
        :disabled="itemField.attribute ? !itemField.attribute.canEdit : false"
        style="display: inline-block"
        :placeholder="
          itemField.describtion ? itemField.describtion.placeholder : '请选择'
        "
        v-model="_value"
      ></el-input>
      <el-upload
        name="image"
        class="upload-content"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        action="http://fe.wanwudezhi.work/api/uploader/uploadImage"
        :on-change="handleChange"
      >
        <el-button type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <el-image
      v-if="itemField.attribute ? itemField.attribute.hasPreview : false"
      style="width: 100px; height: 100px;margin-top: 20px;"
      :src="_value"
      :preview-src-list="[_value]"
    ></el-image>
  </div>
</template>

<script>
import { Upload, Input, Image, Button } from 'element-ui'
import { commonBasePropsMixin } from '../core/utils/common-renderer-props'

export default {
  mixins: [commonBasePropsMixin],
  components: {
    ElUpload: Upload,
    ElInput: Input,
    ElImage: Image,
    ElButton: Button,
  },
  // model: {
  //   prop: 'value',
  //   event: 'update-value',
  // },
  props: {
    value: [String, Number],
    itemField: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    editable() {
      if (this.itemField.editable === false) {
        return true
      } else {
        return false
      }
    },
    _value: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  methods: {
    handleChange(file) {
      if (file && file.response && file.response.result) {
        this._value = file.response.result
      }
    },
    beforeAvatarUpload(file) {
      let maxSize =
        this.itemField.attribute && this.itemField.attribute.maxSize
          ? Number(this.itemField.attribute.maxSize)
          : 50
      let type =
        this.itemField.attribute && this.itemField.attribute.type
          ? this.itemField.attribute.type.split('/')
          : []
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isGIF = file.type === 'image/gif'
      const isSizeLimit = file.size / 1024 / 1024 < maxSize
      let isTypeLimit = false
      if (type && type.length) {
        for (let i = 0; i < type.length; i++) {
          if (type[i] === 'jpg') {
            if (isJPG) {
              isTypeLimit = true
              break
            }
          }
          if (type[i] === 'png') {
            if (isPNG) {
              isTypeLimit = true
              break
            }
          }
          if (type[i] === 'gif') {
            if (isGIF) {
              isTypeLimit = true
              break
            }
          }
        }
        if (!isTypeLimit) {
          this.$message.error(`上传的文件只能是 ${type.join('/')} 格式!`)
        }
      } else {
        isTypeLimit = true
      }
      if (!isSizeLimit) {
        this.$message.error(`上传头像图片大小不能超过 ${maxSize}MB!`)
      }
      return isTypeLimit && isSizeLimit
    },
  },
}
</script>

<style>
.image-item-container {
  display: flex;
}
</style>
