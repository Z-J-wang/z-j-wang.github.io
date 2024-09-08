import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Jay 的博客',
  description: 'Jay 的博客',
  lastUpdated: true, // 默认开启markdown最后更新时间
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 设置网站图标
  ],
  srcDir: 'src', // 设置源目录
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Z-J-wang/z-j-wang.github.io/',
      },
    ],
    editLink: {
      pattern:
        'https://github.com/Z-J-wang/z-j-wang.github.io/edit/main/docs/:path',
    },
    lastUpdated: {
      text: '更新时间',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
      },
    },
  },
});
