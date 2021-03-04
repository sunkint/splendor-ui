<template>
  <div class="docs-preview-part">
    <img v-for="(n, i) in list" :key="i" class="thumb" @click="preview(i)" :src="n" />
  </div>
</template>

<script>
import { Preview } from '../../../src/main';

export default {
  data() {
    return {
      list: [
        'https://ae01.alicdn.com/kf/Ue46207a195d8466ea2072acc5ce3bad85.jpg',
        'https://ae01.alicdn.com/kf/Udbc8268734c64fed93687e917e9c50f3G.jpg',
        'https://ae01.alicdn.com/kf/U945375e15dcc4066b30e37a81e8f3db5C.jpg',
        'https://ae01.alicdn.com/kf/U6a2f88d9fdef4d059f53dba747cd55768.jpg',
        'https://ae01.alicdn.com/kf/Ub8816253d51e47ac945783e3306739dfo.jpg',
        'https://ae01.alicdn.com/kf/U2ac5e24e328f425c983197b3183c962fk.jpg',
      ],
    };
  },
  methods: {
    preview(index = 0) {
      Preview.images({
        list: this.list,
        index,
      });
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
