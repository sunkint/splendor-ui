import { defineComponent, onBeforeUnmount, onMounted, ref, Teleport, Transition } from 'vue';
import Icon from '../icon';
import './index.scss';

const BackTop = defineComponent({
  name: 'sk-back-top',
  props: {
    distance: {
      type: Number,
      default: 200,
    },
  },
  setup(props) {
    const shouldHide = ref(true);
    const scrollToTop = () => {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth',
      });
    };

    const checkShouldHide = () => {
      try {
        shouldHide.value = window.pageYOffset < props.distance;
      } catch (e) {
        shouldHide.value = true;
      }
    };

    checkShouldHide();

    onMounted(() => {
      window.addEventListener('scroll', checkShouldHide);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', checkShouldHide);
    });

    return () => (
      <Teleport to="body">
        <Transition name="fade">
          {!shouldHide.value && (
            <div class="sk-back-top" onClick={scrollToTop}>
              <Icon type="up-simple" />
            </div>
          )}
        </Transition>
      </Teleport>
    );
  },
});

export default BackTop;
