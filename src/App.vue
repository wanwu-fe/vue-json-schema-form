<template>
  <div id="app">
    <div class="list">
      <el-button
        type="text"
        v-for="(name, index) in demoNames"
        :key="name"
        @click="() => chose(index)"
        >{{ name }}</el-button
      >
    </div>
    <div class="demo">
      <div style="padding: 20px; width: 500px;">
        <JsonSchemaForm
          :ui-schema="uiSchema"
          :schema="demo.schema"
          v-model="value"
          ref="schemaForm"
          :form-props="formProps"
          @test="handleCustomEvent"
        />
      </div>
      <div style="text-align: center;">
        <el-button @click="validate">提 交</el-button>
        <el-button @click="clearErrors">清除错误</el-button>
        <el-button @click="reset">重置数据</el-button>
      </div>
    </div>
    <div class="code">
      <div class="code-schema">
        <p class="code-title">schema</p>
        <VueJsonPretty :data="demo.schema" />
      </div>
      <div class="code-data">
        <p class="code-title">value</p>
        <VueJsonPretty :data="value" />
      </div>
    </div>
  </div>
</template>

<script>
// import SchemaForm from './lib/SchemaFormNew'
import { Button } from 'element-ui'
import VueJsonPretty from 'vue-json-pretty'
import demos from './demos'
import { imagePlugin } from './plugins'

export default {
  name: 'App',
  components: {
    ElButton: Button,
    VueJsonPretty,
  },
  data() {
    return {
      demos,
      value: {},
      demo: demos[0],
      uiSchema: undefined,
    }
  },
  computed: {
    demoNames() {
      return demos.map((d) => d.name)
    },
    valueString() {
      return JSON.stringify(this.value)
    },
    formProps() {
      return {
        labelPosition: 'right',
        labelWidth: '120px',
        inline: false,
      }
    },
  },
  methods: {
    chose(index) {
      const demo = this.demos[index]
      this.value = {
        selected: 1,
        name1: 'jokcy',
        objectArray: [
          {
            name: '123',
            age: 12,
          },
        ],
      }
      this.demo = demo
    },
    validate() {
      this.$refs.schemaForm.doValidate()
    },
    clearErrors() {
      this.$refs.schemaForm.clearErrors()
    },
    reset() {
      this.value = {}
    },
    handleCustomEvent(data) {
      console.log(data)
    },
  },
}
</script>

<style lang="stylus">
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>

<style scoped>
#app {
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 0 auto;
}
.list {
  width: 200px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
}
.demo {
  flex-shrink: 0;
  height: 100%;
  overflow: auto;
  margin-right: 80px;
  padding-bottom: 40px;
}
.code {
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  height: 100%;
  overflow: auto;
  background: #eee;
  padding: 20px;
  box-shadow: 0 -2px 3px #aaa;
}
.code > * {
  overflow-x: auto;
  flex: 1;
}
.code-title {
  font-size: 30px;
  margin: 20px;
  margin-bottom: 10px;
}
</style>
