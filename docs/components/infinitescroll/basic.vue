<template>
  <div class="docs-preview-part">
    <sk-infinite-scroll class="demo" @load="load" :hasMore="hasMore" :height="320">
      <div class="card" v-for="n in list" :key="n">{{ n }}</div>
    </sk-infinite-scroll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      hasMore: true,
    };
  },
  methods: {
    load() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const n = this.list.length;
          if (n >= 120) {
            this.hasMore = false;
            return resolve();
          }
          for (let i = n + 1; i <= n + 20; i++) {
            this.list.push(i);
          }
          resolve();
        }, 1000);
      });
    },
  },
};
</script>

<style scoped>
.demo {
  border: 1px solid lightgray;
}

.card {
  border-bottom: 1px solid lightgray;
  line-height: 40px;
  font-size: 14px;
  padding-left: 24px;
}
</style>
