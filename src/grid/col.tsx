import { defineComponent, inject } from 'vue';
import './index.scss';

import { GutterSymbol } from './row';

export interface ColProps {
  span: number;
  offset?: number;
  order?: number;
}

const Col = defineComponent({
  name: 'sk-col',
  props: {
    span: Number,
    offset: Number,
    order: Number,
  },
  setup(props, context) {
    return () => {
      const {
        span,
        offset,
        order,
      } = props;
      const { slots } = context;
      const colClass = [
        'sk-col',
        {
          [`sk-col-${span}`]: span !== undefined,
          [`sk-col-offset-${span}`]: offset,
          [`sk-col-order-${order}`]: order,
        },
      ];
      const gutter = inject<number[]>(GutterSymbol) || [0, 0];
      const style = {
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
      console.log('3', gutter[0])
      return (
        <div class={colClass} style={style}>
          {slots.default && slots.default()}
        </div>
      );
    }
  },
});

export default Col;
