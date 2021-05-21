# InfiniteScroll 无限滚动

### 基础用法

<InfiniteScrollBasic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-infinite-scroll class="demo" @load="load" :hasMore="hasMore" :height="320">
      <div class="card" v-for="n in list" :key="n">{{ n }}</div>
    </sk-infinite-scroll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      hasMore: true,
    };
  },
  methods: {
    load() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const n = this.list.length;
          if (n >= 120) {
            this.hasMore = false;
            return resolve();
          }
          for (let i = n + 1; i <= n + 20; i++) {
            this.list.push(i);
          }
          resolve();
        }, 1000);
      });
    },
  },
};
</script>

<style scoped>
.demo {
  border: 1px solid lightgray;
}

.card {
  border-bottom: 1px solid lightgray;
  line-height: 40px;
  font-size: 14px;
  padding-left: 24px;
}
</style>
```

### 禁止自动加载

<InfiniteScrollManual />

```vue
<template>
  <div class="docs-preview-part">
    <sk-infinite-scroll class="demo" @load="load" :autoLoad="false" :height="320">
      <div class="card" v-for="n in list" :key="n">{{ n }}</div>
    </sk-infinite-scroll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    load() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const n = this.list.length;
          for (let i = n + 1; i <= n + 20; i++) {
            this.list.push(i);
          }
          resolve();
        }, 1000);
      });
    },
  },
};
</script>

<style scoped>
.demo {
  border: 1px solid lightgray;
}

.card {
  border-bottom: 1px solid lightgray;
  line-height: 40px;
  font-size: 14px;
  padding-left: 24px;
}
</style>
```

### 窗口范围使用

打开 `useWindow`，InfiniteScroll 将使用窗口作为滚动容器

<a href="window">点此查看示例 &gt;</a>

```vue
<template>
  <div class="docs-preview-part">
    <sk-infinite-scroll class="demo" @load="load" useWindow>
      <div class="card" v-for="n in list" :key="n">
        <p>随记 #{{ n }}</p>
        <p>这是随记的内容 {{ n }}</p>
      </div>
    </sk-infinite-scroll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    load() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const n = this.list.length;
          for (let i = n + 1; i <= n + 20; i++) {
            this.list.push(i);
          }
          resolve();
        }, 1000);
      });
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid lightgray;
  margin-bottom: 12px;
  padding: 12px 24px;
  font-size: 14px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
</style>
```

### 自定义提示文案

组件提供了四个自定义插槽：`loading`、`complete`、`error` 和 `continue`，用于自定义加载中、加载完成、加载出错、手动加载时的提示文案。其中 `error` 和 `continue` 暴露了 `load` 方法用于执行向下加载。

<InfiniteScrollCustom />

```vue
<template>
  <div class="docs-preview-part">
    <sk-infinite-scroll
      class="demo"
      :autoLoad="false"
      @load="load"
      :hasMore="hasMore"
      :height="320"
    >
      <div class="card" v-for="n in list" :key="n">{{ n }}</div>
      <template #loading>
        <strong>正在拉取数据……</strong>
      </template>
      <template #complete>
        <strong>没有更多数据了 :)</strong>
      </template>
      <template v-slot:error="{ load }">
        <strong>欧呦，没加载出，<a @click="load">重试</a></strong>
      </template>
      <template v-slot:continue="{ load }">
        <strong>点 <a @click="load">这里</a> 拉取下面的数据</strong>
      </template>
    </sk-infinite-scroll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      hasMore: true,
    };
  },
  methods: {
    load() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const n = this.list.length;
          if (n >= 120) {
            this.hasMore = false;
            return resolve();
          }
          if (Math.random() < 0.4) {
            reject();
          } else {
            for (let i = n + 1; i <= n + 20; i++) {
              this.list.push(i);
            }
            resolve();
          }
        }, 1000);
      });
    },
  },
};
</script>

<style scoped>
.demo {
  border: 1px solid lightgray;
}

.card {
  border-bottom: 1px solid lightgray;
  line-height: 40px;
  font-size: 14px;
  padding-left: 24px;
}
</style>
```

### API

| 参数             | 说明                                                         | 类型           | 可选值 | 默认值 |
| ---------------- | ------------------------------------------------------------ | -------------- | ------ | ------ |
| autoLoad         | 是否自动向下加载（若为`false`，也会触发初始加载）            | bool           |        | true   |
| autoLoadDistance | 触发向下加载时，视窗底部与容器底部的最大距离（px）           | number         |        | 300    |
| hasMore          | 指示是否加载结束（初始加载不受 hasMore 影响）                | bool           |        | false  |
| useWindow        | 使用 `window` 作为滚动容器计算，如为 false，需要明确容器高度 | bool           |        | false  |
| height           | 组件容器的高度                                               | number、string |        | -      |

### 事件

| 事件 | 说明                                                                                | 携带参数                |
| ---- | ----------------------------------------------------------------------------------- | ----------------------- |
| load | 必填，加载事件函数，需要返回一个 Promise，resolve 代表加载成功，reject 代表加载失败 | `(isInitLoad: boolean)` |
