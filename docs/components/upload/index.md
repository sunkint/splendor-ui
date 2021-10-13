# Upload 上传

### 基础用法

默认只允许选择一个文件，新选择的文件将覆盖之前选择的文件。

<UploadBasic />

```vue
<template>
  <div class="docs-preview-part">
    <sk-upload @upload="upload" />
  </div>
</template>

<script>
export default {
  setup() {
    return {
      upload(_file, report) {
        return new Promise((resolve, reject) => {
          let count = 0;
          const update = () => {
            if (count < 100) {
              count += 10;
              report(count);
              setTimeout(update, 500);
            } else {
              // 随机成功或失败
              const success = Math.random() > 0.5;
              if (success) {
                resolve();
              } else {
                reject();
              }
            }
          };
          setTimeout(update, 500);
        });
      },
    };
  },
};
</script>
```

### 上传多个文件

<UploadMultiple />

```vue
<template>
  <div class="docs-preview-part">
    <sk-upload multiple :limit="3" @upload="upload" @overLimit="onOverLimit">
      <sk-button type="info" icon="upload">选择文件（最多3个）</sk-button>
    </sk-upload>
  </div>
</template>

<script>
import { Notify } from 'splendor-ui';
export default {
  setup() {
    return {
      upload(_file, report) {
        return new Promise((resolve, reject) => {
          let count = 0;
          const update = () => {
            if (count < 100) {
              count += 10;
              report(count);
              setTimeout(update, 500);
            } else {
              // 随机成功或失败
              const success = Math.random() > 0.5;
              if (success) {
                resolve();
              } else {
                reject();
              }
            }
          };
          setTimeout(update, 500);
        });
      },
      onOverLimit(limit) {
        Notify.error(`最多可上传 ${limit} 个文件`);
      },
    };
  },
};
</script>
```

### API

#### Upload

| 参数           | 说明                                                                      | 类型                     | 可选值         | 默认值     |
| -------------- | ------------------------------------------------------------------------- | ------------------------ | -------------- | ---------- | ---- |
| fileList       | 默认展示的文件列表                                                        | `UploadFileItem[]`       |                | `[]`       |
| beforeUpload   | 文件上传前的预处理函数，若返回 false 或 reject 的 Promise，则不上传该文件 | `(file: File) => boolean | Promise<void>` |            | `[]` |
| triggerClass   | 触发元素包裹层的自定义类名                                                | string、array、object    |                | -          |
| maxSize        | 图片大小限制，单位为 byte                                                 | number                   |                | `Infinity` |
| accept         | 可选文件类型，与 input accept 一致                                        | string                   |                | -          |
| multiple       | 是否支持文件多选                                                          | bool                     |                | false      |
| limit          | 文件多选时，图片数量限制                                                  | number                   |                | `Infinity` |
| disabled       | 是否禁用上传                                                              | bool                     |                | false      |
| showUploadList | 是否显示上传列表，如果需要自行实现上传列表，请关闭这个选项                | bool                     |                | true       |

### 事件

#### Upload

| 事件        | 说明                     | 参数类型                           |
| ----------- | ------------------------ | ---------------------------------- |
| upload      | 上传文件处理函数         | `UploadHandler`                    |
| change      | 选择文件变化处理函数     | `(files: UploadFileItem[]) => any` |
| overMaxSize | 文件大小超限处理函数     | `(maxSize: number) => any`         |
| overLimit   | 文件数量超限处理函数     | `(limit: number) => any`           |
| uploadError | 文件上传出错时的回调函数 | `(err: any) => any`                |

> #### UploadHandler <sk-tag ghost>type</sk-tag>
>
> ```ts
> export type UploadHandler<T = any> = (
>   fileItem: Omit<UploadFileItem, 'file'> & { file: File },
>   report: (percent: number) => void
> ) => Promise<T>;
> ```

> #### UploadFileItem <sk-tag ghost>type</sk-tag>
>
> ```ts
> export type UploadFileItem = {
>   file?: File;
>   name: string;
>   url?: string;
>   uid?: string;
>   type?: string;
>   thumbUrl?: string;
>   size?: number;
>   percent?: number;
>   status?: UploadStatus;
> } & Record<string, any>;
> ```

> #### UploadStatus <sk-tag ghost>enum</sk-tag>
>
> ```ts
> export enum UploadStatus {
>   BEFORE_UPLOAD = 'beforeUpload',
>   UPLOADING = 'uploading',
>   SUCCESS = 'success',
>   ERROR = 'error',
> }
> ```
