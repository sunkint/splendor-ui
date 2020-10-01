<template>
  <div class="docs-preview-part">
    <sk-button @click="show = true">打开对话框</sk-button>
    <sk-dialog v-model="show">你好</sk-dialog>
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
