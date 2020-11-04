# tabs 选项卡组件

### 基础用法

<TabsBasic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-tabs v-model="activeId" @change="tabsChange" closeable>
      <sk-tab-panel
        :title="'标题' + item.id"
        v-for="item in list"
        :disabled="item.id === 2"
        :key="item.id"
        :id="item.id"
      >
        第{{ item.id }}组
      </sk-tab-panel>
    </sk-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeId: 4,
      list: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    };
  },
  methods: {
    tabsChange(id) {
      console.log('id', id);
      console.log('activeId', this.activeId);
    },
  },
};
</script>
```

### API

#### sk-tabs

| 参数      | 说明           | 类 型  | 必填 | 默认值 |
| --------- | -------------- | ------ | ---- | ------ |
| closeable | tab 可支持删除 | `bool` | 否   | false  |

#### sk-panel

| 参数     | 说明       | 类 型    | 必填   | 默认值  |
| -------- | ---------- | -------- | ------ | ------- |
| id       | 样式类型   | `number  | string | symbol` | 否 | symbol |
| title    | tab 的标题 | `string` | 是     |
| disabled | 是否禁用   | `bool`   | 否     | false   |

### 事件

| 事件   | 说明                | 携带参数     |
| ------ | ------------------- | ------------ |
| change | 点击 tab 触发的事件 | `(id: number | string | symbol)` |
