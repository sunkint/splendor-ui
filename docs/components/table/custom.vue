<template>
  <div class="docs-preview-part">
    <sk-table layout="fixed" bordered :columns="columns" :data="data" />
  </div>
</template>

<script>
import { h } from 'vue';
import { Button, Notify } from '../../../src/main';
export default {
  data() {
    return {
      columns: [
        {
          title: '商品',
          render({ name }) {
            return h('strong', {}, name);
          },
        },
        {
          title: '库存',
          name: 'stock',
        },
        {
          title: '销量',
          name: 'sales',
        },
        {
          title: '操作',
          align: 'right',
          width: '100px',
          render({ name }) {
            return h(
              Button,
              {
                size: 'small',
                onClick: () => {
                  Notify.info(name);
                },
              },
              '查看'
            );
          },
        },
      ],
      data: [1, 2, 3, 4, 5].map((item) => {
        return {
          name: `商品${item}`,
          stock: Math.round(Math.random() * 100),
          sales: Math.round(Math.random() * 100),
        };
      }),
    };
  },
};
</script>
