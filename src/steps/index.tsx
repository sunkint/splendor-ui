import {
  computed,
  defineComponent,
  inject,
  onMounted,
  PropType,
  provide,
  reactive,
  ref,
  toRefs,
} from 'vue';
import Icon from '../icon';
import './index.scss';

export type StepsStatus = 'wait' | 'process' | 'finish' | 'error';
export type StepsDirection = 'horizontal' | 'vertical';
export interface ProvideState {
  current: number;
  status: StepsStatus;
  direction: StepsDirection;
}

enum StepsStatusInternal {
  WAIT = 'wait',
  PROCESS = 'process',
  FINISH = 'finish',
  ERROR = 'error',
}

const ProvideSymbol = Symbol('ProvideSymbol');

const Step = defineComponent({
  name: 'sk-step',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  setup(props) {
    const stepRef = ref<HTMLDivElement>();

    const parentState = inject<ProvideState>(ProvideSymbol);
    if (!parentState) {
      console.warn('Step should be used within Steps.');
      return () => null;
    }

    const index = ref(0);
    onMounted(() => {
      index.value = Array.from(stepRef.value!.parentElement!.childNodes).findIndex(
        (n) => n === stepRef.value
      );
    });

    const status = computed(() => {
      if (index.value < parentState.current) {
        return StepsStatusInternal.FINISH;
      }
      if (index.value > parentState.current) {
        return StepsStatusInternal.WAIT;
      }
      return parentState.status as StepsStatusInternal;
    });

    const nextStepStatus = computed(() => {
      if (index.value < parentState.current - 1) {
        return StepsStatusInternal.FINISH;
      }
      if (index.value > parentState.current - 1) {
        return StepsStatusInternal.WAIT;
      }
      return parentState.status as StepsStatusInternal;
    });

    return () => (
      <div ref={stepRef} class={['sk-step', `sk-step-${status.value}`]}>
        <div class="sk-step-head">
          <div class="sk-step-label">
            {status.value === StepsStatusInternal.FINISH ? (
              <Icon type="ok" />
            ) : (
              <div class="sk-step-order">{index.value + 1}</div>
            )}
          </div>
        </div>
        <div class={['sk-step-main', `sk-step-before-${nextStepStatus.value}`]}>
          <div class="sk-step-title">{props.title}</div>
          {props.description ? <div class="sk-step-description">{props.description}</div> : null}
        </div>
      </div>
    );
  },
});

const Steps = defineComponent({
  name: 'sk-steps',
  props: {
    current: {
      type: Number,
      default: 0,
    },
    status: {
      type: String as PropType<StepsStatus>,
      default: 'process' as StepsStatus,
    },
    direction: {
      type: String as PropType<StepsDirection>,
      default: 'horizontal' as StepsDirection,
    },
  },
  setup(props, { slots }) {
    const provideState = reactive({
      ...toRefs(props),
    });

    provide<ProvideState>(ProvideSymbol, provideState);

    return () => <div class="sk-steps">{slots.default?.()}</div>;
  },
});

export { Steps, Step };
