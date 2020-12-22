import {
  defineComponent,
  reactive,
  computed,
  onMounted,
  Ref,
  ref,
  provide,
  inject,
  watch,
  onUnmounted,
} from 'vue';
import { ISwiperItemType, IMoveOrder, SwiperCollect, SwiperId } from './types';
import './index.scss';

const ActiveIdSymbol = Symbol();
const SwiperCollectSymbol = Symbol();
const SwiperMoveOrderSymbol = Symbol();

const SwiperItem = defineComponent({
  name: 'sk-swipe-item',

  setup(_props, { slots }) {
    const thisId = Symbol();
    const nowActiveId = inject<Ref<SwiperId | null>>(ActiveIdSymbol);
    if (nowActiveId === undefined) {
      return () => slots.default?.();
    }

    const swiperCollect = inject<SwiperCollect>(SwiperCollectSymbol);
    if (!swiperCollect) {
      console.warn('SwiperItem should be used within Swiper.');
      return () => slots.default?.();
    }

    const moveOrder = inject<Ref<IMoveOrder | null>>(SwiperMoveOrderSymbol);
    const itemRef = ref<HTMLDivElement | null>(null);
    const state = reactive({
      isActive: computed(() => nowActiveId.value === thisId),
      isNext: computed(() => moveOrder?.value?.nextId === thisId),
      isPrev: computed(() => moveOrder?.value?.prevId === thisId),
      isLeft: false,
      isRight: false,
    });

    watch(
      () => moveOrder?.value?.nextId,
      () => {
        setTimeout(() => {
          state.isLeft = state.isNext || (state.isActive && moveOrder?.value?.nextId !== '');
        }, 0);
      }
    );

    watch(
      () => moveOrder?.value?.prevId,
      () => {
        setTimeout(() => {
          state.isRight = state.isPrev || (state.isActive && moveOrder?.value?.prevId !== '');
        }, 0);
      }
    );

    onMounted(() => {
      swiperCollect({
        id: thisId,
        ref: itemRef.value,
      });
    });

    return () => (
      <li
        ref={itemRef}
        class={[
          'sk-swiper-item',
          {
            active: state.isActive,
            next: state.isNext,
            prev: state.isPrev,
            left: state.isLeft,
            right: state.isRight,
          },
        ]}
      >
        {slots.default?.()}
      </li>
    );
  },
});

const Swiper = defineComponent({
  name: 'sk-swiper',

  props: {
    time: {
      type: Number,
      default: 600,
    },
    interval: {
      type: Number,
      default: 5000,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, { slots }) {
    const root = ref<HTMLDivElement | null>(null);
    const state = reactive({
      swiperItems: [] as ISwiperItemType[],
      nowActiveId: '' as SwiperId,
      nowIndex: 0,
      moving: false,
      moveOrder: {
        nextId: '',
        prevId: '',
      } as IMoveOrder,
    });

    let timer: NodeJS.Timer | null = null;
    const startAutoPlay = () => {
      timer = setInterval(autoPlay, props.interval);
    };
    const stopAutoPlay = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    onMounted(() => {
      if (state.swiperItems.length > 0) {
        state.nowActiveId = state.swiperItems[0].id;
        startAutoPlay();
      }
    });

    onUnmounted(() => {
      stopAutoPlay();
    });

    const swiperCollect: SwiperCollect = (item: ISwiperItemType) => {
      state.swiperItems.push(item);
    };
    provide(
      ActiveIdSymbol,
      computed(() => state.nowActiveId)
    );
    provide(SwiperCollectSymbol, swiperCollect);
    provide(
      SwiperMoveOrderSymbol,
      computed(() => state.moveOrder)
    );

    const onLabelClick = (item: ISwiperItemType, index: number, next = false) => {
      const { nowIndex, moving } = state;
      if (index === nowIndex || moving) return;
      if (index > nowIndex || next) {
        state.moveOrder.nextId = item.id;
      } else {
        state.moveOrder.prevId = item.id;
      }

      state.nowIndex = index;
      state.moving = true;
      setTimeout(() => {
        if (!timer) startAutoPlay();
        state.moving = false;
        state.nowActiveId = item.id;
        state.moveOrder = {
          nextId: '',
          prevId: '',
        };
      }, props.time);
    };

    const autoPlay = () => {
      if (!props.autoPlay) return;
      const autoIndex = state.nowIndex + 1 >= state.swiperItems.length ? 0 : state.nowIndex + 1;
      onLabelClick(state.swiperItems[autoIndex], autoIndex, true);
    };

    return () => (
      <div ref={root} class="sk-swiper">
        <ul class="sk-swiper-list" style={`--transitionTime: ${props.time / 1000}s`}>
          {slots.default?.()}
        </ul>
        <ul class="sk-swiper-labels">
          {state.swiperItems.map((item, index) => (
            <li
              class={['sk-swiper-label', { active: state.nowIndex === index }]}
              onClick={() => {
                stopAutoPlay();
                onLabelClick(item, index);
              }}
            ></li>
          ))}
        </ul>
      </div>
    );
  },
});

export { Swiper, SwiperItem };
