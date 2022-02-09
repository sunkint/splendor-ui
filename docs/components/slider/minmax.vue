<template>
  <div class="docs-preview-part">
    <sk-row :gutter="20">
      <sk-col :span="8">
        <sk-slider v-model="value1" :min="50" :max="120" />
        <p>当前值：{{ value1 }}</p>
      </sk-col>
      <sk-col :span="8">
        <sk-slider v-model="value2" :min="-50" :max="50" />
        <p>当前值：{{ value2 }}</p></sk-col
      >
      <sk-col :span="8">
        <sk-slider v-model="value3" :min="-100" :max="-80" />
        <p>当前值：{{ value3 }}</p></sk-col
      >
    </sk-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 100,
      value2: -10,
      value3: -100,
    };
  },
};
</script>
