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

export type StepStatus = 'wait' | 'process' | 'finish' | 'error';
export type StepsDirection = 'horizontal' | 'vertical';
interface ProvideState {
  current: number;
  status: StepStatus;
  direction: StepsDirection;
}

enum StepStatusInternal {
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
        return StepStatusInternal.FINISH;
      }
      if (index.value > parentState.current) {
        return StepStatusInternal.WAIT;
      }
      return parentState.status as StepStatusInternal;
    });

    const nextStepStatus = computed(() => {
      if (index.value < parentState.current - 1) {
        return StepStatusInternal.FINISH;
      }
      if (index.value > parentState.current - 1) {
        return StepStatusInternal.WAIT;
      }
      return parentState.status as StepStatusInternal;
    });

    return () => (
      <div ref={stepRef} class={['sk-step', `sk-step-${status.value}`]}>
        <div class="sk-step-head">
          {props.icon ? (
            <div class="sk-step-icon">
              <Icon type={props.icon} />
            </div>
          ) : (
            <div class="sk-step-label">
              {status.value === StepStatusInternal.FINISH ? (
                <Icon type="ok" />
              ) : status.value === StepStatusInternal.ERROR ? (
                <Icon type="close" />
              ) : (
                <div class="sk-step-order">{index.value + 1}</div>
              )}
            </div>
          )}
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
      type: String as PropType<StepStatus>,
      default: 'process' as StepStatus,
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

    return () => (
      <div class={['sk-steps', , `sk-steps-${props.direction}`]}>{slots.default?.()}</div>
    );
  },
});

export { Steps, Step };
