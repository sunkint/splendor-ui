import { computed, defineComponent } from 'vue';
import './index.scss';

const Badge = defineComponent({
  name: 'sk-badge',
  props: {
    value: [String, Number],
    maxNum: {
      type: Number,
      default: 99,
    },
    dot: Boolean,
  },
  setup(props, { slots }) {
    const value = computed(() => {
      if (typeof props.value === 'string') {
        return props.value || null;
      }
      if (typeof props.value === 'number') {
        if (props.value <= 0) {
          return null;
        }
        return props.value > props.maxNum ? `${props.maxNum}+` : `${props.value}`;
      }
      return null;
    });
    return () => (
      <div
        class={[
          'sk-badge-wrapper',
          { 'sk-badge-standalone': !slots.default, 'sk-badge-dot': props.dot },
        ]}
      >
        {slots.default?.()}
        {props.dot ? (
          <span class="sk-badge"></span>
        ) : (
          value.value && <span class="sk-badge">{value.value}</span>
        )}
      </div>
    );
  },
});

export default Badge;
