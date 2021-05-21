import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  reactive,
  ref,
  renderSlot,
} from 'vue';
import './index.scss';

const InfiniteScroll = defineComponent({
  name: 'sk-infinite-scroll',

  props: {
    autoLoad: {
      type: Boolean,
      default: true,
    },
    autoLoadDistance: {
      type: Number,
      default: 300,
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
    useWindow: {
      type: Boolean,
      default: false,
    },
    onLoad: {
      type: Function as PropType<(isInitLoad: boolean) => Promise<any>>,
      required: true,
    },
    height: {
      type: [Number, String],
    },
  },

  setup(props, { slots }) {
    const root = ref<HTMLDivElement>();
    const inner = ref<HTMLDivElement>();

    const state = reactive({
      loading: false,
      loadError: false,
    });

    const onLoad = (isInitLoad = false) => {
      state.loading = true;
      state.loadError = false;

      return props
        .onLoad(isInitLoad)
        .catch(() => {
          state.loadError = true;
        })
        .finally(() => {
          state.loading = false;
        });
    };

    onMounted(() => {
      onLoad(true);
    });

    const onScroll = (fromWindow = false) => {
      if (props.useWindow && !fromWindow) {
        return;
      }
      if (state.loading || state.loadError || !props.hasMore || !props.autoLoad) {
        return;
      }
      const element = root.value!;
      if (props.useWindow) {
        if (
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - props.autoLoadDistance
        ) {
          onLoad();
        }
      } else if (
        element.scrollTop + element.clientHeight >=
        element.scrollHeight - props.autoLoadDistance
      ) {
        onLoad();
      }
    };

    const onScrollForWindow = () => {
      onScroll(true);
    };

    if (props.useWindow) {
      onMounted(() => {
        window.addEventListener('scroll', onScrollForWindow);
      });

      onBeforeUnmount(() => {
        window.removeEventListener('scroll', onScrollForWindow);
      });
    }

    return () => {
      const completeTip = (
        <div class="sk-infinite-scroll-complete-tip">
          {slots.complete ? slots.complete() : <span>加载结束</span>}
        </div>
      );

      const continueTip = (
        <div class="sk-infinite-scroll-continue-tip">
          {slots.continue ? (
            renderSlot(slots, 'continue', { load: onLoad })
          ) : (
            <a onClick={onLoad.bind(null)}>点此继续加载</a>
          )}
        </div>
      );

      const loadingTip = (
        <div class="sk-infinite-scroll-loading-tip">
          {slots.loading ? slots.loading() : <span>加载中…</span>}
        </div>
      );

      const errorTip = (
        <div class="sk-infinite-scroll-error-tip">
          {slots.error ? (
            renderSlot(slots, 'error', { load: onLoad })
          ) : (
            <a onClick={onLoad.bind(null)}>加载失败，点此重试</a>
          )}
        </div>
      );

      const tip = (() => {
        if (!props.hasMore) {
          return completeTip;
        }
        if (state.loading) {
          return loadingTip;
        }
        if (state.loadError) {
          return errorTip;
        }
        return continueTip;
      })();

      return (
        <div
          ref={root}
          class="sk-infinite-scroll"
          onScroll={onScroll.bind(null, false)}
          style={{ height: Number.isFinite(props.height) ? `${props.height}px` : props.height }}
        >
          <div ref={inner} class="sk-infinite-scroll-inner">
            {slots.default?.()}
          </div>
          {tip}
        </div>
      );
    };
  },
});

export default InfiniteScroll;
