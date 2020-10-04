import { defineComponent, PropType, Teleport, reactive, computed, ref, nextTick } from 'vue';
import Button from '../button';
import Icon from '../icon';
import './index.scss';

export type DropdownDataItem = {
  key: string | number;
  text: string;
} & Record<string, any>;

export type DropdownData = DropdownDataItem[];
export type DropdownType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';

const DropdownMenu = defineComponent({
  name: 'sk-dropdown-menu',
  props: {
    data: {
      type: Array as PropType<DropdownData>,
      required: true,
    },
    selectedKeys: {
      type: Array as PropType<Array<string | number>>,
      default: [],
    },
    type: {
      type: String as PropType<DropdownType>,
      default: 'default' as DropdownType,
    },
    onMenuClick: Function,
  },
  emits: {
    menuClick: null,
  },
  setup(props, { emit }) {
    const click = (item: DropdownDataItem) => {
      emit('menuClick', item);
    };
    return () => {
      const { data, selectedKeys, type } = props;
      return (
        <div class={['sk-dropdown-menu', `sk-dropdown-menu-${type}`]}>
          <ul>
            {data.map((item) => (
              <li key={item.key} onClick={() => click(item)}>
                <span>{item.text}</span>
                {selectedKeys.includes(item.key) ? <Icon type="ok" /> : null}
              </li>
            ))}
          </ul>
        </div>
      );
    };
  },
});

const Dropdown = defineComponent({
  name: 'sk-dropdown',
  props: {
    data: {
      type: Array as PropType<DropdownData>,
      required: true,
    },
    selectedKeys: {
      type: Array as PropType<Array<string | number>>,
      default: [],
    },
    type: {
      type: String as PropType<DropdownType>,
      default: 'default' as DropdownType,
    },
    disabled: Boolean,
    text: String,
    onSelect: Function as PropType<(key: string, item: DropdownDataItem) => any>,
    icon: String,
  },
  emits: {
    select: null,
  },
  setup(props, { emit }) {
    const click = (item: DropdownDataItem) => {
      emit('select', item.key, item);
    };
    const isOpen = ref(false);
    const trigger = ref<Element | null>(null);
    const menuPostion = reactive({
      left: 0,
      top: 0,
    });
    const menuPostionStyle = computed(() => {
      return {
        left: `${menuPostion.left}px`,
        top: `${menuPostion.top}px`,
      };
    });

    const triggerMenu = (e: Event) => {
      e.stopPropagation();
      const shouldOpen = !isOpen.value && trigger.value;
      document.body.click();
      if (shouldOpen) {
        const { height, top, left } = (trigger.value as Element).getBoundingClientRect();
        menuPostion.left = left + pageXOffset;
        menuPostion.top = top + height + pageYOffset;
        isOpen.value = true;

        nextTick(() => {
          window.addEventListener(
            'click',
            () => {
              isOpen.value = false;
            },
            { once: true }
          );
        });
      } else {
        isOpen.value = false;
      }
    };

    return () => {
      const { data, text, selectedKeys, type, disabled, icon } = props;
      return (
        <div class={['sk-dropdown', `sk-dropdown-${type}`]}>
          <Button
            class={{ 'sk-active': isOpen.value }}
            type={type}
            ref={(el: any) => (trigger.value = el?.$el)}
            disabled={disabled}
            onClick={triggerMenu}
            icon={icon}
          >
            {text}{' '}
            <Icon
              class={[
                'sk-dropdown-arrow',
                {
                  'sk-dropdown-arrow-open': isOpen.value,
                },
              ]}
              type="down-simple"
            />
          </Button>
          <Teleport to="body">
            {isOpen.value ? (
              <DropdownMenu
                style={menuPostionStyle.value}
                data={data}
                onMenuClick={click}
                selectedKeys={selectedKeys}
                type={type}
              />
            ) : null}
          </Teleport>
        </div>
      );
    };
  },
});

export default Dropdown;
