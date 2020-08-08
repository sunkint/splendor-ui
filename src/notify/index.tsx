import { createApp } from 'vue';
import { NotifyOption, NotifyType, NotifyParams } from './types';
import NotifyApp from './notify.vue';
import './index.scss';

const DURING_DEFAULT = 2000;

const startNotify = (options: NotifyOption) => {
  const { type = NotifyType.INFO, content, duration = DURING_DEFAULT } = options;
  const onClose = () => {
    notifyApp.unmount(wrapper);
  };
  const notifyApp = createApp(() => (
    // @ts-ignore
    <NotifyApp type={type} duration={duration} onClose={onClose}>
      {() => content}
    </NotifyApp>
  ));

  const wrapper = document.querySelector('.sk-notify-wrapper') || document.createElement('div');
  wrapper.className = 'sk-notify-wrapper';
  document.body.append(wrapper);

  notifyApp.mount(wrapper);
};

const Notify = {
  info: (options: NotifyParams) => {
    if (typeof options === 'string') {
      startNotify({
        content: options,
        type: NotifyType.INFO,
      });
    } else {
      startNotify({
        ...options,
        type: NotifyType.INFO,
      });
    }
  },
  success: (options: NotifyParams) => {
    if (typeof options === 'string') {
      startNotify({
        content: options,
        type: NotifyType.SUCCESS,
      });
    } else {
      startNotify({
        ...options,
        type: NotifyType.SUCCESS,
      });
    }
  },
  warn: (options: NotifyParams) => {
    if (typeof options === 'string') {
      startNotify({
        content: options,
        type: NotifyType.WARN,
      });
    } else {
      startNotify({
        ...options,
        type: NotifyType.WARN,
      });
    }
  },
  error: (options: NotifyParams) => {
    if (typeof options === 'string') {
      startNotify({
        content: options,
        type: NotifyType.ERROR,
      });
    } else {
      startNotify({
        ...options,
        type: NotifyType.ERROR,
      });
    }
  },
};

export default Notify;
