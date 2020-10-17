import { computed, defineComponent, h, PropType, reactive, ref, watch } from 'vue';
import FloatLayer, { LayerPosition } from '../float-layer';
import isNil from '../utils/isNil';
import Input from '../input';
import Icon from '../icon';
import './index.scss';

export type SelectDataItem = {
  value: any;
  text: string;
  disabled?: boolean;
} & Record<string, any>;

export type SelectFilter = (item: SelectDataItem, keyword: string) => boolean;

const SelectOption = defineComponent({
  name: 'sk-select-option',
  props: {
    onClick: Function as PropType<(e: MouseEvent) => any>,
    onMouseenter: Function as PropType<(e: MouseEvent) => any>,
    disabled: Boolean,
  },
  setup(props, { slots }) {
    return () => (
      <span
        class={['sk-select-option', { disabled: props.disabled }]}
        onMouseenter={props.onMouseenter}
        onClick={props.onClick}
      >
        {slots.default?.()}
      </span>
    );
  },
});

const Select = defineComponent({
  name: 'sk-select',
  props: {
    data: {
      type: Array as PropType<SelectDataItem[]>,
      default: () => [] as SelectDataItem[],
    },
    modelValue: null,
    disabled: Boolean,
    filterable: Boolean,
    filter: {
      type: Function as PropType<SelectFilter>,
      default: ((item, keyword) => item.text.includes(keyword)) as SelectFilter,
    },
    clearable: Boolean,
    placeholder: {
      type: String,
      default: '请选择',
    },
    filterPlaceholder: String,
    emptyText: {
      type: String,
      default: '没有找到匹配项',
    },
    name: String,
    onChange: Function as PropType<(value: any) => void>,
    onOpen: Function as PropType<() => any>,
    onClose: Function as PropType<() => any>,
  },
  setup(props, { emit }) {
    const trigger = ref<HTMLDivElement | null>(null);
    const popup = ref<HTMLDivElement | null>(null);
    const state = reactive({
      open: false,
      hoverIndex: -1,
      selectedValue: null as any,
      selectedText: null as string | null,
      filterValue: '',
      layerPosition: 'bottom-left' as LayerPosition,
    });

    watch(
      () => props.modelValue,
      (value) => {
        if (value === null || value === undefined) {
          state.selectedText = state.selectedValue = null;
          return;
        }
        const item = props.data.find((item) => {
          return item.value === value;
        });
        if (item) {
          state.selectedValue = item.value;
          state.selectedText = item.text;
        } else {
          console.warn(`sk-select: cannot find option value "${value}".`);
          state.selectedText = state.selectedValue = null;
        }
      },
      {
        immediate: true,
      }
    );

    const onOpen = () => {
      state.open = true;
      if (popup.value && trigger.value) {
        const { height } = popup.value.getBoundingClientRect();
        const { top, height: triggerHeight } = trigger.value.getBoundingClientRect();
        if (top + triggerHeight + height > window.innerHeight) {
          state.layerPosition = 'top-left';
        }
      }
      props.onOpen?.();
      setTimeout(() => {
        if (popup.value) {
          popup.value.querySelector('input')?.focus();
        }
      });
    };

    const onClose = () => {
      state.open = false;
      state.hoverIndex = -1;
      state.layerPosition = 'bottom-left';
      state.filterValue = '';
      props.onClose?.();
    };

    const onHover = (index: number) => {
      state.hoverIndex = index;
    };

    const onSelect = (index: number) => {
      const selectedItem = props.data[index];
      if (selectedItem.disabled) {
        return;
      }
      state.selectedValue = selectedItem.value;
      state.selectedText = selectedItem.text;
      emit('update:modelValue', selectedItem.value);
      props.onChange?.(selectedItem.value);
      document.body.click(); // close layer
    };

    const onClear = (e: MouseEvent) => {
      e.stopPropagation();
      state.selectedText = state.selectedValue = null;
      emit('update:modelValue', null);
      document.body.click();
    };

    const onClick = (e: MouseEvent) => {
      if (props.disabled || state.open) {
        e.stopPropagation();
        document.body.click();
      }
    };

    const filterData = computed(() => {
      if (!props.filter) {
        return props.data;
      }
      return props.data.filter((item) => {
        return props.filter(item, state.filterValue);
      });
    });

    return () =>
      h(
        FloatLayer,
        {
          trigger: 'click',
          triggerClass: ['sk-select', { 'sk-select-open': state.open }],
          position: state.layerPosition,
          cushion: 3,
          onOpen,
          onClose,
        },
        {
          default: () => (
            <div
              ref={trigger}
              class={[
                'sk-select-text',
                {
                  'sk-select-clearable': props.clearable && !isNil(state.selectedValue),
                  'sk-select-disabled': props.disabled,
                },
              ]}
              onClick={onClick}
            >
              {state.selectedText}
              {isNil(state.selectedValue) ? (
                <span class="sk-select-placeholder">{props.placeholder}</span>
              ) : props.clearable ? (
                <Icon onClick={onClear} class="sk-select-clear" type="close" />
              ) : null}
              {props.name ? (
                <input type="hidden" name={props.name} value={state.selectedValue} />
              ) : null}
            </div>
          ),
          content: () => (
            <div class="sk-select-popup" ref={popup}>
              {props.filterable && props.data.length > 0
                ? h(Input, {
                    class: 'sk-select-filter',
                    icon: 'search',
                    placeholder: props.filterPlaceholder,
                    modelValue: state.filterValue,
                    'onUpdate:modelValue': (value: string) => (state.filterValue = value),
                  })
                : null}
              {filterData.value.map((item, index) => {
                return (
                  <SelectOption
                    key={index}
                    class={{
                      active: item.value === state.selectedValue,
                      current: index === state.hoverIndex,
                    }}
                    onMouseenter={() => {
                      onHover(index);
                    }}
                    onClick={() => {
                      onSelect(index);
                    }}
                    disabled={item.disabled}
                  >
                    {item.text}
                  </SelectOption>
                );
              })}
              {filterData.value.length === 0 ? (
                <span class="sk-select-empty" onClick={onClick}>
                  {props.emptyText}
                </span>
              ) : null}
            </div>
          ),
        }
      );
  },
});

export default Select;
