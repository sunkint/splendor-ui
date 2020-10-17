# Dropdown 下拉菜单

### 基础用法

<div class="docs-preview-part">
  <sk-dropdown
    text="点击打开菜单"
    :data="[
      { key: 'food', text: '食品' },
      { key: 'clothes', text: '服装' },
      { key: 'furniture', text: '家居', disabled: true },
    ]"
  />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-dropdown
      text="点击打开菜单"
      :data="[
        { key: 'food', text: '食品' },
        { key: 'clothes', text: '服装' },
        { key: 'furniture', text: '家居', disabled: true },
      ]"
    />
  </div>
</template>
```

### 多种风格和尺寸

<DropdownTheme />

```vue
<template>
  <div class="docs-preview-part">
    <sk-dropdown type="default" text="点击打开菜单" :data="data" />
    <sk-dropdown type="primary" text="点击打开菜单" :data="data" />
    <sk-dropdown type="success" text="点击打开菜单" :data="data" />
    <sk-dropdown type="info" text="点击打开菜单" :data="data" />
    <sk-dropdown type="warning" text="点击打开菜单" :data="data" />
    <sk-dropdown type="danger" text="点击打开菜单" :data="data" />
  </div>
  <div class="docs-preview-part">
    <sk-dropdown size="small" text="点击打开菜单" :data="data" />
    <sk-dropdown size="normal" text="点击打开菜单" :data="data" />
    <sk-dropdown size="large" text="点击打开菜单" :data="data" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { key: 'food', text: '食品' },
        { key: 'clothes', text: '服装' },
      ],
    };
  },
};
</script>
```

### 可选项

<div class="docs-preview-part">
  <sk-dropdown
    type="primary"
    text="点击打开菜单"
    :data="[
      { key: 'food', text: '食品' },
      { key: 'clothes', text: '服装' },
      { key: 'book', text: '图书' },
    ]"
    :selectedKeys="['clothes', 'book']"
  />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-dropdown
      type="primary"
      text="点击打开菜单"
      :data="[
        { key: 'food', text: '食品' },
        { key: 'clothes', text: '服装' },
        { key: 'book', text: '图书' },
      ]"
      :selectedKeys="['clothes', 'book']"
    />
  </div>
</template>
```

### 禁用

<div class="docs-preview-part">
  <sk-dropdown
    type="primary"
    text="已禁用"
    disabled
    :data="[
      { key: 'food', text: '食品' },
      { key: 'clothes', text: '服装' },
    ]"
  />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-dropdown
      type="primary"
      text="已禁用"
      disabled
      :data="[
        { key: 'food', text: '食品' },
        { key: 'clothes', text: '服装' },
      ]"
    />
  </div>
</template>
```

### API

| 参数         | 说明                       | 类型                  | 可选值                                                       | 默认值        |
| ------------ | -------------------------- | --------------------- | ------------------------------------------------------------ | ------------- |
| text         | 按钮文本                   | string                |                                                              | -             |
| icon         | 前置图标                   | string                | 详见 [Icon](../icon/index#内置图标) 组件的 type              | -             |
| data         | 下拉项数据，必填           | `DropdownData`        |                                                              | -             |
| selectedKeys | 选择项，data 中 key 的数组 | `any[]`               |                                                              | `[]`          |
| triggerClass | 触发元素包裹层的自定义类名 | string、array、object |                                                              | -             |
| class        | 弹层的自定义额外类名       | string、array、object |                                                              | -             |
| style        | 弹层的自定义额外样式       | string、object        |                                                              | -             |
| position     | 菜单展开方位               | `LayerPosition`       |                                                              | `bottom-left` |
| type         | 按钮样式类型               | string                | `default`、`primary`、`success`、`info`、`warning`、`danger` | `default`     |
| size         | 按钮尺寸                   | string                | `small`、`normal`、`large`                                   | `normal`      |
| disabled     | 是否禁用                   | bool                  |                                                              | `false`       |

> #### DropdownData <sk-tag ghost>type</sk-tag>
>
> ```ts
> export type DropdownDataItem = {
>   key: any;
>   text: string;
>   disabled?: boolean;
> } & Record<string, any>;
>
> export type DropdownData = DropdownDataItem[];
> ```

> #### LayerPosition <sk-tag ghost>type</sk-tag>
>
> ```ts
> export type LayerPosition =
>   | 'top-left'
>   | 'top-center'
>   | 'top-right'
>   | 'bottom-left'
>   | 'bottom-center'
>   | 'bottom-right'
>   | 'left-top'
>   | 'left-center'
>   | 'left-bottom'
>   | 'right-top'
>   | 'right-center'
>   | 'right-bottom';
> ```

### 事件

| 事件   | 说明                 | 携带参数                                    |
| ------ | -------------------- | ------------------------------------------- |
| select | 点击菜单项触发的事件 | `(key: any, item: DropdownDataItem) => any` |
| open   | 弹层打开触发的事件   | -                                           |
| close  | 弹层关闭触发的事件   | -                                           |
