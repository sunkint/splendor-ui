import { computed, defineComponent, PropType } from 'vue';
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
    type: {
      type: String as PropType<ProgressType>,
      default: 'primary',
    },
    height: {
      type: Number,
      default: 16,
    },
    striped: Boolean,
    active: Boolean,
  },
  setup(props) {
    const currentPercent = computed(() => {
      const percent = Math.round(props.percent);
      return Math.min(100, Math.max(0, percent));
    });

    return () => (
      <div class="sk-progress">
        <div
          class={['sk-progress-bar', `sk-bg-${props.type}`]}
          style={{ width: `${currentPercent.value}%` }}
        ></div>
      </div>
    );
  },
});

export default Progress;
