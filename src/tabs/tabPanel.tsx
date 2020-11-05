import { defineComponent, inject, onBeforeUnmount, onMounted, PropType, Ref } from 'vue';
import { TabCollect, TabDestroy, TabIdType } from './types';

const TabPanel = defineComponent({
  name: 'sk-tab-panel',

  props: {
    id: {
      type: [Number, String, Symbol] as PropType<TabIdType>,
      default: () => Symbol(),
    },
    title: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { slots }) {
    const activeId = inject<Ref<TabIdType | null>>('activeId');
    const tabsCollect = inject<TabCollect>('tabsCollect');
    const tabsDestroy = inject<TabDestroy>('tabsDestroy');
    if (activeId === undefined) {
      return () => slots.default?.();
    }
    if (!tabsCollect || !tabsDestroy) {
      console.warn('TabPanel should be used within Tabs.');
      return () => slots.default?.();
    }
    onMounted(() => {
      tabsCollect({
        title: slots.title ? slots.title() : props.title,
        id: props.id,
        disabled: props.disabled,
      });
    });
    onBeforeUnmount(() => {
      tabsDestroy(props.id);
    });
    return () => {
      return activeId.value !== props.id ? null : (
        <div class="sk-tabs-panel">{slots.default?.()}</div>
      );
    };
  },
});

export default TabPanel;
