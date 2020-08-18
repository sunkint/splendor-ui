const buildNavChildren = (name) => ({
  text: name,
  link: `/docs/components/${name.toLowerCase()}/index`,
});

module.exports = {
  lang: 'zh-CN',
  title: 'splendor-ui',
  description: '光辉号骁之屋前端组件库',
  themeConfig: {
    sidebar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '开发指南',
        link: '/docs/install',
      },
      {
        text: '组件预览',
        link: '/docs/preview',
      },
      {
        text: '————',
      },
      {
        text: '基础组件',
        children: ['Button', 'Input', 'Textarea', 'Icon', 'Tag', 'Notify', 'Dropdown'].map(
          buildNavChildren
        ),
      },
    ],
    nav: [{ text: 'GitHub', link: 'https://github.com/sunkint/splendor-ui' }],
  },
};
