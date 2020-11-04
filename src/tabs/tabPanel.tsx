import { defineComponent, inject, onBeforeUnmount, onMounted, PropType, Ref } from 'vue';
import { Collect, DelTab, TabIdType } from './type';

const TabPanel = defineComponent({
  name: 'sk-tab-panel',

  props: {
    id: {
      type: [Number, String, Symbol] as PropType<TabIdType>,
      default: () => Symbol(),
    },
    title: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { slots }) {
    const activeId = inject<Ref<TabIdType | null>>('activeId');
    const tabsCollect = inject<Collect>('tabsCollect');
    const delTabs = inject<DelTab>('delTabs');
    if (activeId === undefined) {
      return () => slots.default?.();
    }
    onMounted(() => {
      tabsCollect?.({ title: props.title, id: props.id, disabled: props.disabled });
    });
    onBeforeUnmount(() => {
      delTabs?.(null, props.id);
    });
    return () => {
      return activeId.value !== props.id ? null : (
        <div class="sk-tab-panel">{slots.default?.()}</div>
      );
    };
  },
});

export default TabPanel;
