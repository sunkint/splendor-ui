import { defineComponent, PropType } from 'vue';
import './fonts/iconfont.css';

const Icon = defineComponent({
  name: 'sk-icon',
  props: {
    type: String,
    custom: Boolean,
    onClick: Function as PropType<(e: MouseEvent) => any>,
  },
  setup(props) {
    return () => {
      if (props.custom) {
        return <i class={['icon-font', `icon-${props.type}`]} onClick={props.onClick}></i>;
      }
      return <i class={['sk-icon', `icon-${props.type}`]} onClick={props.onClick}></i>;
    };
  },
});

export default Icon;
