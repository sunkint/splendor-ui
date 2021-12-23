import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  Teleport,
  Transition,
  watch,
} from 'vue';
import isBrowser from '../utils/isBrowser';
import clickBody from '../utils/clickBody';
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
    stickTop: {
      type: Boolean,
      default: false,
    },
    stickTopOffset: {
      type: Number,
      default: 120,
    },
    onClose: Function as PropType<() => any>,
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
      props.onClose?.();
      emit('update:modelValue', false);
    };

    onMounted(() => {
      const onKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
          onClose();
        }
      };

      const onVisibleChange = (value: boolean) => {
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
      };

      watch(() => props.modelValue, onVisibleChange);

      // 解决嵌套 dialog 一同销毁问题，额外判断下
      watch(isShowWrapper, (value) => {
        if (!value && document.querySelectorAll('body > .sk-dialog-r-wrapper').length === 0) {
          dialogCount = 0;
          document.body.classList.remove('sk-no-scroll');
        }
      });

      // 如果一开始对话框就是打开状态
      if (props.modelValue) {
        onVisibleChange(true);
      }
    });

    const onMaskClose = () => {
      if (!props.maskClosable) {
        return;
      }
      onClose();
    };

    const onDialogClick = (e: MouseEvent) => {
      e.stopPropagation();
      // 防止 body 的点击事件不生效
      clickBody(e);
    };

    return () => {
      const { class: className = '', style = '', ...restAttrs } = attrs;
      return (
        <Teleport to="body" disabled={!isShowWrapper.value}>
          {props.modelValue ? <div class="sk-dialog-backdrop" onClick={onMaskClose}></div> : null}
          <div
            class="sk-dialog-r-wrapper"
            onClick={onMaskClose}
            style={{ display: isShowWrapper.value ? 'block' : 'none' }}
          >
            <Transition
              name="come"
              appear
              onBeforeLeave={() => {
                isBeforeDisappear.value = true;
              }}
              onAfterLeave={() => {
                isBeforeDisappear.value = false;
              }}
            >
              {props.modelValue ? (
                <div
                  class={['sk-dialog-r', className]}
                  // @ts-ignore
                  style={[style].concat(
                    props.stickTop
                      ? [{ verticalAlign: 'top', marginTop: `${props.stickTopOffset}px` }]
                      : []
                  )}
                  {...restAttrs}
                  onClick={onDialogClick}
                  ref={dialogEl}
                >
                  {props.closeBtn ? (
                    <button class="sk-dialog-close" onClick={onClose}>
                      <Icon type="close" />
                    </button>
                  ) : null}
                  <div class="sk-dialog-header">{props.title}</div>
                  <div class="sk-dialog-body">{slots.default?.()}</div>
                  {slots.footer ? <div class="sk-dialog-footer">{slots.footer()}</div> : null}
                </div>
              ) : null}
            </Transition>
          </div>
        </Teleport>
      );
    };
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false);
    },
  },
});

export * from './utils';
export default Dialog;
