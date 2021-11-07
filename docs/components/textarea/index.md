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

| 参数        | 说明                                            | 类型           | 可选值                                   | 默认值  |
| ----------- | ----------------------------------------------- | -------------- | ---------------------------------------- | ------- |
| maxlength   | 最多输入字符数                                  | number         |                                          | -       |
| placeholder | 占位提示文字                                    | string         |                                          | -       |
| hasError    | 是否错误样式                                    | bool           |                                          | `false` |
| block       | 是否占满宽度                                    | bool           |                                          | `false` |
| name        | html name                                       | string         |                                          | -       |
| height      | 文本框高度，仅在 `autoHeight` 为 `false` 时生效 | string、number |                                          | -       |
| autoHeight  | 是否自动根据内容调节高度                        | bool           |                                          | `false` |
| autofocus   | html autofocus                                  | bool           |                                          | -       |
| disabled    | 是否禁用                                        | bool           |                                          | -       |
| resize      | 控制大小调整性                                  | string         | `both`、`horizontal`、`vertical`、`none` | -       |
| readonly    | 是否只读                                        | bool           |                                          | -       |

### 事件

| 事件           | 说明                           | 携带参数           |
| -------------- | ------------------------------ | ------------------ |
| pressCtrlEnter | 点击 ctrl + enter 时触发       | `e: KeyboardEvent` |
| keypress       | 原生按键按下并松开事件         | `e: KeyboardEvent` |
| keydown        | 原生按键按下事件               | `e: KeyboardEvent` |
| keyup          | 原生按键松开事件               | `e: KeyboardEvent` |
| input          | 原生输入事件                   | `e: Event`         |
| change         | 原生输入后失去焦点事件         | `e: Event`         |
| focus          | 原生获得焦点事件               | `e: FocusEvent`    |
| blur           | 原生失去焦点事件               | `e: FocusEvent`    |
| validate       | 表单验证事件，在失去焦点时触发 | `value: string`    |
