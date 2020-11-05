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

```vue
<template>
  <div class="docs-preview-part">
    <sk-table hover :columns="columns" :data="data" />
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
        // ...
      ],
    };
  },
};
</script>
```

### 带斑马线效果

<TableStriped />

```vue
<template>
  <div class="docs-preview-part">
    <sk-table striped :columns="columns" :data="data" />
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
        // ...
      ],
    };
  },
};
</script>
```

### 带边框效果

<TableBordered />

```vue
<template>
  <div class="docs-preview-part">
    <sk-table bordered :columns="columns" :data="data" />
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
        // ...
      ],
    };
  },
};
</script>
```

### 无数据

<TableEmpty />

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
      data: [],
    };
  },
};
</script>
```

### 加载中

<TableLoading />

```vue
<template>
  <div class="docs-preview-part">
    <sk-table loading :columns="columns" :data="data" />
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
      data: [],
    };
  },
};
</script>
```

### 支持水平滚动

<TableScroll />

```vue
<template>
  <div class="docs-preview-part">
    <sk-table scrollX="1200px" :columns="columns" :data="data" />
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
        {
          title: '联系方式',
          name: 'phone',
        },
      ],
      data: [
        // ...
      ],
    };
  },
};
</script>
```

### 垂直滚动

指定 `height` 即可实现垂直滚动，同时 `table-layout` 会设置为 `fixed` 以保证表头和内容对齐。

<TableScrollY />

```vue
<template>
  <div class="docs-preview-part">
    <sk-table height="270px" :columns="columns" :data="data" />
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
        {
          title: '联系方式',
          name: 'phone',
        },
      ],
      data: [
        // ...
      ],
    };
  },
};
</script>
```

### 自定义渲染

<TableCustom />

```vue
<template>
  <div class="docs-preview-part">
    <sk-table layout="fixed" bordered :columns="columns" :data="data" />
  </div>
</template>

<script>
import { h } from 'vue';
import { Button, Notify } from '../../../src/main';
export default {
  data() {
    return {
      columns: [
        {
          title: '商品',
          render({ name }) {
            return h('strong', {}, name);
          },
        },
        {
          title: '库存',
          name: 'stock',
        },
        {
          title: '销量',
          name: 'sales',
        },
        {
          title: '操作',
          align: 'right',
          width: '100px',
          render({ name }) {
            return h(
              Button,
              {
                size: 'small',
                onClick: () => {
                  Notify.info(name);
                },
              },
              '查看'
            );
          },
        },
      ],
      data: [1, 2, 3, 4, 5].map((item) => {
        return {
          name: `商品${item}`,
          stock: Math.round(Math.random() * 100),
          sales: Math.round(Math.random() * 100),
        };
      }),
    };
  },
};
</script>
```

### API

| 参数      | 说明                             | 类型                          | 可选值  | 默认值         |
| --------- | -------------------------------- | ----------------------------- | ------- | -------------- |
| columns   | 表格列配置                       | `ITableColumnItem<T = any>[]` |         | -              |
| data      | 表格数据                         | `any[]`                       |         | `[]`           |
| striped   | 斑马线样式                       | bool                          |         | `false`        |
| hover     | 鼠标悬停样式                     | bool                          |         | `false`        |
| bordered  | 边框样式                         | bool                          |         | `false`        |
| loading   | 加载中样式                       | bool                          |         | `false`        |
| scrollX   | 允许水平滚动，并指定表格最小宽度 | number、string                |         | -              |
| height    | 允许垂直滚动，并指定表格最大高度 | number、string                |         | -              |
| rowKey    | 每一行数据的 key 值              | `any`                         |         | 当前列的 index |
| emptyText | 表格数据为空时的提示             | string                        |         | `暂无数据`     |
| layout    | 表格的 `table-layout`            | string                        | `fixed` | -              |

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
