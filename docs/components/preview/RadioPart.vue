<template>
  <div class="docs-preview-part">
    <sk-radio value="apple" v-model="selected">苹果</sk-radio>
    <sk-radio value="banana" v-model="selected">香蕉</sk-radio>
    <sk-radio value="orange" v-model="selected">橘子</sk-radio>
    <sk-radio value="watermelon" v-model="selected">西瓜</sk-radio>
    <sk-radio value="!" v-model="selected" disabled>不能选</sk-radio>
    <br />
    <span>已选：{{ selected }}</span>
  </div>
</template>

<script>
export default {
  name: 'RadioPart',
  data() {
    return {
      selected: '',
    };
  },
};
</script>
