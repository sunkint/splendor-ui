# Avatar 头像

### 基础用法

<div class="docs-preview-part docs-preview-part-flex">
  <sk-avatar icon="person" size="large" />
  <sk-avatar icon="person" />
  <sk-avatar icon="person" size="small" />
</div>

```vue
<template>
  <div class="docs-preview-part docs-preview-part-flex">
    <sk-avatar icon="person" size="large" />
    <sk-avatar icon="person" />
    <sk-avatar icon="person" size="small" />
  </div>
</template>
```

### 方形

<div class="docs-preview-part docs-preview-part-flex">
  <sk-avatar icon="person" size="large" shape="square" />
  <sk-avatar icon="person" shape="square" />
  <sk-avatar icon="person" size="small" shape="square" />
</div>

```vue
<template>
  <div class="docs-preview-part docs-preview-part-flex">
    <sk-avatar icon="person" size="large" shape="square" />
    <sk-avatar icon="person" shape="square" />
    <sk-avatar icon="person" size="small" shape="square" />
  </div>
</template>
```

### 自定义大小

<div class="docs-preview-part docs-preview-part-flex">
  <sk-avatar icon="person" :size="16" />
  <sk-avatar icon="person" :size="32" />
  <sk-avatar icon="person" :size="48" />
  <sk-avatar icon="person" :size="64" />
</div>

```vue
<template>
  <div class="docs-preview-part docs-preview-part-flex">
    <sk-avatar icon="person" :size="20" />
    <sk-avatar icon="person" :size="32" />
    <sk-avatar icon="person" :size="48" />
    <sk-avatar icon="person" :size="64" />
  </div>
</template>
```

### 使用图片

<div class="docs-preview-part docs-preview-part-flex">
  <sk-avatar src="https://cdn.ybusad.com/assets/jpg.jpg" />
</div>

```vue
<template>
  <div class="docs-preview-part docs-preview-part-flex">
    <sk-avatar src="https://cdn.ybusad.com/assets/jpg.jpg" />
  </div>
</template>
```

### 带边框

<div class="docs-preview-part docs-preview-part-flex">
  <sk-avatar src="https://cdn.ybusad.com/assets/jpg.jpg" bordered />
  <sk-avatar src="https://cdn.ybusad.com/assets/jpg.jpg" shape="square" bordered />
</div>

```vue
<template>
  <div class="docs-preview-part docs-preview-part-flex">
    <sk-avatar src="https://cdn.ybusad.com/assets/jpg.jpg" bordered />
    <sk-avatar src="https://cdn.ybusad.com/assets/jpg.jpg" shape="square" bordered />
  </div>
</template>
```

### API

| 参数     | 说明       | 类型           | 可选值                                       | 默认值    |
| -------- | ---------- | -------------- | -------------------------------------------- | --------- |
| size     | 头像大小   | number、string | `small`、`default`、`large`、数字（最小 20） | `default` |
| shape    | 头像形状   | string         | `circle`、`square`                           | `circle`  |
| bordered | 是否有边框 | bool           |                                              | `false`   |
| src      | 图片路径   | string         |                                              | -         |
| icon     | 图标类型   | string         | 和 `src` 需要二选一赋值                      | -         |
| alt      | html alt   | string         |                                              | -         |
