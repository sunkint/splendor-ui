import { inject, InjectionKey, provide, ref, Ref, unref } from 'vue';
import isBrowser from './isBrowser';

type E = Element | Ref<Element | undefined | null>;
export const OutsideSymbol: InjectionKey<[E, E]> = Symbol();

export function useClickOutside() {
  const tupleBody = isBrowser ? ([document.body, document.body] as [E, E]) : [ref(null), ref(null)];
  const tupleOutsideElement = inject(OutsideSymbol, tupleBody);
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
  const tupleBody = isBrowser ? ([document.body, document.body] as [E, E]) : [ref(null), ref(null)];
  const tupleOutsideElement = inject(OutsideSymbol, tupleBody);
  provide(OutsideSymbol, [tupleOutsideElement[1], target]);
}
