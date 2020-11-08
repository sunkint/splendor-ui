import { createApp, defineComponent, ref, h, PropType, onMounted, reactive } from 'vue';
import { SweetAlertAlertOptions, SweetAlertConfirmOptions } from './types';
import Button from '../button';
import Dialog from '../dialog';
import Notify from '../notify';
import './index.scss';

const AlertDialog = defineComponent({
  name: 'sk-alert-dialog',
  props: {
    options: {
      type: Object as PropType<Omit<SweetAlertAlertOptions, 'content'>>,
      required: true,
    },
  },
  setup: (props, { slots, emit, attrs }) => {
    const state = reactive({
      isConfirming: false,
    });

    onMounted(() => {
      (document.body.querySelector(
        '.sk-alert-dialog-confirm-btn'
      ) as HTMLButtonElement | null)?.focus();
    });

    const onClose = () => {
      emit('update:modelValue', false);
      props.options.onClose?.();
    };

    const onConfirm = () => {
      const result = props.options.onConfirm?.();
      if (result && result instanceof Promise) {
        state.isConfirming = true;
        result
          .then(() => {
            onClose();
          })
          .catch((err) => {
            Notify.error(err);
          })
          .finally(() => {
            state.isConfirming = false;
          });
      } else {
        onClose();
      }
    };

    return () => {
      const {
        title = '提示',
        closeBtn = true,
        maskClosable = false,
        closeOnEsc = true,
        confirmText = '确定',
      } = props.options;

      const { class: className = '', style = '' } = attrs;

      const footer = () => {
        return (
          <Button
            class="sk-alert-dialog-confirm-btn"
            type="primary"
            onClick={onConfirm}
            loading={state.isConfirming}
          >
            {confirmText}
          </Button>
        );
      };

      return h(
        Dialog,
        {
          title,
          closeBtn,
          closeOnEsc,
          maskClosable,
          class: [className, 'sk-sweetalert-dialog'],
          style,
          onClose,
        },
        {
          default: slots.default,
          footer,
        }
      );
    };
  },
});

const ConfirmDialog = defineComponent({
  name: 'sk-confirm-dialog',
  props: {
    options: {
      type: Object as PropType<Omit<SweetAlertConfirmOptions, 'content'>>,
      required: true,
    },
  },
  setup: (props, { slots, emit, attrs }) => {
    const state = reactive({
      isConfirming: false,
    });

    onMounted(() => {
      (document.body.querySelector(
        '.sk-alert-dialog-confirm-btn'
      ) as HTMLButtonElement | null)?.focus();
    });

    const onClose = () => {
      emit('update:modelValue', false);
      props.options.onClose?.();
    };

    const onCancel = () => {
      props.options.onCancel?.();
      onClose();
    };

    const onConfirm = () => {
      const result = props.options.onConfirm?.();
      if (result && result instanceof Promise) {
        state.isConfirming = true;
        result
          .then(() => {
            onClose();
          })
          .catch((err) => {
            Notify.error(err);
          })
          .finally(() => {
            state.isConfirming = false;
          });
      } else {
        onClose();
      }
    };

    return () => {
      const {
        title = '提示',
        closeBtn = true,
        maskClosable = false,
        closeOnEsc = true,
        cancelText = '取消',
        confirmText = '确定',
      } = props.options;

      const { class: className = '', style = '' } = attrs;

      const footer = () => {
        return (
          <>
            <Button
              class="sk-alert-dialog-cancel-btn"
              onClick={onCancel}
              disabled={state.isConfirming}
            >
              {cancelText}
            </Button>
            <Button
              class="sk-alert-dialog-confirm-btn"
              type="primary"
              onClick={onConfirm}
              loading={state.isConfirming}
            >
              {confirmText}
            </Button>
          </>
        );
      };

      return h(
        Dialog,
        {
          title,
          closeBtn,
          closeOnEsc,
          maskClosable,
          class: [className, 'sk-sweetalert-dialog'],
          style,
          onClose,
        },
        {
          default: slots.default,
          footer,
        }
      );
    };
  },
});

const SweetAlert = {
  alert(options: SweetAlertAlertOptions) {
    const { content, class: className, style, ...restOptions } = options;
    const dialogApp = createApp({
      setup() {
        const open = ref(true);
        return () =>
          h(
            AlertDialog,
            {
              options: restOptions,
              modelValue: open.value,
              class: className,
              style,
              'onUpdate:modelValue': (value: boolean) => {
                open.value = value;
              },
            },
            () => content
          );
      },
    });
    dialogApp.mount(document.createElement('div'));
  },
  confirm(options: SweetAlertConfirmOptions) {
    const { content, class: className, style, ...restOptions } = options;
    const dialogApp = createApp({
      setup() {
        const open = ref(true);
        return () =>
          h(
            ConfirmDialog,
            {
              options: restOptions,
              modelValue: open.value,
              class: className,
              style,
              'onUpdate:modelValue': (value: boolean) => {
                open.value = value;
              },
            },
            () => content
          );
      },
    });
    dialogApp.mount(document.createElement('div'));
  },
};

export default SweetAlert;
