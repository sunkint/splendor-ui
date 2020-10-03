<template>
  <div class="docs-preview-part">
    <sk-button @click="show = true">打开对话框</sk-button>
    <client-only>
      <sk-dialog v-model="show">
        <p>对话框里还能再打开对话框</p>
        <sk-button @click="show2 = true">打开对话框</sk-button>
        <sk-dialog class="abc" v-model="show2">
          <p>内层对话框</p>
        </sk-dialog>
      </sk-dialog>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      show2: false,
    };
  },
};
</script>
