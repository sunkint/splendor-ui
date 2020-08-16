import { defineComponent, PropType } from 'vue';
import './index.scss';

export type TagType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark';

export type TagSize = 'small' | 'medium' | 'large';

const Tag = defineComponent({
  name: 'sk-tag',
  props: {
    type: String as PropType<TagType>,
    size: String as PropType<TagSize>,
    round: Boolean,
    closable: Boolean,
    ghost: Boolean,
  },
  emits: {
    close: null,
  },
  setup(props, { slots, emit }) {
    return () => {
      const {
        type = 'primary',
        size = 'small',
        round = false,
        closable = false,
        ghost = false,
      } = props;
      const tagClass = [
        'sk-tag',
        `sk-tag-${type}`,
        `sk-tag-${size}`,
        {
          'sk-tag-round': round,
          'sk-tag-ghost': ghost,
        },
      ];
      return (
        <span class={tagClass}>
          <span class="sk-tag-content">{slots.default?.()}</span>
          {closable && (
            <span class="sk-tag-close" onClick={() => emit('close')}>
              &times;
            </span>
          )}
        </span>
      );
    };
  },
});

export default Tag;
