# Loading 加载中

### 基础用法

<div class="docs-preview-part">
  <sk-loading show>
    <div>
      <lorem />
    </div>
  </sk-loading>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-loading show>
      <div>
        <span>Lorem ipsum dolor sit amet, …</span>
      </div>
    </sk-loading>
  </div>
</template>
```

### 带提示文字

<div class="docs-preview-part">
  <sk-loading tip="内容加载中" show>
    <div>
      <lorem />
    </div>
  </sk-loading>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-loading tip="内容加载中" show>
      <div>
        <span>Lorem ipsum dolor sit amet, …</span>
      </div>
    </sk-loading>
  </div>
</template>
```

### 使用 tip 插槽规定提示文字

<div class="docs-preview-part">
  <sk-loading show>
    <div>
      <lorem />
    </div>
    <template #tip>
      <strong>正在<em>加载中</em></strong>
    </template>
  </sk-loading>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-loading show>
      <div>
        <span>Lorem ipsum dolor sit amet, …</span>
      </div>
      <template #tip>
        <strong>正在<em>加载中</em></strong>
      </template>
    </sk-loading>
  </div>
</template>
```

### 指定颜色

<div class="docs-preview-part">
  <sk-loading tip="内容加载中" color="red" show>
    <div>
      <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur explicabo corporis eius quo nemo dolorem libero, quam ea consequatur nisi harum ipsa, recusandae exercitationem labore debitis! Pariatur, nisi debitis architecto mollitia fugiat neque odit repellendus rem? Tempora tenetur reiciendis illo laboriosam aliquid! Quod eos maiores ab quo accusamus facere non sint placeat ullam doloribus impedit quibusdam aliquam quos culpa, amet, dolores veniam odio repudiandae tempora excepturi harum delectus ex beatae. Suscipit fugiat error autem dolores nam ut quis alias, odit quisquam optio tempore eligendi repellendus soluta aperiam aspernatur fuga nemo aliquid itaque totam ducimus quae cupiditate. Enim ipsa, fugiat dignissimos quae hic dolores suscipit tempora blanditiis eaque doloribus? At quas aut asperiores sit facere obcaecati aliquid ducimus nihil. Unde illum quae iusto assumenda, quibusdam porro veritatis? Sed id quos eveniet quasi magnam, fuga sequi! Error consectetur numquam qui animi vel fugiat? Voluptatibus reprehenderit quo dolorem sint nulla, esse, delectus doloremque ipsa soluta, corporis repudiandae iste ad? Deleniti nihil, culpa, similique ea temporibus eum saepe harum est explicabo pariatur corporis placeat unde illo et laudantium distinctio quo exercitationem minima sapiente. Sapiente tempora iste corrupti a voluptates reprehenderit nobis, laudantium minima ad dolorem asperiores eius velit, eum magni similique quo voluptatem itaque!</span>
    </div>
  </sk-loading>
</div>

```vue
<template>
  <div class="docs-preview-part">
    <sk-loading tip="内容加载中" color="red" show>
      <div>
        <span>Lorem ipsum dolor sit amet, …</span>
      </div>
    </sk-loading>
  </div>
</template>
```

### API

| 参数      | 说明                 | 类型                  | 可选值 | 默认值    |
| --------- | -------------------- | --------------------- | ------ | --------- |
| show      | 是否显示             | bool                  | `true` | `false`   |
| maskClass | 半透明遮罩的额外类名 | string、array、object |        |           |
| color     | 颜色                 | string                |        | `#2c3e50` |
| tip       | 加载中的提示文字     | string                |        |           |
