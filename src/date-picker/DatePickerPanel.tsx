import { computed, defineComponent, PropType, ref } from 'vue';
import { DatePickerView } from './types';
import DateView from './DateView';
import MonthView from './MonthView';
import YearView from './YearView';
import './styles/date-picker-panel.scss';

const DatePickerPanel = defineComponent({
  name: 'sk-datepicker-panel',
  props: {
    initCurrentDate: {
      type: Date as PropType<Date>,
      default: () => new Date(),
    },
    onChange: {
      type: Function as PropType<(date: Date) => any>,
    },
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
    weekStartsOn: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const currentDate = ref(props.initCurrentDate);
    const currentView = ref(props.startView);

    const isOnDateView = computed(() => currentView.value === 'day');
    const isOnMonthView = computed(() => currentView.value === 'month');
    const isOnYearView = computed(() => currentView.value === 'year');

    const onPickerViewChange = (view: DatePickerView) => {
      currentView.value = view;
    };

    return () => (
      <div class="sk-datepicker-panel">
        {isOnDateView.value ? (
          <DateView
            currentDate={currentDate.value}
            onCurrentDateChange={(date: Date) => {
              currentDate.value = date;
            }}
            weekStartsOn={props.weekStartsOn}
            onPickerViewChange={onPickerViewChange}
            disabledDate={props.disabledDate}
            minDate={props.minDate}
            maxDate={props.maxDate}
          />
        ) : null}
        {isOnMonthView.value ? (
          <MonthView
            currentDate={currentDate.value}
            onCurrentDateChange={(date: Date) => {
              currentDate.value = date;
            }}
            onPickerViewChange={onPickerViewChange}
            minDate={props.minDate}
            maxDate={props.maxDate}
          />
        ) : null}
        {isOnYearView.value ? (
          <YearView
            currentDate={currentDate.value}
            onCurrentDateChange={(date: Date) => {
              currentDate.value = date;
            }}
            onPickerViewChange={onPickerViewChange}
            minDate={props.minDate}
            maxDate={props.maxDate}
          />
        ) : null}
      </div>
    );
  },
});

export default DatePickerPanel;
