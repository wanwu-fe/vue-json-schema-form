# demo

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

# 解释

通过`dependencies`声明依赖关系，`dependencies`的`key`是依赖选项，比如在这里`selected`是依赖项，在`selected`有值的情况下才会展示和执行他包含的内容。

`selected`的值是一个`oneOf`则对应我们对于`selected`不同的结果会现实其中某个结果，比如在这里如果：

- `selected`是`1`，则我们必须填写`name1`
- `selected`是`2`，则我们必须填写`name2`
- `selected`是`3`，则我们必须填写`name3`

注意这里我们在每一项中都声明了一个`selected`，他的类型是`const`也就是固定值，以此我们来强制区分不同的结果，符合`selected`为`1`的结果必定不会符合其他的选项，就完全符合`oneOf`的逻辑。
