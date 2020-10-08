import { defineComponent, h, PropType } from 'vue';
import FloatLayer, { LayerPosition, LayerTriggerType } from '../float-layer';
import './index.scss';

const Popover = defineComponent({
  name: 'sk-popover',
  props: {
    trigger: {
      type: String as PropType<LayerTriggerType>,
      default: 'hover' as LayerTriggerType,
    },
    position: {
      type: String as PropType<LayerPosition>,
      default: 'top-center' as LayerPosition,
    },
    triggerClass: null,
    mouseEnterDelay: {
      type: Number,
      default: 100,
    },
    mouseLeaveDelay: {
      type: Number,
      default: 100,
    },
    onOpen: Function as PropType<() => any>,
    onClose: Function as PropType<() => any>,
  },
  inheritAttrs: false,
  setup(props, { slots, attrs }) {
    return () =>
      h(
        FloatLayer,
        {
          ...attrs,
          trigger: props.trigger,
          position: props.position,
          triggerClass: props.triggerClass,
          mouseEnterDelay: props.mouseEnterDelay,
          mouseLeaveDelay: props.mouseLeaveDelay,
          onOpen: props.onOpen,
          onClose: props.onClose,
          cushion: 8,
        },
        {
          default: slots.default,
          content: () => (
            <div class={['sk-popover-content', `sk-popover-position-${props.position}`]}>
              {slots.content?.()}
              <i class="sk-popover-arrow"></i>
            </div>
          ),
        }
      );
  },
});

export default Popover;
