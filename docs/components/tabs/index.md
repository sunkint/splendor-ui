# Tabs 选项卡

### 基础用法

<div class="docs-preview-part">
  <sk-tabs>
    <sk-tab-panel title="他的文章">文章</sk-tab-panel>
    <sk-tab-panel title="他的评论">评论</sk-tab-panel>
    <sk-tab-panel title="他的帖子">帖子</sk-tab-panel>
    <sk-tab-panel title="他的故事" disabled>故事</sk-tab-panel>
  </sk-tabs>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-tabs>
      <sk-tab-panel title="他的文章">文章</sk-tab-panel>
      <sk-tab-panel title="他的评论">评论</sk-tab-panel>
      <sk-tab-panel title="他的帖子">帖子</sk-tab-panel>
      <sk-tab-panel title="他的故事" disabled>故事</sk-tab-panel>
    </sk-tabs>
  </div>
</template>
```

### 宽度撑满

<div class="docs-preview-part">
  <sk-tabs justified>
    <sk-tab-panel title="他的文章">文章</sk-tab-panel>
    <sk-tab-panel title="他的评论">评论</sk-tab-panel>
    <sk-tab-panel title="他的帖子">帖子</sk-tab-panel>
    <sk-tab-panel title="他的故事" disabled>故事</sk-tab-panel>
  </sk-tabs>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-tabs justified>
      <sk-tab-panel title="他的文章">文章</sk-tab-panel>
      <sk-tab-panel title="他的评论">评论</sk-tab-panel>
      <sk-tab-panel title="他的帖子">帖子</sk-tab-panel>
      <sk-tab-panel title="他的故事" disabled>故事</sk-tab-panel>
    </sk-tabs>
  </div>
</template>
```

### 自定义标题

<div class="docs-preview-part">
  <sk-tabs>
    <sk-tab-panel>
      <template #title>
        <sk-icon type="doc" /> 他的文章
      </template>
      文章
    </sk-tab-panel>
    <sk-tab-panel>
      <template #title>
        <sk-icon type="comment" /> 他的评论
      </template>
      评论
    </sk-tab-panel>
  </sk-tabs>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-tabs>
      <sk-tab-panel>
        <template #title><sk-icon type="doc" /> 他的文章</template>
        文章
      </sk-tab-panel>
      <sk-tab-panel>
        <template #title><sk-icon type="comment" /> 他的评论</template>
        评论
      </sk-tab-panel>
    </sk-tabs>
  </div>
</template>
```

### 外部控制

<TabsModel />

```vue
<template>
  <div class="docs-preview-part">
    <p>当前查看：第{{ activeId }}组 <sk-button @click="switch">切换</sk-button></p>
    <sk-tabs v-model="activeId">
      <sk-tab-panel :title="'标题' + item.id" v-for="item in list" :key="item.id" :id="item.id">
        第{{ item.id }}组
      </sk-tab-panel>
    </sk-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeId: 1,
      list: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    };
  },
  methods: {
    switch() {
      this.activeId = this.activeId === 4 ? 1 : this.activeId + 1;
    },
  },
};
</script>
```

### 支持删除

<TabsClosable />

```vue
<template>
  <div class="docs-preview-part">
    <sk-tabs v-model="activeId" @close="tabClose" closable>
      <sk-tab-panel v-for="item in list" :title="'标题' + item.id" :key="item.id" :id="item.id">
        第{{ item.id }}组
      </sk-tab-panel>
    </sk-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeId: 1,
      list: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    };
  },
  methods: {
    tabClose(id) {
      this.list = this.list.filter((item) => item.id !== id);
    },
  },
};
</script>
```

### API

#### Tabs

| 参数      | 说明               | 类型 | 必填 | 默认值  |
| --------- | ------------------ | ---- | ---- | ------- |
| justified | tab 栏是否撑满宽度 | bool | 否   | `false` |
| closable  | tab 可支持删除     | bool | 否   | `false` |

#### TabPanel

| 参数     | 说明       | 类型    | 必填   | 默认值  |
| -------- | ---------- | ------- | ------ | ------- |
| title    | tab 的标题 | string  | 否     | -       |
| id       | 唯一标识   | `number | string | symbol` | 否 | `Symbol()` |
| disabled | 是否禁用   | bool    | 否     | `false` |

### 事件

| 事件   | 说明                | 携带参数     |
| ------ | ------------------- | ------------ |
| change | 切换 tab 触发的事件 | `(id: number | string | symbol, index: number)` |
| close  | 删除 tab 触发的事件 | `(id: number | string | symbol, index: number)` |
