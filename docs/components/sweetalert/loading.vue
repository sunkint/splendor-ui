<template>
  <div class="docs-preview-part">
    <sk-button @click="open">点我打开提示</sk-button>
    <sk-button @click="open2">点我打开提示</sk-button>
  </div>
</template>

<script>
import { SweetAlert, Notify } from '../../../src/main';
export default {
  methods: {
    open() {
      SweetAlert.confirm({
        content: '是否删除这篇文章',
        confirmText: '删除',
        cancelText: '取消',
        onConfirm: () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() < 0.8) {
                Notify.success('执行成功');
                resolve();
              } else {
                reject('删除失败');
              }
            }, 2000);
          });
        },
      });
    },
    open2() {
      SweetAlert.alert({
        title: '温馨提示',
        content: '您的操作已经成功执行。',
        confirmText: '收尾',
        onConfirm: () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() < 0.8) {
                Notify.success('执行成功');
                resolve();
              } else {
                reject('收尾失败');
              }
            }, 2000);
          });
        },
      });
    },
  },
};
</script>
