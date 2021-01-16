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
        text: '基础组件',
        children: [
          'Button',
          'Icon',
          'Tag',
          'Notify',
          'Dropdown',
          'Grid',
          'CopyLink',
          'Loading',
          'Pagination',
          'BackTop',
        ].map(buildNavChildren),
      },
      {
        text: '展示组件',
        children: [
          'Alert',
          'Avatar',
          'Collapse',
          'Accordion',
          'Dialog',
          'SweetAlert',
          'Tabs',
          'Popover',
          'Tooltip',
          'Progress',
          'Badge',
          'Table',
          'Swiper',
        ].map(buildNavChildren),
      },
      {
        text: '表单组件',
        children: ['Input', 'Textarea', 'Radio', 'Checkbox', 'Switch', 'Select'].map(
          buildNavChildren
        ),
      },
    ],
    nav: [{ text: 'GitHub', link: 'https://github.com/sunkint/splendor-ui' }],
  },
};
