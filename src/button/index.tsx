import { defineComponent } from 'vue';
import './index.scss';

export interface ButtonProps {
  href?: string;
  target?: string;
  disabled?: boolean;
  type?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
  size?: 'normal' | 'small' | 'large';
  round?: boolean;
}

const Button = defineComponent({
  name: 'sk-button',
  props: {
    type: String,
    size: String,
    round: Boolean,
    disabled: Boolean,
    target: String,
    href: String,
  },
  setup(props: ButtonProps, { slots }) {
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
