import ButtonPart from './components/preview/ButtonPart.vue';
import InputPart from './components/preview/InputPart.vue';
import TextareaPart from './components/preview/TextareaPart.vue';
import IconPart from './components/preview/IconPart.vue';
import TagPart from './components/preview/TagPart.vue';
import NotifyPart from './components/preview/NotifyPart.vue';
import DropDownPart from './components/preview/DropDownPart.vue';

export default function (app) {
  app.component(ButtonPart.name, ButtonPart);
  app.component(InputPart.name, InputPart);
  app.component(TextareaPart.name, TextareaPart);
  app.component(IconPart.name, IconPart);
  app.component(TagPart.name, TagPart);
  app.component(NotifyPart.name, NotifyPart);
  app.component(DropDownPart.name, DropDownPart);
}
