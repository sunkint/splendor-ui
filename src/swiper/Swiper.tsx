import {
  defineComponent,
  reactive,
  computed,
  onMounted,
  ref,
  provide,
  onUnmounted,
  nextTick,
  PropType,
  watch,
} from 'vue';
import {
  SwiperItemType,
  SwiperCollect,
  SwiperDestroy,
  SwiperId,
  SwiperDirection,
  SwiperOnChangeConfig,
  IMoveOrder,
} from './types';
import Icon from '../icon';

export const ActiveIdSymbol = Symbol();
export const SwiperCollectSymbol = Symbol();
export const SwiperDestroySymbol = Symbol();
export const SwiperMoveOrderSymbol = Symbol();
export const emptyId = Symbol('SwiperEmptyId');

interface ISwiperState {
  swiperItems: SwiperItemType[];
  nowActiveId: SwiperId;
  nowIndex: number;
  moving: boolean;
  moveOrder: IMoveOrder;
  loopPause: boolean;
}

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
    onChange: {
      type: Function as PropType<(conf: SwiperOnChangeConfig) => any>,
    },
    modelValue: {
      type: Number,
    },
  },

  setup(props, { slots, emit }) {
    const root = ref<HTMLDivElement | null>(null);
    const state = reactive<ISwiperState>({
      swiperItems: [],
      nowActiveId: emptyId,
      nowIndex: props.modelValue === undefined ? 0 : props.modelValue,
      moving: false,
      loopPause: false,
      moveOrder: {
        nextId: emptyId,
        prevId: emptyId,
      },
    });

    watch(
      () => state.nowIndex,
      (nowIndex) => {
        emit('update:modelValue', nowIndex);
      }
    );

    watch(
      () => props.modelValue,
      (nextIndex) => {
        const { swiperItems } = state;
        if (nextIndex !== undefined && nextIndex !== state.nowIndex) {
          const move = () => {
            setMoveOrder(swiperItems[nextIndex]);
            resetTimer();
          };
          if (state.moving) {
            cancelMove?.();
          }
          move();
        }
      }
    );

    watch(
      () => state.swiperItems.length,
      (n, prev) => {
        if (n === 0) {
          state.moving = false;
          state.nowActiveId = emptyId;
          state.moveOrder = {
            nextId: emptyId,
            prevId: emptyId,
          };
        }
        if (prev === 0) {
          state.nowActiveId = state.swiperItems[0].id;
          state.nowIndex = 0;
          state.moveOrder = {
            nextId: emptyId,
            prevId: emptyId,
          };
        }
      }
    );

    let timerId: any = null;
    // 外部控制时，要求能打断
    let cancelMove: Function | null = null;

    const resetTimer = () => {
      if (timerId) {
        clearInterval(timerId);
      }
      timerId = setInterval(() => {
        props.loop && !state.loopPause && !state.moving && onNext();
      }, props.interval);
    };

    const startAutoPlay = () => {
      state.loopPause = false;
    };
    const stopAutoPlay = () => {
      state.loopPause = true;
    };

    const setMoveOrder = (item: SwiperItemType, mode?: SwiperDirection) => {
      const { swiperItems, nowIndex, nowActiveId, moving } = state;
      let index = swiperItems.findIndex((n) => n.id === item.id);
      if (index > swiperItems.length - 1) {
        item = swiperItems[0];
        index = 0;
      }
      if ((swiperItems.length < 2 && nowIndex > 0) || !item || index === nowIndex || moving) {
        return;
      }
      let direction = SwiperDirection.NEXT;
      switch (mode) {
        case SwiperDirection.NEXT:
          state.moveOrder.nextId = item.id;
          break;
        case SwiperDirection.PREV:
          state.moveOrder.prevId = item.id;
          direction = SwiperDirection.PREV;
          break;
        default:
          if (index > nowIndex) {
            state.moveOrder.nextId = item.id;
          } else {
            state.moveOrder.prevId = item.id;
            direction = SwiperDirection.PREV;
          }
      }

      state.nowIndex = index;
      state.moving = true;

      const completeState = () => {
        state.moving = false;
        if (state.swiperItems.find((n) => n.id === item.id)) {
          state.nowIndex = state.swiperItems.findIndex((n) => n.id === item.id);
          state.nowActiveId = item.id;
        } else {
          if (state.swiperItems.length > 0) {
            state.nowIndex = 0;
            state.nowActiveId = state.swiperItems[0].id;
          } else {
            state.nowIndex = -1;
            state.nowActiveId = emptyId;
          }
        }
        state.moveOrder = {
          nextId: emptyId,
          prevId: emptyId,
        };
        cancelMove = null;
      };

      const moveTimerId = setTimeout(completeState, props.transitionTime);
      cancelMove = () => {
        clearTimeout(moveTimerId);
        completeState();
      };

      props.onChange?.({
        id: item.id,
        prevId: nowActiveId,
        index,
        prevIndex: nowIndex,
        direction,
      });
    };

    const onPrev = () => {
      const { nowIndex, swiperItems } = state;
      const prevIndex = nowIndex - 1 >= 0 ? nowIndex - 1 : swiperItems.length - 1;
      setMoveOrder(swiperItems[prevIndex], SwiperDirection.PREV);
    };

    const onNext = () => {
      const { nowIndex, swiperItems } = state;
      const autoIndex = nowIndex + 1 >= swiperItems.length ? 0 : nowIndex + 1;
      setMoveOrder(swiperItems[autoIndex], SwiperDirection.NEXT);
    };

    onMounted(() => {
      if (state.swiperItems.length > 0) {
        state.nowActiveId = state.swiperItems[0].id;
      }
      resetTimer();
    });

    onUnmounted(() => {
      clearInterval(timerId);
    });

    const swiperCollect: SwiperCollect = (item: SwiperItemType) => {
      state.swiperItems.push(item);
    };
    const swiperDestroy: SwiperDestroy = (id: SwiperId) => {
      nextTick(() => {
        state.swiperItems = state.swiperItems.filter((item) => item.id !== id);
        if (state.swiperItems.length === 0) {
          state.nowActiveId = emptyId;
          state.nowIndex = -1;
          state.moveOrder = {
            nextId: emptyId,
            prevId: emptyId,
          };
        } else if (
          state.nowActiveId === id ||
          (state.moving && (state.moveOrder.nextId === id || state.moveOrder.prevId === id))
        ) {
          cancelMove?.();
          state.nowIndex = 0;
          state.nowActiveId = state.swiperItems[0].id;
          state.moving = false;
          state.moveOrder = {
            nextId: emptyId,
            prevId: emptyId,
          };
          resetTimer();
        }
      });
    };
    provide(
      ActiveIdSymbol,
      computed(() => state.nowActiveId)
    );
    provide(SwiperCollectSymbol, swiperCollect);
    provide(SwiperDestroySymbol, swiperDestroy);
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
            setMoveOrder(item);
            resetTimer();
          }}
        ></li>
      ));
    };

    return () => (
      <div
        ref={root}
        class="sk-swiper"
        style={{
          width: Number.isFinite(props.width) ? `${props.width}px` : props.width,
          height: Number.isFinite(props.height) ? `${props.height}px` : props.height,
        }}
        onMouseenter={stopAutoPlay}
        onMouseleave={startAutoPlay}
      >
        <ul class="sk-swiper-list" style={`--transitionTime: ${props.transitionTime}ms`}>
          {slots.default?.()}
        </ul>
        {props.showIndicator ? <ul class="sk-swiper-indicators">{rendleIndicator()}</ul> : null}
        {props.showControl && state.swiperItems.length > 0 ? (
          <>
            <a
              class="sk-swiper-control sk-control-left"
              onClick={() => {
                onPrev();
                resetTimer();
              }}
            >
              <Icon type="left-simple" />
            </a>
            <a
              class="sk-swiper-control sk-control-right"
              onClick={() => {
                onNext();
                resetTimer();
              }}
            >
              <Icon type="right-simple" />
            </a>
          </>
        ) : null}
      </div>
    );
  },
});

export default Swiper;
