import {
  computed,
  createApp,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  PropType,
  reactive,
  ref,
  Teleport,
  watchEffect,
} from 'vue';
import { PreviewImageOptions } from './types';
import isBrowser from '../utils/isBrowser';
import Icon from '../icon';
import './index.scss';

const PreviewImage = defineComponent({
  name: 'sk-preview-image',
  props: {
    list: {
      type: Array as PropType<string[]>,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
    scaleRatio: {
      type: Number,
      default: 1.5,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    renderTip: Function,
  },
  setup(props, { emit }) {
    const state = reactive({
      currentIndex: props.index,
      isScale: false,
      rotate: 0,
    });

    const currentSrc = computed(() => {
      return props.list[state.currentIndex];
    });

    const onClose = () => {
      emit('update:modelValue', false);
    };

    const rotate = () => {
      state.rotate += 90;
    };

    const goPrev = () => {
      state.isScale = false;
      state.rotate = 0;
      state.currentIndex =
        state.currentIndex === 0 ? props.list.length - 1 : state.currentIndex - 1;
    };

    const goNext = () => {
      state.isScale = false;
      state.rotate = 0;
      state.currentIndex = state.currentIndex >= props.list.length - 1 ? 0 : state.currentIndex + 1;
    };

    const onKeyboard = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        goPrev();
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        goNext();
      }
      if (e.key === 'Escape' || e.key === 'Esc') {
        onClose();
      }
    };

    onMounted(() => {
      window.addEventListener('keyup', onKeyboard);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keyup', onKeyboard);
    });

    watchEffect(() => {
      if (props.modelValue) {
        document.body.classList.add('sk-preview-no-scroll');
      } else {
        document.body.classList.remove('sk-preview-no-scroll');
      }
    });

    const supportCssVar = isBrowser ? window.CSS.supports('--a', '0') : true;

    return () =>
      props.modelValue ? (
        <Teleport to="body">
          <div class="sk-preview-image-wrapper" onClick={onClose}>
            <img
              class={['sk-preview-image-show', { 'sk-scale': state.isScale }]}
              style={`--scaleRatio: ${props.scaleRatio}; --rotate: ${state.rotate}deg`}
              src={currentSrc.value}
              key={currentSrc.value}
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                state.isScale = !state.isScale;
              }}
            />
          </div>

          <div class="sk-preview-close" onClick={onClose}>
            <Icon type="close" />
          </div>

          <div class="sk-preview-handle">
            {props.renderTip ? (
              <div class="sk-preview-tip">{props.renderTip(state.currentIndex)}</div>
            ) : null}
            <ul class="sk-handle">
              {props.list.length > 1 ? (
                <li onClick={goPrev}>
                  <Icon type="left-simple" /> 上一张
                </li>
              ) : null}
              {supportCssVar && <li onClick={rotate}>翻转</li>}
              {props.list.length > 1 ? (
                <li onClick={goNext}>
                  下一张 <Icon type="right-simple" />
                </li>
              ) : null}
            </ul>
          </div>
        </Teleport>
      ) : null;
  },
});

const Preview = {
  image: (url: string, options: Omit<PreviewImageOptions, 'list'> = {}) => {
    if (!url) {
      return;
    }
    const previewImageApp = createApp({
      setup() {
        const open = ref(true);
        return () =>
          h(PreviewImage, {
            list: [url],
            index: options.index,
            scaleRatio: options.scaleRatio,
            renderTip: options.renderTip,
            modelValue: open.value,
            'onUpdate:modelValue': (value: boolean) => {
              open.value = value;
              if (!value) {
                setTimeout(() => {
                  previewImageApp.unmount(container);
                }, 1000);
              }
            },
          });
      },
    });
    const container = document.createElement('div');
    previewImageApp.mount(container);
  },
  images: (options: PreviewImageOptions) => {
    if (options.list[options.index ?? 0] === undefined) {
      return;
    }
    const previewImageApp = createApp({
      setup() {
        const open = ref(true);
        return () =>
          h(PreviewImage, {
            list: options.list,
            index: options.index,
            scaleRatio: options.scaleRatio,
            renderTip: options.renderTip,
            modelValue: open.value,
            'onUpdate:modelValue': (value: boolean) => {
              open.value = value;
              if (!value) {
                setTimeout(() => {
                  previewImageApp.unmount(container);
                }, 1000);
              }
            },
          });
      },
    });
    const container = document.createElement('div');
    previewImageApp.mount(container);
  },
};

export default Preview;
