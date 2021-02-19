import { Locale } from 'date-fns';
import { defineComponent, PropType } from 'vue';
import { DatePickerView } from './types';
import DatePickerPanel from './DatePickerPanel';

const DatePicker = defineComponent({
  name: 'sk-datepicker',
  props: {
    placeholder: String,
    modelValue: Date as PropType<Date>,
    maxDate: Date as PropType<Date>,
    minDate: Date as PropType<Date>,
    disabledDates: {
      type: Array as PropType<Date[]>,
      default: [] as Date[],
    },
    startView: {
      type: String as PropType<DatePickerView>,
      default: 'day' as DatePickerView,
    },
    monthHeadingFormat: {
      type: String,
      default: 'LLLL yyyy',
    },
    monthListFormat: {
      type: String,
      default: 'LLL',
    },
    weekdayFormat: {
      type: String,
      default: 'EE',
    },
    inputFormat: {
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
  setup() {
    return () => (
      <div class="sk-datepicker">
        <DatePickerPanel />
      </div>
    );
  },
});

export default DatePicker;
