# SweetAlert 快捷对话框

### 基础用法

<SweetAlertBasic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-button @click="open">点我打开提示</sk-button>
  </div>
</template>

<script>
import { SweetAlert } from 'splendor-ui';
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
```

### 带有确认和取消按钮

<SweetAlertConfirm />

```vue
<template>
  <div class="docs-preview-part">
    <sk-button @click="open">点我打开提示</sk-button>
  </div>
</template>

<script>
import { SweetAlert } from 'splendor-ui';
export default {
  methods: {
    open() {
      SweetAlert.confirm({
        content: '你是否要继续执行该操作？',
      });
    },
  },
};
</script>
```

### 自定义参数

<SweetAlertCustom />

```vue
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
```

### API

#### SweetAlert.alert

| 参数         | 说明                    | 类型                  | 可选值 | 默认值  |
| ------------ | ----------------------- | --------------------- | ------ | ------- |
| title        | 对话框标题              | string                |        | `提示`  |
| content      | 对话框内容              | string                |        | -       |
| confirmText  | 确定按钮的文案          | string                |        | `确定`  |
| maskClosable | 是否可以点击蒙层关闭    | bool                  |        | `false` |
| closeBtn     | 是否显示右上角关闭按钮  | bool                  |        | `true`  |
| closeOnEsc   | 是否可以通过 ESC 键关闭 | bool                  |        | `true`  |
| class        | 对话框的自定义额外类名  | string、array、object |        | -       |
| style        | 对话框的自定义额外样式  | string、object        |        | -       |

#### 事件

| 事件    | 说明                               | 携带参数 |
| ------- | ---------------------------------- | -------- |
| close   | 关闭对话框时触发（外部控制不触发） | -        |
| confirm | 点击确定按钮时触发                 | -        |

#### SweetAlert.confirm

除了具备 `SweetAlert.alert` 的所有 API， `SweetAlert.confirm` 还有：

| 参数       | 说明           | 类型   | 可选值 | 默认值 |
| ---------- | -------------- | ------ | ------ | ------ |
| cancelText | 取消按钮的文案 | string |        | `取消` |

#### 事件

| 事件   | 说明               | 携带参数 |
| ------ | ------------------ | -------- |
| cancel | 点击取消按钮时触发 | -        |
