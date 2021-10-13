import {
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  Ref,
  watch,
  watchEffect,
} from 'vue';
import { ActiveIdSymbol, TabCollectSymbol, TabDestroySymbol, UseHiddenSymbol } from './Tabs';
import { TabCollect, TabDestroy, TabIdType } from './types';

const TabPanel = defineComponent({
  name: 'sk-tab-panel',

  props: {
    id: {
      type: [Number, String, Symbol] as PropType<TabIdType>,
      default: () => Symbol(),
    },
    title: String,
    lazy: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { slots }) {
    const hasNotShown = ref(true);

    const activeId = inject<Ref<TabIdType | null>>(ActiveIdSymbol);
    const tabsCollect = inject<TabCollect>(TabCollectSymbol);
    const tabsDestroy = inject<TabDestroy>(TabDestroySymbol);
    const checkIfUseHidden = inject<() => boolean>(UseHiddenSymbol);

    if (activeId === undefined) {
      return () => slots.default?.();
    }

    if (!tabsCollect || !tabsDestroy) {
      console.warn('TabPanel should be used within Tabs.');
      return () => slots.default?.();
    }

    const collect = () => {
      tabsCollect({
        title: slots.title || (() => props.title),
        id: props.id,
        disabled: props.disabled,
      });
    };

    onMounted(() => {
      collect();
      watch(() => props.title, collect);
      watch(() => props.disabled, collect);
    });

    onBeforeUnmount(() => {
      tabsDestroy(props.id);
    });

    watchEffect(() => {
      if (activeId.value === props.id) {
        hasNotShown.value = false;
      }
    });

    return () => {
      if (checkIfUseHidden?.()) {
        if (props.lazy && activeId.value !== props.id && hasNotShown.value) {
          return null;
        }

        return (
          <div class="sk-tabs-panel" hidden={activeId.value !== props.id}>
            {slots.default?.()}
          </div>
        );
      }

      return activeId.value !== props.id ? null : (
        <div class="sk-tabs-panel">{slots.default?.()}</div>
      );
    };
  },
});

export default TabPanel;
