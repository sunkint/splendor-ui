import { App } from 'vue';

import Button from './button';
import Input from './input';
import Textarea from './textarea';
import Icon from './icon';
import Tag from './tag';
import Notify from './notify';
import Dropdown from './dropdown';
import { Row, Col } from './grid';
import CopyLink from './copy-link';
import Radio from './radio';
import Checkbox, { CheckboxGroup } from './checkbox';
import Loading from './loading';
import Switch from './switch';
import Collapse from './collapse';
import { Accordion, AccordionItem } from './accordion';

const components: any[] = [
  Button,
  Input,
  Textarea,
  Icon,
  Tag,
  Dropdown,
  Row,
  Col,
  CopyLink,
  Radio,
  Checkbox,
  CheckboxGroup,
  Loading,
  Switch,
  Collapse,
  Accordion,
  AccordionItem,
];

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

export {
  install,
  Button,
  Input,
  Textarea,
  Icon,
  Tag,
  Notify,
  Dropdown,
  Row,
  Col,
  CopyLink,
  Radio,
  Checkbox,
  CheckboxGroup,
  Loading,
  Switch,
  Collapse,
  Accordion,
  AccordionItem,
};
