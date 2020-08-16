<template>
  <div class="docs-preview-part">
    <sk-dropdown type="default" text="点击打开菜单" :data="data" />
    <sk-dropdown type="primary" text="点击打开菜单" :data="data" />
    <sk-dropdown type="success" text="点击打开菜单" :data="data" />
    <sk-dropdown type="info" text="点击打开菜单" :data="data" />
    <sk-dropdown type="warning" text="点击打开菜单" :data="data" />
    <sk-dropdown type="danger" text="点击打开菜单" :data="data" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { key: 'food', text: '食品' },
        { key: 'clothes', text: '服装' },
      ],
    };
  },
};
</script>
