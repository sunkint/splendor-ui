<template>
  <div class="docs-preview-part">
    <sk-alert v-if="show" closable @close="show = false">
      <b>好棒！</b> 你成功阅读了这条重要的信息。<a href="#">查看更多…</a>
    </sk-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
};
</script>
