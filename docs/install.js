import ButtonPart from './components/preview/ButtonPart.vue';
import InputPart from './components/preview/InputPart.vue';

export default function (app) {
  app.component(ButtonPart.name, ButtonPart);
  app.component(InputPart.name, InputPart);
}
