import { FunctionalComponent } from 'vue';
import './fonts/iconfont.css';

export interface IconProps {
  type: string;
  custom?: boolean;
}

const Icon: FunctionalComponent<IconProps> = (props) => {
  if (props.custom) {
    return <i class={['icon-font', `icon-${props.type}`]}></i>;
  }
  return <i class={['sk-icon', `icon-${props.type}`]}></i>
};

export default Icon;
