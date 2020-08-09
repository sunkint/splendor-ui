<template>
  <div class="docs-preview-part">
    <sk-dropdown
      :data="selectData"
      :text="`已选主题：${selectedText}`"
      :selectedKeys="[selectedKey]"
      :type="selectedKey"
      @select="onSelect"
    />
  </div>
</template>

<script>
export default {
  name: 'DropDownPart',
  data() {
    return {
      selectData: [
        {
          key: 'default',
          text: '默认',
        },
        {
          key: 'primary',
          text: '主要',
        },
        {
          key: 'success',
          text: '成功',
        },
        {
          key: 'info',
          text: '提醒',
        },
        {
          key: 'warning',
          text: '警告',
        },
        {
          key: 'danger',
          text: '错误',
        },
      ],
      selectedKey: 'default',
      selectedText: '默认',
    };
  },
  methods: {
    onSelect(key, item) {
      this.selectedKey = key;
      this.selectedText = item.text;
    },
  },
};
</script>
