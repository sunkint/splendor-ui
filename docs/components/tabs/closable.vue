<template>
  <div class="docs-preview-part">
    <sk-tabs v-model="activeId" @close="tabClose" closable>
      <sk-tab-panel v-for="item in list" :title="'标题' + item.id" :key="item.id" :id="item.id">
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
    tabClose(id) {
      this.list = this.list.filter((item) => item.id !== id);
    },
  },
};
</script>
