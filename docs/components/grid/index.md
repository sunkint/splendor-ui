# Grid 栅格组件

### 基础用法
<div class="docs-preview-part">
  <sk-row :gutter="[5, 5]" :style="rowStyle">
    <sk-col :span="6"><div :style="style">col-6</div></sk-col>
    <sk-col :span="6"><div :style="style">col-6</div></sk-col>
    <sk-col :span="6"><div :style="style">col-6</div></sk-col>
    <sk-col :span="6"><div :style="style">col-6</div></sk-col>
  </sk-row>
  <sk-row :style="rowStyle">
    <sk-col :span="6"><div :style="style">col-6</div></sk-col>
    <sk-col :span="6"><div :style="style">col-6</div></sk-col>
    <sk-col :span="6"><div :style="style">col-6</div></sk-col>
    <sk-col :span="6"><div :style="style">col-6</div></sk-col>
  </sk-row>
  <sk-row :style="rowStyle">
    <sk-col :span="6" :offset="6"><div :style="style">col-6</div></sk-col>
    <sk-col :span="6" :offset="6"><div :style="style">col-6</div></sk-col>
  </sk-row>
  <sk-row justify="space-around" :style="rowStyle">
    <sk-col :span="4"><div :style="style">col-4</div></sk-col>
    <sk-col :span="4"><div :style="style">col-4</div></sk-col>
    <sk-col :span="4"><div :style="style">col-4</div></sk-col>
    <sk-col :span="4"><div :style="style">col-4</div></sk-col>
  </sk-row>
</div>

<script>
export default {
  data() {
    return {
      style: {
        background: '#18bc9c',
        color: '#fff',
        padding: '8px 0',
        textAlign: 'center'
      },
      rowStyle: {
        marginBottom: '10px'
      }
    };
  },
};
</script>

```vue
<template>
  <sk-row :gutter="[5, 5]">
    <sk-col :span="6"><div :style="style">col-6</div></sk-col>
    <sk-col :span="6"><div :style="style">col-6</div></sk-col>
    <sk-col :span="6"><div :style="style">col-6</div></sk-col>
    <sk-col :span="6"><div :style="style">col-6</div></sk-col>
  </sk-row>
  <sk-row>
    <sk-col :span="6"><div :style="style">col-6</div></sk-col>
    <sk-col :span="6"><div :style="style">col-6</div></sk-col>
    <sk-col :span="6"><div :style="style">col-6</div></sk-col>
    <sk-col :span="6"><div :style="style">col-6</div></sk-col>
  </sk-row>
  <sk-row>
    <sk-col :span="6" :offset="6"><div :style="style">col-6</div></sk-col>
    <sk-col :span="6" :offset="6"><div :style="style">col-6</div></sk-col>
  </sk-row>
  <sk-row justify="space-around">
    <sk-col :span="4"><div :style="style">col-4</div></sk-col>
    <sk-col :span="4"><div :style="style">col-4</div></sk-col>
    <sk-col :span="4"><div :style="style">col-4</div></sk-col>
    <sk-col :span="4"><div :style="style">col-4</div></sk-col>
  </sk-row>
</template>

<script>
export default {
  data() {
    return {
      style: {
        background: '#000',
        padding: '8px 0'
      }
    };
  },
};
</script>
```

### API

#### Row
| 参数     | 说明          | 类型   | 可选值                      | 默认值    |
| -------- | ------------------ | ------ | -------------------------- | --------- |
| className    | className   | string |  | - |
| gutter     | 栅格间隔，支持数字或者数组来设置[水平间距, 垂直间距]    | `number` 、 `array` |    | 0  |
| align    | 垂直对齐方式    | string   |    `top` 、 `middle` 、`bottom`   | `top`   |
| justify    | 水平排列方式     | string   |    `start` 、 `end` 、 `center` 、 `space-around` 、 `space-between`  | `start`   |

#### Col
| 参数     | 说明          | 类型   | 可选值                      | 默认值     |
| ------- | ------------ | ------ | -------------------------- | --------- |
| span | 栅格占据的格数   | number |  | 0 |
| offset     | 栅格左侧间隔的格数     | number |       | 0  |
| order    | 栅格顺序    | number   |       | 0   |