<template>
  <div class="docs-preview-part">
    <img
      class="thumb"
      @click="preview"
      src="https://ae01.alicdn.com/kf/Ue46207a195d8466ea2072acc5ce3bad85.jpg"
      alt=""
    />
  </div>
</template>

<script>
import { Preview } from '../../../src/main';

export default {
  methods: {
    preview() {
      Preview.image('https://ae01.alicdn.com/kf/Ue46207a195d8466ea2072acc5ce3bad85.jpg');
    },
  },
};
</script>

<style scoped>
.thumb {
  height: 140px;
  cursor: pointer;
}
</style>
