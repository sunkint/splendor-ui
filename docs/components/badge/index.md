# Badge 徽标

### 基础用法

<div class="docs-preview-part">
  <sk-badge :value="5">
    <sk-button>消息</sk-button>
  </sk-badge>
  <sk-badge value="new">
    <sk-button>消息</sk-button>
  </sk-badge>
  <sk-badge :value="100">
    <sk-button>消息</sk-button>
  </sk-badge>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-badge :value="5">
      <sk-button>消息</sk-button>
    </sk-badge>
    <sk-badge value="new">
      <sk-button>消息</sk-button>
    </sk-badge>
    <sk-badge :value="100">
      <sk-button>消息</sk-button>
    </sk-badge>
  </div>
</template>
```

### 圆点模式

<div class="docs-preview-part">
  <sk-badge dot>
    <sk-button>消息</sk-button>
  </sk-badge>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-badge dot>
      <sk-button>消息</sk-button>
    </sk-badge>
  </div>
</template>
```

### 单独使用

<div class="docs-preview-part">
  <p>Sunkint <sk-badge value="10"></p>
  <p>Micooz <sk-badge dot></p>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <p>Sunkint <sk-badge value="10"></p>
    <p>Micooz <sk-badge dot></p>
  </div>
</template>
```

### API

| 参数   | 说明                                                       | 类型           | 可选值 | 默认值 |
| ------ | ---------------------------------------------------------- | -------------- | ------ | ------ |
| value  | 内容，若为`number`类型，且小于或等于 0，则不显示徽标       | string、number |        | -      |
| maxNum | （针对`numebr`类型`value`）允许的最大值，超出则用`+`号显示 | number         |        | 99     |
| dot    | 是否显示为小红点，和 `value` 二选一，`dot` 比较优先        | bool           |        | false  |
