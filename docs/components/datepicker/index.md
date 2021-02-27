# DatePicker 日期选择器

### 基础用法

<div class="docs-preview-part">
  <client-only>
    <sk-datepicker placeholder="请选择日期" />
  </client-only>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-datepicker placeholder="请选择日期" />
  </div>
</template>
```

### 使用 v-model 指定选择日期

<client-only>
  <DatePickerModel />
</client-only>

```vue
<template>
  <div class="docs-preview-part">
    <p>当前选择日期：{{ date.toString() }}</p>
    <sk-datepicker v-model="date" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date('2020/03/08'),
    };
  },
};
</script>
```

### 设置可选日期范围

这里演示了可选日期范围从 2013/5/27 到今天

<div class="docs-preview-part">
  <client-only>
    <sk-datepicker :minDate="new Date(2013, 4, 27)" :maxDate="new Date()" />
  </client-only>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-datepicker :minDate="new Date('2013/05/27')" :maxDate="new Date()" />
  </div>
</template>
```

### 禁用某些日期

这里演示了周六周日不能选的场景

<div class="docs-preview-part">
  <client-only>
    <sk-datepicker :disabledDate="(date) => [0, 6].includes(date.getDay())" />
  </client-only>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-datepicker :disabledDate="(date) => [0, 6].includes(date.getDay())" />
  </div>
</template>
```

### 自定义日期显示格式

format 参数请参考 [**date-fns** format](https://date-fns.org/v2.17.0/docs/format)

<div class="docs-preview-part">
  <client-only>
    <sk-datepicker placeholder="请选择日期" format="yyyy qqq MMM do" />
  </client-only>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-datepicker placeholder="请选择日期" format="yyyy qqq MMM do" />
  </div>
</template>
```

### 支持清除

<div class="docs-preview-part">
  <client-only>
    <sk-datepicker placeholder="请选择日期" clearable />
  </client-only>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-datepicker placeholder="请选择日期" clearable />
  </div>
</template>
```

### 禁用

<div class="docs-preview-part">
  <client-only>
    <sk-datepicker placeholder="已禁用" disabled />
  </client-only>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-datepicker placeholder="已禁用" disabled />
  </div>
</template>
```

### API

| 参数         | 说明                                                                                     | 类型                  | 可选值                      | 默认值                   |
| ------------ | ---------------------------------------------------------------------------------------- | --------------------- | --------------------------- | ------------------------ | --- | --- |
| size         | Input 尺寸                                                                               | string                | `small`、 `normal`、`large` | `normal`                 |
| block        | 是否占满宽度                                                                             | bool                  |                             | `false`                  |
| placeholder  | 占位提示文字                                                                             | string                |                             | -                        |
| hasError     | 是否错误样式                                                                             | bool                  |                             | `false`                  |
| name         | html name                                                                                | string                |                             | -                        |
| disabled     | 是否禁用                                                                                 | bool                  |                             | -                        |
| clearable    | 是否支持清除                                                                             | bool                  |                             | `false`                  |
| format       | 自定义日期显示格式，详见 [**date-fns** format](https://date-fns.org/v2.17.0/docs/format) | string                |                             | `yyyy-MM-dd`             |
| startView    | 开始选择的面板类型                                                                       | string                | `day`、`month`、`year`      | `day`                    |
| minDate      | 最小选择的日期                                                                           | Date                  |                             | -                        |
| maxDate      | 最大选择的日期                                                                           | Date                  |                             | -                        |
| weekStartsOn | 一周的开始日，0 代表周日，6 代表周六                                                     | number                | 0 - 6                       | 1                        |
| disabledDate | 禁止选择的日期                                                                           | `Date                 | Date[]                      | (date: Date) => boolean` |     | -   |
| triggerClass | 触发元素包裹层的自定义类名                                                               | string、array、object |                             | -                        |

### 事件

| 事件   | 说明                         | 携带参数     |
| ------ | ---------------------------- | ------------ | ----------- |
| open   | 日期选择器展开时触发         | -            |
| close  | 日期选择器收起时触发         | -            |
| change | 日期选择器选择日期变化时触发 | `(date: Date | undefined)` |
