<template>
  <transition-group>
    <div v-for="item in options" :class="getClass(item.type)" :key="item.ref">
      <sk-icon class="sk-notify-icon" :type="getIconType(item.type)" />
      <div class="sk-notify-content">
        {{ item.content }}
      </div>
    </div>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NotifyType } from './types';
import Icon from '../icon';
export default defineComponent({
  name: 'NotifyApp',
  components: {
    'sk-icon': Icon,
  },
  props: {
    options: Array,
  },
  methods: {
    getClass(type: NotifyType) {
      return [
        'sk-notify',
        {
          'sk-notify-success': type === NotifyType.SUCCESS,
          'sk-notify-info': type === NotifyType.INFO,
          'sk-notify-warn': type === NotifyType.WARN,
          'sk-notify-error': type === NotifyType.ERROR,
        },
      ];
    },
    getIconType(type: NotifyType) {
      switch (type) {
        case NotifyType.SUCCESS:
          return 'ok-o';
        case NotifyType.INFO:
          return 'info';
        case NotifyType.WARN:
          return 'info';
        case NotifyType.ERROR:
          return 'info';
        default:
          return 'info';
      }
    },
  },
});
</script>
