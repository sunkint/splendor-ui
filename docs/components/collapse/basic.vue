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
