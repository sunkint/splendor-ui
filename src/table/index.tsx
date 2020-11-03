import { defineComponent, PropType } from 'vue';
import './index.scss';

export interface ITableColumnItem<T = any> {
  title: string;
  name?: string;
  width?: number | string;
  render?: (item: T) => any;
}

const Table = defineComponent({
  name: 'sk-table',
  props: {
    striped: Boolean,
    bordered: Boolean,
    loading: Boolean,
    rowKey: String,
    height: {
      type: [Number, String],
      default: 0,
    },
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
    return () => (
      <div class="sk-table-wrapper">
        <table class="sk-table">
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
          <thead class="sk-table-thead">
            <tr>
              {props.columns.map((item, index) => {
                return <th key={index}>{item.title}</th>;
              })}
            </tr>
          </thead>
          <tbody class="sk-table-tbody">
            {props.data.map((dataItem, dateIndex) => {
              return (
                <tr key={props.rowKey ? dataItem[props.rowKey] : dateIndex}>
                  {props.columns.map((columnItem, columnIndex) => {
                    return (
                      <td key={columnIndex}>
                        {columnItem.render
                          ? columnItem.render(dataItem)
                          : dataItem[columnItem.name ?? '']}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {props.data.length === 0 ? (
          <div class="sk-table-empty-tip">
            <span>{props.emptyText}</span>
          </div>
        ) : null}
      </div>
    );
  },
});

export default Table;
