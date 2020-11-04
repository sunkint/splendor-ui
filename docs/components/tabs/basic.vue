<template>
  <div class="docs-preview-part">
    <sk-tabs
      v-model="activeId"
      @change="tabsChange"
      closeable
    >
      <sk-tab-panel
        :title="'标题'+item.id"
        v-for="item in list"
        :disabled="item.id === 2"
        :key="item.id"
        :id="item.id"
      >
        第{{item.id}}组
      </sk-tab-panel>
    </sk-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeId: 4,
      list: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    };
  },
  methods: {
    tabsChange(id) {
      console.log('id', id);
      console.log('activeId', this.activeId);
    },
  },
};
</script>