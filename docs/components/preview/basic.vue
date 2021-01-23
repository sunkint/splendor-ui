<template>
  <div class="docs-preview-part">
    <img
      class="thumb"
      @click="preview"
      src="https://i.loli.net/2021/01/23/EJbRjTHCfdKuzBh.jpg"
      alt=""
    />
  </div>
</template>

<script>
import { Preview } from '../../../src/main';

export default {
  methods: {
    preview() {
      Preview.image('https://i.loli.net/2021/01/23/EJbRjTHCfdKuzBh.jpg');
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
