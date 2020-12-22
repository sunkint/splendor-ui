# Swiper 轮播

### 基础用法

<div class="docs-preview-part">
  <sk-swiper>
    <sk-swipe-item>1</sk-swipe-item>
    <sk-swipe-item>2</sk-swipe-item>
    <sk-swipe-item>3</sk-swipe-item>
    <sk-swipe-item>4</sk-swipe-item>
  </sk-swiper>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-swiper>
      <sk-swipe-item>1</sk-swipe-item>
      <sk-swipe-item>2</sk-swipe-item>
      <sk-swipe-item>3</sk-swipe-item>
      <sk-swipe-item>4</sk-swipe-item>
    </sk-swiper>
  </div>
</template>
```

### API

| 参数     | 说明                           | 类型    | 可选值 | 默认值 |
| -------- | ------------------------------ | ------- | ------ | ------ |
| time     | 每个子项切换的过渡时间（毫秒） | number  |        | 600    |
| interval | 自动播放的时间间隔（毫秒）     | number  |        | 5000   |
| autoPlay | 是否开启自动播放               | boolean |        | true   |
