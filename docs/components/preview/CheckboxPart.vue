<template>
  <div class="docs-preview-part">
    <sk-checkbox-group v-model="value">
      <sk-checkbox value="apple">苹果</sk-checkbox>
      <sk-checkbox value="banana">香蕉</sk-checkbox>
      <sk-checkbox value="pineapple">菠萝</sk-checkbox>
      <sk-checkbox value="lychee">荔枝</sk-checkbox>
      <sk-checkbox value="peach" disabled>桃子</sk-checkbox>
    </sk-checkbox-group>
    <span>已选：{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: 'CheckboxPart',
  data() {
    return {
      value: ['apple'],
    };
  },
};
</script>
