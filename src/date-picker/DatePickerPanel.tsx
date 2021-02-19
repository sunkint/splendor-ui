import { defineComponent, PropType, ref } from 'vue';
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
    const currentDate = ref(props.currentDate);

    return () => (
      <div class="sk-datepicker-panel">
        <div class="sk-datepicker">
          <DateView
            currentDate={currentDate.value}
            onCurrentDateChange={(date: Date) => {
              currentDate.value = date;
            }}
          />
        </div>
      </div>
    );
  },
});

export default DatePickerPanel;
