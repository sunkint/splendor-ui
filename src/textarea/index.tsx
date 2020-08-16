import { defineComponent, nextTick } from 'vue';
import './index.scss';

const Textarea = defineComponent({
  name: 'sk-textarea',
  props: {
    hasError: {
      type: Boolean,
      default: false,
    },
    maxlength: [Number, String],
    placeholder: String,
    modelValue: String,
    autoHeight: {
      type: Boolean,
      default: false,
    },
    name: String,
    disabled: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
  },
  data() {
    return {
      outerWidth: 0,
      outerHeight: 0,
      internalValue: this.modelValue || '',
    };
  },
  watch: {
    modelValue(modelValue) {
      this.internalValue = modelValue;
    },
    internalValue() {
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
      this.internalValue = (e.target as HTMLInputElement).value;
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
      const value = this.modelValue === undefined ? this.internalValue : this.modelValue;
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
      internalValue,
    } = this;

    const value = modelValue === undefined ? internalValue : modelValue;

    return (
      <div class="sk-textarea-wrapper">
        <textarea
          ref="textarea"
          style={{ height: autoHeight ? `${outerHeight}px` : 'auto' }}
          class={['sk-textarea', { 'has-error': hasError, 'auto-height': autoHeight }]}
          maxlength={maxlength}
          placeholder={placeholder}
          value={value}
          onInput={onInput}
          name={this.name}
          disabled={this.disabled}
          readonly={this.readonly}
          autofocus={this.autofocus}
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
