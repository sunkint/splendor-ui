import { computed, defineComponent, PropType } from 'vue';
import { startOfMonth, endOfMonth, addDays, lightFormat, isSameMonth, addMonths } from 'date-fns';
import Icon from '../icon';
import './styles/date-view.scss';
import { DatePickerView } from './types';

const DateView = defineComponent({
  name: 'sk-date-view',
  props: {
    selectedDate: Date as PropType<Date>,
    currentDate: {
      type: Date as PropType<Date>,
      default: () => new Date(),
    },
    weekStartsOn: {
      type: Number,
      default: 1,
      validator: (v: any) => [0, 1, 2, 3, 4, 5, 6].includes(v),
    },
    onCurrentDateChange: {
      type: Function as PropType<(date: Date) => any>,
      required: true,
    },
    onPickerViewChange: {
      type: Function as PropType<(view: DatePickerView) => any>,
      required: true,
    },
  },
  setup(props) {
    const weekDays = computed(() => {
      return ['一', '二', '三', '四', '五', '六', '日'];
    });

    const days = computed(() => {
      const currentDate = props.currentDate;
      const startDateOfMonth = startOfMonth(currentDate);
      const endDateOfMonth = endOfMonth(currentDate);
      const dates: Date[] = [];
      for (let n = startDateOfMonth.getDate(); n <= endDateOfMonth.getDate(); n++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), n);
        dates.push(date);
      }

      while (dates[0].getDay() !== props.weekStartsOn) {
        const date = dates[0];
        dates.unshift(addDays(date, -1));
      }

      while (dates.length % 7 !== 0) {
        const date = dates[dates.length - 1];
        dates.push(addDays(date, 1));
      }

      return dates;
    });

    const goPrevMonth = () => {
      props.onCurrentDateChange(addMonths(props.currentDate, -1));
    };

    const goNextMonth = () => {
      props.onCurrentDateChange(addMonths(props.currentDate, 1));
    };

    const goMonthView = () => {
      props.onPickerViewChange('month');
    };

    return () => (
      <div class="sk-dateview">
        <div class="sk-datepicker-header">
          <div class="sk-left">
            <Icon type="left-simple" onClick={goPrevMonth} />
          </div>
          <div class="sk-center">
            {lightFormat(props.currentDate, 'y')}年{' '}
            <a onClick={goMonthView}>{lightFormat(props.currentDate, 'M')}月</a>
          </div>
          <div class="sk-right">
            <Icon type="right-simple" onClick={goNextMonth} />
          </div>
        </div>
        <div class="sk-dateview-body">
          {weekDays.value.map((day) => (
            <span class="sk-item sk-item-weekday">{day}</span>
          ))}
          {days.value.map((d) => {
            if (isSameMonth(d, props.currentDate)) {
              return <span class="sk-item sk-item-day">{d.getDate()}</span>;
            }
            return <span class="sk-item sk-item-outday">{d.getDate()}</span>;
          })}
        </div>
      </div>
    );
  },
});

export default DateView;
