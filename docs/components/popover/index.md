# Popover 气泡弹层

### 基础用法

<div class="docs-preview-part">
  <client-only>
    <sk-popover>
      <sk-button>Hover 我</sk-button>
      <template #content>这是气泡弹层的内容</template>
    </sk-popover>
    <sk-popover trigger="click">
      <sk-button>Click 我</sk-button>
      <template #content>这是气泡弹层的内容</template>
    </sk-popover>
  </client-only>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-popover>
      <sk-button>Hover 我</sk-button>
      <template #content>这是气泡弹层的内容</template>
    </sk-popover>
    <sk-popover trigger="click">
      <sk-button>Click 我</sk-button>
      <template #content>这是气泡弹层的内容</template>
    </sk-popover>
  </div>
</template>
```

### 各种定位

<PopoverPosition />

```vue
<template>
  <div class="docs-preview-part">
    <sk-row>
      <sk-col class="top" :span="24">
        <sk-popover position="top-left">
          <sk-button>TopLeft</sk-button>
          <template #content>Top Left</template>
        </sk-popover>
        <sk-popover position="top-center">
          <sk-button>TopCenter</sk-button>
          <template #content>Top Center</template>
        </sk-popover>
        <sk-popover position="top-right">
          <sk-button>TopRight</sk-button>
          <template #content>Top Right</template>
        </sk-popover>
      </sk-col>
      <sk-col class="left" :span="12">
        <div class="inner">
          <sk-popover position="left-top">
            <sk-button>LeftTop</sk-button>
            <template #content>Left Top</template>
          </sk-popover>
          <br />
          <sk-popover position="left-center">
            <sk-button>LeftCenter</sk-button>
            <template #content>Left Center</template>
          </sk-popover>
          <br />
          <sk-popover position="left-bottom">
            <sk-button>LeftBottom</sk-button>
            <template #content>Left Bottom</template>
          </sk-popover>
        </div>
      </sk-col>
      <sk-col class="right" :span="12">
        <div class="inner">
          <sk-popover position="right-top">
            <sk-button>RightTop</sk-button>
            <template #content>Right Top</template>
          </sk-popover>
          <br />
          <sk-popover position="right-center">
            <sk-button>RightCenter</sk-button>
            <template #content>Right Center</template>
          </sk-popover>
          <br />
          <sk-popover position="right-bottom">
            <sk-button>RightBottom</sk-button>
            <template #content>Right Bottom</template>
          </sk-popover>
        </div>
      </sk-col>
      <sk-col class="bottom" :span="24">
        <sk-popover position="bottom-left">
          <sk-button>BottomLeft</sk-button>
          <template #content>Bottom Left</template>
        </sk-popover>
        <sk-popover position="bottom-center">
          <sk-button>BottomCenter</sk-button>
          <template #content>Bottom Center</template>
        </sk-popover>
        <sk-popover position="bottom-right">
          <sk-button>BottomRight</sk-button>
          <template #content>Bottom Right</template>
        </sk-popover>
      </sk-col>
    </sk-row>
  </div>
</template>

<style scoped>
.docs-preview-part :deep(.sk-layer-trigger) {
  margin: 8px;
}

button {
  width: 120px !important;
}

.top,
.bottom {
  text-align: center;
}

.left,
.right {
  display: flex;
  align-items: center;
}

.right {
  justify-content: flex-end;
}
</style>
```

### Fixed 状态

<div class="docs-preview-part">
  <client-only>
    <div style="position: fixed; right: 80px; bottom: 120px">
      <sk-popover>
        <sk-button>fixed</sk-button>
        <template #content>fixed状态工作的气泡</template>
      </sk-popover>
    </div>
  </client-only>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <div style="position: fixed; right: 80px; bottom: 120px">
      <sk-popover>
        <sk-button>fixed</sk-button>
        <template #content>fixed状态工作的气泡</template>
      </sk-popover>
    </div>
  </div>
</template>
```

### API

| 参数            | 说明                                     | 类型                  | 可选值           | 默认值       |
| --------------- | ---------------------------------------- | --------------------- | ---------------- | ------------ |
| trigger         | 气泡触发方式                             | string                | `hover`、`click` | `hover`      |
| position        | 气泡展开方位                             | `LayerPosition`       |                  | `top-center` |
| class           | 气泡的自定义额外类名                     | string、array、object |                  | -            |
| style           | 气泡的自定义额外样式                     | string、object        |                  | -            |
| triggerClass    | 触发元素包裹层的自定义类名               | string、array、object |                  | -            |
| mouseEnterDelay | 针对 `trigger=hover`，打开的延迟（ms）   | number                |                  | `100`        |
| mouseLeaveDelay | 针对 `trigger=hover`，关闭时的延迟（ms） | number                |                  | `100`        |

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
| open  | 弹层打开时触发 | -        |
| close | 弹层关闭时触发 | -        |
