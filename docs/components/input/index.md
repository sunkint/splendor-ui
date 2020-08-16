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

### 错误样式

<div class="docs-preview-part">
  <sk-input placeholder="有问题..." hasError />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-input placeholder="有问题..." hasError />
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

| 参数        | 说明           | 类型   | 可选值                | 默认值  |
| ----------- | -------------- | ------ | --------------------- | ------- |
| type        | html type      | string | `text`、`number`、... | `text`  |
| maxlength   | 最多输入字符数 | number |                       | -       |
| placeholder | 占位提示文字   | string |                       | -       |
| hasError    | 是否错误样式   | bool   |                       | `false` |
| name        | html name      | string |                       | -       |
| autofocus   | html autofocus | bool   |                       | -       |
| disabled    | 是否禁用       | bool   |                       | -       |
| readonly    | 是否只读       | bool   |                       | -       |
