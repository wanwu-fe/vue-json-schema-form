对于每个最终的渲染组件，我们提供一套标准的 props，来帮助我们更好的开发渲染主题

### FormItem Props

```js
{
  // 是否是必填
  required: boolean,
  // schema 对象
  schema: schema,
  // 第一个匹配的错误，注意这个会跳过`dependencies`相关的错误
  firstMatchedError: this.firstMatchedError,
  // 是否必须填写错误
  requiredError: boolean,
  // 所有错误
  errors: this.errors,
  // label文本
  label: vjsf.title || path,
  // 描述
  description: vjsf.description,
}
```

### Renderer Props

```js
{
  // 值
  value: value,
  // 数据变化回调
  onChange: onChange,
  // 格式化
  format: this.schema.format,
  // schema 对象
  schema: this.schema,
  // 所有错误
  errors: this.errors,
  // 标题
  title: vjsf.title || path,
  // 是否必填
  required: this.required,
  // 是否必填错误
  requiredError: this.requiredError,
  // 描述
  description: vjsf.description,
  ...this.vjsf.additionProps,
}
```

### vjsf

在定义 schema 的时候，我们可以增加一个帮助我们更好得渲染表单的配置对象，比如：

```js
const schema = {
  type: 'string',
  vjsf: {
    title: '名字',
    description: '描述',
    component: 'your-input-component', // 通过该字段可以实现自定义组件
    additionProps: { ...props }, // 如果你有对于渲染组件自定义的props，可以通过该对象传递
    ...others,
  },
}
```
