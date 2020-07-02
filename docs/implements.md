# Keywords Implemented

- [x] type
- [x] maximum / minimum and exclusiveMaximum / exclusiveMinimum (only use in validation)
- [x] maxLength/minLength
- [x] pattern
- [x] format
- [x] formatMaximum / formatMinimum and formatExclusiveMaximum / formatExclusiveMinimum (only use in validation)
- [x] uniqueItems (only use in validation)
- [x] items
- [x] required
- [x] properties
- [x] enum
- [x] dependencies

# Keywords in progress

- [ ] multipleOf
- [ ] maxItems/minItems
- [ ] additionalItems (交互很难确定，比如`additionalItems: ture`理论上可以添加任何类型)
- [ ] additionalProperties
- [ ] const(`"const": { "$data": "1/foo" }`)
- [ ] if/then/else (if we find any usefull case)
- [ ] oneOf/anyOf/allOf

# Keywords just in validation

- [ ] not

# Keywords will not be supported

- [ ] patternProperties (无法想象出应用场景)
- [ ] patternRequired (同上)
- [ ] propertyNames (既然我们不实现 patternProperties，这个自然没什么意义)

# Keywords need test case

- [ ] contains
- [ ] maxProperties/minProperties
