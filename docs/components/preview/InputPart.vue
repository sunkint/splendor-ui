<template>
  <div class="docs-preview-part">
    <sk-input v-model="content" />
    <p>输入的内容：{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: 'InputPart',
  data: () => ({
    content: '',
  }),
}
</script>
