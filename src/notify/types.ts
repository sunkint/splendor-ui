export enum NotifyType {
  INFO,
  SUCCESS,
  WARN,
  ERROR,
}

export interface NotifyOption {
  type?: NotifyType;
  content: string;
  duration?: number;
}

export type NotifyParams = Omit<NotifyOption, 'type'> | string;
