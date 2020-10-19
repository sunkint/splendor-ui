import { defineComponent, PropType, provide, Ref, computed, inject, ref } from 'vue';
import Collapse from '../collapse';
import Icon from '../icon';
import './index.scss';

export type AccordionValue = string | number | symbol;

const convertToArray = (modelValue: null | AccordionValue | AccordionValue[]) => {
  if (modelValue === null) {
    return [];
  }
  if (Array.isArray(modelValue)) {
    return modelValue;
  }
  return [modelValue];
};

const Current = Symbol();
const Update = Symbol();
const TransitionDuration = Symbol();

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
    const currentValue = inject<Ref<AccordionValue[]>>(Current);
    if (currentValue === undefined) {
      console.warn('AccordionItem cannot get currentValue.');
    }
    const updateSelect = inject<(value: AccordionValue, isAdd: boolean) => void>(Update);
    if (updateSelect === undefined) {
      console.warn('AccordionItem cannot get updateSelect.');
    }
    const transitionDurationRef = inject<Ref<number>>(TransitionDuration, ref(350));
    const transitionDurationStyle = computed(() => ({
      transitionDuration: `${transitionDurationRef.value}ms`,
    }));
    const show = computed(() => currentValue?.value.includes(props.value) || false);
    const select = () => {
      updateSelect?.(props.value, !show.value);
    };
    return () => (
      <div class={['sk-accordion-item', { 'sk-accordion-item-spread': show.value }]}>
        <div class="sk-accordion-item-title" style={transitionDurationStyle.value} onClick={select}>
          <Icon
            class="sk-accordion-item-arrow"
            style={transitionDurationStyle.value}
            type="right-simple"
          />
          {slots.title ? slots.title() : props.title}
        </div>
        <Collapse modelValue={show.value} duration={transitionDurationRef.value}>
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
    onChange: {
      type: Function as PropType<(value: null | AccordionValue | AccordionValue[]) => any>,
    },
  },
  setup(props, { slots, emit }) {
    const innerState = ref<AccordionValue[]>([]);
    const hasVModel = props.modelValue !== undefined;
    const mutiple = computed(() => props.mutiple);
    provide(
      TransitionDuration,
      computed(() => props.duration)
    );
    if (hasVModel) {
      provide<Ref<AccordionValue[]>>(
        Current,
        computed(() => (Array.isArray(props.modelValue) ? props.modelValue! : [props.modelValue!]))
      );
      provide(Update, (value: AccordionValue, isAdd: boolean) => {
        let updatedValue: AccordionValue | AccordionValue[] | null;
        if (mutiple.value) {
          const arrModelValue = convertToArray(props.modelValue!);
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
        props.onChange?.(updatedValue);
      });
    } else {
      provide<Ref<AccordionValue[]>>(Current, innerState);
      provide(Update, (value: AccordionValue, isAdd: boolean) => {
        if (mutiple.value) {
          if (isAdd) {
            innerState.value.push(value);
          } else {
            innerState.value = innerState.value.filter((item) => item !== value);
          }
        } else {
          innerState.value = isAdd ? [value] : [];
        }
        props.onChange?.(innerState.value);
      });
    }
    return () => <div class="sk-accordion">{slots.default?.()}</div>;
  },
});

export { AccordionItem, Accordion };
