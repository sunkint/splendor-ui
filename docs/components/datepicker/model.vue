<template>
  <div class="docs-preview-part">
    <p>当前选择日期：{{ date.toString() }}</p>
    <sk-datepicker v-model="date" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date('2020/03/08'),
    };
  },
};
</script>
