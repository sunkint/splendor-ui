# Dropdown 下拉菜单

### 基础用法

<div class="docs-preview-part">
  <sk-dropdown text="点击打开菜单" :data="[{ key: 'food', text: '食品' }, { key: 'clothes', text: '服装' }]" />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-dropdown
      text="点击打开菜单"
      :data="[
        { key: 'food', text: '食品' },
        { key: 'clothes', text: '服装' },
      ]"
    />
  </div>
</template>
```

### 多种风格

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

### API

| 参数         | 说明                       | 类型                     | 可选值                                                       | 默认值    |
| ------------ | -------------------------- | ------------------------ | ------------------------------------------------------------ | --------- |
| text         | 按钮文本                   | string                   |                                                              | -         |
| data         | 下拉项数据，必填           | `DropdownData`           |                                                              | -         |
| selectedKeys | 选择项，data 中 key 的数组 | `Array<string | number>` |                                                              | `[]`      |
| type         | 样式类型                   | string                   | `default`、`primary`、`success`、`info`、`warning`、`danger` | `default` |

> #### DropdownData <sk-tag ghost>type</sk-tag>
>
> ```ts
> export type DropdownDataItem = {
>   key: string | number; // 唯一值，不能重复
>   text: string;
> } & Record<string, any>;
>
> export type DropdownData = DropdownDataItem[];
> ```

### 事件

| 事件   | 说明                 | 携带参数                                       |
| ------ | -------------------- | ---------------------------------------------- |
| select | 点击菜单项触发的事件 | `(key: string, item: DropdownDataItem) => any` |
