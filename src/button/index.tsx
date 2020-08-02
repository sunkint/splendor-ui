import { defineComponent, PropType, computed } from 'vue';
import './index.scss';

export type ButtonType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
export type ButtonSize = 'normal' | 'small' | 'large';

const Button = defineComponent({
  name: 'sk-button',
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: 'default' as ButtonType,
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: 'normal' as ButtonSize,
    },
    target: {
      type: String,
      default: '_blank',
    },
    href: String,
    round: Boolean,
    disabled: Boolean,
  },
  setup(props, { slots }) {
    const useLink = computed(() => !!props.href);
    const btnClass = computed(() => [
      'sk-btn',
      `sk-btn-${props.type}`,
      {
        [`sk-btn-size-${props.size}`]: props.size !== 'normal',
        'sk-btn-disabled': props.disabled,
        'sk-btn-round': props.round,
      },
    ]);
    return () => {
      if (useLink.value) {
        return (
          <a class={btnClass.value} href={props.href} target={props.target}>
            {slots.default && slots.default()}
          </a>
        );
      }

      return (
        <button class={btnClass.value} disabled={props.disabled}>
          {slots.default && slots.default()}
        </button>
      );
    };
  },
});

export default Button;
