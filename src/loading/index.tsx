import { defineComponent } from 'vue';
import './index.scss';

const Loading = defineComponent({
  name: 'sk-loading',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    color: String,
    maskClass: null,
    tip: String,
  },
  setup(props, { slots }) {
    return () => {
      const hasTip = !!(slots.tip || props.tip);
      const colorStyle = props.color ? { color: props.color } : {};

      return (
        <div class="sk-loading-wrapper">
          {slots.default?.()}
          {props.show && (
            <div class={['sk-loading', props.maskClass]}>
              <span class="sk-loading-inner" style={colorStyle}>
                <svg viewBox="25 25 50 50">
                  <circle cx="50" cy="50" r="20" fill="none" />
                </svg>
              </span>
              {hasTip && (
                <div class="sk-loading-tip" style={colorStyle}>
                  {slots.tip ? slots.tip() : props.tip}
                </div>
              )}
            </div>
          )}
        </div>
      );
    };
  },
});

export default Loading;
