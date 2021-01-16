<template>
  <div class="docs-preview-part">
    <sk-swiper v-model="currentIndex" :loop="false">
      <sk-swiper-item v-for="n in ids" :key="n">
        <div class="number">{{ n }}</div>
      </sk-swiper-item>
    </sk-swiper>
    <div class="handle">
      <sk-button v-for="(n, i) in ids" @click="currentIndex = i">{{ n }}</sk-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      ids: ['一', '二', '三', '四', '五'],
    };
  },
};
</script>

<style scoped>
.number {
  line-height: 250px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  background-color: #18bc9c;
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
