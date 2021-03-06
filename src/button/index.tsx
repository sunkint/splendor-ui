import { defineComponent, PropType, computed } from 'vue';
import Icon from '../icon';
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
    rel: String,
    htmlType: String as PropType<'button' | 'submit' | 'reset'>,
    block: Boolean,
    icon: String,
    href: String,
    round: Boolean,
    disabled: Boolean,
    loading: Boolean,
    onClick: Function as PropType<(e: Event) => any>,
  },
  setup(props, { slots }) {
    const useLink = computed(() => !!props.href);
    const btnClass = computed(() => [
      'sk-btn',
      `sk-btn-${props.type}`,
      {
        [`sk-btn-size-${props.size}`]: props.size !== 'normal',
        'sk-btn-disabled': !props.loading && props.disabled,
        'sk-btn-loading': props.loading,
        'sk-btn-round': props.round,
        'sk-btn-block': props.block,
      },
    ]);

    const onClick = (e: MouseEvent) => {
      if (props.disabled || props.loading) {
        return;
      }
      props.onClick?.(e);
    };

    return () => {
      if (useLink.value) {
        return (
          <a
            class={btnClass.value}
            href={props.disabled ? undefined : props.href}
            target={props.target}
            rel={props.rel}
            onClick={onClick}
          >
            {props.icon ? <Icon class="sk-btn-icon" type={props.icon} /> : null}
            {slots.default?.()}
          </a>
        );
      }

      return (
        <button
          type={props.htmlType}
          class={btnClass.value}
          disabled={props.disabled || props.loading}
          onClick={onClick}
        >
          {props.icon ? <Icon class="sk-btn-icon" type={props.icon} /> : null}
          {slots.default?.()}
        </button>
      );
    };
  },
});

export default Button;
