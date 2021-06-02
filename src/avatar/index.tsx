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
    inline: {
      type: Boolean,
      default: false,
    },
    onError: Function as PropType<() => any>,
    src: String,
    alt: String,
    icon: String,
    href: String,
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
          'sk-avatar-inline': props.inline && !props.href,
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
    return () => {
      const avatarBody = (
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

      if (props.href) {
        return (
          <a
            class={[
              'sk-avatar-wrapper-link',
              { 'sk-avatar-square': props.shape === 'square', 'sk-avatar-inline': props.inline },
            ]}
            href={props.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {avatarBody}
          </a>
        );
      } else {
        return avatarBody;
      }
    };
  },
});

export default Avatar;
