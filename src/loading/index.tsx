import { defineComponent, computed } from 'vue';
import './index.scss';

const Loading = defineComponent({
  name: 'sk-loading',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    color: String,
  },
  setup(props, { slots }) {
    console.log({ ...props });
    const show = computed(() => props.show);
    const colorStyle = computed(() => {
      if (props.color) {
        return { color: props.color };
      } else {
        return {};
      }
    });
    return () => {
      if (!show.value) {
        return slots.default?.();
      }
      return (
        <div class="sk-loading-wrapper">
          {slots.default?.()}
          <div class="sk-loading">
            <span class="sk-loading-inner" style={colorStyle.value}>
              <svg viewBox="25 25 50 50">
                <circle cx="50" cy="50" r="20" fill="none" />
              </svg>
            </span>
          </div>
        </div>
      );
    };
  },
});

export default Loading;
