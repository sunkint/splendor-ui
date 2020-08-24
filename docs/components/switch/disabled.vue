<template>
  <div class="docs-preview-part">
    <sk-switch v-model="value1" disabled />
    <sk-switch v-model="value2" disabled />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: false,
      value2: true,
    };
  },
};
</script>
