<template>
  <div class="docs-preview-part">
    <sk-checkbox v-model="value">我同意</sk-checkbox>
    <br />
    <span>value: {{ value }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: false,
    };
  },
};
</script>
