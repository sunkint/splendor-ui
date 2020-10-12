# Progress 进度条

### 基础用法

<div class="docs-preview-part">
  <p><sk-progress :percent="20" /></p>
  <p><sk-progress :percent="40" type="success" /></p>
  <p><sk-progress :percent="60" type="info" /></p>
  <p><sk-progress :percent="80" type="warning" /></p>
  <p><sk-progress :percent="100" type="danger" /></p>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <p><sk-progress :percent="20" /></p>
    <p><sk-progress :percent="40" type="success" /></p>
    <p><sk-progress :percent="60" type="info" /></p>
    <p><sk-progress :percent="80" type="warning" /></p>
    <p><sk-progress :percent="100" type="danger" /></p>
  </div>
</template>
```

### API

| 参数    | 说明       | 类型   | 可选值                                            | 默认值    |
| ------- | ---------- | ------ | ------------------------------------------------- | --------- |
| percent | 百分比数值 | number | 0-100                                             | 0         |
| type    | 主题色     | string | `primary`、`success`、`info`、`warning`、`danger` | `primary` |
