import { defineComponent, PropType } from 'vue';
import './index.scss';

export type ButtonType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
export type ButtonSize = 'normal' | 'small' | 'large';

const Button = defineComponent({
  name: 'sk-button',
  props: {
    type: String as PropType<ButtonType>,
    size: String as PropType<ButtonSize>,
    round: Boolean,
    disabled: Boolean,
    target: String,
    href: String,
  },
  setup(props, { slots }) {
    const {
      href,
      target = '_blank',
      type = 'default',
      size = 'normal',
      round = false,
      disabled = false,
    } = props;
    const useLink = !!href;
    const btnClass = [
      'sk-btn',
      `sk-btn-${type}`,
      {
        [`sk-btn-size-${size}`]: size !== 'normal',
        'sk-btn-disabled': disabled,
        'sk-btn-round': round,
      },
    ];

    const content = slots.default && slots.default();
    if (useLink) {
      return () => (
        <a class={btnClass} href={href} target={target}>
          {content}
        </a>
      );
    }

    return () => (
      <button class={btnClass} disabled={disabled}>
        {content}
      </button>
    );
  },
});

export default Button;
