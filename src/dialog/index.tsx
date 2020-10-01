import { defineComponent, onMounted, ref, Teleport, watch } from 'vue';
import Icon from '../icon';
import isBrowser from '../utils/isBrowser';
import './index.scss';

let dialogCount = 0;

export interface IMousePosition {
  x: number;
  y: number;
}

let mousePosition: IMousePosition | null = null;

if (isBrowser) {
  document.documentElement.addEventListener('click', (e: MouseEvent) => {
    console.log('clickkkk');
    mousePosition = {
      x: e.clientX,
      y: e.clientY,
    };
  });
}

const Dialog = defineComponent({
  name: 'sk-dialog',
  props: {
    title: String,
    modelValue: Boolean,
  },
  setup(props, { slots, emit }) {
    const lastMousePosition = ref<IMousePosition | null>(null);
    const dialogEl = ref<any>(null);

    const resetTransformOrigin = () => {
      const pos = lastMousePosition.value;
      if (
        pos &&
        pos.x >= 0 &&
        pos.y >= 0 &&
        dialogEl.value &&
        dialogEl.value.getBoundingClientRect
      ) {
        const { left: x, top: y } = dialogEl.value.getBoundingClientRect();
        const origin = `${pos.x - x}px ${pos.y - y}px 0`;
        const style = dialogEl.value.style;
        ['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix) => {
          style[`${prefix}TransformOrigin` as any] = origin;
        });
        style.transformOrigin = origin;
      }
    };

    onMounted(() => {
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
        },
        {
          immediate: true,
        }
      );
    });

    const onClose = () => {
      emit('close');
      emit('update:modelValue', false);
    };

    const preventPop = (e: MouseEvent) => {
      e.stopPropagation();
    };

    return () => (
      <Teleport to="body">
        {props.modelValue ? <div class="sk-dialog-backdrop"></div> : null}
        {props.modelValue ? (
          <div class="sk-dialog-r-wrapper" onClick={onClose}>
            <div class="sk-dialog-r" onClick={preventPop} ref={dialogEl}>
              <button class="sk-dialog-close" onClick={onClose}>
                <Icon type="close" />
              </button>
              <div class="sk-dialog-header">{props.title ?? '对话框'}</div>
              <div class="sk-dialog-body">{slots.default?.()}</div>
            </div>
          </div>
        ) : null}
      </Teleport>
    );
  },
});

export default Dialog;
