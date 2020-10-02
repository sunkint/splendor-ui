import { computed, defineComponent, onMounted, ref, Teleport, Transition, watch } from 'vue';
import isBrowser from '../utils/isBrowser';
import Icon from '../icon';
import './index.scss';

let dialogCount = 0;

export interface IMousePosition {
  x: number;
  y: number;
}

let mousePosition: IMousePosition | null = null;

if (isBrowser) {
  document.documentElement.addEventListener('click', (e: MouseEvent) => {
    mousePosition = {
      x: e.clientX,
      y: e.clientY,
    };
  });
}

const Dialog = defineComponent({
  name: 'sk-dialog',
  props: {
    title: {
      type: String,
      default: '提示',
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
    closeBtn: {
      type: Boolean,
      default: true,
    },
    closeOnEsc: {
      type: Boolean,
      default: true,
    },
  },
  inheritAttrs: false,
  setup(props, { slots, emit, attrs }) {
    const lastMousePosition = ref<IMousePosition | null>(null);
    const dialogEl = ref<any>(null);
    const isBeforeDisappear = ref(false);
    const isShowWrapper = computed(() => {
      return props.modelValue || isBeforeDisappear.value;
    });

    const resetTransformOrigin = () => {
      const pos = lastMousePosition.value;
      if (
        pos &&
        pos.x >= 0 &&
        pos.y >= 0 &&
        dialogEl.value &&
        dialogEl.value.getBoundingClientRect
      ) {
        dialogEl.value.style.transform = 'none';
        dialogEl.value.style.animation = 'none';
        const { left: x, top: y } = dialogEl.value.getBoundingClientRect();
        dialogEl.value.style.transform = null;
        dialogEl.value.style.animation = null;
        const origin = `${pos.x - x}px ${pos.y - y}px 0`;
        const style = dialogEl.value.style;
        ['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix) => {
          style[`${prefix}TransformOrigin` as any] = origin;
        });
        style.transformOrigin = origin;
      }
    };

    const onClose = () => {
      emit('close');
      emit('update:modelValue', false);
    };

    onMounted(() => {
      const onKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
          onClose();
        }
      };

      watch(
        () => props.modelValue,
        (value) => {
          if (value) {
            dialogCount++;
            setTimeout(() => {
              lastMousePosition.value = mousePosition;
              document.body.classList.add('sk-no-scroll');
              resetTransformOrigin();
            });
          } else {
            lastMousePosition.value = null;
            if (dialogCount > 0) {
              dialogCount--;
            }
            if (dialogCount === 0) {
              document.body.classList.remove('sk-no-scroll');
            }
          }

          if (props.closeOnEsc) {
            if (value) {
              document.body.addEventListener('keyup', onKeyUp);
            } else {
              document.body.removeEventListener('keyup', onKeyUp);
            }
          }
        },
        {
          immediate: true,
        }
      );
    });

    const onMaskClose = () => {
      if (!props.maskClosable) {
        return;
      }
      onClose();
    };

    const preventPop = (e: MouseEvent) => {
      e.stopPropagation();
    };

    return () => (
      <Teleport to="body" disabled={!isShowWrapper.value}>
        {props.modelValue ? <div class="sk-dialog-backdrop" onClick={onMaskClose}></div> : null}
        <div
          class="sk-dialog-r-wrapper"
          onClick={onMaskClose}
          style={{ display: isShowWrapper.value ? 'block' : 'none' }}
        >
          <Transition
            name="come"
            onBeforeLeave={() => {
              isBeforeDisappear.value = true;
            }}
            onAfterLeave={() => {
              isBeforeDisappear.value = false;
            }}
          >
            {props.modelValue ? (
              <div class="sk-dialog-r" onClick={preventPop} ref={dialogEl} {...attrs}>
                {props.closeBtn ? (
                  <button class="sk-dialog-close" onClick={onClose}>
                    <Icon type="close" />
                  </button>
                ) : null}
                <div class="sk-dialog-header">{props.title}</div>
                <div class="sk-dialog-body">{slots.default?.()}</div>
              </div>
            ) : null}
          </Transition>
        </div>
      </Teleport>
    );
  },
});

export default Dialog;
