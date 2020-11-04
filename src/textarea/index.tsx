import { defineComponent, nextTick, PropType } from 'vue';
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
    block: Boolean,
    name: String,
    disabled: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
    onPressCtrlEnter: Function as PropType<(e: KeyboardEvent) => void>,
    onKeypress: Function as PropType<(e: KeyboardEvent) => void>,
    onKeydown: Function as PropType<(e: KeyboardEvent) => void>,
    onKeyup: Function as PropType<(e: KeyboardEvent) => void>,
    onFocus: Function as PropType<(e: FocusEvent) => void>,
    onBlur: Function as PropType<(e: FocusEvent) => void>,
    onChange: Function as PropType<(e: Event) => void>,
    onInput: Function as PropType<(e: Event) => void>,
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
    internalValue: {
      handler() {
        this.resizeInput();
      },
      flush: 'post',
    },
    autoHeight(autoHeight) {
      if (autoHeight) {
        nextTick(() => this.resizeInput());
      }
    },
  },
  methods: {
    onInputInside(e: InputEvent) {
      this.$emit('input', e);
      this.$emit('update:modelValue', (e.target as HTMLInputElement).value);
      this.internalValue = (e.target as HTMLInputElement).value;
    },
    onKeyupInside(e: KeyboardEvent) {
      this.$emit('keyup', e);
      if (e.key === 'Enter' && e.ctrlKey) {
        this.onPressCtrlEnter?.();
      }
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
      onInputInside,
      autoHeightComputedValue,
      outerWidth,
      outerHeight,
      internalValue,
      block,
      onKeydown,
      onKeyupInside,
      onFocus,
      onBlur,
      onChange,
      onKeypress,
    } = this;

    const value = modelValue === undefined ? internalValue : modelValue;

    return (
      <div class={['sk-textarea-wrapper', { 'sk-textarea-block': block }]}>
        <textarea
          ref="textarea"
          style={{ height: autoHeight ? `${outerHeight}px` : 'auto' }}
          class={['sk-textarea', { 'has-error': hasError, 'auto-height': autoHeight }]}
          maxlength={maxlength}
          placeholder={placeholder}
          value={value}
          onInput={onInputInside}
          onKeydown={onKeydown}
          onKeyup={onKeyupInside}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          onKeypress={onKeypress}
          name={this.name}
          disabled={this.disabled}
          readonly={this.readonly}
          autofocus={this.autofocus}
        />
        {autoHeight ? (
          <div
            ref="computed"
            style={{ width: `${outerWidth}px` }}
            class="sk-textarea-compute-height"
          >
            {autoHeightComputedValue}
          </div>
        ) : null}
      </div>
    );
  },
});

export default Textarea;
