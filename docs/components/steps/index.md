# Steps 步骤条

### 基础用法

<StepsBasic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-steps :current="current">
      <sk-step title="第一步" description="填写注册信息" />
      <sk-step title="第二步" description="完善用户资料" />
      <sk-step title="第三步" description="注册成功" />
    </sk-steps>
    <sk-button @click="prev">上一步</sk-button>
    <sk-button @click="next">下一步</sk-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
    };
  },
  methods: {
    prev() {
      if (this.current > 0) {
        this.current--;
      }
    },
    next() {
      if (this.current < 2) {
        this.current++;
      }
    },
  },
};
</script>

<style scoped>
button {
  margin-top: 12px;
}
</style>
```

### 错误状态

为 Steps 添加 `status` 属性规定当前状态

<StepsError />

```vue
<template>
  <div class="docs-preview-part">
    <sk-steps :current="current" status="error">
      <sk-step title="第一步" description="填写注册信息" />
      <sk-step title="第二步" description="完善用户资料" />
      <sk-step title="第三步" description="注册成功" />
    </sk-steps>
    <sk-button @click="prev">上一步</sk-button>
    <sk-button @click="next">下一步</sk-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
    };
  },
  methods: {
    prev() {
      if (this.current > 0) {
        this.current--;
      }
    },
    next() {
      if (this.current < 2) {
        this.current++;
      }
    },
  },
};
</script>

<style scoped>
button {
  margin-top: 12px;
}
</style>
```

### 使用图标

设置 Step 的 `icon` 属性，可显示图标

<StepsIcon />

```vue
<template>
  <div class="docs-preview-part">
    <sk-steps :current="current">
      <sk-step title="第一步" icon="buy" description="填写注册信息" />
      <sk-step title="第二步" icon="car" description="完善用户资料" />
      <sk-step title="第三步" icon="drift-bottle" description="注册成功" />
    </sk-steps>
    <sk-button @click="prev">上一步</sk-button>
    <sk-button @click="next">下一步</sk-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
    };
  },
  methods: {
    prev() {
      if (this.current > 0) {
        this.current--;
      }
    },
    next() {
      if (this.current < 2) {
        this.current++;
      }
    },
  },
};
</script>

<style scoped>
button {
  margin-top: 12px;
}
</style>
```

### 竖版步骤条

<StepsVertical />

### API

#### Steps

| 参数      | 说明                        | 类型   | 可选值                               | 默认值       |
| --------- | --------------------------- | ------ | ------------------------------------ | ------------ |
| current   | 当前步骤的序号（从 0 开始） | number |                                      | 0            |
| status    | 指定当前步骤的状态          | string | `wait`、`process`、`finish`、`error` | `wait`       |
| direction | 指定步骤条方向              | string | `horizontal`、`vertical`             | `horizontal` |

#### Step

| 参数        | 说明                                                  | 类型   | 必填 | 默认值 |
| ----------- | ----------------------------------------------------- | ------ | ---- | ------ |
| title       | 标题                                                  | string | 是   | -      |
| description | 描述                                                  | string | 否   | -      |
| icon        | 图标，详见 [Icon](../icon/index#内置图标) 组件的 type | string | 否   | -      |
