# Mention 提及

实现自动补全提及内容，内部基于 [tribute](https://github.com/zurb/tribute)

### 基础用法

<div class="docs-preview-part">
  <sk-mention
    placeholder="输入@试试…"
    :menuItemLimit="5"
    :data="['JavaScript', 'HTML', 'CSS', 'Java', 'Go', 'C#', 'VB', 'Python', 'PHP', 'C', 'C++']"
  />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-mention
      placeholder="输入@试试…"
      :menuItemLimit="5"
      :data="['JavaScript', 'HTML', 'CSS', 'Java', 'Go', 'C#', 'VB', 'Python', 'PHP', 'C', 'C++']"
    />
  </div>
</template>
```

### 异步获取数据

<MentionAsync />

```vue
<template>
  <div class="docs-preview-part">
    <sk-mention async @asyncFetch="fetch" />
  </div>
</template>

<script>
export default {
  methods: {
    fetch(word) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!word) {
            return resolve(['111']);
          }
          resolve([word, word.repeat(2), word.repeat(3)]);
        }, 500);
      });
    },
  },
};
</script>
```

### API

| 参数                | 说明                                       | 类型               | 可选值    | 默认值 |
| ------------------- | ------------------------------------------ | ------------------ | --------- | ------ | ---- |
| trigger             | 触发自动补全的符号                         | string             |           | `@`    |
| data                | 同步筛选时的全部数据列表                   | `MentionDataItem[] | string[]` |        | `[]` |
| async               | 是否异步获取数据                           | bool               |           | false  |
| menuItemLimit       | 每次最多显示的条目数量                     | number             |           | 25     |
| menuShowMinLength   | 触发自动补全前键入的最少字符数量           | number             |           | 0      |
| requireLeadingSpace | 触发自动补全的符号前是否需要空格（0.2.2+） | number             |           | false  |

同时也支持 [Textarea](../textarea/index) 的所有 props。

### 事件

| 事件       | 说明                                   | 携带参数                                     |
| ---------- | -------------------------------------- | -------------------------------------------- | ---------- |
| asyncFetch | 异步获取回调函数，需要返回一个 Promise | `(word: string) => Promise<MentionDataItem[] | string[]>` |

同时也支持 [Textarea](../textarea/index) 的所有事件。

> #### MentionDataItem <sk-tag ghost>type</sk-tag>
>
> ```ts
> export type MentionDataItem = {
>   key: string; // 需要进行筛选的关键词字符串，如姓名的拼音
>   value: string; // 实际展示和插入的内容，如姓名
> } & Record<string, any>;
> ```
