import { defineComponent, ref, computed } from 'vue';
import './index.scss';

const SwiperItem = defineComponent({
  name: 'sk-swipe-item',
  setup(props, { slots }) {
    console.log(props);
    return () => <li class="sk-swiper-item">{slots.default?.()}</li>;
  },
});

const Swiper = defineComponent({
  name: 'sk-swiper',
  setup(props, { slots }) {
    const root = ref();
    // const children = this.$refs.skSwiperList.children;
    // const count = computed(() => children.length);

    const onLabelClick = (e: any) => {
      console.log(e.target, props, slots);
    };

    const renderIndicator = () => {
      if (slots.indicator) {
        return slots.indicator();
      }
      return (
        <ul class="sk-swiper-labels" onClick={onLabelClick}>
          <li class="sk-swiper-label"></li>
          <li class="sk-swiper-label"></li>
          <li class="sk-swiper-label"></li>
          <li class="sk-swiper-label"></li>
        </ul>
      );
    };

    return () => (
      <div ref={root} class="sk-swiper">
        <ul ref="skSwiperList" class="sk-swiper-list">
          {slots.default?.()}
        </ul>
        {renderIndicator()}
      </div>
    );
  },
});

export { Swiper, SwiperItem };
