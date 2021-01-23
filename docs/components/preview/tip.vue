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
        'https://i.loli.net/2021/01/23/EJbRjTHCfdKuzBh.jpg',
        'https://i.loli.net/2021/01/23/8ckYryqQ5vPCpwG.jpg',
        'https://i.loli.net/2021/01/23/d9zV8is75ON1qeX.jpg',
        'https://i.loli.net/2021/01/23/6oKzFpsAQkaP2Sb.jpg',
        'https://i.loli.net/2021/01/23/7VHOyhRu9zAC65f.jpg',
        'https://i.loli.net/2021/01/23/GE7zu31MF2xOegp.jpg',
      ],
      tips: [
        '月亮、梯子和兔子',
        '兔子、礼物和气球',
        '树根、兔子和鸟笼',
        '鲜花、自行车和气球',
        '兔子、鲜花和气球',
        '兔子、爱心上写着 I LOVE YOU',
      ],
    };
  },
  methods: {
    preview(index = 0) {
      Preview.images({
        list: this.list,
        renderTip: (i) => `(${i + 1}/${this.list.length}) ${this.tips[i]}`,
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
