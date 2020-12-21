<template>
  <div class="docs-preview-part">
    <sk-swiper />
    <span>{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: 'SwiperPart',
  data() {
    return {
      value: false,
    };
  },
};
</script>
