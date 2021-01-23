# Preview 预览

提供 Preview.image / Preview.images 预览图片

### 基础用法

调用 `Preview.image` 预览单张图片

<PreviewBasic />

```vue
<template>
  <div class="docs-preview-part">
    <img
      class="thumb"
      @click="preview"
      src="https://i.loli.net/2021/01/23/EJbRjTHCfdKuzBh.jpg"
      alt=""
    />
  </div>
</template>

<script>
import { Preview } from '../../../src/main';

export default {
  methods: {
    preview() {
      Preview.image('https://i.loli.net/2021/01/23/EJbRjTHCfdKuzBh.jpg');
    },
  },
};
</script>

<style scoped>
.thumb {
  height: 140px;
  cursor: pointer;
}
</style>
```

### 预览多张图片

调用 `Preview.images` 预览多张图片，支持方向键切换图片

<PreviewMultiple />

```vue
<template>
  <div class="docs-preview-part">
    <img v-for="(n, i) in list" :key="i" class="thumb" @click="preview(i)" :src="n" />
  </div>
</template>

<script>
import { Preview } from '../../../src/main';

export default {
  data() {
    return {
      list: [
        'https://i.loli.net/2021/01/23/EJbRjTHCfdKuzBh.jpg',
        'https://i.loli.net/2021/01/23/8ckYryqQ5vPCpwG.jpg',
        'https://i.loli.net/2021/01/23/d9zV8is75ON1qeX.jpg',
        'https://i.loli.net/2021/01/23/6oKzFpsAQkaP2Sb.jpg',
        'https://i.loli.net/2021/01/23/7VHOyhRu9zAC65f.jpg',
        'https://i.loli.net/2021/01/23/GE7zu31MF2xOegp.jpg',
      ],
    };
  },
  methods: {
    preview(index = 0) {
      Preview.images({
        list: this.list,
        index,
      });
    },
  },
};
</script>

<style scoped>
.thumb {
  height: 140px;
  cursor: pointer;
}
</style>
```

### 渲染自定义提示

<PreviewTip />

```vue
<template>
  <div class="docs-preview-part">
    <img v-for="(n, i) in list" :key="i" class="thumb" @click="preview(i)" :src="n" />
  </div>
</template>

<script>
import { Preview } from '../../../src/main';

export default {
  data() {
    return {
      list: [
        'https://i.loli.net/2021/01/23/EJbRjTHCfdKuzBh.jpg',
        'https://i.loli.net/2021/01/23/8ckYryqQ5vPCpwG.jpg',
        'https://i.loli.net/2021/01/23/d9zV8is75ON1qeX.jpg',
        'https://i.loli.net/2021/01/23/6oKzFpsAQkaP2Sb.jpg',
        'https://i.loli.net/2021/01/23/7VHOyhRu9zAC65f.jpg',
        'https://i.loli.net/2021/01/23/GE7zu31MF2xOegp.jpg',
      ],
      tips: [
        '月亮、梯子和兔子',
        '兔子、礼物和气球',
        '树根、兔子和鸟笼',
        '鲜花、自行车和气球',
        '兔子、鲜花和气球',
        '兔子、爱心上写着 I LOVE YOU',
      ],
    };
  },
  methods: {
    preview(index = 0) {
      Preview.images({
        list: this.list,
        renderTip: (i) => `(${i + 1}/${this.list.length}) ${this.tips[i]}`,
        index,
      });
    },
  },
};
</script>

<style scoped>
.thumb {
  height: 140px;
  cursor: pointer;
}
</style>
```

### API

#### Preview.image

预览单张图片

用法：`Preview.image(url: string, options?: Omit<PreviewImageOptions, 'list'>)`

#### Preview.images

预览多张图片

用法：`Preview.images(options: PreviewImageOptions)`

> #### PreviewImageOptions <sk-tag ghost>type</sk-tag>
>
> ```ts
> export interface PreviewImageOptions {
>   list: string[]; // 预览的图片 url 列表
>   index?: number; // 首先展示的图片序号，默认 0
>   scaleRatio?: number; // 放大时放大的倍数，默认 1.5
>   renderTip?: (index: number) => string | VNode; // 渲染自定义提示
> }
> ```
