import { FunctionalComponent } from 'vue';
import './index.scss';

export interface TagProps {
  type?: string;
  size?: 'small' | 'large' | 'larger';
  round?: boolean;
  closable?: boolean;
}

const Tag: FunctionalComponent<TagProps> = (props, { slots, emit }) => {
  const { type = 'primary', size = 'small', round = false, closable = false } = props;
  const tagClass = [
    'sk-tag',
    `sk-tag-${type}`,
    `sk-tag-${size}`,
    {
      'sk-tag-round': round,
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

export default Tag;
