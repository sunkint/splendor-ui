<template>
  <div class="docs-preview-part">
    <sk-infinite-scroll class="demo" @load="load" useWindow>
      <div class="card" v-for="n in list" :key="n">
        <p>随记 #{{ n }}</p>
        <p>这是随记的内容 {{ n }}</p>
      </div>
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
.card {
  border: 1px solid lightgray;
  margin-bottom: 12px;
  padding: 12px 24px;
  font-size: 14px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
</style>
