import {
  defineComponent,
  reactive,
  computed,
  onMounted,
  Ref,
  ref,
  inject,
  watch,
  PropType,
  onBeforeUnmount,
} from 'vue';
import { IMoveOrder, SwiperCollect, SwiperDestroy, SwiperId } from './types';
import {
  ActiveIdSymbol,
  emptyId,
  SwiperCollectSymbol,
  SwiperDestroySymbol,
  SwiperMoveOrderSymbol,
} from './Swiper';

const SwiperItem = defineComponent({
  name: 'sk-swiper-item',

  props: {
    id: {
      type: [Number, String, Symbol] as PropType<SwiperId>,
      default: () => Symbol(),
    },
    onBeforeEnter: Function as PropType<(id: SwiperId) => any>,
    onAfterEnter: Function as PropType<(id: SwiperId) => any>,
    onBeforeLeave: Function as PropType<(id: SwiperId) => any>,
    onAfterLeave: Function as PropType<(id: SwiperId) => any>,
  },

  setup(props, { slots }) {
    const thisId = props.id;
    const nowActiveId = inject<Ref<SwiperId>>(ActiveIdSymbol);
    if (nowActiveId === undefined) {
      return () => slots.default?.();
    }

    const swiperCollect = inject<SwiperCollect>(SwiperCollectSymbol);
    const swiperDestroy = inject<SwiperDestroy>(SwiperDestroySymbol);
    const moveOrder = inject<Ref<IMoveOrder>>(SwiperMoveOrderSymbol);
    if (!swiperCollect || !swiperDestroy || !moveOrder) {
      console.warn('SwiperItem should be used within Swiper.');
      return () => slots.default?.();
    }

    const itemRef = ref<HTMLDivElement | null>(null);
    const state = reactive({
      isActive: computed(() => nowActiveId.value === thisId),
      isNext: computed(() => moveOrder.value.nextId === thisId),
      isPrev: computed(() => moveOrder.value.prevId === thisId),
      isLeft: false,
      isRight: false,
    });

    watch(
      () => moveOrder.value.nextId,
      () => {
        setTimeout(() => {
          const isBeforeLeave = state.isActive && moveOrder.value.nextId !== emptyId;
          state.isLeft = state.isNext || isBeforeLeave;
          isBeforeLeave && props.onBeforeLeave?.(thisId);
        });
      }
    );

    watch(
      () => moveOrder.value.prevId,
      () => {
        setTimeout(() => {
          const isBeforeLeave = state.isActive && moveOrder.value.prevId !== emptyId;
          state.isRight = state.isPrev || isBeforeLeave;
          isBeforeLeave && props.onBeforeLeave?.(thisId);
        });
      }
    );

    watch(
      () => state.isActive,
      (isActive) => {
        if (isActive) {
          props.onAfterEnter?.(thisId);
        } else {
          props.onAfterLeave?.(thisId);
        }
      }
    );

    watch(
      () => state.isNext,
      (isNext) => {
        if (isNext) {
          props.onBeforeEnter?.(thisId);
        }
      }
    );

    watch(
      () => state.isPrev,
      (isPrev) => {
        if (isPrev) {
          props.onBeforeEnter?.(thisId);
        }
      }
    );

    onMounted(() => {
      swiperCollect({
        id: thisId,
        ref: itemRef.value,
      });
    });

    onBeforeUnmount(() => {
      swiperDestroy(thisId);
      props.onAfterLeave?.(thisId);
    });

    return () => (
      <li
        ref={itemRef}
        class={[
          'sk-swiper-item',
          {
            'sk-active': state.isActive,
            'sk-next': state.isNext,
            'sk-prev': state.isPrev,
            'sk-left': state.isLeft,
            'sk-right': state.isRight,
          },
        ]}
      >
        {slots.default?.()}
      </li>
    );
  },
});

export default SwiperItem;
