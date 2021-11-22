import { defineComponent, PropType, ref, watch, onMounted } from 'vue';
import './index.scss';

const Checkbox = defineComponent({
  name: 'sk-checkbox',
  props: {
    id: String,
    name: String,
    value: {
      type: String,
      default: 'on',
    },
    disabled: Boolean,
    modelValue: Boolean,
    onChange: Function as PropType<(e: Event) => void>,
  },
  setup(props, { slots, emit }) {
    const onChange = (e: Event) => {
      const checked = (e.target as HTMLInputElement).checked;
      emit('update:modelValue', checked);
      props.onChange?.(e);
    };
    return () => (
      <div class="sk-checkbox">
        <label
          class={[
            'sk-checkbox-label',
            {
              'sk-checkbox-disabled': props.disabled,
            },
          ]}
        >
          <input
            id={props.id}
            name={props.name}
            class="sk-checkbox-input"
            type="checkbox"
            checked={props.modelValue}
            value={props.value}
            onChange={onChange}
            disabled={props.disabled}
          />
          <span class="sk-checkbox-before"></span>
          {slots.default?.()}
        </label>
      </div>
    );
  },
});

const CheckboxGroup = defineComponent({
  name: 'sk-checkbox-group',
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: [],
    },
    onChange: Function as PropType<(checkedValueList: string[]) => void>,
  },
  setup(props, { slots, emit }) {
    const group = ref<HTMLElement | null>(null);

    onMounted(() => {
      watch(
        props.modelValue,
        (value) => {
          group.value
            ?.querySelectorAll('input[type=checkbox]')
            .forEach((item: HTMLInputElement) => {
              item.checked = value.includes(item.value);
            });
        },
        {
          immediate: true,
        }
      );
    });

    const onChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target?.type === 'checkbox') {
        const value = target.value;
        const checked = target.checked;
        if (checked) {
          const t = [...props.modelValue, value];
          emit('update:modelValue', t);
          props.onChange?.(t);
        } else {
          const t = props.modelValue.filter((n) => n !== value);
          emit('update:modelValue', t);
          props.onChange?.(t);
        }
      }
    };

    return () => (
      <div ref={group} class="sk-checkbox-group" onChange={onChange}>
        {slots.default?.()}
      </div>
    );
  },
});

Checkbox.Group = CheckboxGroup;

export { CheckboxGroup };
export default Checkbox;
