import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import Textarea from '../textarea';
import Tribute from 'tributejs';
import './index.scss';

export type MentionDataItem = {
  key: string;
  value: string;
} & Record<string, any>;

const Mention = defineComponent({
  name: 'sk-mention',

  props: {
    trigger: {
      type: String,
      default: '@',
    },
    data: {
      type: Array as PropType<MentionDataItem[] | string[]>,
      default: [],
    },
    async: {
      type: Boolean,
      default: false,
    },
    onAsyncFetch: {
      type: Function as PropType<(word: string) => Promise<MentionDataItem[] | string[]>>,
      default: () => Promise.resolve([]),
    },
    menuItemLimit: {
      type: Number,
      default: 25,
    },
    menuShowMinLength: {
      type: Number,
      default: 0,
    },

    // textarea props
    hasError: Boolean,
    maxlength: [Number, String],
    placeholder: String,
    modelValue: String,
    autoHeight: Boolean,
    block: Boolean,
    name: String,
    disabled: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
    onPressCtrlEnter: Function as PropType<(e: KeyboardEvent) => void>,
    onKeypress: Function as PropType<(e: KeyboardEvent) => void>,
    onKeydown: Function as PropType<(e: KeyboardEvent) => void>,
    onKeyup: Function as PropType<(e: KeyboardEvent) => void>,
    onFocus: Function as PropType<(e: FocusEvent) => void>,
    onBlur: Function as PropType<(e: FocusEvent) => void>,
    onChange: Function as PropType<(e: Event) => void>,
    onInput: Function as PropType<(e: Event) => void>,
  },

  setup(props) {
    const root = ref<HTMLDivElement>();

    const toValues = (items: MentionDataItem[] | string[]) => {
      const list: MentionDataItem[] = [];
      items.forEach((item: MentionDataItem | string) => {
        if (typeof item === 'string') {
          list.push({ key: item, value: item });
        } else if (typeof item === 'object' && item !== null) {
          const key = item.key.includes(item.value) ? item.key : `${item.key} ${item.value}`;
          list.push({ key, value: item.value });
        }
      });
      return list;
    };

    const datasets = computed(() => {
      return toValues(props.data);
    });

    onMounted(() => {
      const tribute = new Tribute<MentionDataItem>({
        containerClass: 'sk-mention-menu',
        itemClass: 'sk-mention-menu-item',
        selectClass: 'active',
        searchOpts: {
          pre: '<span>',
          post: '</span>',
          skip: true,
        },
        menuItemTemplate: (item) => item.original.value,
        noMatchTemplate: () => {
          return '<li class="sk-mention-menu-item disabled">未找到匹配项</li>';
        },
        values: (text, cb) => {
          if (props.async) {
            props
              .onAsyncFetch(text)
              .then((list) => {
                cb(toValues(list));
              })
              .catch(() => {
                cb([]);
              });
          } else {
            cb(
              datasets.value.filter((item) => item.key.toLowerCase().includes(text.toLowerCase()))
            );
          }
        },
        // @ts-ignore
        menuItemLimit: props.menuItemLimit,
        menuShowMinLength: props.menuShowMinLength,
        trigger: props.trigger,
      });

      tribute.attach(root.value!.querySelector('textarea')!);
    });

    return () => (
      <div ref={root} class="sk-mention">
        <Textarea {...props} />
      </div>
    );
  },
});

export default Mention;
