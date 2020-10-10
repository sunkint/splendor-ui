import { defineComponent, h, PropType } from 'vue';
import FloatLayer, { LayerPosition } from '../float-layer';
import './index.scss';

const Tooltip = defineComponent({
  name: 'sk-tooltip',
  props: {
    content: String,
    position: {
      type: String as PropType<LayerPosition>,
      default: 'top-center' as LayerPosition,
    },
    triggerClass: null,
    onOpen: Function as PropType<() => any>,
    onClose: Function as PropType<() => any>,
  },
  setup(props, { slots, attrs }) {
    return () => {
      if (!props.content) {
        return slots.default?.();
      }

      return h(
        FloatLayer,
        {
          ...attrs,
          trigger: 'hover',
          position: props.position,
          triggerClass: props.triggerClass,
          onOpen: props.onOpen,
          onClose: props.onClose,
          transition: 160,
          cushion: 4,
        },
        {
          default: slots.default,
          content: () => (
            <div class={['sk-tooltip-content', `sk-tooltip-position-${props.position}`]}>
              {props.content}
            </div>
          ),
        }
      );
    };
  },
});

export default Tooltip;
