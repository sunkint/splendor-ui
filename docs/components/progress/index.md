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

### 带条纹

<div class="docs-preview-part">
  <p><sk-progress :percent="20" striped /></p>
  <p><sk-progress :percent="40" type="success" striped /></p>
  <p><sk-progress :percent="60" type="info" striped /></p>
  <p><sk-progress :percent="80" type="warning" striped /></p>
  <p><sk-progress :percent="100" type="danger" striped /></p>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <p><sk-progress :percent="20" striped /></p>
    <p><sk-progress :percent="40" type="success" striped /></p>
    <p><sk-progress :percent="60" type="info" striped /></p>
    <p><sk-progress :percent="80" type="warning" striped /></p>
    <p><sk-progress :percent="100" type="danger" striped /></p>
  </div>
</template>
```

### 动态条纹

<div class="docs-preview-part">
  <p><sk-progress :percent="20" striped animated /></p>
  <p><sk-progress :percent="40" type="success" striped animated /></p>
  <p><sk-progress :percent="60" type="info" striped animated /></p>
  <p><sk-progress :percent="80" type="warning" striped animated /></p>
  <p><sk-progress :percent="100" type="danger" striped animated /></p>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <p><sk-progress :percent="20" striped animated /></p>
    <p><sk-progress :percent="40" type="success" striped animated /></p>
    <p><sk-progress :percent="60" type="info" striped animated /></p>
    <p><sk-progress :percent="80" type="warning" striped animated /></p>
    <p><sk-progress :percent="100" type="danger" striped animated /></p>
  </div>
</template>
```

### 自定义高度

<div class="docs-preview-part">
  <p><sk-progress :percent="20" :height="6" striped animated /></p>
  <p><sk-progress :percent="40" :height="12" type="success" striped animated /></p>
  <p><sk-progress :percent="60" :height="18" type="info" striped animated /></p>
  <p><sk-progress :percent="80" :height="24" type="warning" striped animated /></p>
  <p><sk-progress :percent="100" :height="30" type="danger" striped animated /></p>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <p><sk-progress :percent="20" :height="6" striped animated /></p>
    <p><sk-progress :percent="40" :height="12" type="success" striped animated /></p>
    <p><sk-progress :percent="60" :height="18" type="info" striped animated /></p>
    <p><sk-progress :percent="80" :height="24" type="warning" striped animated /></p>
    <p><sk-progress :percent="100" :height="30" type="danger" striped animated /></p>
  </div>
</template>
```

### 带标签

<div class="docs-preview-part">
  <p><sk-progress :percent="0" showLabel /></p>
  <p><sk-progress :percent="20" showLabel /></p>
  <p><sk-progress :percent="340" showLabel /></p>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <p><sk-progress :percent="0" showLabel /></p>
    <p><sk-progress :percent="20" showLabel /></p>
    <p><sk-progress :percent="340" showLabel /></p>
  </div>
</template>
```

### 自定义标签

<div class="docs-preview-part">
  <p><sk-progress :percent="0" showLabel labelText="0/100" /></p>
  <p><sk-progress :percent="20" showLabel labelText="20/100" /></p>
  <p><sk-progress :percent="340" showLabel labelText="340/100" /></p>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <p><sk-progress :percent="0" showLabel labelText="0/100" /></p>
    <p><sk-progress :percent="20" showLabel labelText="20/100" /></p>
    <p><sk-progress :percent="340" showLabel labelText="340/100" /></p>
  </div>
</template>
```

### API

| 参数      | 说明                                                             | 类型   | 可选值                                            | 默认值    |
| --------- | ---------------------------------------------------------------- | ------ | ------------------------------------------------- | --------- |
| percent   | 百分比数值，允许使用小数，实际宽度会四舍五入，超过 100 按 100 算 | number |                                                   | `0`       |
| height    | 进度条高度（px）                                                 | number |                                                   | `16`      |
| type      | 主题色                                                           | string | `primary`、`success`、`info`、`warning`、`danger` | `primary` |
| showLabel | 是否展示进度文字                                                 | bool   |                                                   | `false`   |
| labelText | 自定义进度条文字                                                 | string |                                                   | -         |
| striped   | 是否显示条纹效果                                                 | bool   |                                                   | `false`   |
| animated  | 条纹效果是否带动效                                               | bool   |                                                   | `false`   |
