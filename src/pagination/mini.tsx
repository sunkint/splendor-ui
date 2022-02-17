import { computed, defineComponent, h, PropType } from 'vue';
import Input from '../input';
import Icon from '../icon';
import { PaginationAlign } from './type';

const MiniPagination = defineComponent({
  name: 'sk-mini-pagination',
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
    disabled: Boolean,
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
    const update = (page: number | string) => {
      emit('update:modelValue', +page || 1);
      emit('change', +page || 1);
    };
    return () => (
      <div class="sk-mini-pagination">
        <div class="sk-pagination-inner" style={{ float: props.align }}>
          {!props.disabled && props.modelValue > 1 ? (
            <Icon type="left-simple" onClick={() => void update(props.modelValue - 1)} />
          ) : (
            <Icon type="left-simple" class="sk-disabled" />
          )}

          {h(Input, {
            type: 'number',
            inline: true,
            max: props.totalPages,
            min: 1,
            disabled: props.disabled,
            modelValue: currentPage.value.toString(),
            class: 'sk-pagination-input',
            style: { width: '64px' },
            'onUpdate:modelValue': update,
          })}

          <span>/</span>

          <span class="sk-mini-pagination-total-pages">{props.totalPages}</span>

          {!props.disabled && props.modelValue < props.totalPages ? (
            <Icon type="right-simple" onClick={() => void update(props.modelValue + 1)} />
          ) : (
            <Icon type="right-simple" class="sk-disabled" />
          )}
        </div>
      </div>
    );
  },
});

export default MiniPagination;
