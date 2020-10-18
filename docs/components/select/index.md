# Select 下拉选择

### 基础用法

<div class="docs-preview-part">
  <client-only>
    <sk-select
      :data="[
        { value: 1, text: 'Option 1' },
        { value: 2, text: 'Option 2' },
        { value: 3, text: 'Option 3' },
        { value: 4, text: 'Option 4 (Disabled)', disabled: true },
      ]"
    />
  </client-only>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-select
      :data="[
        { value: 1, text: 'Option 1' },
        { value: 2, text: 'Option 2' },
        { value: 3, text: 'Option 3' },
        { value: 4, text: 'Option 4 (Disabled)', disabled: true },
      ]"
    />
  </div>
</template>
```

### 可清空

<div class="docs-preview-part">
  <client-only>
    <sk-select
      clearable
      :data="[
        { value: 1, text: 'Option 1' },
        { value: 2, text: 'Option 2' },
        { value: 3, text: 'Option 3' },
      ]"
    />
  </client-only>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-select
      clearable
      :data="[
        { value: 1, text: 'Option 1' },
        { value: 2, text: 'Option 2' },
        { value: 3, text: 'Option 3' },
      ]"
    />
  </div>
</template>
```

### 空选项

<div class="docs-preview-part">
  <client-only>
    <sk-select :data="[]" />
  </client-only>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-select :data="[]" />
  </div>
</template>
```

### 禁用

<div class="docs-preview-part">
  <client-only>
    <sk-select disabled />
  </client-only>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-select disabled />
  </div>
</template>
```

### 支持筛选

<div class="docs-preview-part">
  <client-only>
    <sk-select
      filterable
      :data="[
        { value: 1, text: 'Option 1' },
        { value: 2, text: 'Option 2' },
        { value: 3, text: 'Option 3' },
      ]"
    />
  </client-only>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-select
      filterable
      :data="[
        { value: 1, text: 'Option 1' },
        { value: 2, text: 'Option 2' },
        { value: 3, text: 'Option 3' },
      ]"
    />
  </div>
</template>
```

### API

| 参数                 | 说明                       | 类型                  | 可选值 | 默认值                                           |
| -------------------- | -------------------------- | --------------------- | ------ | ------------------------------------------------ |
| data                 | 选项数据                   | `SelectDataItem[]`    |        | `[]`                                             |
| modelValue / v-model | 当前选择项的`value`        | any                   |        | -                                                |
| disabled             | 是否禁用                   | bool                  |        | `false`                                          |
| filterable           | 是否启用过滤功能           | bool                  |        | `false`                                          |
| filter               | 自定义过滤函数             | `SelectFilter`        |        | `(item, keyword) => item.text.includes(keyword)` |
| clearable            | 是否支持清空               | bool                  |        | `false`                                          |
| placeholder          | 选择器的占位文案           | string                |        | `请选择`                                         |
| filterPlaceholder    | 筛选框的占位文案           | string                |        | -                                                |
| emptyText            | 没有选项时的占位文案       | string                |        | `没有找到匹配项`                                 |
| name                 | html name                  | string                |        | -                                                |
| triggerClass         | 触发元素包裹层的自定义类名 | string、array、object |        | -                                                |
| class                | 弹层的自定义额外类名       | string、array、object |        | -                                                |
| style                | 弹层的自定义额外样式       | string、object        |        | -                                                |

> #### SelectDataItem <sk-tag ghost>type</sk-tag>
>
> ```ts
> export type SelectDataItem = {
>   value: any; // 唯一值，不能重复
>   text: string;
>   disabled?: boolean;
> } & Record<string, any>;
> ```

> #### SelectFilter <sk-tag ghost>type</sk-tag>
>
> ```ts
> export type SelectFilter = (item: SelectDataItem, keyword: string) => boolean;
> ```

### 事件

| 事件   | 说明                 | 携带参数        |
| ------ | -------------------- | --------------- |
| change | 选择项变化触发的事件 | `value: string` |
| open   | 弹层打开触发的事件   | -               |
| close  | 弹层关闭触发的事件   | -               |
