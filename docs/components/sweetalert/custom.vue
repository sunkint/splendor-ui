<template>
  <div class="docs-preview-part">
    <sk-button @click="open">点我打开提示</sk-button>
  </div>
</template>

<script>
import { SweetAlert, Notify } from '../../../src/main';
export default {
  methods: {
    open() {
      SweetAlert.confirm({
        title: '协议',
        content: '您是否同意我们的用户协议？',
        confirmText: '同意',
        cancelText: '再想想',
        onConfirm: () => {
          Notify.info('你点了同意按钮');
        },
        onCancel: () => {
          Notify.info('你点了再想想按钮');
        },
        onClose: () => {
          Notify.info('对话框关掉了');
        },
        closeOnEsc: true,
        closeBtn: false,
        maskClosable: true,
        style: { width: '600px' },
      });
    },
  },
};
</script>
