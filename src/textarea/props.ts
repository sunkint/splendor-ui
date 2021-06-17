import { PropType } from 'vue';

const TextareaProps = {
  hasError: {
    type: Boolean,
    default: false,
  },
  maxlength: [Number, String],
  placeholder: String,
  modelValue: String,
  height: [String, Number],
  autoHeight: {
    type: Boolean,
    default: false,
  },
  block: Boolean,
  id: String,
  name: String,
  disabled: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  resize: String as PropType<'both' | 'horizontal' | 'vertical' | 'none'>,
  onPressCtrlEnter: Function as PropType<(e: KeyboardEvent) => void>,
  onKeypress: Function as PropType<(e: KeyboardEvent) => void>,
  onKeydown: Function as PropType<(e: KeyboardEvent) => void>,
  onKeyup: Function as PropType<(e: KeyboardEvent) => void>,
  onFocus: Function as PropType<(e: FocusEvent) => void>,
  onBlur: Function as PropType<(e: FocusEvent) => void>,
  onChange: Function as PropType<(e: Event) => void>,
  onInput: Function as PropType<(e: Event) => void>,
};

export default TextareaProps;
