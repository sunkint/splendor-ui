import { App } from 'vue';

import ButtonPart from './components/preview/ButtonPart.vue';
import InputPart from './components/preview/InputPart.vue';
import TextareaPart from './components/preview/TextareaPart.vue';
import IconPart from './components/preview/IconPart.vue';
import TagPart from './components/preview/TagPart.vue';
import NotifyPart from './components/preview/NotifyPart.vue';
import DropDownPart from './components/preview/DropDownPart.vue';
import GridPart from './components/preview/GridPart.vue';

import GuideExample from './components/guide/example.vue';
import GuideExampleTsx from './components/guide/example';

import TagBasic from './components/tag/basic.vue';
import NotifyBasic from './components/notify/basic.vue';
import DropdownTheme from './components/dropdown/theme.vue';

export default function (app: App) {
  app.component(ButtonPart.name, ButtonPart);
  app.component(InputPart.name, InputPart);
  app.component(TextareaPart.name, TextareaPart);
  app.component(IconPart.name, IconPart);
  app.component(TagPart.name, TagPart);
  app.component(NotifyPart.name, NotifyPart);
  app.component(DropDownPart.name, DropDownPart);
  app.component(GridPart.name, GridPart);
  app.component(GuideExample.name, GuideExample);
  app.component('GuideExampleTsx', GuideExampleTsx);
  app.component('TagBasic', TagBasic);
  app.component('NotifyBasic', NotifyBasic);
  app.component('DropdownTheme', DropdownTheme);
}
