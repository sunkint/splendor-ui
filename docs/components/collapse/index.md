# Collapse 折叠面板

### 基础用法

<CollapseBasic />

```vue
<template>
  <div class="docs-preview-part">
    <div><sk-switch v-model="open" /></div>
    <sk-collapse v-model="open">
      <div class="well">
        <p>这是被折叠的内容</p>
        <p>哈哈哈</p>
      </div>
    </sk-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
};
</script>

<style scoped>
.well {
  padding: 16px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-top: 20px;
}

.well p {
  margin: 0;
}
</style>
```

### API

| 参数     | 说明                     | 类型   | 可选值 | 默认值 |
| -------- | ------------------------ | ------ | ------ | ------ |
| tag      | 渲染的包裹标签           | string |        | `div`  |
| duration | 过渡动画的持续时间（ms） | number |        | `350`  |

### 事件

| 事件   | 说明               | 携带参数 |
| ------ | ------------------ | -------- |
| show   | 展开动画开始时触发 | -        |
| shown  | 展开动画结束时触发 | -        |
| hide   | 收起动画开始时触发 | -        |
| hidden | 收起动画结束时触发 | -        |
