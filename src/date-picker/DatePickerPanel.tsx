import { defineComponent, PropType, reactive } from 'vue';
import DateView from './DateView';
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
  },
  setup(props) {
    // const state = reactive({
    //   currentYear: props.currentDate.getFullYear(),
    //   currentMonth: props.currentDate.getMonth(),
    //   currentDay: props.currentDate.getDate(),
    // });

    return () => (
      <div class="sk-datepicker-panel">
        <div class="sk-datepicker">
          <DateView selectedDate={props.currentDate} />
        </div>
      </div>
    );
  },
});

export default DatePickerPanel;
