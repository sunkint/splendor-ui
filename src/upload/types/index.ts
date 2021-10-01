export enum UploadStatus {
  BEFORE_UPLOAD = 'beforeUpload',
  UPLOADING = 'uploading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type UploadFileItem = {
  file?: File;
  name: string;
  url?: string;
  uid?: string;
  type?: string;
  thumbUrl?: string;
  size?: number;
  percent?: number;
  status?: UploadStatus;
} & Record<string, any>;

export type UploadHandler<T = any> = (file: File, report: (percent: number) => void) => Promise<T>;
