type TabIdType = number | string | symbol;
interface TabsType {
  title: string;
  id: TabIdType;
  disabled?: boolean;
}
type Collect = (tab: TabsType) => void;
type DelTab = (e: MouseEvent | null, id: TabIdType) => void;

export { TabsType, Collect, DelTab, TabIdType };
