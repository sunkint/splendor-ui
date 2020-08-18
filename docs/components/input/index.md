# Input 输入框

### 基础用法

<div class="docs-preview-part">
  <sk-input placeholder="最多输入15字" maxlength="15" />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-input placeholder="最多输入15字" maxlength="15" />
  </div>
</template>
```

### 带图标

<div class="docs-preview-part">
  <sk-input icon="search" placeholder="搜索" />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-input icon="search" placeholder="搜索" />
  </div>
</template>
```

### 错误样式

<div class="docs-preview-part">
  <sk-input placeholder="有问题..." inline hasError />
  <sk-input icon="search" placeholder="带图标" inline hasError />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-input placeholder="有问题..." inline hasError />
    <sk-input icon="search" placeholder="带图标" inline hasError />
  </div>
</template>
```

### 禁用

<div class="docs-preview-part">
  <sk-input placeholder="不可编辑" disabled />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-input placeholder="不可编辑" disabled />
  </div>
</template>
```

### 只读

<div class="docs-preview-part">
  <sk-input modelValue="只读" readonly />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-input modelValue="只读" readonly />
  </div>
</template>
```

### API

| 参数        | 说明           | 类型   | 可选值                                          | 默认值  |
| ----------- | -------------- | ------ | ----------------------------------------------- | ------- |
| type        | html type      | string | `text`、`number`、...                           | `text`  |
| icon        | 前置图标       | string | 详见 [Icon](../icon/index#内置图标) 组件的 type | -       |
| inline      | 是否行内展示   | bool   |                                                 | `false` |
| maxlength   | 最多输入字符数 | number |                                                 | -       |
| placeholder | 占位提示文字   | string |                                                 | -       |
| hasError    | 是否错误样式   | bool   |                                                 | `false` |
| name        | html name      | string |                                                 | -       |
| autofocus   | html autofocus | bool   |                                                 | -       |
| disabled    | 是否禁用       | bool   |                                                 | -       |
| readonly    | 是否只读       | bool   |                                                 | -       |
