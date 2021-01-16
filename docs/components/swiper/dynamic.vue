<template>
  <div class="docs-preview-part">
    <sk-swiper v-model="currentIndex" :interval="2000">
      <sk-swiper-item v-for="n in ids" :key="n">
        <div class="number">{{ n }}</div>
      </sk-swiper-item>
    </sk-swiper>
    <div class="handle">
      <sk-button type="primary" @click="add">增加</sk-button>
      <sk-button @click="remove">移除</sk-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      ids: [1, 2, 3],
    };
  },
  methods: {
    add() {
      this.ids.push(this.ids.length + 1);
    },
    remove() {
      this.ids.pop();
    },
  },
};
</script>

<style scoped>
.number {
  line-height: 250px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  background-color: #e83e8c;
  color: white;
}

.handle {
  text-align: center;
  margin-top: 12px;
}

.sk-btn + .sk-btn {
  margin-left: 8px;
}
</style>
