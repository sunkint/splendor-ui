<template>
  <div class="docs-preview-part">
    <sk-button @click="open">打开对话框</sk-button>
  </div>
</template>

<script>
import { h } from 'vue';
import { Button, openDialog } from '../../../src/main.ts';
export default {
  methods: {
    open() {
      openDialog({
        content: ({ close }) => h('p', '这里是对话框的内容'),
        footer: ({ close }) => h(Button, { onClick: close }, '关闭'),
      });
    },
  },
};
</script>
