import { inject, InjectionKey, provide, Ref, unref } from 'vue';

type E = Element | Ref<Element | undefined | null>;
export const OutsideSymbol: InjectionKey<[E, E]> = Symbol();

export function useClickOutside() {
  const tupleOutsideElement = inject(OutsideSymbol, [document.body, document.body]);
  return {
    clickOutside(e: MouseEvent) {
      const target = unref(tupleOutsideElement[0]) || document.body;
      target.dispatchEvent(
        new MouseEvent('click', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true,
        })
      );
    },
    clickCurrent(e: MouseEvent) {
      const target = unref(tupleOutsideElement[1]) || document.body;
      target.dispatchEvent(
        new MouseEvent('click', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true,
        })
      );
    },
  };
}

export function useOutside(target: Element | Ref<Element | undefined | null>) {
  const tupleOutsideElement = inject(OutsideSymbol, [document.body, document.body]);
  provide(OutsideSymbol, [tupleOutsideElement[1], target]);
}
