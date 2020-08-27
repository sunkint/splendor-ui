import Row from './row';
import Col from './col';

export type GutterType = number[] | number;

export type AlignType = 'top' | 'middle' | 'bottom';
export type JustifyType = 'start' | 'end' | 'center' | 'space-around' | 'space-between';

export interface ColProps {
  span: number;
  offset?: number;
  order?: number;
}

export interface RowProps {
  align?: AlignType;
  justify?: JustifyType;
  gutter?: GutterType;
}

export { Row, Col };