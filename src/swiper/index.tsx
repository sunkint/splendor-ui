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
import Icon from '../icon';
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
    transitionTime: {
      type: Number,
      default: 600,
    },
    interval: {
      type: Number,
      default: 5000,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    width: {
      type: [Number, String],
      default: '100%',
    },
    height: {
      type: [Number, String],
      default: 250,
    },
    showIndicator: {
      type: Boolean,
      default: true,
    },
    showControl: {
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
      if (timer) return;
      timer = setInterval(() => {
        if (!props.loop) return;
        onNext();
      }, props.interval);
    };
    const stopAutoPlay = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    const setMoveOrder = (item: ISwiperItemType, index: number, mode = '') => {
      const { nowIndex, moving } = state;
      if (index === nowIndex || moving) return;
      switch (mode) {
        case 'next': {
          state.moveOrder.nextId = item.id;
          break;
        }
        case 'prev': {
          state.moveOrder.prevId = item.id;
          break;
        }
        default: {
          if (index > nowIndex) {
            state.moveOrder.nextId = item.id;
          } else {
            state.moveOrder.prevId = item.id;
          }
        }
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
      }, props.transitionTime);
    };

    const onPrev = () => {
      const { nowIndex, swiperItems } = state;
      const prevIndex = nowIndex - 1 >= 0 ? nowIndex - 1 : swiperItems.length - 1;
      setMoveOrder(swiperItems[prevIndex], prevIndex, 'prev');
    };

    const onNext = () => {
      const { nowIndex, swiperItems } = state;
      const autoIndex = nowIndex + 1 >= swiperItems.length ? 0 : nowIndex + 1;
      setMoveOrder(swiperItems[autoIndex], autoIndex, 'next');
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

    const rendleIndicator = () => {
      return state.swiperItems.map((item, index) => (
        <li
          class={['sk-swiper-indicator', { active: state.nowIndex === index }]}
          onClick={() => {
            stopAutoPlay();
            setMoveOrder(item, index);
          }}
        ></li>
      ));
    };

    return () => (
      <div
        ref={root}
        class="sk-swiper"
        style={{
          width: props.width,
          height: props.height,
        }}
        onMouseover={stopAutoPlay}
        onMouseout={startAutoPlay}
      >
        <ul class="sk-swiper-list" style={`--transitionTime: ${props.transitionTime / 1000}s`}>
          {slots.default?.()}
        </ul>
        {props.showIndicator && <ul class="sk-swiper-indicators">{rendleIndicator()}</ul>}
        {props.showControl && (
          <>
            <a class="sk-swiper-control left" onClick={onPrev}>
              <Icon type="left-simple" />
            </a>
            <a class="sk-swiper-control right" onClick={onNext}>
              <Icon type="right-simple" />
            </a>
          </>
        )}
      </div>
    );
  },
});

export { Swiper, SwiperItem };
