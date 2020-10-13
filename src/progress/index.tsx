import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue';
import './index.scss';

export type ProgressType = 'primary' | 'success' | 'info' | 'warning' | 'danger';

const Progress = defineComponent({
  name: 'sk-progress',
  props: {
    percent: {
      type: Number,
      default: 0,
    },
    showLabel: {
      type: Boolean,
      default: false,
    },
    labelText: String,
    type: {
      type: String as PropType<ProgressType>,
      default: 'primary',
    },
    height: {
      type: Number,
      default: 16,
    },
    striped: Boolean,
    animated: Boolean,
  },
  setup(props) {
    const textRef = ref<HTMLSpanElement | null>(null);
    const labelText = computed(() => {
      if (!props.showLabel) {
        return;
      }
      return props.labelText ?? `${props.percent}%`;
    });
    const minStackWidth = ref(0);

    const currentPercent = computed(() => {
      const percent = Math.round(props.percent);
      return Math.min(100, Math.max(0, percent));
    });

    onMounted(() => {
      watch(
        labelText,
        (text) => {
          if (!text) {
            minStackWidth.value = 0;
            return;
          }
          if (textRef.value) {
            minStackWidth.value = textRef.value.getBoundingClientRect().width + 2;
          } else {
            minStackWidth.value = 0;
          }
        },
        { immediate: true }
      );
    });

    return () => (
      <div class="sk-progress" style={{ fontSize: `${props.height}px` }}>
        <div
          class={[
            'sk-progress-bar',
            `sk-bg-${props.type}`,
            { 'sk-progress-striped': props.striped, 'sk-progress-animated': props.animated },
          ]}
          style={{
            width: `${currentPercent.value}%`,
            ...(minStackWidth.value ? { minWidth: `${minStackWidth.value}px` } : {}),
          }}
        >
          {labelText.value ? (
            <span class="sk-progress-text" ref={textRef}>
              {labelText.value}
            </span>
          ) : null}
        </div>
      </div>
    );
  },
});

export default Progress;
