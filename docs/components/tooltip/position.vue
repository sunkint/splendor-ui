<template>
  <div class="docs-preview-part">
    <sk-row>
      <sk-col :span="12" class="radios">
        <sk-radio v-model="position" value="top-left">TopLeft</sk-radio>
        <sk-radio v-model="position" value="top-center">TopCenter</sk-radio>
        <sk-radio v-model="position" value="top-right">TopRight</sk-radio>
        <br />
        <sk-radio v-model="position" value="left-top">LeftTop</sk-radio>
        <sk-radio v-model="position" value="left-center">LeftCenter</sk-radio>
        <sk-radio v-model="position" value="left-bottom">LeftBottom</sk-radio>
        <br />
        <sk-radio v-model="position" value="right-top">RightTop</sk-radio>
        <sk-radio v-model="position" value="right-center">RightCenter</sk-radio>
        <sk-radio v-model="position" value="right-bottom">RightBottom</sk-radio>
        <br />
        <sk-radio v-model="position" value="bottom-left">BottomLeft</sk-radio>
        <sk-radio v-model="position" value="bottom-center">BottomCenter</sk-radio>
        <sk-radio v-model="position" value="bottom-right">BottomRight</sk-radio>
      </sk-col>
      <sk-col :span="12">
        <client-only>
          <sk-tooltip content="hello" :position="position">
            <sk-button type="primary" size="large">Hover 我</sk-button>
          </sk-tooltip>
        </client-only>
      </sk-col>
    </sk-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      position: 'top-left',
    };
  },
};
</script>

<style scoped>
.radios > * {
  margin-right: 12px;
  margin-bottom: 12px;
}
</style>
