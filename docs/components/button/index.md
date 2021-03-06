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

### 加载中

<div class="docs-preview-part">
  <sk-button type="default" loading>Default</sk-button>
  <sk-button type="primary" loading>Primary</sk-button>
  <sk-button type="success" loading>Success</sk-button>
  <sk-button type="info" loading>Info</sk-button>
  <sk-button type="warning" loading>Warning</sk-button>
  <sk-button type="danger" loading>Danger</sk-button>
  <sk-button type="danger" loading round>Round</sk-button>
  <br>
  <br>
  <sk-button size="small" loading>small</sk-button>
  <sk-button size="normal" loading>normal</sk-button>
  <sk-button size="large" loading>large</sk-button>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-button type="default" loading>Default</sk-button>
    <sk-button type="primary" loading>Primary</sk-button>
    <sk-button type="success" loading>Success</sk-button>
    <sk-button type="info" loading>Info</sk-button>
    <sk-button type="warning" loading>Warning</sk-button>
    <sk-button type="danger" loading>Danger</sk-button>
    <sk-button type="danger" loading round>Round</sk-button>
    <br />
    <br />
    <sk-button size="small" loading>small</sk-button>
    <sk-button size="normal" loading>normal</sk-button>
    <sk-button size="large" loading>large</sk-button>
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

### 块级

<div class="docs-preview-part">
  <p><sk-button type="default" block>块级按钮</sk-button></p>
  <p><sk-button type="primary" block>块级按钮</sk-button></p>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <p><sk-button type="default" block>块级按钮</sk-button></p>
    <p><sk-button type="primary" block>块级按钮</sk-button></p>
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
| block    | 是否占满父容器宽度（块级）                        | bool   |                                                              | `false`   |
| disabled | 是否禁用                                          | bool   |                                                              | `false`   |
| loading  | 是否禁用并显示加载中动画                          | bool   |                                                              | `false`   |
| href     | 可选，如果设置的话会用 a 标签而不是 button        | string |                                                              | -         |
| target   | 可选，和 href 一起使用，就是 a 标签的 target 属性 | string |                                                              | `_blank`  |
| rel      | 可选，和 href 一起使用，就是 a 标签的 rel 属性    | string |                                                              | -         |
| htmlType | button html type                                  | string | `button`、`submit`、`reset`                                  | -         |

### 事件

| 事件  | 说明       | 携带参数          |
| ----- | ---------- | ----------------- |
| click | 点击时触发 | `(e: MouseEvent)` |
