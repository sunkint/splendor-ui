<template>
  <slot v-if="inited" />
</template>

<script>
export default {
  name: 'ClientOnly',
  data() {
    return {
      inited: false,
    };
  },
  mounted() {
    this.inited = true;
  },
};
</script>
