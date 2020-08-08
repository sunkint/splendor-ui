<template>
  <div class="docs-preview-part">
    <sk-button type="success" @click="notifySuccess">Success</sk-button>
    <sk-button type="info" @click="notifyInfo">Info</sk-button>
    <sk-button type="warning" @click="notifyWarn">Warn</sk-button>
    <sk-button type="danger" @click="notifyError">Error</sk-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Notify } from '../../../src/main';
export default defineComponent({
  name: 'NotifyPart',
  methods: {
    notifySuccess() {
      Notify.success('成功提示');
    },
    notifyInfo() {
      Notify.info('信息提示');
    },
    notifyWarn() {
      Notify.warn('警告提示');
    },
    notifyError() {
      Notify.error('失败提示');
    },
  },
});
</script>
