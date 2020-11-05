import { computed, defineComponent, PropType } from 'vue';
import Loading from '../loading';
import './index.scss';

export interface ITableColumnItem<T = any> {
  title: string;
  name?: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  defaultContent?: any;
  render?: (item: T) => any;
}

const Table = defineComponent({
  name: 'sk-table',
  props: {
    striped: Boolean,
    bordered: Boolean,
    loading: Boolean,
    hover: Boolean,
    rowKey: String,
    scrollX: [Number, String],
    height: [Number, String],
    columns: {
      type: Array as PropType<ITableColumnItem[]>,
      required: true,
    },
    data: {
      type: Array as PropType<any[]>,
      default: [],
    },
    emptyText: {
      type: String,
      default: '暂无数据',
    },
    layout: {
      type: String as PropType<'fixed' | 'automatic'>,
      default: 'automatic',
    },
  },
  setup(props) {
    const getCellStyle = (col: ITableColumnItem) => {
      const styles: any = {};
      switch (col.align) {
        case 'left':
          styles.textAlign = 'left';
          break;
        case 'center':
          styles.textAlign = 'center';
          break;
        case 'right':
          styles.textAlign = 'right';
          break;
      }
      return styles;
    };

    const wrapperClass = computed(() => {
      return [
        'sk-table-wrapper',
        {
          'sk-table-bordered': props.bordered,
          'sk-table-striped': props.striped,
          'sk-table-hover': props.hover,
          'sk-table-scroll-x': !!props.scrollX,
          'sk-table-scroll-y': !!props.height,
        },
      ];
    });

    const wrapperStyle = computed(() => {
      let styles: any = {};
      if (props.height) {
        styles.maxHeight = typeof props.height === 'number' ? `${props.height}px` : props.height;
      }
      return styles;
    });

    const tableClass = computed(() => {
      return ['sk-table', { 'sk-table-fixed': props.layout === 'fixed' || props.height }];
    });

    const tableStyle = computed(() => {
      let styles: any = {};
      if (props.scrollX) {
        styles.minWidth = typeof props.scrollX === 'number' ? `${props.scrollX}px` : props.scrollX;
      }
      return styles;
    });

    return () => {
      const colgroup = (
        <colgroup>
          {props.columns.map((item, index) => {
            let width = 'auto';
            if (typeof item.width === 'number' && item.width > 0) {
              width = `${item.width}px`;
            }
            if (typeof item.width === 'string') {
              width = item.width;
            }
            return <col key={index} style={{ width, minWidth: width }} />;
          })}
        </colgroup>
      );

      const thead = (
        <thead class="sk-table-thead">
          <tr>
            {props.columns.map((item, index) => {
              return (
                <th key={index} style={getCellStyle(item)}>
                  {item.title}
                </th>
              );
            })}
          </tr>
        </thead>
      );

      return (
        <Loading class="sk-table-loading-wrapper" show={props.loading}>
          <div class={wrapperClass.value} style={wrapperStyle.value}>
            {props.height ? (
              <div class="sk-table-header">
                <table class={tableClass.value} style={tableStyle.value}>
                  {colgroup}
                  {thead}
                </table>
              </div>
            ) : null}

            <div class="sk-table-body">
              <table class={tableClass.value} style={tableStyle.value}>
                {colgroup}
                {props.height ? null : thead}
                <tbody class="sk-table-tbody">
                  {props.data.map((dataItem, dateIndex) => {
                    return (
                      <tr key={props.rowKey ? dataItem[props.rowKey] : dateIndex}>
                        {props.columns.map((columnItem, columnIndex) => {
                          return (
                            <td key={columnIndex} style={getCellStyle(columnItem)}>
                              {columnItem.render
                                ? columnItem.render(dataItem)
                                : dataItem[columnItem.name ?? columnItem.defaultContent ?? '']}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {props.data.length === 0 ? (
              <div class="sk-table-empty-tip">
                <span>{props.emptyText}</span>
              </div>
            ) : null}
          </div>
        </Loading>
      );
    };
  },
});

export default Table;
