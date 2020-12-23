# Swiper 轮播

### 基础用法

<div class="docs-preview-part">
  <sk-swiper>
    <sk-swipe-item style="background: #fd7e14"></sk-swipe-item>
    <sk-swipe-item style="background: #18bc9c"></sk-swipe-item>
    <sk-swipe-item style="background: #3498db"></sk-swipe-item>
    <sk-swipe-item style="background: #e83e8c"></sk-swipe-item>
  </sk-swiper>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-swiper>
      <sk-swipe-item style="background: #fd7e14"></sk-swipe-item>
      <sk-swipe-item style="background: #18bc9c"></sk-swipe-item>
      <sk-swipe-item style="background: #3498db"></sk-swipe-item>
      <sk-swipe-item style="background: #e83e8c"></sk-swipe-item>
    </sk-swiper>
  </div>
</template>
```

### 事件

鼠标移入、手动点击切换，会暂停循环播放

### API

| 参数           | 说明                           | 类型           | 可选值 | 默认值  |
| -------------- | ------------------------------ | -------------- | ------ | ------- | --- |
| width          | 播放区域的宽度                 | number; string |        | `100%`  |
| height         | 播放区域的高度                 | number; string |        | `250px` |
| transitionTime | 每个子项切换的过渡时间（毫秒） | number         |        | 600     |
| interval       | 自动播放的时间间隔（毫秒）     | number         |        | 5000    |
| loop           | 是否开启循环播放               | boolean        |        | true    | å   |
| showIndicator  | 是否显示指标                   | boolean        |        | true    |
| showControl    | 是否显示左右控制器             | boolean        |        | true    |
