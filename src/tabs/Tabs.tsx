import { defineComponent, PropType, provide, reactive, computed, watch, nextTick } from 'vue';
import { TabsType, TabCollect, TabIdType } from './types';
import './index.scss';

const Tabs = defineComponent({
  name: 'sk-tabs',

  props: {
    closable: Boolean,
    justified: Boolean,
    modelValue: [Number, String, Symbol] as PropType<TabIdType>,
    onClose: Function as PropType<(id: TabIdType, index: number) => any>,
    onChange: Function as PropType<(id: TabIdType, index: number) => any>,
  },

  setup(props, { slots, emit }) {
    const state = reactive({
      tabsArray: [] as TabsType[],
      activeId: props.modelValue as TabIdType | null,
    });

    const tabsCollect: TabCollect = (tab: TabsType) => {
      state.tabsArray.push(tab);
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
      'activeId',
      computed(() => state.activeId)
    );
    provide('tabsCollect', tabsCollect);
    provide('tabsDestroy', tabsDestroy);

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
              {item.title}
              {props.closable && !item.disabled ? (
                <span
                  class="sk-tabs__del"
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    document.body.click();
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