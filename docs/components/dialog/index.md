# Dialog 对话框

### 基础用法

<DialogBasic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-button @click="show = true">打开对话框</sk-button>
    <sk-dialog v-model="show">
      <p>这里是对话框的内容</p>
    </sk-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>
```

### 命令式调用

可以使用 `openDialog` 命令式调起对话框，该命令返回一个 dialogID，可使用 `closeDialog` 命令传入 dialogID 关闭该对话框。

<DialogCommand />

```vue
<template>
  <div class="docs-preview-part">
    <sk-button @click="open">打开对话框</sk-button>
  </div>
</template>

<script>
import { h } from 'vue';
import { Button, openDialog } from 'splendor-ui';
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
```

### 对话框嵌套

<DialogNesting />

```vue
<template>
  <div class="docs-preview-part">
    <sk-button @click="show = true">打开对话框</sk-button>
    <sk-dialog v-model="show">
      <p>对话框里还能再打开对话框</p>
      <sk-button @click="show2 = true">打开对话框</sk-button>
      <sk-dialog v-model="show2">
        <p>内层对话框</p>
      </sk-dialog>
    </sk-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      show2: false,
    };
  },
};
</script>
```

### 带 Footer 的对话框

<DialogFooter />

```vue
<template>
  <div class="docs-preview-part">
    <sk-button @click="show = true">打开对话框</sk-button>
    <sk-dialog title="带 Footer 的对话框" v-model="show">
      <p>这里是对话框的内容</p>
      <template #footer>
        <sk-button @click="show = false">取消</sk-button>
        <sk-button @click="show = false" type="primary">确定</sk-button>
      </template>
    </sk-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>
```

### 顶部对齐的对话框

对话框顶部位置固定，适合内容很长且存在变换的场景。

<DialogStick />

```vue
<template>
  <div class="docs-preview-part">
    <sk-button @click="show = true">打开对话框</sk-button>
    <sk-dialog title="顶部对齐的对话框" v-model="show" :style="{ width: '480px' }" stickTop>
      <sk-tabs>
        <sk-tab-panel title="标签1">
          <p>
            <lorem />
          </p>
        </sk-tab-panel>
        <sk-tab-panel title="标签2">
          <p>
            <lorem />
          </p>
          <p>
            <lorem />
          </p>
        </sk-tab-panel>
      </sk-tabs>
    </sk-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>
```

### Tip: 如何指定宽度？

默认 `Dialog` 会自适应内容的宽度，并具有最小和最大宽度；

在 `style` 里可以指定对话框的宽度，如 `style="width: 600px"` 。

### API

| 参数           | 说明                     | 类型                  | 可选值 | 默认值  |
| -------------- | ------------------------ | --------------------- | ------ | ------- |
| title          | 对话框标题               | string                |        | `提示`  |
| v-model        | 控制对话框打开/关闭      | bool                  |        | -       |
| maskClosable   | 是否可以点击蒙层关闭     | bool                  |        | `true`  |
| closeBtn       | 是否显示右上角关闭按钮   | bool                  |        | `true`  |
| closeOnEsc     | 是否可以通过 ESC 键关闭  | bool                  |        | `true`  |
| stickTop       | 是否为顶部对齐展示       | bool                  |        | `false` |
| stickTopOffset | 顶部对齐展示时，顶部边距 | number                |        | `120`   |
| class          | 对话框的自定义额外类名   | string、array、object |        | -       |
| style          | 对话框的自定义额外样式   | string、object        |        | -       |

### 事件

| 事件  | 说明                               | 携带参数 |
| ----- | ---------------------------------- | -------- |
| close | 关闭对话框时触发（外部控制不触发） | -        |
