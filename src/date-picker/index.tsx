import { format } from 'date-fns';
import { computed, defineComponent, h, PropType, provide, ref, watch } from 'vue';
import { SelectedDateSymbol } from './constants';
import DatePickerPanel from './DatePickerPanel';
import { DatePickerView } from './types';
import clickBody from '../utils/clickBody';
import FloatLayer from '../float-layer';
import Input from '../input';
import Icon from '../icon';
import './styles/date-picker.scss';

const DatePicker = defineComponent({
  name: 'sk-datepicker',
  props: {
    placeholder: String,
    modelValue: Date as PropType<Date>,
    maxDate: Date as PropType<Date>,
    minDate: Date as PropType<Date>,
    initViewDate: Date as PropType<Date>,
    disabledDate: {
      type: [Date, Array, Function] as PropType<Date | Date[] | ((date: Date) => boolean)>,
      default: () => [] as Date[],
    },
    startView: {
      type: String as PropType<DatePickerView>,
      default: 'day' as DatePickerView,
    },
    weekStartsOn: {
      type: Number,
      default: 1,
      validator: (v: any) => [0, 1, 2, 3, 4, 5, 6].includes(v),
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd',
    },
    disabled: Boolean,
    onOpen: Function as PropType<() => any>,
    onClose: Function as PropType<() => any>,
    onChange: Function as PropType<(date?: Date) => any>,
    onSelect: Function as PropType<(date: Date) => any>,
    clearable: Boolean,
    name: String,
    size: {
      type: String as PropType<'small' | 'normal' | 'large'>,
      default: 'normal',
    },
    block: Boolean,
    hasError: Boolean,
    triggerClass: null,
  },
  setup(props, { emit }) {
    const selectedDate = ref(props.modelValue);
    const open = ref(false);

    provide(SelectedDateSymbol, selectedDate);

    watch(selectedDate, (date) => {
      emit('update:modelValue', date);
      props.onChange?.(date);
    });

    watch(
      () => props.modelValue,
      (date) => {
        selectedDate.value = date;
      }
    );

    const inputValue = computed(() => {
      return selectedDate.value ? format(selectedDate.value, props.format) : '';
    });

    const canClear = computed(() => {
      return !props.disabled && selectedDate.value && props.clearable;
    });

    const onOpen = () => {
      open.value = true;
      props.onOpen?.();
    };

    const onClose = () => {
      open.value = false;
      props.onClose?.();
    };

    const onClear = (e: MouseEvent) => {
      selectedDate.value = undefined;
      e.stopPropagation();
      clickBody(e);
    };

    return () =>
      h(
        FloatLayer,
        {
          triggerClass: ['sk-datepicker-trigger', props.triggerClass],
          trigger: props.disabled ? 'none' : 'click',
          position: 'bottom-left',
          display: props.block ? 'block' : 'inline-block',
          onOpen,
          onClose,
          cushion: 3,
        },
        {
          default: () => (
            <div
              class={[
                'sk-datepicker',
                {
                  'sk-datepicker-block': props.block,
                },
              ]}
            >
              <Input
                icon="calendar"
                class={{ 'has-focus': open.value }}
                placeholder={props.placeholder}
                modelValue={inputValue.value}
                disabled={props.disabled}
                name={props.name}
                size={props.size}
                block={props.block}
                hasError={props.hasError}
                readonly
              />
              {canClear.value ? (
                <Icon onClick={onClear} class="sk-datepicker-clear" type="close" />
              ) : null}
            </div>
          ),
          content: () => (
            <DatePickerPanel
              initCurrentDate={selectedDate.value || props.initViewDate}
              minDate={props.minDate}
              maxDate={props.maxDate}
              disabledDate={props.disabledDate}
              startView={props.startView}
              weekStartsOn={props.weekStartsOn}
              onSelect={props.onSelect}
            />
          ),
        }
      );
  },
});

export default DatePicker;
