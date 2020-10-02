<template>
  <div class="docs-preview-part">
    <sk-button @click="show = true">打开对话框</sk-button>
    <sk-dialog v-model="show">
      <p>这里是对话框的内容</p>
    </sk-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>
