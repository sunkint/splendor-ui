# Tooltip 文字提示

### 基础用法

<div class="docs-preview-part">
  <client-only>
    <sk-tooltip content="今天天气不错啊">
      <sk-button>Hover 我</sk-button>
    </sk-tooltip>
    <sk-tooltip content="今天天气不错啊">
      <span>一段文字</span>
    </sk-tooltip>
  </client-only>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-tooltip content="今天天气不错啊">
      <sk-button>Hover 我</sk-button>
    </sk-tooltip>
  </div>
</template>
```

### 各种定位

<TooltipPosition />

```vue
<template>
  <div class="docs-preview-part">
    <sk-row>
      <sk-col :span="12" class="radios">
        <sk-radio v-model="position" value="top-left">TopLeft</sk-radio>
        <sk-radio v-model="position" value="top-center">TopCenter</sk-radio>
        <sk-radio v-model="position" value="top-right">TopRight</sk-radio>
        <br />
        <sk-radio v-model="position" value="left-top">LeftTop</sk-radio>
        <sk-radio v-model="position" value="left-center">LeftCenter</sk-radio>
        <sk-radio v-model="position" value="left-bottom">LeftBottom</sk-radio>
        <br />
        <sk-radio v-model="position" value="right-top">RightTop</sk-radio>
        <sk-radio v-model="position" value="right-center">RightCenter</sk-radio>
        <sk-radio v-model="position" value="right-bottom">RightBottom</sk-radio>
        <br />
        <sk-radio v-model="position" value="bottom-left">BottomLeft</sk-radio>
        <sk-radio v-model="position" value="bottom-center">BottomCenter</sk-radio>
        <sk-radio v-model="position" value="bottom-right">BottomRight</sk-radio>
      </sk-col>
      <sk-col :span="12">
        <sk-tooltip content="hello" :position="position">
          <sk-button type="primary" size="large">Hover 我</sk-button>
        </sk-tooltip>
      </sk-col>
    </sk-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      position: 'top-left',
    };
  },
};
</script>

<style scoped>
.radios > * {
  margin-right: 12px;
  margin-bottom: 12px;
}
</style>
```

### API

| 参数         | 说明                       | 类型                  | 可选值 | 默认值       |
| ------------ | -------------------------- | --------------------- | ------ | ------------ |
| content      | 提示内容                   | string                |        | -            |
| position     | 气泡展开方位               | `LayerPosition`       |        | `top-center` |
| class        | 气泡的自定义额外类名       | string、array、object |        | -            | = |
| style        | 气泡的自定义额外样式       | string、object        |        | -            | = |
| triggerClass | 触发元素包裹层的自定义类名 | string、array、object |        | -            |

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

| 事件  | 说明           | 携带参数 |
| ----- | -------------- | -------- |
| open  | 气泡打开时触发 | -        |
| close | 气泡关闭时触发 | -        |
