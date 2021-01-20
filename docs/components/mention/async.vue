<template>
  <div class="docs-preview-part">
    <sk-mention async @asyncFetch="fetch" />
  </div>
</template>

<script>
export default {
  methods: {
    fetch(word) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!word) {
            return resolve(['111']);
          }
          resolve([word, word.repeat(2), word.repeat(3)]);
        }, 500);
      });
    },
  },
};
</script>
