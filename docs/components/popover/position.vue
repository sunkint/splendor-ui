<template>
  <div class="docs-preview-part">
    <client-only>
      <sk-row>
        <sk-col class="top" :span="24">
          <sk-popover position="top-left">
            <sk-button>TopLeft</sk-button>
            <template #content>Top Left</template>
          </sk-popover>
          <sk-popover position="top-center">
            <sk-button>TopCenter</sk-button>
            <template #content>Top Center</template>
          </sk-popover>
          <sk-popover position="top-right">
            <sk-button>TopRight</sk-button>
            <template #content>Top Right</template>
          </sk-popover>
        </sk-col>
        <sk-col class="left" :span="12">
          <div class="inner">
            <sk-popover position="left-top">
              <sk-button>LeftTop</sk-button>
              <template #content>Left Top</template>
            </sk-popover>
            <br />
            <sk-popover position="left-center">
              <sk-button>LeftCenter</sk-button>
              <template #content>Left Center</template>
            </sk-popover>
            <br />
            <sk-popover position="left-bottom">
              <sk-button>LeftBottom</sk-button>
              <template #content>Left Bottom</template>
            </sk-popover>
          </div>
        </sk-col>
        <sk-col class="right" :span="12">
          <div class="inner">
            <sk-popover position="right-top">
              <sk-button>RightTop</sk-button>
              <template #content>Right Top</template>
            </sk-popover>
            <br />
            <sk-popover position="right-center">
              <sk-button>RightCenter</sk-button>
              <template #content>Right Center</template>
            </sk-popover>
            <br />
            <sk-popover position="right-bottom">
              <sk-button>RightBottom</sk-button>
              <template #content>Right Bottom</template>
            </sk-popover>
          </div>
        </sk-col>
        <sk-col class="bottom" :span="24">
          <sk-popover position="bottom-left">
            <sk-button>BottomLeft</sk-button>
            <template #content>Bottom Left</template>
          </sk-popover>
          <sk-popover position="bottom-center">
            <sk-button>BottomCenter</sk-button>
            <template #content>Bottom Center</template>
          </sk-popover>
          <sk-popover position="bottom-right">
            <sk-button>BottomRight</sk-button>
            <template #content>Bottom Right</template>
          </sk-popover>
        </sk-col>
      </sk-row>
    </client-only>
  </div>
</template>

<style scoped>
.docs-preview-part :deep(.sk-layer-trigger) {
  margin: 8px;
}

button {
  width: 120px !important;
}

.top,
.bottom {
  text-align: center;
}

.left,
.right {
  display: flex;
  align-items: center;
}

.right {
  justify-content: flex-end;
}
</style>
