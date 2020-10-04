export interface SweetAlertBaseOptions {
  title?: string;
  content: any;
  onConfirm?: () => any;
  onClose?: () => any;
  confirmText?: string;
  closeBtn?: boolean;
  maskClosable?: boolean;
  closeOnEsc?: boolean;
  class?: any;
  style?: string | Record<string, any>;
}

export interface SweetAlertAlertOptions extends SweetAlertBaseOptions {}

export interface SweetAlertConfirmOptions extends SweetAlertBaseOptions {
  onCancel?: () => any;
  cancelText?: string;
}
