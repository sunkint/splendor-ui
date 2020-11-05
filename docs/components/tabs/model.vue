<template>
  <div class="docs-preview-part">
    <p>当前查看：第{{ activeId }}组 <sk-button @click="switch">切换</sk-button></p>
    <sk-tabs v-model="activeId">
      <sk-tab-panel :title="'标题' + item.id" v-for="item in list" :key="item.id" :id="item.id">
        第{{ item.id }}组
      </sk-tab-panel>
    </sk-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeId: 1,
      list: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    };
  },
  methods: {
    switch() {
      this.activeId = this.activeId === 4 ? 1 : this.activeId + 1;
    },
  },
};
</script>
