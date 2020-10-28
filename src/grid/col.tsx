import { defineComponent, inject, computed, Ref, ref } from 'vue';
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
    const gutter = inject<Ref<number[]>>(GutterSymbol) ?? ref([0, 0]);
    const style = computed(() => {
      return {
        ...(gutter.value[0] > 0
          ? {
              paddingLeft: gutter.value[0] / 2,
              paddingRight: gutter.value[0] / 2,
            }
          : {}),
        ...(gutter.value[1] > 0
          ? {
              paddingTop: gutter.value[1] / 2,
              paddingBottom: gutter.value[1] / 2,
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
