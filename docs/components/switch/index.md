# Switch 开关

### 基础用法

`Switch` 是一个受控组件，必须配合 `v-model` 使用。

<SwitchBasic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-switch v-model="value" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: false,
    };
  },
};
</script>
```

### 禁用

<SwitchDisabled />

```vue
<template>
  <div class="docs-preview-part">
    <sk-switch v-model="value1" disabled />
    <sk-switch v-model="value2" disabled />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: false,
      value2: true,
    };
  },
};
</script>
```

### API

| 参数     | 说明               | 类型   | 可选值 | 默认值  |
| -------- | ------------------ | ------ | ------ | ------- |
| id       | html id            | string |        | -       |
| name     | html name          | string |        | -       |
| value    | 内部复选框对应的值 | string |        | `on`    |
| disabled | 是否禁用           | bool   |        | `false` |
