import { defineComponent, computed } from 'vue';
import './index.scss';

const Radio = defineComponent({
  name: 'sk-radio',
  props: {
    id: String,
    name: String,
    disabled: Boolean,
    value: {
      type: String,
      required: true,
    },
    modelValue: String,
  },
  setup(props, { slots, emit }) {
    const onSelected = () => {
      if (props.disabled) {
        return;
      }
      emit('update:modelValue', props.value);
    };

    const checked = computed(() => {
      return props.modelValue === props.value;
    });

    return () => (
      <div class="sk-radio">
        <label
          class={[
            'sk-radio-label',
            {
              'sk-radio-disabled': props.disabled,
            },
          ]}
          onClick={onSelected}
        >
          <input
            id={props.id}
            name={props.name}
            class="sk-radio-input"
            type="radio"
            value={props.value}
            disabled={props.disabled}
            checked={checked.value}
          />
          <span class="sk-radio-before"></span>
          {slots.default?.()}
        </label>
      </div>
    );
  },
});

export default Radio;
