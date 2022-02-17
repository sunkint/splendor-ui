<template>
  <div class="docs-preview-part">
    <sk-pagination v-model="page" :totalPages="15" />
    <br />
    <sk-pagination v-model="page" buttonType="text" :totalPages="15" />
    <br />
    <sk-mini-pagination v-model="page" :totalPages="15" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
    };
  },
};
</script>
