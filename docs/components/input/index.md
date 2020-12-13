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

### 带前后缀

<div class="docs-preview-part">
  <sk-input inline>
    <template #prepend>$</template>
  </sk-input>
  <sk-input inline>
    <template #append>.00</template>
  </sk-input>
  <sk-input icon="search" inline>
    <template #prepend>love</template>
    <template #append>.com</template>
  </sk-input>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-input inline>
      <template #prepend>$</template>
    </sk-input>
    <sk-input inline>
      <template #append>.00</template>
    </sk-input>
    <sk-input icon="search" inline>
      <template #prepend>love</template>
      <template #append>.com</template>
    </sk-input>
  </div>
</template>
```

### 大号一点

<div class="docs-preview-part">
  <sk-input size="large" placeholder="最多输入15字" maxlength="15" inline />
  <sk-input size="large" icon="search" placeholder="搜索" inline />
  <sk-input size="large" inline>
    <template #prepend>$</template>
  </sk-input>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-input size="large" placeholder="最多输入15字" maxlength="15" inline />
    <sk-input size="large" icon="search" placeholder="搜索" inline />
    <sk-input size="large" inline>
      <template #prepend>$</template>
    </sk-input>
  </div>
</template>
```

### 占满宽度

<div class="docs-preview-part">
  <sk-input placeholder="请输入文章标题" size="large" block />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-input placeholder="请输入文章标题" size="large" block />
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

| 参数        | 说明           | 类型   | 可选值                                          | 默认值   |
| ----------- | -------------- | ------ | ----------------------------------------------- | -------- |
| type        | html type      | string | `text`、`number`、...                           | `text`   |
| size        | 尺寸           | string | `normal`、`large`                               | `normal` |
| icon        | 前置图标       | string | 详见 [Icon](../icon/index#内置图标) 组件的 type | -        |
| inline      | 是否行内展示   | bool   |                                                 | `false`  |
| block       | 是否占满宽度   | bool   |                                                 | `false`  |
| maxlength   | 最多输入字符数 | number |                                                 | -        |
| placeholder | 占位提示文字   | string |                                                 | -        |
| hasError    | 是否错误样式   | bool   |                                                 | `false`  |
| name        | html name      | string |                                                 | -        |
| autofocus   | html autofocus | bool   |                                                 | -        |
| disabled    | 是否禁用       | bool   |                                                 | -        |
| readonly    | 是否只读       | bool   |                                                 | -        |

### 事件

| 事件       | 说明                   | 携带参数           |
| ---------- | ---------------------- | ------------------ |
| pressEnter | 点击 enter 时触发      | `e: KeyboardEvent` |
| keypress   | 原生按键按下并松开事件 | `e: KeyboardEvent` |
| keydown    | 原生按键按下事件       | `e: KeyboardEvent` |
| keyup      | 原生按键松开事件       | `e: KeyboardEvent` |
| input      | 原生输入事件           | `e: Event`         |
| change     | 原生输入后失去焦点事件 | `e: Event`         |
| focus      | 原生获得焦点事件       | `e: FocusEvent`    |
| blur       | 原生失去焦点事件       | `e: FocusEvent`    |
