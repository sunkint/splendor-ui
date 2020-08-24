# Button 按钮

### 基础用法

<div class="docs-preview-part">
  <sk-button href="https://www.ybusad.com/">Link</sk-button>
  <sk-button type="primary">Primary</sk-button>
  <sk-button type="success">Success</sk-button>
  <sk-button type="info">Info</sk-button>
  <sk-button type="warning">Warning</sk-button>
  <sk-button type="danger">Danger</sk-button>
  <sk-button type="danger" round>Round</sk-button>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-button href="https://www.ybusad.com/">Link</sk-button>
    <sk-button type="primary">Primary</sk-button>
    <sk-button type="success">Success</sk-button>
    <sk-button type="info">Info</sk-button>
    <sk-button type="warning">Warning</sk-button>
    <sk-button type="danger">Danger</sk-button>
    <sk-button type="danger" round>Round</sk-button>
  </div>
</template>
```

### 尺寸

<div class="docs-preview-part">
  <sk-button size="small">small</sk-button>
  <sk-button size="normal">normal</sk-button>
  <sk-button size="large">large</sk-button>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-button size="small">small</sk-button>
    <sk-button size="normal">normal</sk-button>
    <sk-button size="large">large</sk-button>
  </div>
</template>
```

### 带图标

<div class="docs-preview-part">
  <sk-button icon="search" size="small">搜索</sk-button>
  <sk-button icon="search" size="normal">搜索</sk-button>
  <sk-button icon="search" size="large">搜索</sk-button>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-button icon="search" size="small">搜索</sk-button>
    <sk-button icon="search" size="normal">搜索</sk-button>
    <sk-button icon="search" size="large">搜索</sk-button>
  </div>
</template>
```

### 禁用

<div class="docs-preview-part">
  <sk-button type="default" disabled>disabled</sk-button>
  <sk-button type="primary" disabled>disabled</sk-button>
  <sk-button type="success" disabled>disabled</sk-button>
  <sk-button type="info" disabled>disabled</sk-button>
  <sk-button type="warning" disabled>disabled</sk-button>
  <sk-button type="danger" disabled>disabled</sk-button>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-button type="default" disabled>disabled</sk-button>
    <sk-button type="primary" disabled>disabled</sk-button>
    <sk-button type="success" disabled>disabled</sk-button>
    <sk-button type="info" disabled>disabled</sk-button>
    <sk-button type="warning" disabled>disabled</sk-button>
    <sk-button type="danger" disabled>disabled</sk-button>
  </div>
</template>
```

### API

| 参数     | 说明                                              | 类型   | 可选值                                                       | 默认值    |
| -------- | ------------------------------------------------- | ------ | ------------------------------------------------------------ | --------- |
| type     | 按钮样式类型                                      | string | `default`、`primary`、`success`、`info`、`warning`、`danger` | `default` |
| size     | 按钮大小                                          | string | `normal`、`small`、`large`                                   | `normal`  |
| icon     | 前置图标                                          | string | 详见 [Icon](../icon/index#内置图标) 组件的 type              | -         |
| round    | 是否显示为圆角                                    | bool   |                                                              | `false`   |
| disabled | 是否禁用                                          | bool   |                                                              | `false`   |
| href     | 可选，如果设置的话会用 a 标签而不是 button        | string |                                                              | -         |
| target   | 可选，和 href 一起使用，就是 a 标签的 target 属性 | string |                                                              | `_blank`  |
