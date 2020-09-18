<template>
  <div class="docs-preview-part">
    <sk-switch v-model="value" />
    <span>{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: 'SwitchPart',
  data() {
    return {
      value: false,
    };
  },
};
</script>
