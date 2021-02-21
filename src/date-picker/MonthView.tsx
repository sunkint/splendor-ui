import { addYears, isSameMonth, lightFormat } from 'date-fns';
import { computed, defineComponent, inject, PropType, Ref } from 'vue';
import { SelectedDateSymbol } from './constants';
import { DatePickerView } from './types';
import Icon from '../icon';
import './styles/month-view.scss';

const MonthView = defineComponent({
  name: 'sk-month-view',
  props: {
    selectedDate: Date as PropType<Date>,
    currentDate: {
      type: Date as PropType<Date>,
      default: () => new Date(),
    },
    onCurrentDateChange: {
      type: Function as PropType<(date: Date) => any>,
      required: true,
    },
    onPickerViewChange: {
      type: Function as PropType<(view: DatePickerView) => any>,
      required: true,
    },
    maxDate: Date as PropType<Date>,
    minDate: Date as PropType<Date>,
  },
  setup(props) {
    const selectedDate = inject<Ref<Date | undefined>>(SelectedDateSymbol);

    const months = computed(() => {
      return [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ];
    });

    const goPrevYear = () => {
      props.onCurrentDateChange(addYears(props.currentDate, -1));
    };

    const goNextYear = () => {
      props.onCurrentDateChange(addYears(props.currentDate, 1));
    };

    const goYearView = () => {
      props.onPickerViewChange('year');
    };

    const checkIsDisabledMonth = (i: number) => {
      const { currentDate, minDate, maxDate } = props;
      if (minDate) {
        if (currentDate.getFullYear() < minDate.getFullYear()) {
          return true;
        }
        if (currentDate.getFullYear() === minDate.getFullYear() && i < minDate.getMonth()) {
          return true;
        }
      }
      if (maxDate) {
        if (currentDate.getFullYear() > maxDate.getFullYear()) {
          return true;
        }
        if (currentDate.getFullYear() === maxDate.getFullYear() && i > maxDate.getMonth()) {
          return true;
        }
      }
      return false;
    };

    const onSelectMonth = (i: number) => {
      if (checkIsDisabledMonth(i)) {
        return;
      }
      const currentDate = props.currentDate;
      const date = new Date(currentDate.getFullYear(), i, currentDate.getDate());
      props.onCurrentDateChange(date);
      props.onPickerViewChange('day');
    };

    return () => (
      <div class="sk-monthview">
        <div class="sk-datepicker-header">
          <div class="sk-left">
            <Icon type="left-simple" onClick={goPrevYear} />
          </div>
          <div class="sk-center">
            <a onClick={goYearView}>{lightFormat(props.currentDate, 'y')}年</a>
          </div>
          <div class="sk-right">
            <Icon type="right-simple" onClick={goNextYear} />
          </div>
        </div>
        <div class="sk-monthview-body">
          {months.value.map((n, i) => {
            const d = new Date(props.currentDate.getFullYear(), i, 1);
            const isSelected = selectedDate?.value ? isSameMonth(selectedDate.value, d) : false;
            const hasToday = isSameMonth(new Date(), d);
            const isDisabled = checkIsDisabledMonth(i);

            return (
              <span
                key={i}
                class={[
                  'sk-item',
                  { 'sk-selected': isSelected, 'sk-today': hasToday, 'sk-disabled': isDisabled },
                ]}
                onClick={onSelectMonth.bind(null, i)}
              >
                {n}
              </span>
            );
          })}
        </div>
      </div>
    );
  },
});

export default MonthView;
