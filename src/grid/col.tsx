import { defineComponent, inject, computed } from 'vue';
import { GutterSymbol } from './row';
import './index.scss';

const Col = defineComponent({
  name: 'sk-col',
  props: {
    span: {
      type: Number,
      required: true,
    },
    offset: Number,
    order: Number,
  },
  setup(props, { slots }) {
    const colClass = computed(() => {
      const { span, offset, order } = props;
      return [
        'sk-col',
        {
          [`sk-col-${span}`]: span !== undefined,
          [`sk-col-offset-${span}`]: offset,
          [`sk-col-order-${order}`]: order,
        },
      ];
    });

    const style = computed(() => {
      const gutter = inject<number[]>(GutterSymbol) || [0, 0];
      return {
        ...(gutter[0] > 0
          ? {
              paddingLeft: gutter[0]! / 2,
              paddingRight: gutter[0]! / 2,
            }
          : {}),
        ...(gutter[1]! > 0
          ? {
              paddingTop: gutter[1]! / 2,
              paddingBottom: gutter[1]! / 2,
            }
          : {}),
      };
    });

    return () => {
      return (
        <div class={colClass.value} style={style.value}>
          {slots.default?.()}
        </div>
      );
    };
  },
});

export default Col;
