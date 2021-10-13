import { defineComponent, PropType, provide, reactive, computed, watch, nextTick } from 'vue';
import { TabsType, TabCollect, TabIdType } from './types';
import clickBody from '../utils/clickBody';
import './index.scss';

export const ActiveIdSymbol = Symbol('activeId');
export const TabCollectSymbol = Symbol('tabCollect');
export const TabDestroySymbol = Symbol('tabDestroy');
export const UseHiddenSymbol = Symbol('useHidden');

const Tabs = defineComponent({
  name: 'sk-tabs',

  props: {
    closable: Boolean,
    justified: Boolean,
    modelValue: [Number, String, Symbol] as PropType<TabIdType>,
    onClose: Function as PropType<(id: TabIdType, index: number) => any>,
    onChange: Function as PropType<(id: TabIdType, index: number) => any>,
    useHidden: Boolean,
  },

  setup(props, { slots, emit }) {
    const state = reactive({
      tabsArray: [] as TabsType[],
      activeId: props.modelValue as TabIdType | null,
    });

    const tabsCollect: TabCollect = (tab: TabsType) => {
      const existsTab = state.tabsArray.find((item) => item.id === tab.id);
      if (!existsTab) {
        state.tabsArray.push(tab);
      } else {
        existsTab.title = tab.title;
        existsTab.disabled = tab.disabled;
      }
    };

    const tabsDestroy = (id: TabIdType) => {
      nextTick(() => {
        state.tabsArray = state.tabsArray.filter((item) => item.id !== id);
        const availableTabsArray = state.tabsArray.filter((item) => !item.disabled);

        if (availableTabsArray.length > 0 && state.activeId === id) {
          emit('update:modelValue', state.tabsArray[0].id);
        }
        if (availableTabsArray.length === 0) {
          emit('update:modelValue', null);
        }
      });
    };

    provide(
      ActiveIdSymbol,
      computed(() => state.activeId)
    );
    provide(TabCollectSymbol, tabsCollect);
    provide(TabDestroySymbol, tabsDestroy);
    provide(UseHiddenSymbol, () => props.useHidden);

    const tabsChange = (id: TabIdType, index: number) => {
      if (state.activeId !== id) {
        emit('update:modelValue', id);
        props.onChange?.(id, index);
      }
      state.activeId = id;
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

    return () => (
      <div class="sk-tabs-wrapper">
        <div class={['sk-tabs-container', { 'sk-tabs-justified': props.justified }]}>
          {state.tabsArray.map((item, index) => (
            <div
              class={[
                'sk-tabs__button',
                {
                  'sk-tabs__button-disabled': item.disabled,
                  'sk-tabs__button-active': item.id === state.activeId && !item.disabled,
                  'sk-tabs__button-link': item.id !== state.activeId && !item.disabled,
                },
              ]}
              key={index}
              onClick={() => {
                if (!item.disabled) {
                  tabsChange(item.id, index);
                }
              }}
            >
              {item.title()}
              {props.closable && !item.disabled ? (
                <span
                  class="sk-tabs__del"
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    clickBody(e);
                    props.onClose?.(item.id, index);
                  }}
                >
                  &times;
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <div class="sk-tabs-content">{slots.default?.()}</div>
      </div>
    );
  },
});

export default Tabs;
