import { defineComponent } from "vue";
import { Button, Notify } from "../../../src/main";

export default defineComponent(() => {
  const greet = () => {
    Notify.success('Hello World!');
  };
  return () => (
    // @ts-ignore
    <Button type="primary" onClick={greet}>Hello</Button>
  );
});
