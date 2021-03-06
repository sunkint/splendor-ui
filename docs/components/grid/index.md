# Grid 栅格

### 基础用法

<GridBasic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-row class="my-row" :gutter="[5, 5]">
      <sk-col :span="6"><div class="my-col">col-6</div></sk-col>
      <sk-col :span="6"><div class="my-col">col-6</div></sk-col>
      <sk-col :span="6"><div class="my-col">col-6</div></sk-col>
      <sk-col :span="6"><div class="my-col">col-6</div></sk-col>
    </sk-row>
    <sk-row class="my-row">
      <sk-col :span="6"><div class="my-col">col-6</div></sk-col>
      <sk-col :span="6"><div class="my-col">col-6</div></sk-col>
      <sk-col :span="6"><div class="my-col">col-6</div></sk-col>
      <sk-col :span="6"><div class="my-col">col-6</div></sk-col>
    </sk-row>
    <sk-row class="my-row">
      <sk-col :span="6" :offset="6"><div class="my-col">col-6</div></sk-col>
      <sk-col :span="6" :offset="6"><div class="my-col">col-6</div></sk-col>
    </sk-row>
    <sk-row class="my-row" justify="space-around">
      <sk-col :span="4"><div class="my-col">col-4</div></sk-col>
      <sk-col :span="4"><div class="my-col">col-4</div></sk-col>
      <sk-col :span="4"><div class="my-col">col-4</div></sk-col>
      <sk-col :span="4"><div class="my-col">col-4</div></sk-col>
    </sk-row>
  </div>
</template>

<style scoped>
.my-row {
  margin-bottom: 8px !important;
}

.my-col {
  background: #18bc9c;
  color: #fff;
  padding: 8px 0;
  text-align: center;
}
</style>
```

### API

#### Row

| 参数    | 说明                                                 | 类型          | 默认值  |
| ------- | ---------------------------------------------------- | ------------- | ------- |
| gutter  | 栅格间隔，支持数字或者数组来设置[水平间距, 垂直间距] | `GutterType`  | `0`     |
| align   | 垂直对齐方式                                         | `AlignType`   | `top`   |
| justify | 水平排列方式                                         | `JustifyType` | `start` |

> #### GutterType <sk-tag ghost>type</sk-tag>
>
> ```ts
> export type GutterType = number[] | number;
> ```

> #### AlignType <sk-tag ghost>type</sk-tag>
>
> ```ts
> export type AlignType = 'top' | 'middle' | 'bottom';
> ```

> #### JustifyType <sk-tag ghost>type</sk-tag>
>
> ```ts
> export type JustifyType = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
> ```

#### Col

| 参数   | 说明               | 类型   | 可选值 | 默认值 |
| ------ | ------------------ | ------ | ------ | ------ |
| span   | 栅格占据的格数     | number | 1-24   | -      |
| offset | 栅格左侧间隔的格数 | number | 1-24   | `0`    |
