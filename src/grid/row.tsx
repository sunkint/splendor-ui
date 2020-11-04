import { defineComponent, PropType, provide, computed } from 'vue';
import { AlignType, JustifyType, GutterType } from './index';
import './index.scss';

export const GutterSymbol = Symbol();

const getGutter = (gutter: GutterType): [number, number] => {
  return Array.isArray(gutter) ? [gutter[0], gutter[1]] : [gutter, 0];
};

const Row = defineComponent({
  name: 'sk-row',
  props: {
    gutter: {
      type: [Array, Number] as PropType<GutterType>,
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
    provide(GutterSymbol, gutter);
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

export default Row;
