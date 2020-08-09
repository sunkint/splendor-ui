<template>
  <transition @after-leave="destroy">
    <div v-show="visible" :class="classObject">
      <sk-icon class="sk-notify-icon" type="info" v-if="isInfoType" />
      <sk-icon class="sk-notify-icon" type="ok-o" v-if="isSuccessType" />
      <div class="sk-notify-content">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { NotifyType } from './types';
import Icon from '../icon';
export default defineComponent({
  name: 'NotifyApp',
  components: {
    'sk-icon': Icon,
  },
  props: {
    type: Number as PropType<NotifyType>,
    duration: Number,
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    classObject() {
      return [
        'sk-notify',
        {
          'sk-notify-success': this.isSuccessType,
          'sk-notify-info': this.isInfoType,
          'sk-notify-warn': this.isWarnType,
          'sk-notify-error': this.isErrorType,
        },
      ];
    },
    isSuccessType() {
      return this.type === NotifyType.SUCCESS;
    },
    isInfoType() {
      return this.type === NotifyType.INFO;
    },
    isWarnType() {
      return this.type === NotifyType.WARN;
    },
    isErrorType() {
      return this.type === NotifyType.ERROR;
    },
  },
  methods: {
    destroy() {
      this.$emit('close');
    },
  },
  mounted() {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, this.duration);
  },
});
</script>
