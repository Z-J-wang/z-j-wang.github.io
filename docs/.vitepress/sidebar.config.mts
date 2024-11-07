import { getSideBar } from 'vitepress-plugin-autobar'
import { type DefaultTheme } from 'vitepress'

interface SideBar {
  text: string
  link: string
}

const sidebarConfig: DefaultTheme.Sidebar = {
  '/tittle-tattle/': [
    {
      text: '杂谈',
      collapsed: false,
      items: createSideBar(
        [{ text: '关于三层架构在前端项目的应用', link: '/tittle-tattle/关于三层架构在前端项目的应用' }],
        '/tittle-tattle'
      )
    }
  ],
  '/seo/': [
    {
      text: '前端与 SEO',
      collapsed: false,
      items: createSideBar(
        [
          { text: '第一章：什么是 SEO', link: '/seo/第一章：什么是 SEO' },
          { text: '第二章：站点地图', link: '/seo/第二章：sitemap' },
          { text: '第三章：robots.txt', link: '/seo/第三章：robots.txt' },
          { text: '第四章：meta 与 SEO', link: '/seo/第四章：meta 与 SEO' },
          { text: '第五章：SPA 与 SSR 对 SEO 的影响', link: '/seo/第五章：SPA 与 SSR 对 SEO 的影响' },
          { text: '第六章：前端开发人员的一些SEO优化方法', link: '/seo/第六章：前端开发人员的一些SEO优化方法' }
        ],
        '/seo'
      )
    }
  ],
  '/webpack-vue-cli4/': [
    {
      text: 'vue-cli4.0 webpack配置说明',
      collapsed: false,
      items: createSideBar(
        [
          { text: '第一篇：Vue CLI 4.0 webpack配置专栏说明', link: '/webpack-vue-cli4/publicPath' },
          { text: '第二篇：Vue CLI4.0 webpack配置属性——publicPath', link: '/webpack-vue-cli4/publicPath' },
          {
            text: '第三篇：Vue CLI4.0 webpack配置属性——outputDir、assetsDir、indexPath',
            link: '/webpack-vue-cli4/outputDir&assetsDir&indexPath'
          },
          { text: '第四篇：Vue CLI4.0 webpack配置属性——filenameHashing', link: '/webpack-vue-cli4/filenameHashing' },
          {
            text: '第五篇：Vue CLI4.0 webpack配置属性——lintOnSave、configureWebpack、chainWebpack、parallel',
            link: '/webpack-vue-cli4/lintOnSave&configureWebpack&chainWebpack&parallel'
          },
          { text: '第六篇：Vue CLI4.0 webpack配置属性——crossorigin', link: '/webpack-vue-cli4/crossorigin' },
          {
            text: '第七篇：Vue CLI4.0 webpack配置属性——productionSourceMap',
            link: '/webpack-vue-cli4/productionSourceMap'
          },
          { text: '第八篇：Vue CLI4.0 webpack配置属性——css.sourceMap', link: '/webpack-vue-cli4/css.sourceMap' },
          { text: '第九篇：Vue CLI4.0 webpack配置属性——css.extract', link: '/webpack-vue-cli4/css.extract' },
          {
            text: '第十篇：Vue CLI4.0 webpack配置属性——css.requireModuleExtension、css.loaderOptions',
            link: '/webpack-vue-cli4/css.requireModuleExtension&css.loaderOptions'
          },
          { text: '第十一篇：Vue CLI4.0 webpack配置属性——devServer', link: '/webpack-vue-cli4/devServer' },
          {
            text: '第十二篇：Vue CLI4.0 webpack配置属性——devServer.proxy',
            link: '/webpack-vue-cli4/devServer.proxy'
          },
          { text: '范例篇：Vue CLI 4.0 关于 webpack 基本配置范例', link: '/webpack-vue-cli4/example' }
        ],
        '/webpack-vue-cli4'
      )
    }
  ],
  '/front-end-engineering/': [
    {
      text: '前端工程化',
      collapsed: false,
      items: createSideBar([], '/front-end-engineering')
    }
  ],
  '/vue2-to-vue3/': [
    {
      text: 'Vue3 迁移策略笔记',
      collapsed: false,
      items: createSideBar([], '/vue2-to-vue3')
    }
  ],
  '/web-optimization/': [
    {
      text: 'Web 性能优化',
      collapsed: false,
      items: createSideBar([], '/web-optimization')
    }
  ]
}

/**
 * 提取指定目录下的md文件，生成侧边栏
 * @param customSideBars 自定义侧边栏，customSideBars中的侧边栏不会重复生成，不进行排序，且排在最前面
 * @param path 待生成的目录路径，如：'/tittle-tattle'
 * @param sortFn 排序函数, 默认按照名称升序排序，并使用数字对照，使得“1”<“2”<“10”。
 * @param options getSideBar options 默认值：{ ignoreMDFiles: ['index'] }
 * @returns
 */
function createSideBar(
  customSideBars: SideBar[],
  path: string,
  sortFn: (a: SideBar, b: SideBar) => number = (a: SideBar, b: SideBar) =>
    a.text.localeCompare(b.text, undefined, { numeric: true }), // 默认按照名称升序排序，并使用数字对照，使得“1”<“2”<“10”。
  options?: any
): SideBar[] {
  const defaultOptions = {
    ignoreMDFiles: ['index']
  }

  return customSideBars.concat(
    getSideBar('./docs' + path, options || defaultOptions)
      .reduce((sideBars: SideBar[], item: any) => {
        let { text, link } = item.items[0]
        link = path + '/' + link

        // 删除子目录的index.md文件名中的 'Index' 后缀
        // 如：/path/[目录名]/index.md
        text = text.replace(/ Index$/, '')

        // 排除自定义侧边栏中的链接
        if (!customSideBars.some((customItem) => customItem.link === link)) {
          sideBars.push({ text, link })
        }
        return sideBars
      }, [])
      .sort(sortFn)
  )
}

export default sidebarConfig
