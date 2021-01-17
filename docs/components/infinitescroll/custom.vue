<template>
  <div class="docs-preview-part">
    <sk-infinite-scroll
      class="demo"
      :autoLoad="false"
      @load="load"
      :hasMore="hasMore"
      :height="320"
    >
      <div class="card" v-for="n in list" :key="n">{{ n }}</div>
      <template #loading>
        <strong>正在拉取数据……</strong>
      </template>
      <template #complete>
        <strong>没有更多数据了 :)</strong>
      </template>
      <template v-slot:error="{ load }">
        <strong>欧呦，没加载出，<a @click="load">重试</a></strong>
      </template>
      <template v-slot:continue="{ load }">
        <strong>点 <a @click="load">这里</a> 拉取下面的数据</strong>
      </template>
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
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const n = this.list.length;
          if (n >= 120) {
            this.hasMore = false;
            return resolve();
          }
          if (Math.random() < 0.4) {
            reject();
          } else {
            for (let i = n + 1; i <= n + 20; i++) {
              this.list.push(i);
            }
            resolve();
          }
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
