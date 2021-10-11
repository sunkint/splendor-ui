import { UploadFileItem, UploadHandler, UploadStatus } from '../types';

export function handleUpload(
  item: UploadFileItem,
  onUpload: UploadHandler,
  onUploadError?: (err: any) => any
) {
  const report = (percent: number) => {
    item.percent = percent;
  };
  item.status = UploadStatus.UPLOADING;
  onUpload(item as Omit<UploadFileItem, 'file'> & { file: File }, report)
    .then(() => {
      item.percent = 100;
      item.status = UploadStatus.SUCCESS;
    })
    .catch((err) => {
      onUploadError?.(err);
      item.status = UploadStatus.ERROR;
    });
}
