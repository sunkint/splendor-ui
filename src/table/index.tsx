import { defineComponent, PropType } from 'vue';
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

    return () => (
      <div
        class={[
          'sk-table-wrapper',
          {
            'sk-table-bordered': props.bordered,
            'sk-table-striped': props.striped,
            'sk-table-hover': props.hover,
          },
        ]}
      >
        <Loading show={props.loading}>
          <table class={['sk-table', { 'sk-table-fixed': props.layout === 'fixed' }]}>
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
                  return (
                    <th key={index} style={getCellStyle(item)}>
                      {item.title}
                    </th>
                  );
                })}
              </tr>
            </thead>
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
          {props.data.length === 0 ? (
            <div class="sk-table-empty-tip">
              <span>{props.emptyText}</span>
            </div>
          ) : null}
        </Loading>
      </div>
    );
  },
});

export default Table;
