# Slider 滑动输入条

### 基础用法

<SliderBasic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-slider v-model="value" />
    <p>当前值：{{ value }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
    };
  },
};
</script>
```

### 自定义最小值/最大值

<SliderMinmax />

```vue
<template>
  <div class="docs-preview-part">
    <sk-row :gutter="20">
      <sk-col :span="8">
        <sk-slider v-model="value1" :min="50" :max="120" />
        <p>当前值：{{ value1 }}</p>
      </sk-col>
      <sk-col :span="8">
        <sk-slider v-model="value2" :min="-50" :max="50" />
        <p>当前值：{{ value2 }}</p></sk-col
      >
      <sk-col :span="8">
        <sk-slider v-model="value3" :min="-100" :max="-80" />
        <p>当前值：{{ value3 }}</p></sk-col
      >
    </sk-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 100,
      value2: -10,
      value3: -100,
    };
  },
};
</script>
```

### 规定步长

<SliderStep />

```vue
<template>
  <div class="docs-preview-part">
    <sk-slider v-model="value" :step="5" />
    <p>当前值：{{ value }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
    };
  },
};
</script>
```

### 禁用

<div class="docs-preview-part">
  <sk-slider :modelValue="15" disabled />
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-slider :modelValue="15" disabled />
  </div>
</template>
```

### API

| 参数     | 说明                             | 类型   | 可选值 | 默认值  |
| -------- | -------------------------------- | ------ | ------ | ------- |
| step     | 步长                             | number |        | `1`     |
| min      | 最小值                           | number |        | `0`     |
| max      | 最大值                           | number |        | `100`   |
| shopTip  | 鼠标移到滑块上时，是否提示当前值 | bool   |        | `true`  |
| disabled | 是否禁用                         | bool   |        | `false` |
| name     | html name                        | string |        | -       |

### 事件

| 事件   | 说明                         | 携带参数        |
| ------ | ---------------------------- | --------------- |
| change | 滑动输入条最终产生变化时触发 | `value: number` |
