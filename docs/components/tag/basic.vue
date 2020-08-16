<template>
  <div class="docs-preview-part">
    <sk-tag size="small">small</sk-tag>
    <sk-tag size="medium">medium</sk-tag>
    <sk-tag size="large">large</sk-tag>
    <sk-tag round size="small">round</sk-tag>
    <sk-tag closable @close="close">closable</sk-tag>
  </div>
</template>

<script>
import { Notify } from '../../../src/main';
export default {
  methods: {
    close() {
      Notify.info('你点了关闭');
    },
  },
};
</script>
