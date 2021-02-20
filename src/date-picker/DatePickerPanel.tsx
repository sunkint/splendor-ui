import { computed, defineComponent, PropType, ref } from 'vue';
import DateView from './DateView';
import MonthView from './MonthView';
import { DatePickerView } from './types';
import './styles/date-picker-panel.scss';

const DatePickerPanel = defineComponent({
  name: 'sk-datepicker-panel',
  props: {
    currentDate: {
      type: Date as PropType<Date>,
      default: () => new Date(),
    },
    onChange: {
      type: Function as PropType<(date: Date) => any>,
    },
    startView: {
      type: String as PropType<DatePickerView>,
      default: 'day' as DatePickerView,
    },
  },
  setup(props) {
    const currentDate = ref(props.currentDate);
    const currentView = ref(props.startView);

    const isOnDateView = computed(() => currentView.value === 'day');
    const isOnMonthView = computed(() => currentView.value === 'month');
    // const isOnYearView = computed(() => currentView.value === 'year');

    const onPickerViewChange = (view: DatePickerView) => {
      currentView.value = view;
    };

    return () => (
      <div class="sk-datepicker-panel">
        <div class="sk-datepicker">
          {isOnDateView.value ? (
            <DateView
              currentDate={currentDate.value}
              onCurrentDateChange={(date: Date) => {
                currentDate.value = date;
              }}
              onPickerViewChange={onPickerViewChange}
            />
          ) : null}
          {isOnMonthView.value ? (
            <MonthView
              currentDate={currentDate.value}
              onCurrentDateChange={(date: Date) => {
                currentDate.value = date;
              }}
              onPickerViewChange={onPickerViewChange}
            />
          ) : null}
        </div>
      </div>
    );
  },
});

export default DatePickerPanel;
