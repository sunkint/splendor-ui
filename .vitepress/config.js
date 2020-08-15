const path = require('path');

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
    ],
    nav: [{ text: 'GitHub', link: 'https://github.com/sunkint/splendor-ui' }],
  },
};
