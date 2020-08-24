import { defineComponent, PropType, provide } from 'vue';
// import { useGutterProvide, useGutterInject } from './gutter';
import './index.scss';

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
      type: Array as PropType<Array<number>> || Number,
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
    const gutter = getGutter(props.gutter);
    provide(GutterSymbol, gutter);

    return () => {
      const {
        className,
        align,
        justify,
        ...others
      } = props;
      const rowClass = [
        'sk-row',
        className,
        {
          [`sk-row-${align}`]: align,
          [`sk-row-${justify}`]: justify
        },
      ];
      const rowStyle = {
        ...(gutter[0] > 0
          ? {
            marginLeft: -gutter[0] / 2,
            marginRight: -gutter[0] / 2,
          }
          : {}),
        ...(gutter[1] > 0
          ? {
            marginTop: -gutter[1] / 2,
            marginBottom: -gutter[1] / 2,
          }
          : {}),
      };

      return (
        <div {...others} class={rowClass} style={rowStyle}>
          {slots.default && slots.default()}
        </div>
      );
    }
  },
});

export default Row;
