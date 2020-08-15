# splendor-ui

Vue 3 打造的前端 UI 组件库。主要用于支持下一代 [骁之屋](https://www.ybusad.com/) 前端的开发。

也欢迎大家在自己的项目中试用并提出宝贵的建议。

![Status](https://img.shields.io/badge/status-WIP-blue) ![MIT](https://img.shields.io/badge/license-MIT-green)

### 安装

```bash
# use npm
$ npm i splendor-ui -S
# or use yarn
$ yarn add splendor-ui
```

### 基本用法

```vue
<template>
  <sk-button>Hello World</sk-button>
</template>

<script>
import { Button } from 'splendor-ui';
export default {
  components: {
    [Button.name]: Button, // register sk-button
  },
};
</script>
```

别忘了在你的应用入口引入样式文件：

```js
import 'splendor-ui/es/main.css';
```

### 项目地址

[https://github.com/sunkint/splendor-ui](https://github.com/sunkint/splendor-ui)

### 贡献者

[@sunkint](https://github.com/sunkint)（发起人）

[@chenshiai](https://github.com/chenshiai)

[@zedmund](https://github.com/zedmund)
