import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid' // https://vitepress.dev/config/
import { tasklist } from '@mdit/plugin-tasklist'
import { footnote } from '@mdit/plugin-footnote'
import { getSideBar } from 'vitepress-plugin-autobar'

interface SideBar {
  text: string
  link: string
}

/**
 * 提取指定目录下的md文件，生成侧边栏
 * @param customSideBars 自定义侧边栏，customSideBars中的侧边栏不会重复生成，不进行排序，且排在最前面
 * @param path 待生成的目录路径，如：'/tittle-tattle'
 * @param options getSideBar options 默认值：{ ignoreMDFiles: ['index'] }
 * @returns 
 */
const createSideBar = (customSideBars: SideBar[], path: string, options?: any): SideBar[] => {
  const defaultOptions = {
    ignoreMDFiles: ['index'],
  }

  return customSideBars.concat(getSideBar('./docs' + path, options || defaultOptions).reduce((sideBars: SideBar[], item: any) => {
    let { text, link } = item.items[0]
    link = path + '/' + link

    // 排除自定义侧边栏中的链接
    if (!customSideBars.some(customItem => customItem.link === link)) {
      sideBars.push({ text, link })
    }
    return sideBars
  }, [])
    .sort((a: SideBar, b: SideBar) => a.text.localeCompare(b.text))) // 按侧边栏名称升序排序
}

export default withMermaid({
  ...defineConfig({
    title: 'Jay 的博客',
    description:
      '本博客专注于分享 Web 开发以及相关的领域的知识。无论您是行业专家还是初学者，相信这里都能找到有价值的内容。期待与您相互学习、共同进步。',
    lang: 'zh-CN',
    lastUpdated: true, // 默认开启markdown最后更新时间
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }] // 设置网站图标
    ],
    markdown: {
      lineNumbers: true, // 设置markdown代码块行号
      config: (md) => {
        md.use(tasklist) // 引入任务列表支持的插件
        md.use(footnote) // 引入脚注支持的插件
      } // 设置markdown插件
    }, // 设置markdown配置
    themeConfig: {
      logo: '/logo.png', // 设置网站logo
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: '首页', link: '/' },
        { text: '杂谈', link: '/tittle-tattle' },
        { text: '前端与 SEO', link: '/seo' },
        { text: 'TODO', link: '/todo-list' }
      ],
      sidebar: {
        '/tittle-tattle/': [{
          text: '杂谈',
          collapsed: false,
          items: createSideBar([{ text: '关于三层架构在前端项目的应用', link: '/tittle-tattle/关于三层架构在前端项目的应用' }], '/tittle-tattle'),
        }],
        '/seo/': [
          {
            text: '前端与 SEO',
            collapsed: false,
            items:
              createSideBar([
                { text: '第一章：什么是 SEO', link: '/seo/第一章：什么是 SEO' },
                { text: '第二章：站点地图', link: '/seo/第二章：sitemap' },
                { text: '第三章：robots.txt', link: '/seo/第三章：robots.txt' },
                { text: '第四章：meta 与 SEO', link: '/seo/第四章：meta 与 SEO' },
                { text: '第五章：SPA 与 SSR 对 SEO 的影响', link: '/seo/第五章：SPA 与 SSR 对 SEO 的影响' },
                { text: '第六章：前端开发人员的一些SEO优化方法', link: '/seo/第六章：前端开发人员的一些SEO优化方法' }
              ], '/seo'),
          }
        ]
      },
      socialLinks: [
        {
          icon: 'github',
          link: 'https://github.com/Z-J-wang/z-j-wang.github.io/'
        }
      ],
      editLink: {
        pattern: 'https://github.com/Z-J-wang/z-j-wang.github.io/edit/main/docs/:path'
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
      search: {
        provider: 'local'
      }
    },
    sitemap: {
      hostname: 'https://z-j-wang.github.io/',
    }
  }),
  // mermaid 配置项。详见：https://mermaid.js.org/config/setup/modules/mermaid.html
  mermaid: {},
  // optionally set additional config for plugin itself with MermaidPluginConfig
  mermaidPlugin: {
    class: 'mermaid' // set additional css classes for parent container
  }
})
