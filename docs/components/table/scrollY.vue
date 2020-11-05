<template>
  <div class="docs-preview-part">
    <sk-table height="270px" :columns="columns" :data="data" />
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
          width: 200,
        },
        {
          title: '性别',
          name: 'gender',
        },
        {
          title: '住址',
          name: 'address',
        },
        {
          title: '联系方式',
          name: 'phone',
        },
      ],
      data: [
        {
          name: '孙某某',
          gender: '男',
          address: '滨海市民主大街4601号、滨海市民主大街4602号',
          phone: '13200000001',
        },
        {
          name: '陈某某',
          gender: '女',
          address: '滨海市民主大街4616号、滨海市民主大街4617号',
          phone: '13200000002',
        },
        {
          name: '胡某某',
          gender: '女',
          address: '滨海市民主大街4625号、滨海市民主大街4626号',
          phone: '13200000003',
        },
        {
          name: '夏某某',
          gender: '男',
          address: '滨海市团结大道865号、滨海市团结大道866号',
          phone: '13200000004',
        },
        {
          name: '罗某某',
          gender: '男',
          address: '滨海市民主大街4601号、滨海市民主大街4602号',
          phone: '13200000001',
        },
        {
          name: '张某某',
          gender: '女',
          address: '滨海市民主大街4616号、滨海市民主大街4617号',
          phone: '13200000002',
        },
        {
          name: '李某某',
          gender: '女',
          address: '滨海市民主大街4625号、滨海市民主大街4626号',
          phone: '13200000003',
        },
        {
          name: '钱某某',
          gender: '男',
          address: '滨海市团结大道865号、滨海市团结大道866号',
          phone: '13200000004',
        },
      ],
    };
  },
};
</script>
