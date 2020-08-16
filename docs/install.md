# 开发指南

使用 Yarn（推荐）：

```bash
yarn add splendor-ui
```

使用 NPM：

```bash
npm i splendor-ui -S
```

## 全局注册

```ts
import { install } from 'splendor-ui';
import 'splendor-ui/es/main.css';

app.use(install); // app is created by Vue's createApp.
```

## 使用 - 基于 Vue 模板

```vue
<template>
  <sk-button type="primary" @click="greet">Hello</sk-button>
</template>

<script>
import { Notify } from 'splendor-ui';
export default {
  methods: {
    greet() {
      Notify.success('Hello World!');
    },
  },
};
</script>
```

效果：

<GuideExample />

## 使用 - 基于 JSX/TSX

```tsx
import { defineComponent } from 'vue';
import { Button, Notify } from 'splendor-ui';

export default defineComponent(() => {
  const greet = () => {
    Notify.success('Hello World!');
  };
  return () => (
    <Button type="primary" onClick={greet}>
      Hello
    </Button>
  );
});
```

效果：

<GuideExampleTsx />
