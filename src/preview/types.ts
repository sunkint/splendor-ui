import { VNode } from 'vue';

export interface PreviewImageOptions {
  list: string[];
  index?: number;
  scaleRatio?: number;
  renderTip?: (index: number) => string | VNode;
}
