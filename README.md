# @zdwh/vue-json-schema-form

<p align="center">
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/v/@zdwh/vue-json-schema-form.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/l/@zdwh/vue-json-schema-form.svg?sanitize=true" alt="License"></a>
</p>

[demo 演示](https://wanwu-fe.github.io/vue-json-schema-form/)

### USAGE

```
npm i @zdwh/vue-json-schema-form -S
```

然后

```js
import JsonSchemaForm from '@zdwh/vue-json-schema-form'
import JsonSchemaFormThemeElement from '@zdwh/vue-json-schema-form/dist/theme-element/index.common.js'

vue.use(JsonSchemaForm)
vue.use(JsonSchemaFormThemeElement)

<JsonSchemaForm :schema="schema" v-model="value" :formProps="...props pass to form" :plugins="plugins" locale="" />
```

theme 是必须的，真正的表单组件都是由 theme 提供的，将 theme 拆分出来的目的很明显，未来对于不同的使用场景，可以无缝迁移，同时可以在移动端使用。

# props

### schema

json schema 对象

### v-model

绑定结果值

### formProps

传递给表单组件的`props`，这里面的值根据表单的最终实现来定，比如`theme-element`的`formProps`可以是任意 element-ui 中的 form 组件的`props`

### plugins

插件

### uiSchema

具体参考下面的`vjsf`

### locale

默认`zh`中文，支持值参考[`ajv-i18n`](https://github.com/epoberezkin/ajv-i18n)

# vjsf

`vjsf`是我们用来在 json schema 基础上帮助我们更好得渲染表单的工具参数，我们可以通过在每个 schema 节点上带上来传递：

```js
const schema = {
  type: 'string',
  vjsf: {
    component: 'your-custom-component',
    additionProps: {
      ...props, // 对于表单组件你想传递的其他参数
    },
    title: '名称',
    description: '描述',
    withFormItem: true, // 对于自定义组件，是否使用formItem，默认为true
  },
}
```

如果你不想把这些属性放在`schema`上面，那么你可以通过给`JsonSchemaForm`传递`uiSchema`参数来进行定制，只要保持`uiSchema`的结构和`schema`一致就行
比如：

```js
const schema = {
  type: 'object',
  properties: {
    name: {
      type: string,
    },
    pets: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
}

const uiSchema = {
  title: '我和我的宠物',
  properties: {
    name: {
      title: '我的名字',
      component: 'input',
    },
    pets: {
      title: '我的宠物们',
      items: {
        title: '名字',
      },
    },
  },
}
```

### custom event

如果你有自定义组件，并且你的自定义组件想要跟`JsonSchemaForm`的 owner 进行沟通，你的组件可以`inject: ['fireEvent']`，然后通过`this.fireEvent(name, data)`来向外触发一个事件，在 owner 处，我们可以进行监听：

```html
<json-schema-form @youEventName="yourHandler" />
```

# 插件

插件能够帮助我们非常方便地扩展功能，目前支持情况如下：

- [x] customFormat
- [ ] customKeywords

### 如何创建一个自定义 format 插件

接口定义如下：

```js
interface AjvFormat {
  name: string
  definition: FormatValidator | FormatDefinition
}

interface CustomFormat extends AjvFormat {
  component: String // jsf-text-input || your-custom-component
}

interface JsonSchemFormPlugin {
  customFormats: CustomFormat[]
}
```

比如我们增加一个图片上传的插件，这个组件返回的结果最终的图片链接，我们需要校验的自然也是这个链接，所以我们的 format 定义如下：

```js
const format = {
  name: 'image',
  definition: /reg-to-valid-image-url/,
}
```

对于这个 format 我们需要使用特定的组件来进行渲染，毕竟他要实现上传图片并返回图片路径的功能，这并不是标准的 json schema 功能，并且上传的操作是业务相关操作直接写死在 vjsf 库内肯定不合适。

这时候我们可以创建一个`ImageUploader`组件，并且注册到 vue 上，这时候我们的插件就成型了：

```js
const plugin = {
  customFormats: [
    {
      name: 'image',
      definition: /reg-to-valid-image-url/,
      component: 'image-uploader',
    },
  ],
}
```

在我们定义如下 schema 之后：

```js
{
  type: 'string',
  format: 'image'
}
```

我们的表单就是如下：

```html
<image-uploader v-model="value" />
```

### 快速替换 format 使用的组件

默认的 format 组件映射关系如下：

```js
export const stringFormatComponentMap: StringMap = {
  default: 'jsf-text-input',
  color: 'jsf-color-picker',
  date: 'jsf-date-picker',
  'date-time': 'jsf-date-time-picker',
  time: 'jsf-time-picker',
}

export const numberFormatComponentMap: StringMap = {
  default: 'jsf-number-input',
  date: 'jsf-date-picker',
  'date-time': 'jsf-date-time-picker',
  time: 'jsf-time-picker',
}
```

我们可以通过`formatMaps`来定义 format 默认使用的组件，比如：

```js
const formats = {
  string: {
    date: 'jsf-my-date-picker'
  }
}

<JsonSchemaForm :formatMaps="formats" />
```

之后字符串类型的日期`format`就会使用`jsf-my-date-picker`作为表单组件

**重要：该方式建议只对 json schema 默认支持的 format 使用，对于你自定义的 format，你仍然需要使用插件的方式，因为你需要制定该 format 的校验方式。**

# 校验

你可以通过给`JsonSchemaForm`组件指定一个`ref`，然后通过`ref.doValidate()`来进行校验，会返回`{ errors, valid }`，其中`errors`是错误信息的对象。组件会把错误信息显示到每个表单项，你可以根据自己的需求以另外的方式提醒错误。

TODO:

- [ ] 输入时对每个表单项独立进行校验

# 主题

主题就是一组规范命名的组件，这一组组件都注册到全局 vue 上之后，vjsf 渲染表单就会使用这些组件，组件列表：

```js
{
  JsfColorPicker: '颜色选择器' // 非必须，会回滚到text-input
  JsfDatePicker: '日期选择'
  JsfDateTimePicker: '日期时间选择'
  JsfDateTimeRangePicker: '日期时间区间选择'
  JsfForm: '表单组件'
  JsfNumberInput: '数字输入'
  JsfSelection: '下拉选择'
  JsfSwitch: 'boolean开关'
  JsfTextInput: '字符串输入'
  JsfTimePicker: '时间选择'
  JsfSingleTypeArrayWrapper: '单类型数组区块控制器'
  JsfAlert: '提示框'
}
```

你要实现一个主题则需要实现这些组件并逐一注册到`vue`

### 帮助方法

```js
import { ThemeBaseClass, ThemeBaseMixin } from '@zdwh/vue-json-schema-form'
```

如果你用`class`开发可以继承前者，或者你可以使用后面的 mixin

# 表单依赖

### demo

```js
export default {
  name: '依赖关系',
  schema: {
    type: 'object',
    properties: {
      selected: {
        type: 'number',
        title: '是否选中',
        enum: [1, 2, 3],
      },
    },
    dependencies: {
      selected: {
        oneOf: [
          {
            properties: {
              selected: {
                // const: 1,

                const: 1,
              },
              name1: {
                type: 'string',
                title: '名字1',
              },
            },
            required: ['name1'],
          },
          {
            properties: {
              selected: {
                const: 2,
              },
              name2: {
                type: 'string',
                title: '名字2',
              },
            },
            required: ['name2'],
          },
          {
            properties: {
              selected: {
                const: 3,
              },
              name3: {
                type: 'string',
                title: '名字3',
              },
            },
            required: ['name3'],
          },
        ],
      },
    },
  },
}
```

### 解释

通过`dependencies`声明依赖关系，`dependencies`的`key`是依赖选项，比如在这里`selected`是依赖项，在`selected`有值的情况下才会展示和执行他包含的内容。

`selected`的值是一个`oneOf`则对应我们对于`selected`不同的结果会现实其中某个结果，比如在这里如果：

- `selected`是`1`，则我们必须填写`name1`
- `selected`是`2`，则我们必须填写`name2`
- `selected`是`3`，则我们必须填写`name3`

注意这里我们在每一项中都声明了一个`selected`，他的类型是`const`也就是固定值，以此我们来强制区分不同的结果，符合`selected`为`1`的结果必定不会符合其他的选项，就完全符合`oneOf`的逻辑。
