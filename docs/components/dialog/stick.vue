<template>
  <div class="docs-preview-part">
    <sk-button @click="show = true">打开对话框</sk-button>
    <client-only>
      <sk-dialog title="顶部对齐的对话框" v-model="show" :style="{ width: '480px' }" stickTop>
        <sk-tabs>
          <sk-tab-panel title="标签1">
            <p>
              <lorem />
            </p>
          </sk-tab-panel>
          <sk-tab-panel title="标签2">
            <p>
              <lorem />
            </p>
            <p>
              <lorem />
            </p>
          </sk-tab-panel>
        </sk-tabs>
      </sk-dialog>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>
