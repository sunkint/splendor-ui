import { defineComponent } from 'vue';
import './fonts/iconfont.css';

export interface IconProps {
  type: string;
  custom?: boolean;
}

const Icon = defineComponent({
  name: 'sk-icon',
  props: {
    type: String,
    custom: Boolean,
  },
  setup(props) {
    return () => {
      if (props.custom) {
        return <i class={['icon-font', `icon-${props.type}`]}></i>;
      }
      return <i class={['sk-icon', `icon-${props.type}`]}></i>;
    };
  },
});

export default Icon;
