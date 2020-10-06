import { defineComponent, PropType, computed } from 'vue';
import Button from '../button';
import './index.scss';

export type PaginationAlign = 'left' | 'right';

const Pagination = defineComponent({
  name: 'sk-pagination',
  props: {
    modelValue: {
      type: Number,
      required: true,
      default: 1,
      validator: (value: number) => {
        return value >= 1;
      },
    },
    totalPages: {
      type: Number,
      required: true,
      default: 1,
    },
    align: {
      type: String as PropType<PaginationAlign>,
      default: 'left',
    },
    onChange: Function as PropType<(page: number) => any>,
  },
  emits: {
    change: (payload: any) => {
      if (typeof payload === 'number' && payload >= 1) {
        return true;
      }
      return false;
    },
    'update:modelValue': null,
  },
  setup(props, { emit }) {
    const currentPage = computed(() => Math.min(props.modelValue, props.totalPages));
    const pageList = computed(() => {
      const pages: number[] = [];
      const startPage = Math.max(1, currentPage.value - 4);
      for (let n = startPage; n <= Math.min(props.totalPages, startPage + 9); n++) {
        pages.push(n);
      }
      return pages;
    });
    const update = (page: number) => {
      emit('update:modelValue', page);
      emit('change', page);
    };
    return () => (
      <div class="sk-pagination">
        <div class="sk-pagination-inner" style={{ float: props.align }}>
          {currentPage.value > 1 ? (
            <>
              <Button onClick={update.bind(null, 1)}>首页</Button>
              <Button onClick={update.bind(null, currentPage.value - 1)}>上一页</Button>
            </>
          ) : (
            false
          )}
          {pageList.value.map((item) => {
            if (item !== currentPage.value) {
              return (
                <Button class="sk-pagination-item" onClick={update.bind(null, item)}>
                  {item}
                </Button>
              );
            }
            return <span class="sk-pagination-current">{item}</span>;
          })}
          {currentPage.value < props.totalPages ? (
            <>
              <Button onClick={update.bind(null, currentPage.value + 1)}>下一页</Button>
              <Button onClick={update.bind(null, props.totalPages)}>尾页</Button>
            </>
          ) : null}
        </div>
      </div>
    );
  },
});

export default Pagination;
