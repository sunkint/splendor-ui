import { defineComponent, ref } from 'vue';
import './index.scss';

const Switch = defineComponent({
  name: 'sk-switch',
  props: {
    id: String,
    name: String,
    value: {
      type: String,
      default: 'on',
    },
    modelValue: Boolean,
    disabled: Boolean,
  },
  setup(props, { emit }) {
    const toggle = () => {
      if (props.disabled) {
        return;
      }
      const checked = !props.modelValue;
      emit('update:modelValue', checked);
    };

    return () => (
      <div
        class={[
          'sk-switch',
          { 'sk-switch-on': props.modelValue, 'sk-switch-disabled': props.disabled },
        ]}
        onClick={toggle}
      >
        <input
          id={props.id}
          name={props.name}
          class="sk-switch-input"
          type="checkbox"
          checked={props.modelValue}
          disabled={props.disabled}
        />
      </div>
    );
  },
});

export default Switch;
