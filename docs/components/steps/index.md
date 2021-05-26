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
