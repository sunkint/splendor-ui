<template>
  <div class="docs-preview-part">
    <sk-copy-link text="复制的内容" @success="onSuccess" />
  </div>
</template>

<script lang="ts">
import { Notify } from '../../../src/main';
export default {
  methods: {
    onSuccess() {
      Notify.success('复制成功！');
    },
  },
};
</script>
