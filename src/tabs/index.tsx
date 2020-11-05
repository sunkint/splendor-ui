import { defineComponent, PropType, provide, reactive, computed, watch, nextTick } from 'vue';
import TabPanel from './tabPanel';
import { TabsType, Collect, TabIdType } from './type';
import './index.scss';
export const TabSymbol = Symbol();

const Tabs = defineComponent({
  name: 'sk-tabs',

  props: {
    onChange: Function as PropType<(id: TabIdType) => any>,
    closeable: Boolean,
    modelValue: [Number, String, Symbol] as PropType<TabIdType>,
  },

  setup(props, { slots, emit }) {
    const state = reactive({
      tabsArray: [] as TabsType[],
      activeId: props.modelValue as TabIdType | null,
    });

    const tabsCollect: Collect = (tab: TabsType) => {
      state.tabsArray.push(tab);
    };

    const delTabs = (e: MouseEvent | null, id: TabIdType) => {
      e?.stopPropagation();
      nextTick(() => {
        state.tabsArray = state.tabsArray.filter((item) => item.id !== id);
        if (state.tabsArray.length > 0 && state.activeId === id) {
          emit('update:modelValue', state.tabsArray[0].id);
        }
        if (state.tabsArray.length < 1) {
          emit('update:modelValue', null);
        }
      });
    };

    provide(
      'activeId',
      computed(() => state.activeId)
    );
    provide('tabsCollect', tabsCollect);
    provide('delTabs', delTabs);

    const tabsChange = (id: TabIdType) => {
      state.activeId = id;
      emit('update:modelValue', id);
      emit('change', id);
    };

    watch(
      () => state.tabsArray.length,
      (newVal, oldVal) => {
        if (props.modelValue || props.modelValue === 0) {
          state.activeId = props.modelValue;
          return;
        }
        if (newVal > 0 && oldVal === 0) {
          state.activeId = state.tabsArray[0].id;
        }
      }
    );

    watch(
      () => props.modelValue,
      (newVal, _oldVal) => {
        if (newVal || newVal === 0 || newVal === null) {
          state.activeId = newVal;
        }
      }
    );

    return () => {
      const { closeable = false } = props;
      return (
        <div>
          <div class="sk-tab-container">
            {state.tabsArray.map((item, index) => (
              <div
                class={[
                  'sk-tab__button',
                  {
                    'sk-tab__button_disabled': item.disabled,
                    'sk-tab__button_active': item.id === state.activeId && !item.disabled,
                    'sk-tab__button_link': item.id !== state.activeId && !item.disabled,
                  },
                ]}
                key={index}
                onClick={() => {
                  if (item.disabled) {
                    return;
                  }
                  tabsChange(item.id);
                }}
              >
                {item.title}
                {closeable && !item.disabled ? (
                  <span class="sk-tab__del" onClick={(Event) => delTabs(Event, item.id)}>
                    &times;
                  </span>
                ) : null}
              </div>
            ))}
          </div>
          <div>{slots.default?.()}</div>
        </div>
      );
    };
  },
});

export { Tabs, TabPanel };
