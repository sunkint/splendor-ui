import theme from 'vitepress/dist/client/theme-default';
import { install } from '../../src/main';
import './index.scss';

import ButtonPart from '../../docs/components/preview/button-part.vue';

theme.enhanceApp = ({ app }) => {
  install(app);
  app.component('ButtonPart', ButtonPart);
};

export default theme;
