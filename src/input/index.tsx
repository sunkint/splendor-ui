import { defineComponent, PropType, InputHTMLAttributes, ref, watch } from 'vue';
import Icon from '../icon';
import './index.scss';

const Input = defineComponent({
  name: 'sk-input',
  props: {
    hasError: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String as PropType<InputHTMLAttributes['type']>,
      default: 'text',
    },
    icon: String,
    inline: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<'normal' | 'large'>,
      default: 'normal',
    },
    maxlength: [String, Number],
    max: Number,
    min: Number,
    disabled: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
    name: String,
    placeholder: String,
    modelValue: String,
    onFocus: Function as PropType<(e: FocusEvent) => void>,
    onBlur: Function as PropType<(e: FocusEvent) => void>,
    onPressEnter: Function as PropType<(e: KeyboardEvent) => void>,
    onKeypress: Function as PropType<(e: KeyboardEvent) => void>,
    onKeydown: Function as PropType<(e: KeyboardEvent) => void>,
    onKeyup: Function as PropType<(e: KeyboardEvent) => void>,
    onChange: Function as PropType<(e: Event) => void>,
    onInput: Function as PropType<(e: Event) => void>,
  },
  setup(props, { emit, slots }) {
    const value = ref(props.modelValue);

    watch(value, (value) => {
      emit('update:modelValue', value);
    });

    watch(
      () => props.modelValue,
      (newValue) => {
        value.value = newValue;
      }
    );

    const onInput = (e: KeyboardEvent) => {
      value.value = (e.target as HTMLInputElement).value;
      props.onInput?.(e);
    };

    const onKeyup = (e: KeyboardEvent) => {
      props.onKeyup?.(e);
      if (e.key === 'Enter') {
        props.onPressEnter?.(e);
      }
    };

    return () => {
      const input = (
        <input
          class="sk-input"
          type={props.type}
          maxlength={props.maxlength ? +props.maxlength : undefined}
          placeholder={props.placeholder}
          disabled={props.disabled}
          readonly={props.readonly}
          name={props.name}
          autofocus={props.autofocus}
          value={value.value}
          min={props.min}
          max={props.max}
          onInput={onInput}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onKeyup={onKeyup}
          onKeypress={props.onKeypress}
          onKeydown={props.onKeydown}
          onChange={props.onChange}
        />
      );

      return (
        <div
          class={[
            'sk-input-wrapper',
            {
              'sk-input-inline': props.inline,
              'sk-input-block': props.block,
              'sk-input-large': props.size === 'large',
              'has-error': props.hasError,
              'has-icon': !!props.icon,
            },
          ]}
        >
          {slots.prepend ? (
            <div class="sk-input-addon sk-input-addon-prepend">{slots.prepend()}</div>
          ) : null}
          {props.icon ? (
            <div class="sk-input-icon-wrapper">
              <span class="sk-input-icon">
                <Icon type={props.icon} />
              </span>
              {input}
            </div>
          ) : (
            input
          )}
          {slots.append ? (
            <div class="sk-input-addon sk-input-addon-append">{slots.append()}</div>
          ) : null}
        </div>
      );
    };
  },
  methods: {
    focus() {
      this.$el.querySelector('.sk-input')?.focus();
    },
  },
});

export default Input;
