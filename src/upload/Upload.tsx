import { defineComponent, reactive, ref, Transition, watchEffect } from 'vue';
import Button from '../button';
import Icon from '../icon';
import Progress, { ProgressType } from '../progress';
import { uploadProps } from './props';
import { UploadStatus } from './types';
import { handleUpload } from './utils/handleUpload';

let uid = 0;

const Upload = defineComponent({
  name: 'sk-upload',
  props: uploadProps,
  setup(props, { slots }) {
    const fileRef = ref<HTMLInputElement>();
    const onClickUpload = () => {
      if (props.disabled) {
        return;
      }
      fileRef.value!.click();
    };

    const state = reactive({
      fileList: props.fileList || [],
    });

    watchEffect(() => {
      state.fileList = props.fileList || [];
    });

    const onInputChange = () => {
      if (!props.multiple) {
        state.fileList = [];
      }
      const files = Array.from(fileRef.value!.files!);
      if (files.length + state.fileList.length > props.limit) {
        props.onOverLimit?.(props.limit);
        return;
      }
      if (props.maxSize && files.some((item) => item.size > props.maxSize!)) {
        props.onOverMaxSize?.(props.maxSize);
        return;
      }
      for (const file of files) {
        const upload = () => {
          state.fileList.push({
            file,
            type: file.type,
            size: file.size,
            name: file.name,
            status: UploadStatus.BEFORE_UPLOAD,
            uid: (++uid).toString(),
            percent: 0,
          });
          try {
            props.onChange?.(state.fileList);
          } catch (err) {
            console.error(err);
          }
          handleUpload(
            state.fileList[state.fileList.length - 1],
            props.onUpload!,
            props.onUploadError
          );
        };

        if (props.beforeUpload) {
          const r = props.beforeUpload(file);
          if (typeof r === 'boolean') {
            if (r) {
              upload();
            }
          }
          if (r instanceof Promise) {
            r.then(upload).catch((err) => {
              console.error(err);
            });
          }
        } else {
          upload();
        }
      }
    };

    const onRetry = (i: number) => {
      const item = state.fileList[i];
      item.percent = 0;
      handleUpload(item, props.onUpload!);
    };

    const onRemoveFile = (i: number) => {
      state.fileList.splice(i, 1);
      props.onChange?.(state.fileList);
    };

    return () => (
      <div class="sk-upload">
        <input
          ref={fileRef}
          type="file"
          multiple={props.multiple}
          accept={props.accept}
          style={{ display: 'none' }}
          onChange={onInputChange}
        />
        {state.fileList.length < props.limit ? (
          <div class={['sk-upload-trigger', props.triggerClass]} onClick={onClickUpload}>
            {slots.default ? (
              slots.default()
            ) : (
              <Button type="info" icon="upload" disabled={props.disabled}>
                上传文件
              </Button>
            )}
          </div>
        ) : null}
        {props.showUploadList ? (
          <div class="sk-upload-file-list">
            {state.fileList.map((n, i) => {
              let progressType: ProgressType = 'info';
              if (n.status === UploadStatus.SUCCESS) {
                progressType = 'success';
              }
              if (n.status === UploadStatus.ERROR) {
                progressType = 'danger';
              }

              const isError = n.status === UploadStatus.ERROR;

              return (
                <div class={['sk-file-item', { 'sk-status-error': isError }]} key={n.uid || i}>
                  <div class="sk-file-item-inner">
                    {isError ? (
                      <div class="sk-file-icon">
                        <Icon type="info" />
                      </div>
                    ) : null}
                    <div class="sk-name" title={n.name}>
                      {n.name}
                    </div>
                    {isError ? (
                      <div class="sk-retry" onClick={onRetry.bind(null, i)}>
                        重试
                      </div>
                    ) : null}
                    <div class="sk-remove" onClick={onRemoveFile.bind(null, i)}>
                      删除
                    </div>
                  </div>
                  <Transition name="fade">
                    {n.status === UploadStatus.UPLOADING ? (
                      <div class="sk-upload-progress">
                        <Progress height={2} percent={n.percent} type={progressType} />
                      </div>
                    ) : null}
                  </Transition>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  },
});

export default Upload;
