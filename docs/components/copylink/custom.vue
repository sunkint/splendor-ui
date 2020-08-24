<template>
  <div class="docs-preview-part">
    <sk-copy-link text="复制的内容" @success="onSuccess" v-slot="{ copy }">
      <sk-button @click="copy">点我复制</sk-button>
    </sk-copy-link>
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
