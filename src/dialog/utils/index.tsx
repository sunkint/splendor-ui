import { App, createApp, defineComponent, h, VNode } from 'vue';
import Dialog from '..';

let dialogId = 0;
const dialogIdMap = new Map<number, App>();

export type ContentSlot = (ctx: { close: () => void }) => string | VNode;

export interface DialogOpenParams {
  title?: string;
  content?: string | VNode | ContentSlot;
  footer?: string | VNode | ContentSlot;
  maskClosable?: boolean;
  closeBtn?: boolean;
  closeOnEsc?: boolean;
  class?: any;
  style?: string | Record<string, any>;
  onClose?: () => any;
}

export const openDialog = (params: DialogOpenParams = {}) => {
  const {
    title,
    maskClosable,
    closeBtn,
    closeOnEsc,
    onClose,
    class: className,
    style,
    content,
    footer,
  } = params;
  const currentDialogId = ++dialogId;
  const dialogApp = createApp(
    defineComponent({
      data() {
        return {
          dialogId: currentDialogId,
          open: true,
        };
      },
      watch: {
        open(open) {
          if (!open) {
            setTimeout(() => {
              // @ts-ignore
              dialogApp.unmount();
            }, 500);
          }
        },
      },
      methods: {
        close() {
          this.open = false;
        },
      },
      render() {
        return h(
          Dialog,
          {
            title,
            maskClosable,
            closeBtn,
            closeOnEsc,
            onClose,
            class: className,
            style,
            modelValue: this.open,
            'onUpdate:modelValue': (value: boolean) => {
              this.open = value;
            },
          },
          {
            default:
              typeof content === 'function'
                ? content.bind(null, { close: this.close })
                : () => content,
            footer: footer
              ? typeof footer === 'function'
                ? footer.bind(null, { close: this.close })
                : () => footer
              : null,
          }
        );
      },
      mounted() {
        dialogIdMap.set(this.dialogId, dialogApp);
      },
      beforeUnmount() {
        dialogIdMap.delete(this.dialogId);
      },
    })
  );

  dialogApp.mount(document.createElement('div'));
  return currentDialogId;
};

export const closeDialog = (dialogId: number) => {
  // @ts-ignore
  dialogIdMap.get(dialogId)?.close();
};
