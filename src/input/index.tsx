import { defineComponent, PropType, InputHTMLAttributes, ref, watch } from 'vue';
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
    maxlength: [String, Number],
    disabled: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
    name: String,
    placeholder: String,
    modelValue: String,
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

    return () => (
      <div class="sk-input-wrapper">
        <input
          class={['sk-input', { 'has-error': props.hasError }]}
          type={props.type}
          maxlength={props.maxlength ? +props.maxlength : undefined}
          placeholder={props.placeholder}
          disabled={props.disabled}
          readonly={props.readonly}
          name={props.name}
          autofocus={props.autofocus}
          value={value.value}
          onInput={(e) => (value.value = (e.target as HTMLInputElement).value)}
        />
      </div>
    );
  },
});

export default Input;
