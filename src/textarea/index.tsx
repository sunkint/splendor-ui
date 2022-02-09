import { defineComponent, nextTick, ref } from 'vue';
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
    resize: {
      handler(resize) {
        if (this.autoHeight) {
          return;
        }
        nextTick(() => {
          const textarea = this.$refs.textarea;
          if (textarea) {
            if (!resize) {
              delete textarea.style.resize;
            } else {
              textarea.style.resize = resize;
            }
          }
        });
      },
      immediate: true,
    },
    height: {
      handler(height) {
        nextTick(() => {
          if (!this.autoHeight) {
            this.setHeight(height);
          }
        });
      },
      immediate: true,
    },
    outerHeight: {
      handler(outerHeight) {
        if (this.autoHeight) {
          this.setHeight(outerHeight);
        } else {
          this.setHeight(this.height);
        }
      },
      flush: 'post',
    },
  },
  inject: {
    hasErrorContext: {
      from: Symbol.for('hasError'),
      default: ref(false),
    },
  },
  methods: {
    setHeight(height?: string | number) {
      const textarea = this.$refs.textarea;
      if (!textarea) {
        return;
      }
      if (typeof height === 'undefined') {
        delete textarea.style.height;
      } else if (typeof height === 'number') {
        textarea.style.height = `${height}px`;
      } else if (typeof height === 'string') {
        textarea.style.height = height;
      }
    },
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
    onTriggerValidate(e: FocusEvent) {
      this.onBlur?.(e);
      this.onValidate?.(this.internalValue);
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
      hasErrorContext,
      autoHeight,
      maxlength,
      placeholder,
      modelValue,
      onInputInside,
      autoHeightComputedValue,
      outerWidth,
      internalValue,
      block,
      onKeydown,
      onKeyupInside,
      onFocus,
      onTriggerValidate,
      onChange,
      onKeypress,
      onCompositionstart,
      onCompositionend,
      onCompositionupdate,
    } = this;

    const value = modelValue === undefined ? internalValue : modelValue;

    return (
      <div class={['sk-textarea-wrapper', { 'sk-textarea-block': block }]}>
        <textarea
          ref="textarea"
          class={[
            'sk-textarea',
            { 'has-error': hasError || hasErrorContext.value, 'auto-height': autoHeight },
          ]}
          maxlength={maxlength}
          placeholder={placeholder}
          value={value}
          onInput={onInputInside}
          onKeydown={onKeydown}
          onKeyup={onKeyupInside}
          onFocus={onFocus}
          onBlur={onTriggerValidate}
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
