# Tag 标签

### 基础用法

<TagBasic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-tag size="small">small</sk-tag>
    <sk-tag size="medium">medium</sk-tag>
    <sk-tag size="large">large</sk-tag>
    <sk-tag round size="small">round</sk-tag>
    <sk-tag closable @close="close">closable</sk-tag>
  </div>
</template>

<script>
import { Notify } from 'splendor-ui';
export default {
  methods: {
    close() {
      Notify.info('你点了关闭');
    },
  },
};
</script>
```

### 各种样式

<div class="docs-preview-part">
  <sk-tag type="primary">primary</sk-tag>
  <sk-tag type="secondary">secondary</sk-tag>
  <sk-tag type="success">success</sk-tag>
  <sk-tag type="info">info</sk-tag>
  <sk-tag type="warning">warning</sk-tag>
  <sk-tag type="danger">danger</sk-tag>
  <sk-tag type="light">light</sk-tag>
  <sk-tag type="dark">dark</sk-tag>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-tag type="primary">primary</sk-tag>
    <sk-tag type="secondary">secondary</sk-tag>
    <sk-tag type="success">success</sk-tag>
    <sk-tag type="info">info</sk-tag>
    <sk-tag type="warning">warning</sk-tag>
    <sk-tag type="danger">danger</sk-tag>
    <sk-tag type="light">light</sk-tag>
    <sk-tag type="dark">dark</sk-tag>
  </div>
</template>
```

### 边框有颜色、无底色

<div class="docs-preview-part" style="background-color: #efefef; padding: 8px;">
  <sk-tag type="primary" ghost>primary</sk-tag>
  <sk-tag type="secondary" ghost>secondary</sk-tag>
  <sk-tag type="success" ghost>success</sk-tag>
  <sk-tag type="danger" ghost>danger</sk-tag>
  <sk-tag type="warning" ghost>warning</sk-tag>
  <sk-tag type="info" ghost>info</sk-tag>
  <sk-tag type="light" ghost>light</sk-tag>
  <sk-tag type="primary" round ghost closable>closable</sk-tag>
</div>

```vue
<template>
  <div class="docs-preview-part" style="background-color: #efefef; padding: 8px;">
    <sk-tag type="primary" ghost>primary</sk-tag>
    <sk-tag type="secondary" ghost>secondary</sk-tag>
    <sk-tag type="success" ghost>success</sk-tag>
    <sk-tag type="danger" ghost>danger</sk-tag>
    <sk-tag type="warning" ghost>warning</sk-tag>
    <sk-tag type="info" ghost>info</sk-tag>
    <sk-tag type="light" ghost>light</sk-tag>
    <sk-tag type="primary" round ghost closable>closable</sk-tag>
  </div>
</template>
```

### API

| 参数     | 说明               | 类型   | 可选值                                                                          | 默认值    |
| -------- | ------------------ | ------ | ------------------------------------------------------------------------------- | --------- |
| type     | 样式类型           | string | `primary`、`secondary`、`success`、`info`、`warning`、`danger`、`light`、`dark` | `primary` |
| size     | 尺寸               | string | `small`、`medium`、`large`                                                      | `small`   |
| round    | 是否圆角           | bool   |                                                                                 | `false`   |
| closable | 是否可关闭         | bool   |                                                                                 | `false`   |
| ghost    | 边框有颜色、无底色 | bool   |                                                                                 | `false`   |
| thin     | 是否采用非粗体字重 | bool   |                                                                                 | `false`   |
| color    | 快速设置文字颜色   | string |                                                                                 | -         |
| bgColor  | 快速设置背景颜色   | string |                                                                                 | -         |

### 事件

| 事件  | 说明                   | 携带参数 |
| ----- | ---------------------- | -------- |
| close | 点击关闭按钮触发的事件 | -        |
