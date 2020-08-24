# Radio 单选框

### 基础用法

<RadioBasic />

```vue
<template>
  <div class="docs-preview-part">
    <span>喜欢的水果：</span>
    <sk-radio value="apple" v-model="selected">苹果</sk-radio>
    <sk-radio value="banana" v-model="selected">香蕉</sk-radio>
    <sk-radio value="orange" v-model="selected">橘子</sk-radio>
    <sk-radio value="watermelon" v-model="selected">西瓜</sk-radio>
    <sk-radio value="!" v-model="selected" disabled>不能选</sk-radio>
    <br />
    <span>已选：{{ selected }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: '',
    };
  },
};
</script>
```

### 使用 name

<div class="docs-preview-part">
  <span>喜欢的水果：</span>
  <sk-radio value="apple" name="fruit">苹果</sk-radio>
  <sk-radio value="banana" name="fruit">香蕉</sk-radio>
  <sk-radio value="orange" name="fruit">橘子</sk-radio>
  <sk-radio value="watermelon" name="fruit">西瓜</sk-radio>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <span>喜欢的水果：</span>
    <sk-radio value="apple" name="fruit">苹果</sk-radio>
    <sk-radio value="banana" name="fruit">香蕉</sk-radio>
    <sk-radio value="orange" name="fruit">橘子</sk-radio>
    <sk-radio value="watermelon" name="fruit">西瓜</sk-radio>
  </div>
</template>
```

### API

| 参数     | 说明                 | 类型   | 可选值 | 默认值  |
| -------- | -------------------- | ------ | ------ | ------- |
| id       | html id              | string |        | -       |
| name     | html name            | string |        | -       |
| value    | 单选框对应的值，必填 | string |        | -       |
| disabled | 是否禁用             | bool   |        | `false` |
