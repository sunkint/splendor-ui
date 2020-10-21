# Textarea 多行输入框

### 基础用法

<div class="docs-preview-part">
  <sk-textarea placeholder="最多输入30字" maxlength="30" />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-textarea placeholder="最多输入30字" maxlength="30" />
  </div>
</template>
```

### 自适应高度

<div class="docs-preview-part">
  <sk-textarea autoHeight />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-textarea autoHeight />
  </div>
</template>
```

### 占满宽度

<div class="docs-preview-part">
  <sk-textarea block />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-textarea block />
  </div>
</template>
```

### 错误样式

<div class="docs-preview-part">
  <sk-textarea placeholder="有问题..." hasError />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-textarea placeholder="有问题..." hasError />
  </div>
</template>
```

### 禁用

<div class="docs-preview-part">
  <sk-textarea placeholder="不可编辑" disabled />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-textarea placeholder="不可编辑" disabled />
  </div>
</template>
```

### 只读

<div class="docs-preview-part">
  <sk-textarea modelValue="只读" readonly />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-textarea modelValue="只读" readonly />
  </div>
</template>
```

### API

| 参数        | 说明                     | 类型   | 可选值 | 默认值  |
| ----------- | ------------------------ | ------ | ------ | ------- |
| maxlength   | 最多输入字符数           | number |        | -       |
| placeholder | 占位提示文字             | string |        | -       |
| hasError    | 是否错误样式             | bool   |        | `false` |
| block       | 是否占满宽度             | bool   |        | `false` |
| name        | html name                | string |        | -       |
| autoHeight  | 是否自动根据内容调节高度 | bool   |        | `false` |
| autofocus   | html autofocus           | bool   |        | -       |
| disabled    | 是否禁用                 | bool   |        | -       |
| readonly    | 是否只读                 | bool   |        | -       |
