# Pagination 分页器

### 基础用法

<PaginationBasic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-pagination v-model="page" :totalPages="15" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
    };
  },
};
</script>
```

### API

| 参数       | 说明                       | 类型   | 可选值          | 默认值  |
| ---------- | -------------------------- | ------ | --------------- | ------- |
| v-model    | 当前页                     | number |                 | -       |
| totalPages | 页码总数，必须不小于当前页 | number |                 | -       |
| align      | 对齐方式                   | string | `left`、`right` | `left`  |
| disabled   | 是否禁用                   | bool   |                 | `false` |

### 事件

| 事件   | 说明       | 携带参数       |
| ------ | ---------- | -------------- |
| change | 翻页时触发 | (page: number) |
