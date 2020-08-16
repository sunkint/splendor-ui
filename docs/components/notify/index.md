# Notify 轻提示

### 基础用法

<NotifyBasic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-button type="success" @click="notifySuccess">Success</sk-button>
    <sk-button type="info" @click="notifyInfo">Info</sk-button>
    <sk-button type="warning" @click="notifyWarn">Warn</sk-button>
    <sk-button type="danger" @click="notifyError">Error</sk-button>
    <sk-button type="info" @click="notifyCustom">Custom</sk-button>
  </div>
</template>

<script>
import { Notify } from 'splendor-ui';
export default {
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
    notifyCustom() {
      Notify.custom({
        type: 'success',
        content: '时间为5s',
        duration: 5000,
      });
    },
  },
};
</script>
```

### API

| 方法    | 说明       | 参数                                                                                  |
| ------- | ---------- | ------------------------------------------------------------------------------------- |
| success | 成功提示   | `string | { content: string; duration?: number }`                                     |
| info    | 消息提示   | `string | { content: string; duration?: number }`                                     |
| warn    | 警告提示   | `string | { content: string; duration?: number }`                                     |
| error   | 错误提示   | `string | { content: string; duration?: number }`                                     |
| custom  | 自定义提示 | `{ content: string; duration?: number; type: 'success' | 'info' | 'warn' | 'error' }` |
