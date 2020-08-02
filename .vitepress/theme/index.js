import theme from 'vitepress/dist/client/theme-default';
import installDocComponents from '../../docs/install';
import { install } from '../../src/main';
import './index.scss';

theme.enhanceApp = ({ app }) => {
  install(app);
  installDocComponents(app);
};

export default theme;
