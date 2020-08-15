import { defineComponent, PropType, Teleport, reactive, computed, ref, nextTick } from 'vue';
import Button from '../button';
import Icon from '../icon';
import './index.scss';

export type DropDownDataItem = {
  key: string | number;
  text: string;
} & Record<string, any>;

export type DropDownData = DropDownDataItem[];
export type DropDownType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';

const DropDownMenu = defineComponent({
  name: 'sk-dropdown-menu',
  props: {
    data: {
      type: Array as PropType<DropDownData>,
      required: true,
    },
    selectedKeys: {
      type: Array as PropType<Array<string | number>>,
      default: [],
    },
    type: {
      type: String as PropType<DropDownType>,
      default: 'default' as DropDownType,
    },
    onMenuClick: Function,
  },
  emits: {
    menuClick: null,
  },
  setup(props, { emit }) {
    const click = (item: DropDownDataItem) => {
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
                {selectedKeys.includes(item.key) ? <Icon type="ok-o" /> : null}
              </li>
            ))}
          </ul>
        </div>
      );
    };
  },
});

const DropDown = defineComponent({
  name: 'sk-dropdown',
  props: {
    data: {
      type: Array as PropType<DropDownData>,
      required: true,
    },
    selectedKeys: {
      type: Array as PropType<Array<string | number>>,
      default: [],
    },
    type: {
      type: String as PropType<DropDownType>,
      default: 'default' as DropDownType,
    },
    text: String,
    onSelect: Function,
  },
  emits: {
    select: null,
  },
  setup(props, { emit }) {
    const click = (item: DropDownDataItem) => {
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
      const { data, text, selectedKeys, type } = props;
      return (
        <div class={['sk-dropdown', `sk-dropdown-${type}`]}>
          <Button
            class={{ 'sk-active': isOpen.value }}
            type={type}
            ref={(el: any) => (trigger.value = el?.$el)}
            // @ts-ignore
            onClick={triggerMenu}
          >
            {() => (
              <>
                {text}{' '}
                <Icon
                  class={[
                    'sk-dropdown-arrow',
                    {
                      'sk-dropdown-arrow-open': isOpen.value,
                    },
                  ]}
                  type="back"
                />
              </>
            )}
          </Button>
          <Teleport to="body">
            {isOpen.value ? (
              <DropDownMenu
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

export default DropDown;
