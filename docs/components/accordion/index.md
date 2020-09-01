# Accordion 手风琴

### 基本用法

默认一次只能展开一个

<AccordionBasic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-accordion>
      <sk-accordion-item title="2020年1月">
        <p>2020年1月发生的事件</p>
      </sk-accordion-item>
      <sk-accordion-item title="2020年2月">
        <p>2020年2月发生的事件</p>
      </sk-accordion-item>
      <sk-accordion-item title="2020年3月">
        <p>2020年3月发生的事件</p>
      </sk-accordion-item>
      <sk-accordion-item title="2020年4月">
        <p>2020年4月发生的事件</p>
      </sk-accordion-item>
      <sk-accordion-item title="2020年5月">
        <p>2020年5月发生的事件</p>
      </sk-accordion-item>
    </sk-accordion>
  </div>
</template>
```

### 使用 v-model 双向控制

<AccordionVModel />

```vue
<template>
  <div class="docs-preview-part">
    <p>选中：{{ value }}</p>
    <sk-accordion v-model="value">
      <sk-accordion-item title="2020年1月" value="2020-1">
        <p>2020年1月发生的事件</p>
      </sk-accordion-item>
      <sk-accordion-item title="2020年2月" value="2020-2">
        <p>2020年2月发生的事件</p>
      </sk-accordion-item>
      <sk-accordion-item title="2020年3月" value="2020-3">
        <p>2020年3月发生的事件</p>
      </sk-accordion-item>
      <sk-accordion-item title="2020年4月" value="2020-4">
        <p>2020年4月发生的事件</p>
      </sk-accordion-item>
      <sk-accordion-item title="2020年5月" value="2020-5">
        <p>2020年5月发生的事件</p>
      </sk-accordion-item>
    </sk-accordion>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: null,
    };
  },
};
</script>
```

### 允许同时展开多个

<AccordionMutiple />

```vue
<template>
  <div class="docs-preview-part">
    <p>选中：{{ value }}</p>
    <sk-accordion v-model="value" mutiple>
      <sk-accordion-item title="2020年1月" value="2020-1">
        <p>2020年1月发生的事件</p>
      </sk-accordion-item>
      <sk-accordion-item title="2020年2月" value="2020-2">
        <p>2020年2月发生的事件</p>
      </sk-accordion-item>
      <sk-accordion-item title="2020年3月" value="2020-3">
        <p>2020年3月发生的事件</p>
      </sk-accordion-item>
      <sk-accordion-item title="2020年4月" value="2020-4">
        <p>2020年4月发生的事件</p>
      </sk-accordion-item>
      <sk-accordion-item title="2020年5月" value="2020-5">
        <p>2020年5月发生的事件</p>
      </sk-accordion-item>
    </sk-accordion>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
    };
  },
};
</script>
```

### API

#### Accordion

| 参数     | 说明                                                                                         | 类型    | 可选值            | 默认值         |
| -------- | -------------------------------------------------------------------------------------------- | ------- | ----------------- | -------------- |
| v-model  | 绑定值（可选），若 `mutiple` 为 `true` ，应为 `AccordionValue[]`，否则，应为 `AccordionValue | null`。 | `AccordionValue[] | AccordionValue | null` |  | - |
| mutiple  | 是否允许同时展开多个                                                                         | boolean |                   | `false`        |
| duration | 过渡动画的持续时间（ms）                                                                     | number  |                   | `350`          |

#### AccordionItem

| 参数  | 说明       | 类型             | 可选值 | 默认值     |
| ----- | ---------- | ---------------- | ------ | ---------- |
| title | 展开项标题 | string           |        | -          |
| value | 展开项的值 | `AccordionValue` |        | `Symbol()` |

### 事件

#### Accordion

| 事件   | 说明             | 携带参数                                                                    |
| ------ | ---------------- | --------------------------------------------------------------------------- |
| change | 选中项变化时触发 | `mutiple` 为 `true` 时，携带 `AccordionValue[]`，否则，携带 `AccordionValue | null`。 |

> #### AccordionValue <sk-tag ghost>type</sk-tag>
>
> ```ts
> export type AccordionValue = string | number | symbol;
> ```
