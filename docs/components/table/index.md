# Table 表格

### 基础用法

<TableBasic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-table :columns="columns" :data="data" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '姓名',
          name: 'name',
        },
        {
          title: '性别',
          name: 'gender',
        },
        {
          title: '住址',
          name: 'address',
        },
      ],
      data: [
        {
          name: '孙某某',
          gender: '男',
          address: '滨海市民主大街4601号',
        },
        {
          name: '陈某某',
          gender: '女',
          address: '滨海市民主大街4616号',
        },
        {
          name: '胡某某',
          gender: '女',
          address: '滨海市民主大街4625号',
        },
        {
          name: '夏某某',
          gender: '男',
          address: '滨海市团结大道865号',
        },
      ],
    };
  },
};
</script>
```

### 带悬浮效果

<TableHover />

### 带斑马线效果

<TableStriped />

### 带边框效果

<TableBordered />

### 无数据

<TableEmpty />

### 加载中

<TableLoading />

### 自定义渲染

<TableCustom />

### API

| 参数      | 说明                  | 类型                          | 可选值  | 默认值         |
| --------- | --------------------- | ----------------------------- | ------- | -------------- |
| columns   | 表格列配置            | `ITableColumnItem<T = any>[]` |         | -              |
| data      | 表格数据              | `any[]`                       |         | `[]`           |
| striped   | 斑马线样式            | bool                          |         | `false`        |
| hover     | 鼠标悬停样式          | bool                          |         | `false`        |
| bordered  | 边框样式              | bool                          |         | `false`        |
| loading   | 加载中样式            | bool                          |         | `false`        |
| rowKey    | 每一行数据的 key 值   | `any`                         |         | 当前列的 index |
| emptyText | 表格数据为空时的提示  | string                        |         | `暂无数据`     |
| layout    | 表格的 `table-layout` | string                        | `fixed` | -              |

> #### ITableColumnItem <sk-tag ghost>type</sk-tag>
>
> ```ts
> export interface ITableColumnItem<T = any> {
>   // 列标题
>   title: string;
>   // 列数据的名称
>   name?: string;
>   // 列最小宽度
>   width?: number | string;
>   // 文本对齐方式
>   align?: 'left' | 'center' | 'right';
>   // 默认文本
>   defaultContent?: any;
>   // 自定义渲染
>   render?: (item: T) => any;
> }
> ```
