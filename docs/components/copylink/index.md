# CopyLink 复制链接

提供复制功能，内部基于 clipboard.js。

### 基础用法

<CopyLinkBasic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-copy-link text="复制的内容" @success="onSuccess" />
  </div>
</template>

<script>
import { Notify } from 'splendor-ui';
export default {
  methods: {
    onSuccess() {
      Notify.success('复制成功！');
    },
  },
};
</script>
```

### 自定义触发器

<CopyLinkCustom />

```vue
<template>
  <div class="docs-preview-part">
    <sk-copy-link text="复制的内容" @success="onSuccess" v-slot="{ copy }">
      <sk-button @click="copy">点我复制</sk-button>
    </sk-copy-link>
  </div>
</template>

<script>
import { Notify } from 'splendor-ui';
export default {
  methods: {
    onSuccess() {
      Notify.success('复制成功！');
    },
  },
};
</script>
```

### API

| 参数 | 说明           | 类型   | 可选值 | 默认值 |
| ---- | -------------- | ------ | ------ | ------ |
| text | 需要复制的内容 | string |        | -      |

### 事件

| 事件    | 说明         | 携带参数 |
| ------- | ------------ | -------- |
| success | 复制成功事件 | -        |
| error   | 复制失败事件 | -        |
