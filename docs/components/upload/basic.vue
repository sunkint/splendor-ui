<template>
  <div class="docs-preview-part">
    <sk-upload @upload="upload" />
  </div>
</template>

<script>
export default {
  setup() {
    return {
      upload(_file, report) {
        return new Promise((resolve, reject) => {
          let count = 0;
          const update = () => {
            if (count < 100) {
              count += 10;
              report(count);
              setTimeout(update, 500);
            } else {
              // 随机成功或失败
              const success = Math.random() > 0.5;
              if (success) {
                resolve();
              } else {
                reject();
              }
            }
          };
          setTimeout(update, 500);
        });
      },
    };
  },
};
</script>
