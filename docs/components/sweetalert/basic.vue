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
      SweetAlert.alert({
        content: '操作已经成功执行。',
      });
    },
  },
};
</script>
