import Button from './button';
import Input from './input';
import { App } from 'vue';

const components: any[] = [Button, Input];

const install = (app: App) => {
  components.forEach((Component) => {
    if (typeof Component === 'function') {
      app.component(`sk-${Component.name.toLowerCase()}`, Component);
    } else if (Component && Component.install) {
      app.component(Component.name, Component);
    }
  });
};

export { install, Button, Input };
