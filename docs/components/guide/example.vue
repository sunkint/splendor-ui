<template>
  <sk-button type="primary" @click="greet">Hello</sk-button>
</template>

<script>
import { Notify } from '../../../src/main';
export default {
  name: 'GuideExample',
  methods: {
    greet() {
      Notify.success('Hello World!');
    },
  },
};
</script>
