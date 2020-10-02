<template>
  <div class="docs-preview-part">
    <sk-button @click="show = true">打开对话框</sk-button>
    <sk-dialog title="带 Footer 的对话框" v-model="show">
      <p>这里是对话框的内容</p>
      <template #footer>
        <sk-button @click="show = false">取消</sk-button>
        <sk-button @click="show = false" type="primary">确定</sk-button>
      </template>
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
