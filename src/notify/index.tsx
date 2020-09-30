import { createApp, Teleport, ComponentPublicInstance } from 'vue';
import {
  NotifyOption,
  NotifyType,
  NotifyParams,
  NotifyCustomOption,
  NotifyCustom,
  NotifyConfig,
} from './types';
import NotifyApp from './notify.vue';
import './index.scss';

const DURING_DEFAULT = 2000;
let notifyWrapper: ComponentPublicInstance<any>;
let seed = 1;

const startNotify = (options: NotifyOption) => {
  if (!notifyWrapper) {
    notifyWrapper = createApp({
      data() {
        return {
          notifyList: [],
        };
      },
      methods: {
        appendOption(config: NotifyConfig) {
          this.notifyList.push(config);
        },
        removeOption(config: NotifyConfig) {
          this.notifyList = this.notifyList.filter((item: NotifyConfig) => item.ref !== config.ref);
        },
      },
      render() {
        return (
          <Teleport to="body">
            <div class="sk-notify-wrapper">
              {/*
              // @ts-ignore */}
              <NotifyApp options={this.notifyList} />
            </div>
          </Teleport>
        );
      },
    }).mount(document.createElement('div'));
  }
  const currentSeed = seed++;
  const config = {
    ...options,
    ref: currentSeed,
  };
  notifyWrapper.appendOption(config);
  setTimeout(() => {
    notifyWrapper.removeOption(config);
  }, options.duration || DURING_DEFAULT);
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
  custom: (options: NotifyCustomOption) => {
    const type = NotifyCustom[options.type];
    startNotify({
      ...options,
      type,
    });
  },
};

export default Notify;
