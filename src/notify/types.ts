export enum NotifyType {
  INFO,
  SUCCESS,
  WARN,
  ERROR,
}

type NotifyCustomType = 'success' | 'info' | 'warn' | 'error';

export const NotifyCustom: Record<NotifyCustomType, NotifyType> = {
  success: NotifyType.SUCCESS,
  info: NotifyType.INFO,
  warn: NotifyType.WARN,
  error: NotifyType.ERROR,
};

export interface NotifyOption {
  type?: NotifyType;
  content: string;
  duration?: number;
}

export interface NotifyConfig extends NotifyOption {
  ref: number;
}

export type NotifyCustomOption = Omit<NotifyOption, 'type'> & {
  type: NotifyCustomType;
};

export type NotifyParams = Omit<NotifyOption, 'type'> | string;
