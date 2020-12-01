import { defineComponent, PropType, reactive, h } from 'vue';
import Button, { ButtonSize, ButtonType } from '../button';
import FloatLayer, { LayerPosition } from '../float-layer';
import Icon from '../icon';
import './index.scss';

export type DropdownDataItem = {
  key: any;
  text: string;
  disabled?: boolean;
} & Record<string, any>;

export type DropdownData = DropdownDataItem[];

const DropdownOption = defineComponent({
  name: 'sk-dropdown-option',
  props: {
    onClick: Function as PropType<(e: MouseEvent) => any>,
    disabled: Boolean,
    selected: Boolean,
  },
  setup(props, { slots }) {
    return () => (
      <span
        class={['sk-dropdown-option', { disabled: props.disabled, selected: props.selected }]}
        onClick={props.onClick}
      >
        {slots.default?.()}
        {props.selected ? <Icon class="sk-dropdown-option-ok" type="ok" /> : null}
      </span>
    );
  },
});

const Dropdown = defineComponent({
  name: 'sk-dropdown',
  props: {
    data: {
      type: Array as PropType<DropdownData>,
      required: true,
    },
    modelValue: {
      type: Array as PropType<any[]>,
      default: [] as any[],
    },
    selectedKeys: {
      type: Array as PropType<any[]>,
      default: [] as any[],
    },
    type: {
      type: String as PropType<ButtonType>,
      default: 'default' as ButtonType,
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: 'normal' as ButtonSize,
    },
    text: String,
    icon: String,
    disabled: Boolean,
    triggerClass: null,
    position: {
      type: String as PropType<LayerPosition>,
      default: 'bottom-left' as LayerPosition,
    },
    onSelect: Function as PropType<(key: any, item: DropdownDataItem) => any>,
    onOpen: Function as PropType<() => any>,
    onClose: Function as PropType<() => any>,
  },
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
    const { text, selectedKeys } = props;
    const state = reactive({
      open: false,
      text,
      selectedKeys,
    });

    const onClick = (e: MouseEvent) => {
      if (props.disabled || state.open) {
        e.stopPropagation();
        document.body.click();
      }
    };

    const onMenuClick = (item: DropdownDataItem) => {
      if (item.disabled) {
        return;
      }
      state.text = item.text;
      state.selectedKeys = [item.key];
      emit('update:modelValue', [item]);
      props.onSelect?.(item.key, item);
      document.body.click(); // close layer
    };

    const onOpen = () => {
      state.open = true;
      props.onOpen?.();
    };

    const onClose = () => {
      state.open = false;
      props.onClose?.();
    };

    return () =>
      h(
        FloatLayer,
        {
          trigger: 'click',
          triggerClass: ['sk-dropdown', props.triggerClass],
          position: props.position,
          cushion: 3,
          onOpen,
          onClose,
        },
        {
          default: () => (
            <span class="sk-dropdown-trigger" onClick={onClick}>
              <Button
                class={{ 'sk-active': state.open }}
                type={props.type}
                size={props.size}
                disabled={props.disabled}
                icon={props.icon}
              >
                {state.text}
                <Icon
                  class={[
                    'sk-dropdown-arrow',
                    {
                      'sk-dropdown-arrow-open': state.open,
                    },
                  ]}
                  type="down-simple"
                />
              </Button>
            </span>
          ),
          content: () => {
            const { class: className, ...restAttrs } = attrs;
            return (
              <div {...restAttrs} class={['sk-dropdown-popup', className]}>
                {props.data.map((item, index) => {
                  return (
                    <DropdownOption
                      key={index}
                      selected={state.selectedKeys.includes(item.key)}
                      disabled={item.disabled}
                      onClick={() => {
                        onMenuClick(item);
                      }}
                    >
                      {item.text}
                    </DropdownOption>
                  );
                })}
              </div>
            );
          },
        }
      );
  },
});

export default Dropdown;
