import { defineComponent } from 'vue';
import './index.scss';

const Switch = defineComponent({
  name: 'sk-switch',
  props: {
    modelValue: Boolean,
    disabled: Boolean,
  },
  setup(props, { emit }) {
    const toggle = () => {
      if (props.disabled) return;
      emit('update:modelValue', !props.modelValue);
    };
    return () => (
      <div
        class={[
          'sk-switch',
          { 'sk-switch-on': props.modelValue, 'sk-switch-disabled': props.disabled },
        ]}
        onClick={toggle}
      ></div>
    );
  },
});

export default Switch;
