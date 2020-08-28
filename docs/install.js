import ButtonPart from './components/preview/ButtonPart.vue';
import InputPart from './components/preview/InputPart.vue';
import TextareaPart from './components/preview/TextareaPart.vue';
import IconPart from './components/preview/IconPart.vue';
import TagPart from './components/preview/TagPart.vue';
import NotifyPart from './components/preview/NotifyPart.vue';
import DropDownPart from './components/preview/DropDownPart.vue';
import GridPart from './components/preview/GridPart.vue';
import CopyLinkPart from './components/preview/CopyLinkPart.vue';
import LoadingPart from './components/preview/LoadingPart.vue';
import RadioPart from './components/preview/RadioPart.vue';
import CheckboxPart from './components/preview/CheckboxPart.vue';
import SwitchPart from './components/preview/SwitchPart.vue';

import GuideExample from './components/guide/example.vue';
import GuideExampleTsx from './components/guide/example';

import TagBasic from './components/tag/basic.vue';
import NotifyBasic from './components/notify/basic.vue';
import DropdownTheme from './components/dropdown/theme.vue';
import IconList from './components/icon/list.vue';
import CopyLinkBasic from './components/copylink/basic.vue';
import CopyLinkCustom from './components/copylink/custom.vue';
import RadioBasic from './components/radio/basic.vue';
import CheckboxBasic from './components/checkbox/basic.vue';
import CheckboxGroup from './components/checkbox/group.vue';
import SwitchBasic from './components/switch/basic.vue';
import SwitchDisabled from './components/switch/disabled.vue';
import GridBasic from './components/grid/basic.vue';

export default function (app) {
  app.component(ButtonPart.name, ButtonPart);
  app.component(InputPart.name, InputPart);
  app.component(TextareaPart.name, TextareaPart);
  app.component(IconPart.name, IconPart);
  app.component(TagPart.name, TagPart);
  app.component(NotifyPart.name, NotifyPart);
  app.component(DropDownPart.name, DropDownPart);
  app.component(GridPart.name, GridPart);
  app.component(GuideExample.name, GuideExample);
  app.component(CopyLinkPart.name, CopyLinkPart);
  app.component(LoadingPart.name, LoadingPart);
  app.component(RadioPart.name, RadioPart);
  app.component(CheckboxPart.name, CheckboxPart);
  app.component(SwitchPart.name, SwitchPart);
  app.component('GuideExampleTsx', GuideExampleTsx);
  app.component('TagBasic', TagBasic);
  app.component('NotifyBasic', NotifyBasic);
  app.component('DropdownTheme', DropdownTheme);
  app.component('IconList', IconList);
  app.component('CopyLinkBasic', CopyLinkBasic);
  app.component('CopyLinkCustom', CopyLinkCustom);
  app.component('RadioBasic', RadioBasic);
  app.component('CheckboxBasic', CheckboxBasic);
  app.component('CheckboxGroup', CheckboxGroup);
  app.component('SwitchBasic', SwitchBasic);
  app.component('SwitchDisabled', SwitchDisabled);
  app.component('GridBasic', GridBasic);
}
