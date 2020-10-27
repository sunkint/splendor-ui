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
  },
  setup(props, { slots }) {
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
        <div
          class={[
            'sk-col',
            {
              [`sk-col-${props.span}`]: props.span !== undefined,
              [`sk-col-offset-${props.offset}`]: props.offset,
            },
          ]}
          style={style.value}
        >
          {slots.default?.()}
        </div>
      );
    };
  },
});

export default Col;
