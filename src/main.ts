import Button from './button';

declare global {
  interface Window {
    Vue?: any;
  }
}

const components = [Button];

const install = (Vue) => {
  components.forEach((Component) => {
    Vue.use(Component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { install, Button };
