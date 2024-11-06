import { type DefaultTheme } from 'vitepress'
import sidebarConfig from './sidebar.config.mts'

const themeConfig: DefaultTheme.Config = {
  logo: '/logo.png', // 设置网站logo
  // https://vitepress.dev/reference/default-theme-config
  nav: [
    { text: '首页', link: '/' },
    { text: '专栏', link: '/special-column' },
    { text: '杂谈', link: '/tittle-tattle' },
    { text: '前端与 SEO', link: '/seo' },
    { text: '前端工程化', link: '/front-end-engineering' },
    { text: 'TODO', link: '/todo-list' }
  ],
  sidebar: sidebarConfig,
  socialLinks: [{ icon: 'github', link: 'https://github.com/Z-J-wang/z-j-wang.github.io/' }],
  editLink: {
    pattern: 'https://github.com/Z-J-wang/z-j-wang.github.io/edit/main/docs/:path',
    text: '在 GitHub 上编辑此页'
  },
  lastUpdated: {
    text: '更新时间',
    formatOptions: {
      dateStyle: 'full',
      timeStyle: 'medium'
    }
  },
  outline: {
    level: [2, 6], // 设置侧边栏目录显示的标题级别
    label: '目录'
  }, // 设置侧边栏目录深度
  returnToTopLabel: '返回顶部',
  search: { provider: 'local' },
  footer: {
    message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
    copyright: 'Copyright © 2023-present <a href="https://github.com/Z-J-wang">Jay</a>'
  },
  langMenuLabel: '切换语言',
  darkModeSwitchLabel: '主题',
  lightModeSwitchTitle: '切换到浅色模式',
  darkModeSwitchTitle: '切换到深色模式',
  sidebarMenuLabel: '菜单',
  docFooter: { prev: '上一篇', next: '下一篇' }
}

export default themeConfig
