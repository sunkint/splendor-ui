import { defineComponent, inject, PropType, provide, computed } from 'vue';
import './index.scss';

export interface ColProps {
  span: number;
  offset?: number;
  order?: number;
}

export type AlignType = 'top' | 'middle' | 'bottom';
export type JustifyType = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
type GutterType = number[] | number;

export const GutterSymbol = Symbol();

const getGutter = (gutter: GutterType): [number, number] => {
  return Array.isArray(gutter) ? [gutter[0], gutter[1]] : [gutter, 0];
};

const Row = defineComponent({
  name: 'sk-row',
  props: {
    className: String,
    gutter: {
      type: (Array as PropType<Array<number>>) || Number,
      default: 0,
    },
    align: {
      type: String as PropType<AlignType>,
      default: 'top' as AlignType,
    },
    justify: {
      type: String as PropType<JustifyType>,
      default: 'start' as JustifyType,
    },
  },
  setup(props, { slots }) {
    const gutter = computed(() => getGutter(props.gutter));
    provide(GutterSymbol, gutter.value);

    const rowClass = computed(() => {
      const { align, justify } = props;
      return [
        'sk-row',
        {
          [`sk-row-${align}`]: align,
          [`sk-row-${justify}`]: justify,
        },
      ];
    });

    const rowStyle = computed(() => {
      return {
        ...(gutter.value[0] > 0
          ? {
              marginLeft: -gutter.value[0] / 2,
              marginRight: -gutter.value[0] / 2,
            }
          : {}),
        ...(gutter.value[1] > 0
          ? {
              marginTop: -gutter.value[1] / 2,
              marginBottom: -gutter.value[1] / 2,
            }
          : {}),
      };
    });

    return () => {
      return (
        <div class={rowClass.value} style={rowStyle.value}>
          {slots.default?.()}
        </div>
      );
    };
  },
});

const Col = defineComponent({
  name: 'sk-col',
  props: {
    span: Number,
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

export { Row, Col };
