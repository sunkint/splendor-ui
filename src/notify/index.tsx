import {
  createApp,
  Teleport,
  ComponentPublicInstance,
  defineComponent,
  PropType,
  TransitionGroup,
} from 'vue';
import {
  NotifyOption,
  NotifyType,
  NotifyParams,
  NotifyCustomOption,
  NotifyCustom,
  NotifyConfig,
} from './types';
import Icon from '../icon';
import './index.scss';

const DURING_DEFAULT = 2000;
let notifyWrapper: ComponentPublicInstance<any>;
let seed = 1;

const NotifyApp = defineComponent({
  name: 'sk-notify-app',
  props: {
    options: {
      type: Array as PropType<NotifyConfig[]>,
      required: true,
    },
  },
  setup(props) {
    const getIconType = (type?: NotifyType) => {
      switch (type) {
        case NotifyType.SUCCESS:
          return 'ok-o';
        case NotifyType.INFO:
          return 'info';
        case NotifyType.WARN:
          return 'info';
        case NotifyType.ERROR:
          return 'close-o';
        default:
          return 'info';
      }
    };

    return () => (
      <TransitionGroup>
        {props.options.map((item) => (
          <div
            key={item.ref}
            class={[
              'sk-notify',
              {
                'sk-notify-success': item.type === NotifyType.SUCCESS,
                'sk-notify-info': item.type === NotifyType.INFO,
                'sk-notify-warn': item.type === NotifyType.WARN,
                'sk-notify-error': item.type === NotifyType.ERROR,
              },
            ]}
          >
            <Icon class="sk-notify-icon" type={getIconType(item.type)} />
            <div class="sk-notify-content">{item.content}</div>
          </div>
        ))}
      </TransitionGroup>
    );
  },
});

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
