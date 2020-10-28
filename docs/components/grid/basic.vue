<template>
  <div class="docs-preview-part">
    <sk-row class="my-row" :gutter="[5, 5]">
      <sk-col :span="6"><div class="my-col">col-6</div></sk-col>
      <sk-col :span="6"><div class="my-col">col-6</div></sk-col>
      <sk-col :span="6"><div class="my-col">col-6</div></sk-col>
      <sk-col :span="6"><div class="my-col">col-6</div></sk-col>
    </sk-row>
    <sk-row class="my-row">
      <sk-col :span="6"><div class="my-col">col-6</div></sk-col>
      <sk-col :span="6"><div class="my-col">col-6</div></sk-col>
      <sk-col :span="6"><div class="my-col">col-6</div></sk-col>
      <sk-col :span="6"><div class="my-col">col-6</div></sk-col>
    </sk-row>
    <sk-row class="my-row">
      <sk-col :span="6" :offset="6"><div class="my-col">col-6</div></sk-col>
      <sk-col :span="6" :offset="6"><div class="my-col">col-6</div></sk-col>
    </sk-row>
    <sk-row class="my-row" justify="space-around">
      <sk-col :span="4"><div class="my-col">col-4</div></sk-col>
      <sk-col :span="4"><div class="my-col">col-4</div></sk-col>
      <sk-col :span="4"><div class="my-col">col-4</div></sk-col>
      <sk-col :span="4"><div class="my-col">col-4</div></sk-col>
    </sk-row>
  </div>
</template>

<style scoped>
.my-row {
  margin-bottom: 8px !important;
}

.my-col {
  background: #18bc9c;
  color: #fff;
  padding: 8px 0;
  text-align: center;
}

.docs-preview-part > * {
  margin-right: 0;
}
</style>
