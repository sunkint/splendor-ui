import { defineComponent, nextTick } from 'vue';
import './index.scss';

const Textarea = defineComponent({
  name: 'sk-textarea',
  props: {
    hasError: {
      type: Boolean,
      default: false,
    },
    maxlength: Number,
    placeholder: String,
    modelValue: String,
    autoHeight: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      outerWidth: 0,
      outerHeight: 0,
    };
  },
  watch: {
    modelValue() {
      this.resizeInput();
    },
    autoHeight(autoHeight) {
      if (autoHeight) {
        nextTick(() => this.resizeInput());
      }
    },
  },
  methods: {
    onInput(e: InputEvent) {
      this.$emit('update:modelValue', (e.target as HTMLInputElement).value);
    },
    resizeInput() {
      if (!this.autoHeight) return;
      const cmp = this.$refs.computed;
      const textarea = this.$refs.textarea;
      this.outerWidth = textarea.getBoundingClientRect().width;
      this.outerHeight = cmp.getBoundingClientRect().height;
    },
  },
  computed: {
    autoHeightComputedValue() {
      const value = this.modelValue;
      if (value === '' || value?.endsWith('\n')) {
        return `${value} `;
      }
      return value;
    },
  },
  mounted() {
    this.resizeInput();
  },
  render() {
    const {
      hasError,
      autoHeight,
      maxlength,
      placeholder,
      modelValue,
      onInput,
      autoHeightComputedValue,
      outerWidth,
      outerHeight,
    } = this;

    return (
      <div class="sk-textarea-wrapper">
        <textarea
          ref="textarea"
          style={{ height: autoHeight ? `${outerHeight}px` : 'auto' }}
          class={['sk-textarea', { 'has-error': hasError, 'auto-height': autoHeight }]}
          maxlength={maxlength}
          placeholder={placeholder}
          value={modelValue}
          onInput={onInput}
        />
        {autoHeight && (
          <div
            ref="computed"
            style={{ width: `${outerWidth}px` }}
            class="sk-textarea-compute-height"
          >
            {autoHeightComputedValue}
          </div>
        )}
      </div>
    );
  },
});

export default Textarea;
