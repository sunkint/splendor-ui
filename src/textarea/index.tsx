import { defineComponent, nextTick } from 'vue';
import TextareaProps from './props';
import './index.scss';

const Textarea = defineComponent({
  name: 'sk-textarea',
  props: TextareaProps,
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
        this.onPressCtrlEnter?.(e);
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
      height,
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
      resize,
      onKeydown,
      onKeyupInside,
      onFocus,
      onBlur,
      onChange,
      onKeypress,
      onCompositionstart,
      onCompositionend,
      onCompositionupdate,
    } = this;

    const value = modelValue === undefined ? internalValue : modelValue;

    let styleObject: any = undefined;
    if (autoHeight) {
      styleObject = { height: `${outerHeight}px` };
    } else {
      if (typeof height === 'number') {
        styleObject = { height: `${height}px` };
      } else if (typeof height === 'string') {
        styleObject = { height };
      }
    }
    if (resize) {
      styleObject = styleObject ? { ...styleObject, resize } : { resize };
    }

    return (
      <div class={['sk-textarea-wrapper', { 'sk-textarea-block': block }]}>
        <textarea
          ref="textarea"
          style={styleObject}
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
          onCompositionstart={onCompositionstart}
          onCompositionend={onCompositionend}
          onCompositionupdate={onCompositionupdate}
          id={this.id}
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
