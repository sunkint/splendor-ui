<template>
  <div class="docs-preview-part">
    <sk-tag type="primary" size="small">small</sk-tag>
    <sk-tag type="primary" size="middle">middle</sk-tag>
    <sk-tag type="primary" size="large">large</sk-tag>
    <sk-tag type="primary" round size="small">round</sk-tag>
    <sk-tag type="primary" closable @close="close">closable</sk-tag>

    <div style="margin-top: 10px;"></div>

    <sk-tag type="primary">primary</sk-tag>
    <sk-tag type="secondary">secondary</sk-tag>
    <sk-tag type="success">success</sk-tag>
    <sk-tag type="danger">danger</sk-tag>
    <sk-tag type="warning">warning</sk-tag>
    <sk-tag type="info">info</sk-tag>
    <sk-tag type="light">light</sk-tag>

    <div class="docs-preview-part" style="margin-top: 10px; background-color: #eee; padding: 8px;">
      <sk-tag type="primary" ghost>primary</sk-tag>
      <sk-tag type="secondary" ghost>secondary</sk-tag>
      <sk-tag type="success" ghost>success</sk-tag>
      <sk-tag type="danger" ghost>danger</sk-tag>
      <sk-tag type="warning" ghost>warning</sk-tag>
      <sk-tag type="info" ghost>info</sk-tag>
      <sk-tag type="light" ghost>light</sk-tag>
      <sk-tag type="primary" round ghost closable @close="close">closable</sk-tag>
    </div>
  </div>
</template>

<script>
import { Notify } from '../../../src/main';
export default {
  name: 'TagPart',
  methods: {
    close() {
      Notify.info('你点了关闭');
    },
  },
};
</script>
