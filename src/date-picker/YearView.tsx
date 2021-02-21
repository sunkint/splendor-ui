import { computed, defineComponent, inject, PropType, Ref } from 'vue';
import { addYears, lightFormat, startOfDecade, endOfDecade } from 'date-fns';
import { SelectedDateSymbol } from './constants';
import { DatePickerView } from './types';
import Icon from '../icon';
import './styles/year-view.scss';

const YearView = defineComponent({
  name: 'sk-year-view',
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
  },
  setup(props) {
    const selectedDate = inject<Ref<Date | undefined>>(SelectedDateSymbol);

    const decadeStart = computed(() => {
      return startOfDecade(props.currentDate);
    });

    const decadeEnd = computed(() => {
      return endOfDecade(props.currentDate);
    });

    const years = computed(() => {
      const years: number[] = [];
      for (let y = decadeStart.value.getFullYear(); y <= decadeEnd.value.getFullYear(); y++) {
        years.push(y);
      }
      return years;
    });

    const goPrevDecade = () => {
      props.onCurrentDateChange(addYears(props.currentDate, -10));
    };

    const goNextDecade = () => {
      props.onCurrentDateChange(addYears(props.currentDate, 10));
    };

    const onSelectYear = (i: number) => {
      const currentDate = props.currentDate;
      const date = new Date(
        decadeStart.value.getFullYear() + i,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      props.onCurrentDateChange(date);
      props.onPickerViewChange('month');
    };

    return () => (
      <div class="sk-yearview">
        <div class="sk-datepicker-header">
          <div class="sk-left">
            <Icon type="left-simple" onClick={goPrevDecade} />
          </div>
          <div class="sk-center">
            {lightFormat(decadeStart.value, 'y')} - {lightFormat(decadeEnd.value, 'y')}年
          </div>
          <div class="sk-right">
            <Icon type="right-simple" onClick={goNextDecade} />
          </div>
        </div>
        <div class="sk-yearview-body">
          {years.value.map((n, i) => {
            const isSelected = n === selectedDate?.value?.getFullYear();
            const hasToday = n === new Date().getFullYear();
            return (
              <span
                class={['sk-item', { 'sk-selected': isSelected, 'sk-today': hasToday }]}
                onClick={onSelectYear.bind(null, i)}
              >
                {n}年
              </span>
            );
          })}
        </div>
      </div>
    );
  },
});

export default YearView;
