import { Locale } from 'date-fns';
import { defineComponent, PropType, provide, ref, watch } from 'vue';
import { SelectedDateSymbol } from './constants';
import DatePickerPanel from './DatePickerPanel';
import { DatePickerView } from './types';

const DatePicker = defineComponent({
  name: 'sk-datepicker',
  props: {
    placeholder: String,
    modelValue: Date as PropType<Date>,
    maxDate: Date as PropType<Date>,
    minDate: Date as PropType<Date>,
    disabledDate: {
      type: [Date, Array, Function] as PropType<Date | Date[] | ((date: Date) => boolean)>,
      default: [] as Date[],
    },
    startView: {
      type: String as PropType<DatePickerView>,
      default: 'day' as DatePickerView,
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd',
    },
    locale: Object as PropType<Locale>,
    weekStartsOn: {
      type: Number,
      default: 1,
      validator: (v: any) => [0, 1, 2, 3, 4, 5, 6].includes(v),
    },
    disabled: Boolean,
    minimumView: {
      type: String as PropType<DatePickerView>,
      default: 'day' as DatePickerView,
    },
  },
  setup(props, { emit }) {
    const selectedDate = ref(props.modelValue);
    provide(SelectedDateSymbol, selectedDate);

    watch(selectedDate, (date) => {
      emit('update:modelValue', date ? new Date(date) : undefined);
    });

    watch(
      () => props.modelValue,
      (date) => {
        selectedDate.value = date ? new Date(date) : undefined;
      }
    );

    return () => (
      <div class="sk-datepicker">
        <DatePickerPanel />
      </div>
    );
  },
});

export default DatePicker;
