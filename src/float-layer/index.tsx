import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  PropType,
  reactive,
  ref,
  Teleport,
  Transition,
  watch,
} from 'vue';
import clickBody from '../utils/clickBody';
import './index.scss';

export type LayerPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right-top'
  | 'right-center'
  | 'right-bottom';

export type LayerTriggerType = 'hover' | 'click';

const FloatLayer = defineComponent({
  name: 'sk-float-layer',
  props: {
    display: {
      type: String,
      default: 'inline-block',
    },
    position: {
      type: String as PropType<LayerPosition>,
      default: 'top-center' as LayerPosition,
    },
    trigger: {
      type: String as PropType<LayerTriggerType>,
      default: 'hover' as LayerTriggerType,
    },
    cushion: {
      type: Number,
      default: 0,
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
    teleportTo: {
      type: String,
      default: 'body',
    },
    transition: {
      type: Number,
      default: 0,
    },
    updateTime: Number,
    onOpen: Function as PropType<() => any>,
    onClose: Function as PropType<() => any>,
  },
  inheritAttrs: false,
  setup(props, { slots, attrs }) {
    const trigger = ref<HTMLDivElement | null>(null);
    const layer = ref<HTMLDivElement | null>(null);

    const layerState = reactive({
      left: 0,
      top: 0,
      open: false,
      enterTimer: -1,
      closeTimer: -1,
      zIndex: props.trigger === 'hover' ? 2051 : 2050,
    });

    watch(
      () => layerState.open,
      (open) => {
        open ? props.onOpen?.() : props.onClose?.();
        if (open) {
          let maxZIndex = 100;
          const getZIndex = (e: Element) => {
            const zIndex = getComputedStyle(e).zIndex;
            if (!isNaN(+zIndex)) {
              maxZIndex = Math.max(+zIndex, maxZIndex);
            }
            try {
              e.parentElement && getZIndex(e.parentElement);
            } catch {}
          };
          trigger.value && getZIndex(trigger.value);
          layerState.zIndex = maxZIndex + (props.trigger === 'hover' ? 101 : 100);
        }
      }
    );

    const computeLayerPosition = () => {
      const elLayer = layer.value!;
      const elTrigger = trigger.value!;

      const { width: layerWidth, height: layerHeight } = elLayer.getBoundingClientRect();
      let {
        width: triggerWidth,
        height: triggerHeight,
        top: triggerTop,
        left: triggerLeft,
      } = elTrigger.getBoundingClientRect();

      triggerTop += pageYOffset;
      triggerLeft += pageXOffset;

      switch (props.position) {
        case 'top-left':
          layerState.left = triggerLeft;
          layerState.top = triggerTop - layerHeight - props.cushion;
          break;
        case 'top-center':
          layerState.left = triggerLeft + (triggerWidth - layerWidth) / 2;
          layerState.top = triggerTop - layerHeight - props.cushion;
          break;
        case 'top-right':
          layerState.left = triggerLeft + triggerWidth - layerWidth;
          layerState.top = triggerTop - layerHeight - props.cushion;
          break;
        case 'left-top':
          layerState.left = triggerLeft - layerWidth - props.cushion;
          layerState.top = triggerTop;
          break;
        case 'left-center':
          layerState.left = triggerLeft - layerWidth - props.cushion;
          layerState.top = triggerTop + (triggerHeight - layerHeight) / 2;
          break;
        case 'left-bottom':
          layerState.left = triggerLeft - layerWidth - props.cushion;
          layerState.top = triggerTop + triggerHeight - layerHeight;
          break;
        case 'bottom-left':
          layerState.left = triggerLeft;
          layerState.top = triggerTop + triggerHeight + props.cushion;
          break;
        case 'bottom-center':
          layerState.left = triggerLeft + (triggerWidth - layerWidth) / 2;
          layerState.top = triggerTop + triggerHeight + props.cushion;
          break;
        case 'bottom-right':
          layerState.left = triggerLeft + triggerWidth - layerWidth;
          layerState.top = triggerTop + triggerHeight + props.cushion;
          break;
        case 'right-top':
          layerState.left = triggerLeft + triggerWidth + props.cushion;
          layerState.top = triggerTop;
          break;
        case 'right-center':
          layerState.left = triggerLeft + triggerWidth + props.cushion;
          layerState.top = triggerTop + (triggerHeight - layerHeight) / 2;
          break;
        case 'right-bottom':
          layerState.left = triggerLeft + triggerWidth + props.cushion;
          layerState.top = triggerTop + triggerHeight - layerHeight;
          break;
      }
    };

    const refreshLayerPosition = () => {
      if (layerState.open) {
        computeLayerPosition();
      }
    };

    onMounted(() => {
      window.addEventListener('resize', refreshLayerPosition);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', refreshLayerPosition);
    });

    watch(() => props.position, refreshLayerPosition);
    watch(() => props.updateTime, refreshLayerPosition);

    const onTriggerClick = (e: MouseEvent) => {
      if (props.trigger === 'click') {
        e.stopPropagation();
        clickBody();
        layerState.open = true;
        nextTick(() => {
          computeLayerPosition();
        });
        window.addEventListener(
          'click',
          () => {
            layerState.open = false;
          },
          { once: true }
        );
      }
    };

    const onLayerClick = (e: MouseEvent) => {
      e.stopPropagation();
    };

    const onMouseEnter = () => {
      if (props.trigger === 'hover') {
        if (layerState.closeTimer > 0) {
          window.clearTimeout(layerState.closeTimer);
          layerState.closeTimer = -1;
        }
        layerState.enterTimer = window.setTimeout(() => {
          layerState.open = true;
          nextTick(() => {
            computeLayerPosition();
          });
        }, props.mouseEnterDelay);
      }
    };

    const onMouseLeave = () => {
      if (props.trigger === 'hover') {
        layerState.closeTimer = window.setTimeout(() => {
          layerState.open = false;
        }, props.mouseLeaveDelay);
        if (layerState.enterTimer > 0) {
          window.clearTimeout(layerState.enterTimer);
          layerState.enterTimer = -1;
        }
      }
    };

    return () => {
      const { class: className = '', ...restAttrs } = attrs;
      const contentNode = layerState.open ? (
        <div
          ref={layer}
          class={[
            'sk-layer-content',
            `sk-layer-content-trigger-${props.trigger}`,
            { 'sk-layer-open': layerState.open },
            className,
          ]}
          {...restAttrs}
          style={{
            left: `${layerState.left}px`,
            top: `${layerState.top}px`,
            zIndex: layerState.zIndex,
            ...(props.transition
              ? {
                  transitionDuration: `${props.transition}ms`,
                }
              : {}),
          }}
          onClick={onLayerClick}
          onMouseenter={onMouseEnter}
          onMouseleave={onMouseLeave}
        >
          {slots.content?.()}
        </div>
      ) : null;
      return (
        <>
          <div
            ref={trigger}
            class={['sk-layer-trigger', props.triggerClass]}
            style={{ display: props.display }}
            onClick={onTriggerClick}
            onMouseenter={onMouseEnter}
            onMouseleave={onMouseLeave}
          >
            {slots.default?.()}
          </div>
          <Teleport to={props.teleportTo}>
            {props.transition > 0 ? (
              <Transition name="fade">{contentNode}</Transition>
            ) : (
              contentNode
            )}
          </Teleport>
        </>
      );
    };
  },
});

export default FloatLayer;
