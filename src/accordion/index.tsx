import {
  defineComponent,
  renderSlot,
  createTextVNode,
  toDisplayString,
  PropType,
  provide,
  Ref,
  computed,
  inject,
  ref,
} from 'vue';
import Collapse from '../collapse';
import Icon from '../icon';
import './index.scss';

export type AccordionValue = string | number | symbol;

const conventToArray = (modelValue: null | AccordionValue | AccordionValue[]) => {
  if (modelValue === null) {
    return [];
  }
  if (Array.isArray(modelValue)) {
    return modelValue;
  }
  return [modelValue];
};

const AccordionItem = defineComponent({
  name: 'sk-accordion-item',
  props: {
    title: String,
    value: {
      type: [String, Number, Symbol] as PropType<AccordionValue>,
      default: () => Symbol(),
    },
  },
  setup(props, { slots }) {
    const currentValue = inject<Ref<AccordionValue[]>>('current');
    const updateSelect = inject<(value: AccordionValue, isAdd: boolean) => void>('update');
    const transitionDuration = inject<Ref<number>>('transitionDuration')?.value || 350;
    const transitionDurationStyle = { transitionDuration: `${transitionDuration}ms` };
    const show = computed(() => currentValue?.value.includes(props.value) || false);
    const select = () => {
      updateSelect?.(props.value, !show.value);
    };
    return () => (
      <div class={['sk-accordion-item', { 'sk-accordion-item-spread': show.value }]}>
        <div class="sk-accordion-item-title" style={transitionDurationStyle} onClick={select}>
          <Icon
            class="sk-accordion-item-arrow"
            style={transitionDurationStyle}
            type="right-simple"
          />
          {renderSlot(slots, 'title', {}, () => [createTextVNode(toDisplayString(props.title), 1)])}
        </div>
        <Collapse modelValue={show.value} duration={transitionDuration}>
          <div class="sk-accordion-item-content">{slots.default?.()}</div>
        </Collapse>
      </div>
    );
  },
});

const Accordion = defineComponent({
  name: 'sk-accordion',
  props: {
    modelValue: [String, Number, Symbol, Array] as PropType<
      null | AccordionValue | AccordionValue[]
    >,
    mutiple: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 350,
    },
  },
  setup(props, { slots, emit }) {
    const innerState = ref<AccordionValue[]>([]);
    const hasVModel = props.modelValue !== undefined;
    const mutiple = computed(() => props.mutiple);
    provide(
      'transitionDuration',
      computed(() => props.duration)
    );
    if (hasVModel) {
      provide<Ref<AccordionValue[]>>(
        'current',
        computed(() => (Array.isArray(props.modelValue) ? props.modelValue! : [props.modelValue!]))
      );
      provide('update', (value: AccordionValue, isAdd: boolean) => {
        let updatedValue: AccordionValue | AccordionValue[] | null;
        if (mutiple.value) {
          const arrModelValue = conventToArray(props.modelValue!);
          if (isAdd) {
            updatedValue = [...arrModelValue, value];
            emit('update:modelValue', updatedValue);
          } else {
            updatedValue = arrModelValue.filter((item) => item !== value);
            emit('update:modelValue', updatedValue);
          }
        } else {
          updatedValue = isAdd ? value : null;
          emit('update:modelValue', updatedValue);
        }
        emit('change', updatedValue);
      });
    } else {
      provide<Ref<AccordionValue[]>>('current', innerState);
      provide('update', (value: AccordionValue, isAdd: boolean) => {
        if (mutiple.value) {
          if (isAdd) {
            innerState.value.push(value);
          } else {
            innerState.value = innerState.value.filter((item) => item !== value);
          }
        } else {
          innerState.value = isAdd ? [value] : [];
        }
        emit('change', innerState.value);
      });
    }
    return () => <div class="sk-accordion">{slots.default?.()}</div>;
  },
});

export { AccordionItem, Accordion };
