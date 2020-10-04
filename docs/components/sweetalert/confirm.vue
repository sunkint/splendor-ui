<template>
  <div class="docs-preview-part">
    <sk-button @click="open">点我打开提示</sk-button>
  </div>
</template>

<script>
import { SweetAlert } from '../../../src/main';
export default {
  methods: {
    open() {
      SweetAlert.confirm({
        content: '你是否要继续执行该操作？',
      });
    },
  },
};
</script>
