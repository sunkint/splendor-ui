import { computed, defineComponent, inject, PropType, Ref } from 'vue';
import {
  startOfMonth,
  endOfMonth,
  addDays,
  lightFormat,
  isSameMonth,
  addMonths,
  isSameDay,
  isDate,
  isAfter,
  isBefore,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { SelectedDateSymbol } from './constants';
import { DatePickerView } from './types';
import { useClickOutside } from '../utils/outside';
import Icon from '../icon';
import './styles/date-view.scss';

const DateView = defineComponent({
  name: 'sk-date-view',
  props: {
    currentDate: {
      type: Date as PropType<Date>,
      default: () => new Date(),
    },
    onSelect: {
      type: Function as PropType<(date: Date) => any>,
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
    disabledDate: {
      type: [Date, Array, Function] as PropType<Date | Date[] | ((date: Date) => boolean)>,
      default: () => [] as Date[],
    },
    maxDate: Date as PropType<Date>,
    minDate: Date as PropType<Date>,
  },
  setup(props) {
    const selectedDate = inject<Ref<Date | undefined>>(SelectedDateSymbol);
    const { clickOutside } = useClickOutside();

    const weekDays = computed(() => {
      const days = ['日', '一', '二', '三', '四', '五', '六'];
      const result = [...days.slice(props.weekStartsOn), ...days.slice(0, props.weekStartsOn)];
      return result;
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

    const goYearView = () => {
      props.onPickerViewChange('year');
    };

    const goMonthView = () => {
      props.onPickerViewChange('month');
    };

    const checkIsDisabledDate = (date: Date) => {
      if (props.minDate && isBefore(date, startOfDay(props.minDate))) {
        return true;
      }
      if (props.maxDate && isAfter(date, endOfDay(props.maxDate))) {
        return true;
      }
      if (Array.isArray(props.disabledDate)) {
        return props.disabledDate.some((d) => isSameDay(d, date));
      }
      if (typeof props.disabledDate === 'function') {
        return props.disabledDate(date);
      }
      if (isDate(props.disabledDate)) {
        return isSameDay(props.disabledDate, date);
      }
      return false;
    };

    const onSelectDate = (date: Date, e: MouseEvent) => {
      if (checkIsDisabledDate(date)) {
        return;
      }
      selectedDate && (selectedDate.value = date);
      if (!isSameMonth(date, props.currentDate)) {
        props.onCurrentDateChange(date);
      }
      props.onSelect?.(date);
      clickOutside(e);
    };

    return () => (
      <div class="sk-dateview">
        <div class="sk-datepicker-header">
          <div class="sk-left">
            <Icon type="left-simple" onClick={goPrevMonth} />
          </div>
          <div class="sk-center">
            <a onClick={goYearView}>{lightFormat(props.currentDate, 'y')}年</a>{' '}
            <a onClick={goMonthView}>{lightFormat(props.currentDate, 'M')}月</a>
          </div>
          <div class="sk-right">
            <Icon type="right-simple" onClick={goNextMonth} />
          </div>
        </div>
        <div class="sk-dateview-body">
          {weekDays.value.map((day, i) => (
            <span key={`w${i}`} class="sk-item sk-item-weekday">
              {day}
            </span>
          ))}
          {days.value.map((d, i) => {
            const isSelected = selectedDate?.value ? isSameDay(d, selectedDate.value) : false;
            const isInMonth = isSameMonth(d, props.currentDate);
            const isToday = isSameDay(d, new Date());
            const isDisabled = checkIsDisabledDate(d);

            return (
              <span
                key={i}
                class={[
                  'sk-item',
                  {
                    'sk-item-day': isInMonth,
                    'sk-item-outday': !isInMonth,
                    'sk-today': isToday,
                    'sk-selected': isSelected,
                    'sk-disabled': isDisabled,
                  },
                ]}
                onClick={onSelectDate.bind(null, d)}
              >
                {d.getDate()}
              </span>
            );
          })}
        </div>
      </div>
    );
  },
});

export default DateView;
