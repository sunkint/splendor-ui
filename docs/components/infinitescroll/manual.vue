<template>
  <div class="docs-preview-part">
    <sk-infinite-scroll class="demo" @load="load" :autoLoad="false" :height="320">
      <div class="card" v-for="n in list" :key="n">{{ n }}</div>
    </sk-infinite-scroll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    load() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const n = this.list.length;
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
