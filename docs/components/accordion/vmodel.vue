<template>
  <div class="docs-preview-part">
    <p>选中：{{ value }}</p>
    <sk-accordion v-model="value">
      <sk-accordion-item title="2020年1月" value="2020-1">
        <p>2020年1月发生的事件</p>
      </sk-accordion-item>
      <sk-accordion-item title="2020年2月" value="2020-2">
        <p>2020年2月发生的事件</p>
      </sk-accordion-item>
      <sk-accordion-item title="2020年3月" value="2020-3">
        <p>2020年3月发生的事件</p>
      </sk-accordion-item>
      <sk-accordion-item title="2020年4月" value="2020-4">
        <p>2020年4月发生的事件</p>
      </sk-accordion-item>
      <sk-accordion-item title="2020年5月" value="2020-5">
        <p>2020年5月发生的事件</p>
      </sk-accordion-item>
    </sk-accordion>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: null,
    };
  },
};
</script>
