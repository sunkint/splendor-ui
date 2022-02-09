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
