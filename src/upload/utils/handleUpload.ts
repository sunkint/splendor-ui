import { UploadFileItem, UploadHandler, UploadStatus } from '../types';

export function handleUpload(item: UploadFileItem, onUpload: UploadHandler) {
  const report = (percent: number) => {
    item.percent = percent;
  };
  item.status = UploadStatus.UPLOADING;
  onUpload(item as Omit<UploadFileItem, 'file'> & { file: File }, report)
    .then(() => {
      item.percent = 100;
      item.status = UploadStatus.SUCCESS;
    })
    .catch(() => {
      item.status = UploadStatus.ERROR;
    });
}
