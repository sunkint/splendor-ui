import { defineComponent, h, PropType } from 'vue';
import './index.scss';

const COLLAPSE = 'sk-collapse';
const COLLAPSING = 'sk-collapse-ing';
const COLLAPSE_SPREAD = 'sk-collapse-spread';

const Collapse = defineComponent({
  name: 'sk-collapse',
  props: {
    modelValue: {
      type: Boolean,
      default: true,
    },
    tag: {
      type: String,
      default: 'div',
    },
    duration: {
      type: Number,
      default: 350,
    },
    onShow: Function as PropType<() => any>,
    onShown: Function as PropType<() => any>,
    onHide: Function as PropType<() => any>,
    onHidden: Function as PropType<() => any>,
  },
  data() {
    return {
      timerId: 0,
      height: 0,
    };
  },
  computed: {
    show() {
      return this.modelValue;
    },
  },
  watch: {
    show: {
      handler(show) {
        if (show) {
          this.spread();
        } else {
          this.fold();
        }
      },
      flush: 'post',
    },
  },
  methods: {
    spread() {
      clearTimeout(this.timerId);
      const el = this.$el as HTMLElement;
      this.$emit('show');
      el.classList.remove(COLLAPSE);
      if (!this.height) {
        el.style.height = 'auto';
        let height = window.getComputedStyle(el).height;
        el.style.height = '';
        el.classList.add(COLLAPSING);
        el.offsetHeight; // force repaint
        this.height = height;
      }
      el.style.height = this.height;
      this.timerId = setTimeout(() => {
        el.classList.remove(COLLAPSING);
        el.classList.add(COLLAPSE, COLLAPSE_SPREAD);
        this.$emit('shown');
        el.style.height = '';
        this.timeoutId = 0;
        this.height = window.getComputedStyle(el).height;
        this.$emit('shown');
      }, this.duration);
    },
    fold() {
      clearTimeout(this.timerId);
      const el = this.$el as HTMLElement;
      this.$emit('hide');
      el.style.height = window.getComputedStyle(el).height;
      el.classList.remove(COLLAPSE_SPREAD, COLLAPSE);
      el.offsetHeight; // force repaint
      el.style.height = '';
      el.classList.add(COLLAPSING);
      this.timerId = setTimeout(() => {
        el.classList.add(COLLAPSE);
        el.classList.remove(COLLAPSING);
        el.style.height = '';
        this.timerId = 0;
        this.height = 0;
        this.$emit('hidden');
      }, this.duration);
    },
  },
  mounted() {
    const el = this.$el as HTMLElement;
    el.classList.add(COLLAPSE);
    if (this.show) {
      el.classList.add(COLLAPSE_SPREAD);
    }
  },
  render() {
    const { $slots, tag, duration } = this;
    return h(
      tag,
      { class: 'sk-collapse-box', style: { transitionDuration: `${duration}ms` } },
      $slots.default?.()
    );
  },
});

export default Collapse;
