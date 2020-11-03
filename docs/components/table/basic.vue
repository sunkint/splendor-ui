<template>
  <div class="docs-preview-part">
    <sk-table :columns="columns" :data="data" />
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
      data: [
        {
          name: '孙某某',
          gender: '男',
          address: '滨海市民主大街4601号',
        },
        {
          name: '陈某某',
          gender: '女',
          address: '滨海市民主大街4616号',
        },
        {
          name: '胡某某',
          gender: '女',
          address: '滨海市民主大街4625号',
        },
        {
          name: '夏某某',
          gender: '男',
          address: '滨海市团结大街865号',
        },
      ],
    };
  },
};
</script>
