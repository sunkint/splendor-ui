import { computed, defineComponent, h, onMounted, PropType, ref, watch } from 'vue';
import Textarea from '../textarea';
import TextareaProps from '../textarea/props';
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
      default: () => [],
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
    requireLeadingSpace: {
      type: Boolean,
      default: false,
    },

    // textarea props
    ...TextareaProps,
  },

  setup(props, { emit }) {
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

    let tribute: Tribute<MentionDataItem>;
    const attach = () => {
      tribute = new Tribute<MentionDataItem>({
        containerClass: 'sk-mention-menu',
        itemClass: 'sk-mention-menu-item',
        selectClass: 'active',
        requireLeadingSpace: props.requireLeadingSpace,
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
    };

    onMounted(() => {
      attach();
      const reAttach = () => {
        tribute.detach(root.value!.querySelector('textarea')!);
        attach();
      };

      // Re-attach tribute after some props change.
      watch(() => props.trigger, reAttach);
      watch(() => props.menuItemLimit, reAttach);
      watch(() => props.menuShowMinLength, reAttach);
    });

    return () => (
      <div ref={root} class="sk-mention">
        {h(Textarea, {
          ...props,
          'onUpdate:modelValue': (value: string) => void emit('update:modelValue', value),
        })}
      </div>
    );
  },
});

export default Mention;
