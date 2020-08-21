<template>
  <div class="docs-preview-part">
    <sk-copy-link text="CopyLink基本用法" @success="onSuccess" />
    <sk-copy-link text="CopyLink自定义触发器" @success="onSuccess" v-slot="{ copy }">
      <sk-button @click="copy">复制</sk-button>
    </sk-copy-link>
    <sk-input placeholder="粘贴试试..." inline />
  </div>
</template>

<script>
import { Notify } from '../../../src/main';
export default {
  name: 'CopyLinkPart',
  methods: {
    onSuccess() {
      Notify.success('复制成功！');
    },
  },
};
</script>
