<template>
  <div class="docs-preview-part">
    <sk-button href="https://www.ybusad.com/">Link</sk-button>
    <sk-button type="primary" @click="alert">Primary</sk-button>
    <sk-button type="success" @click="alert">Success</sk-button>
    <sk-button type="info" @click="alert">Info</sk-button>
    <sk-button type="warning" @click="alert">Warning</sk-button>
    <sk-button type="danger" @click="alert">Danger</sk-button>
    <sk-button type="danger" round @click="alert">Round</sk-button>
  </div>
</template>

<script>
import { Notify } from '../../../src/main';
export default {
  name: 'ButtonPart',
  methods: {
    alert() {
      Notify.success('点了按钮');
    },
  },
};
</script>
