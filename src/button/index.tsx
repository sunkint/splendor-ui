import { FunctionalComponent } from 'vue';
import './index.scss';

export interface ButtonProps {
  href?: string;
  target?: string;
  disabled?: boolean;
  type?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
  size?: 'normal' | 'small' | 'large';
  round?: boolean;
}

const Button: FunctionalComponent<ButtonProps> = (props, { slots }) => {
  const {
    href,
    target = '_blank',
    disabled = false,
    type = 'default',
    size = 'normal',
    round = false,
  } = props;
  const useLink = !!href;
  const btnClass = [
    'sk-btn',
    `sk-btn-${type}`,
    {
      'sk-btn-disabled': disabled,
      'sk-btn-size-small': size === 'small',
      'sk-btn-size-large': size === 'large',
      'sk-btn-round': round,
    },
  ];

  if (useLink) {
    return (
      <a class={btnClass} href={href} target={target}>
        <slot />
      </a>
    );
  }

  return (
    <button class={btnClass} disabled={disabled}>
      {slots.default && slots.default()}
    </button>
  );
};

export default Button;
