import { defineComponent, h, PropType, reactive, ref, watch } from 'vue';
import FloatLayer from '../float-layer';
import './index.scss';

const Slider = defineComponent({
  name: 'sk-slider',
  props: {
    name: String,
    modelValue: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 1,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showTip: {
      type: Boolean,
      default: true,
    },
    onChange: {
      type: Function as PropType<(value: number) => any>,
    },
  },
  setup(props, { emit }) {
    const trackRef = ref<HTMLDivElement>();

    const state = reactive({
      inputValue: props.modelValue,
      isHover: false,
      isDrag: false,
      startX: 0,
      currentX: 0,
      oldValue: props.modelValue,
      startPos: 0,
      newPos: -1,
      currentPosition: `0%`,
      tipUpdateTime: Date.now(),
    });

    if (props.max <= props.min) {
      console.warn('Slider: min should be lower than max.');
    }

    watch(
      () => state.inputValue,
      (value) => {
        emit('update:modelValue', +value);
        state.tipUpdateTime = Date.now();
      }
    );

    const setPosition = (pos: number) => {
      if (pos < 0) {
        pos = 0;
      } else if (pos > 100) {
        pos = 100;
      }

      const lengthPerStep = 100 / ((props.max - props.min) / props.step);
      const steps = Math.round(pos / lengthPerStep);

      let value = steps * lengthPerStep * (props.max - props.min) * 0.01 + props.min;
      value = parseFloat(value.toFixed(0));

      state.inputValue = value;
      state.currentPosition = `${((value - props.min) * 100) / (props.max - props.min)}%`;

      if (!state.isDrag && value !== state.oldValue) {
        props.onChange?.(value);
        state.oldValue = value;
      }
    };

    watch(
      () => props.modelValue,
      (value) => {
        state.tipUpdateTime = Date.now();

        if (typeof value !== 'number' || isNaN(value) || value < props.min) {
          state.inputValue = props.min;
          return;
        }

        if (value > props.max) {
          state.inputValue = props.max;
          return;
        }

        state.inputValue = value;
        setPosition(((value - props.min) / (props.max - props.min)) * 100);
      },
      { immediate: true }
    );

    const onMouseDown = (e: MouseEvent) => {
      if (props.disabled) {
        return;
      }
      onDragStart(e);

      window.addEventListener('mousemove', onDragging);
      window.addEventListener('mouseup', onDragEnd);
    };

    const onDragStart = (e: MouseEvent) => {
      state.isDrag = true;
      state.startX = e.clientX;
      state.startPos = parseInt(state.currentPosition);
    };

    const onDragging = (e: MouseEvent) => {
      if (!state.isDrag || !trackRef.value) {
        return;
      }
      let diff = 0;
      state.currentX = e.clientX;
      diff = ((state.currentX - state.startX) * 100) / trackRef.value.clientWidth;
      state.newPos = state.startPos + diff;
      setPosition(state.newPos);
    };

    const onDragEnd = () => {
      if (!state.isDrag) {
        return;
      }
      state.isDrag = false;
      setPosition(state.newPos);

      window.removeEventListener('mousemove', onDragging);
      window.removeEventListener('mouseup', onDragEnd);
    };

    const onSliderClick = (e: MouseEvent) => {
      if (props.disabled || state.isDrag || !trackRef.value) {
        return;
      }
      const sliderOffsetLeft = trackRef.value?.getBoundingClientRect().left ?? 0;
      setPosition(((e.clientX - sliderOffsetLeft) / trackRef.value.clientWidth) * 100);
    };

    const onMouseEnter = () => {
      state.isHover = true;
    };

    const onMouseLeave = () => {
      state.isHover = false;
    };

    return () => (
      <div class={['sk-slider', { 'sk-slider-disabled': props.disabled }]}>
        <input name={props.name} v-model={state.inputValue} type="number" />
        <div
          ref={trackRef}
          class={['sk-slider-track', { 'sk-slider-disabled': props.disabled }]}
          onClick={onSliderClick}
        >
          <div class="sk-slider-bar" style={{ width: state.currentPosition }}></div>
          <div
            class={['sk-slider-dot-wrapper', { 'sk-slider-disabled': props.disabled }]}
            style={{ left: state.currentPosition }}
            onMouseenter={onMouseEnter}
            onMouseleave={onMouseLeave}
            onMousedown={onMouseDown}
          >
            {props.showTip ? (
              h(
                FloatLayer,
                {
                  trigger: 'none',
                  open: state.isHover || state.isDrag,
                  position: 'top-center',
                  transition: 160,
                  cushion: 4,
                  updateTime: state.tipUpdateTime,
                },
                {
                  default: () => <div class="sk-slider-dot" />,
                  content: () => (
                    <div class={['sk-tooltip-content', 'sk-tooltip-position-top-center']}>
                      {state.inputValue}
                    </div>
                  ),
                }
              )
            ) : (
              <div class="sk-slider-dot" />
            )}
          </div>
        </div>
      </div>
    );
  },
});

export default Slider;
