import { defineConfig } from 'vitepress';
import { withMermaid } from "vitepress-plugin-mermaid"; // https://vitepress.dev/config/

export default withMermaid({
  ...defineConfig({
    title: 'Jay 的博客',
    description: 'Jay 的博客',
    lastUpdated: true, // 默认开启markdown最后更新时间
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }], // 设置网站图标
    ],
    markdown: {
      lineNumbers: true
    }, // 设置markdown配置
    themeConfig: {
      logo: '/logo.png', // 设置网站logo
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Examples', link: '/markdown-examples' },
        { text: '杂谈', link: '/tittle-tattle/《探讨——关于三层架构在前端项目的应用》第一版' },
      ],
      sidebar: {
        '/': [{
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' },
          ],
        }],
        '/tittle-tattle/': [{
          text: '杂谈',
          items: [
            { text: '《探讨——关于三层架构在前端项目的应用》第一版', link: '/tittle-tattle/《探讨——关于三层架构在前端项目的应用》第一版' },
          ],
        }],
      },
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
      outline: {
        level: [2, 6], // 设置侧边栏目录显示的标题级别
        label: '目录'
      }, // 设置侧边栏目录深度
      returnToTopLabel: '返回顶部',
      search: {
        provider: 'local'
      }
    },
  }),
  // mermaid 配置项。详见：https://mermaid.js.org/config/setup/modules/mermaid.html
  mermaid: {},
  // optionally set additional config for plugin itself with MermaidPluginConfig
  mermaidPlugin: {
    class: "mermaid", // set additional css classes for parent container 
  },
});
