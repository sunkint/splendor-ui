<template>
  <div class="docs-preview-part">
    <sk-tag type="primary">primary</sk-tag>
    <sk-tag type="secondary">secondary</sk-tag>
    <sk-tag type="success">success</sk-tag>
    <sk-tag type="danger">danger</sk-tag>
    <sk-tag type="warning">warning</sk-tag>
    <sk-tag type="info">info</sk-tag>
    <sk-tag type="light">light</sk-tag>
    <sk-tag type="dark" size="large" :closable="true" @close="close">dark</sk-tag>
  </div>
</template>

<script>
export default {
  name: 'TagPart',
  methods: {
    close() {
      alert('你点了关闭');
    }
  },
}
</script>
