<template>
  <div class="docs-preview-part">
    <sk-upload multiple :limit="3" @upload="upload">
      <sk-button type="info" icon="upload">选择文件（最多3个）</sk-button>
    </sk-upload>
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
