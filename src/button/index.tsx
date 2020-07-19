import { defineComponent, computed } from 'vue';
import './index.scss';

export interface ButtonProps {
  href: string;
  target: string;
  disabled: boolean;
  type: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
  size: 'normal' | 'small' | 'large';
  round: boolean;
}

const Button = defineComponent({
  name: 'sk-button',
  props: {
    href: {
      type: String,
    },
    target: {
      type: String,
      default: '_blank',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'default',
    },
    size: {
      type: String,
      default: 'normal',
    },
    round: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: ButtonProps) {
    const useLink = computed(() => {
      return !!props.href;
    });

    const btnClass = computed(() => {
      const { type, size, round, disabled } = props;
      return [
        'sk-btn',
        `sk-btn-${type}`,
        {
          'sk-btn-disabled': disabled,
          'sk-btn-size-small': size === 'small',
          'sk-btn-size-large': size === 'large',
          'sk-btn-round': round,
        },
      ];
    });

    return {
      useLink,
      btnClass,
    };
  },
  render() {
    const { useLink, btnClass, href, target, disabled, $slots: slots } = this;

    if (useLink) {
      return (
        <a class={btnClass} href={href} target={target}>
          <slot />
        </a>
      );
    }

    return (
      <button class={btnClass} disabled={disabled}>
        {slots.default()}
      </button>
    );
  },
});

Button.install = Vue => {
  Vue.component(Button.name, Button);
};

export default Button;
