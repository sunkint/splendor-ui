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
    maxlength: [String, Number],
    disabled: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
    name: String,
    placeholder: String,
    modelValue: String,
    onFocus: Function as PropType<(e: Event) => any>,
    onBlur: Function as PropType<(e: Event) => any>,
    onPressEnter: Function as PropType<(e: Event) => any>,
  },
  setup(props, { emit }) {
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

    const onFocus = (e: Event) => {
      props.onFocus?.(e);
    };

    const onBlur = (e: Event) => {
      props.onBlur?.(e);
    };

    const onKeyup = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        props.onPressEnter?.(e);
      }
    };

    return () => (
      <div
        class={[
          'sk-input-wrapper',
          {
            'sk-input-inline': props.inline,
            'has-error': props.hasError,
            'has-icon': !!props.icon,
          },
        ]}
      >
        {props.icon ? (
          <span class="sk-input-icon">
            <Icon type={props.icon} />
          </span>
        ) : null}
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
          onInput={(e) => (value.value = (e.target as HTMLInputElement).value)}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyup={onKeyup}
        />
      </div>
    );
  },
  methods: {
    focus() {
      this.$el.querySelector('.sk-input')?.focus();
    },
  },
});

export default Input;
