# Swiper 轮播

### 基础用法

鼠标悬浮时，会暂停自动播放

<SwiperBasic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-swiper :interval="3000">
      <sk-swiper-item style="background: #fd7e14;"></sk-swiper-item>
      <sk-swiper-item style="background: #18bc9c;"></sk-swiper-item>
      <sk-swiper-item style="background: #3498db;"></sk-swiper-item>
      <sk-swiper-item style="background: #e83e8c;"></sk-swiper-item>
    </sk-swiper>
  </div>
</template>
```

### 外部控制

<SwiperModel />

```vue
<template>
  <div class="docs-preview-part">
    <sk-swiper v-model="currentIndex" :loop="false">
      <sk-swiper-item v-for="n in ids" :key="n">
        <div class="number">{{ n }}</div>
      </sk-swiper-item>
    </sk-swiper>
    <div class="handle">
      <sk-button v-for="(n, i) in ids" @click="currentIndex = i">{{ n }}</sk-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      ids: ['一', '二', '三', '四', '五'],
    };
  },
};
</script>

<style scoped>
.number {
  line-height: 250px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  background-color: #18bc9c;
  color: white;
}

.handle {
  text-align: center;
  margin-top: 12px;
}

.sk-btn + .sk-btn {
  margin-left: 8px;
}
</style>
```

### 动态增减

<SwiperDynamic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-swiper v-model="currentIndex" :interval="2000">
      <sk-swiper-item v-for="n in ids" :key="n">
        <div class="number">{{ n }}</div>
      </sk-swiper-item>
    </sk-swiper>
    <div class="handle">
      <sk-button type="primary" @click="add">增加</sk-button>
      <sk-button @click="remove">移除</sk-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      ids: [1, 2, 3],
    };
  },
  methods: {
    add() {
      this.ids.push(this.ids.length + 1);
    },
    remove() {
      this.ids.pop();
    },
  },
};
</script>

<style scoped>
.number {
  line-height: 250px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  background-color: #e83e8c;
  color: white;
}

.handle {
  text-align: center;
  margin-top: 12px;
}

.sk-btn + .sk-btn {
  margin-left: 8px;
}
</style>
```

### API

#### Swiper

| 参数           | 说明                           | 类型           | 可选值 | 默认值  |
| -------------- | ------------------------------ | -------------- | ------ | ------- | --- |
| v-model        | 手动控制当前显示的轮播图索引   | number         |        | -       |
| width          | 播放区域的宽度                 | number; string |        | `100%`  |
| height         | 播放区域的高度                 | number; string |        | `250px` |
| transitionTime | 每个子项切换的过渡时间（毫秒） | number         |        | 600     |
| interval       | 自动播放的时间间隔（毫秒）     | number         |        | 5000    |
| loop           | 是否开启循环播放               | boolean        |        | true    | å   |
| showIndicator  | 是否显示指标                   | boolean        |        | true    |
| showControl    | 是否显示左右控制器             | boolean        |        | true    |

#### SwiperItem

| 参数 | 说明     | 类型    | 必填   | 默认值  |
| ---- | -------- | ------- | ------ | ------- | --- | ---------- |
| id   | 唯一标识 | `number | string | symbol` | 否  | `Symbol()` |

### 事件

#### Swiper

| 事件     | 说明       | 携带参数                       |
| -------- | ---------- | ------------------------------ |
| onChange | 切换时触发 | `(conf: SwiperOnChangeConfig)` |

> #### SwiperOnChangeConfig <sk-tag ghost>type</sk-tag>
>
> ```ts
> export interface SwiperOnChangeConfig {
>   id: number | string | symbol;
>   prevId: number | string | symbol;
>   index: number;
>   prevIndex: number;
>   direction: SwiperDirection;
> }
> ```

#### SwiperItem

| 事件          | 说明           | 携带参数     |
| ------------- | -------------- | ------------ | ------ | -------- |
| onBeforeEnter | 即将滚入时触发 | `(id: number | string | symbol)` |
| onAfterEnter  | 完成滚入时触发 | `(id: number | string | symbol)` |
| onBeforeLeave | 即将滚出时触发 | `(id: number | string | symbol)` |
| onAfterLeave  | 完成滚出时触发 | `(id: number | string | symbol)` |
