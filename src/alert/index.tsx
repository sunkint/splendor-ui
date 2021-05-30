import { computed, defineComponent, PropType } from 'vue';
import Icon from '../icon';
import './index.scss';

export type AlertType =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'light';

const Alert = defineComponent({
  name: 'sk-alert',
  props: {
    type: {
      type: String as PropType<AlertType>,
      default: 'info' as AlertType,
    },
    size: {
      type: String as PropType<'normal' | 'small'>,
      default: 'normal',
    },
    icon: String,
    closable: Boolean,
    onClose: Function as PropType<() => any>,
  },
  setup(props, { emit, slots }) {
    const onClose = () => {
      emit('close');
    };
    const alertClass = computed(() => {
      return [
        'sk-alert',
        `sk-alert-${props.type}`,
        {
          'sk-alert-closable': props.closable,
          'sk-alert-small': props.size === 'small',
        },
      ];
    });
    return () => (
      <div class={alertClass.value}>
        {props.closable ? (
          <button class="sk-alert-close" onClick={onClose}>
            <Icon type="close" />
          </button>
        ) : null}
        {props.icon ? (
          <div class="sk-alert-content-withicon">
            <div class="sk-alert-icon">
              <Icon type={props.icon} />
            </div>
            <div class="sk-alert-content">{slots.default?.()}</div>
          </div>
        ) : (
          <div class="sk-alert-content">{slots.default?.()}</div>
        )}
      </div>
    );
  },
});

export default Alert;
