import { PropType } from 'vue';
import { UploadHandler, UploadFileItem } from './types';

export const uploadProps = {
  fileList: Array as PropType<UploadFileItem[]>,
  beforeUpload: Function as PropType<(file: File) => boolean | Promise<void>>,
  onUpload: {
    type: Function as PropType<UploadHandler>,
    required: true,
  },
  triggerClass: null,
  onOverMaxSize: Function as PropType<(maxSize: number) => any>,
  onOverLimit: Function as PropType<(limit: number) => any>,
  onUploadError: Function as PropType<(err: any) => any>,
  maxSize: Number,
  accept: String,
  disabled: Boolean,
  multiple: Boolean,
  limit: {
    type: Number,
    default: Infinity,
  },
  showUploadList: {
    type: Boolean,
    default: true,
  },
  onChange: Function as PropType<(files: UploadFileItem[]) => any>,
};

export const imageUploadProps = {
  ...uploadProps,
  onGetThumb: Function as PropType<(file: File) => string | Promise<string>>,
};
