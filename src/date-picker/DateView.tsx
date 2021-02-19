import { computed, defineComponent, PropType } from 'vue';
import { startOfMonth, endOfMonth, addDays, lightFormat, isSameMonth } from 'date-fns';
import Icon from '../icon';
import './styles/date-view.scss';

const DateView = defineComponent({
  name: 'sk-date-view',
  props: {
    selectedDate: Date as PropType<Date>,
    currentDate: {
      type: Date as PropType<Date>,
      default: () => new Date(2021, -1, 1),
    },
    weekStartsOn: {
      type: Number,
      default: 1,
      validator: (v: any) => [0, 1, 2, 3, 4, 5, 6].includes(v),
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

    return () => (
      <div class="sk-dateview">
        <div class="sk-datepicker-header">
          <div class="sk-left">
            <Icon type="left-simple" />
          </div>
          <div class="sk-center">
            {lightFormat(props.currentDate, 'y')}年 {lightFormat(props.currentDate, 'M')}月
          </div>
          <div class="sk-right">
            <Icon type="right-simple" />
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
