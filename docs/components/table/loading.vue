<template>
  <div class="docs-preview-part">
    <sk-table loading :columns="columns" :data="data" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '姓名',
          name: 'name',
        },
        {
          title: '性别',
          name: 'gender',
        },
        {
          title: '住址',
          name: 'address',
        },
      ],
      data: [],
    };
  },
};
</script>
