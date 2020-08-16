import { App } from 'vue';

import Button from './button';
import Input from './input';
import Textarea from './textarea';
import Icon from './icon';
import Tag from './tag';
import Notify from './notify';
import Dropdown from './dropdown';

const components: any[] = [Button, Input, Textarea, Icon, Tag, Dropdown];

const install = (app: App) => {
  components.forEach((Component) => {
    if (typeof Component === 'function' && typeof Component.name === 'string') {
      app.component(`sk-${Component.name.toLowerCase()}`, Component);
    } else if (Component && typeof Component.name === 'string') {
      app.component(Component.name, Component);
    } else if (Component && typeof Component.install === 'function') {
      app.use(Component);
    } else {
      console.warn('Failed to register component:', Component);
    }
  });
};

export { install, Button, Input, Textarea, Icon, Tag, Notify, Dropdown };
