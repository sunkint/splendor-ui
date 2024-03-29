import { App } from 'vue';
import './style/common.scss';

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
import Pagination, { MiniPagination } from './pagination';
import BackTop from './backtop';
import Avatar from './avatar';
import Alert from './alert';
import Dialog, { openDialog, closeDialog } from './dialog';
import SweetAlert from './sweetalert';
import FloatLayer from './float-layer';
import Popover from './popover';
import Tooltip from './tooltip';
import { Tabs, TabPanel } from './tabs';
import Progress from './progress';
import Select from './select';
import Badge from './badge';
import Table from './table';
import { Swiper, SwiperItem } from './swiper';
import InfiniteScroll from './infinite-scroll';
import Mention from './mention';
import Preview from './preview';
import DatePicker from './date-picker';
import { Steps, Step } from './steps';
import { Upload } from './upload';
import { UploadStatus } from './upload/types';
import Slider from './slider';

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
  Pagination,
  MiniPagination,
  BackTop,
  Avatar,
  Alert,
  Dialog,
  FloatLayer,
  Popover,
  Tooltip,
  Tabs,
  TabPanel,
  Progress,
  Select,
  Badge,
  Table,
  Swiper,
  SwiperItem,
  InfiniteScroll,
  Mention,
  DatePicker,
  Steps,
  Step,
  Upload,
  Slider,
];

const install = (app: App<Element>) => {
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
  Pagination,
  MiniPagination,
  BackTop,
  Avatar,
  Alert,
  Dialog,
  openDialog,
  closeDialog,
  SweetAlert,
  FloatLayer,
  Popover,
  Tooltip,
  Tabs,
  TabPanel,
  Progress,
  Select,
  Badge,
  Table,
  Swiper,
  SwiperItem,
  InfiniteScroll,
  Mention,
  Preview,
  DatePicker,
  Steps,
  Step,
  Upload,
  UploadStatus,
  Slider,
};
