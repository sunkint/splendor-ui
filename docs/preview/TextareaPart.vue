<template>
  <div class="docs-preview-part">
    <div class="flex">
      <sk-textarea placeholder="输点什么吧" v-model="content" :autoHeight="autoHeight" />
      <div style="margin-left: 8px; margin-top: 8px;">
        <sk-switch v-model="autoHeight" /> autoHeight
      </div>
    </div>
    <p>输入的内容：{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: 'TextareaPart',
  data: () => ({
    content: '',
    autoHeight: true,
  }),
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: flex-start;

  button {
    margin-left: 8px;
  }
}
</style>
