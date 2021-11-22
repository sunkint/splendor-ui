# Checkbox 复选框

### 基础用法

单个复选框的选中与否，可以使用 `v-model` 获取

<CheckboxBasic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-checkbox v-model="value">我同意</sk-checkbox>
    <br />
    <span>value: {{ value }}</span>
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

### 复选框组

使用 `CheckboxGroup`，创建复选框组

<CheckboxGroup />

```vue
<template>
  <div class="docs-preview-part">
    <sk-checkbox-group v-model="value">
      <sk-checkbox value="apple">苹果</sk-checkbox>
      <sk-checkbox value="banana">香蕉</sk-checkbox>
      <sk-checkbox value="pineapple">菠萝</sk-checkbox>
      <sk-checkbox value="lychee">荔枝</sk-checkbox>
      <sk-checkbox value="peach" disabled>桃子</sk-checkbox>
    </sk-checkbox-group>
    <span>已选：{{ value }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ['apple'],
    };
  },
};
</script>
```

### API

#### Checkbox

| 参数     | 说明                 | 类型                 | 可选值 | 默认值  |
| -------- | -------------------- | -------------------- | ------ | ------- |
| id       | html id              | string               |        | -       |
| name     | html name            | string               |        | -       |
| value    | 复选框对应的值       | string               |        | `on`    |
| onChange | 复选框变化时回调函数 | `(e: Event) => void` |        | -       |
| disabled | 是否禁用             | bool                 |        | `false` |

#### CheckboxGroup

| 参数     | 说明                 | 类型                                   | 可选值 | 默认值 |
| -------- | -------------------- | -------------------------------------- | ------ | ------ |
| onChange | 复选框变化时回调函数 | `(checkedValueList: string[]) => void` |        | -      |
