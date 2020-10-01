import { computed, defineComponent, PropType } from 'vue';
import Icon from '../icon';
import './index.scss';

type AvatarSize = 'small' | 'default' | 'large';
type AvatarShape = 'circle' | 'square';

const Avatar = defineComponent({
  name: 'sk-avatar',
  props: {
    size: {
      type: [Number, String] as PropType<number | AvatarSize>,
      default: 'default' as AvatarSize,
    },
    shape: {
      type: String as PropType<AvatarShape>,
      default: 'circle' as AvatarShape,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    src: String,
    alt: String,
    icon: String,
  },
  setup(props, { emit }) {
    const onError = () => {
      emit('error');
    };
    const avatarClass = computed(() => {
      return [
        'sk-avatar',
        {
          [`sk-avatar-${props.size}`]: typeof props.size === 'string',
          'sk-avatar-square': props.shape === 'square',
          'sk-avatar-bordered': props.bordered,
        },
      ];
    });
    const avatarStyle = computed(() => {
      if (typeof props.size === 'number') {
        const size = Math.max(props.size, 20);
        return {
          width: `${size}px`,
          height: `${size}px`,
          lineHeight: `${size}px`,
          fontSize: `${size * 0.6}px`,
        };
      }
      return {};
    });
    return () => (
      <div class={avatarClass.value} style={avatarStyle.value}>
        {props.src && (
          <img class="sk-avatar-image" src={props.src} alt={props.alt} onError={onError} />
        )}
        {props.icon && (
          <span class="sk-avatar-icon-wrapper">
            <Icon class="sk-avatar-icon" type={props.icon} />
          </span>
        )}
      </div>
    );
  },
});

export default Avatar;
