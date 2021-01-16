export type SwiperId = number | string | symbol;

export enum SwiperDirection {
  NEXT = 'next',
  PREV = 'prev',
}

export interface SwiperItemType {
  id: SwiperId;
  ref: HTMLDivElement | null;
}

export interface IMoveOrder {
  nextId: SwiperId;
  prevId: SwiperId;
}

export type SwiperCollect = (item: SwiperItemType) => void;
export type SwiperDestroy = (id: SwiperId) => void;

export interface SwiperOnChangeConfig {
  id: SwiperId;
  prevId: SwiperId;
  index: number;
  prevIndex: number;
  direction: SwiperDirection;
}
