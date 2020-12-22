export type SwiperId = number | string | symbol;

export interface ISwiperItemType {
  id: SwiperId;
  ref: HTMLDivElement | null;
}

export interface IMoveOrder {
  nextId: SwiperId;
  prevId: SwiperId;
}

export type SwiperCollect = (item: ISwiperItemType) => void;
