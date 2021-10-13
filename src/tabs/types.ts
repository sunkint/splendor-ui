export type TabIdType = number | string | symbol;
export interface TabsType {
  title: () => any;
  id: TabIdType;
  disabled?: boolean;
}
export type TabCollect = (tab: TabsType) => void;
export type TabDestroy = (id: TabIdType) => void;
