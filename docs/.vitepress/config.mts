import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid' // https://vitepress.dev/config/
import { tasklist } from '@mdit/plugin-tasklist'
import { footnote } from '@mdit/plugin-footnote'
import themeConfig from './theme.config.mts'
import headConfig from './head.config.mts'

export default withMermaid({
  ...defineConfig({
    title: 'Jay 的博客',
    description:
      '本博客专注于分享 Web 开发以及相关的领域的知识。无论您是行业专家还是初学者，相信这里都能找到有价值的内容。期待与您相互学习、共同进步。',
    lang: 'zh-CN',
    lastUpdated: true, // 默认开启markdown最后更新时间
    // 主题颜色模式切换
    appearance: {
      onChanged: (isDark, defaultHandler, mode) => {
        try {
          let lastClick = window.event as MouseEvent
          // 为不支持此 API 的浏览器提供回退方案：
          // @ts-ignore
          if (!document?.startViewTransition) return defaultHandler(mode)

          // 获取点击位置，或者回退到屏幕中间
          const x = lastClick?.clientX ?? innerWidth / 2
          const y = lastClick?.clientY ?? innerHeight / 2
          // 获取到最远角的距离
          const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

          let keyframes = [
            { clipPath: `circle(0 at ${x}px ${y}px)` },
            { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` }
          ]
          if (isDark) keyframes = keyframes.reverse()

          // 开始一次视图过渡：
          // @ts-ignore
          const transition = document.startViewTransition(() => {
            if (!isDark) {
              defaultHandler(mode)
            } else {
              setTimeout(() => defaultHandler(mode), 300)
            }
          })

          // 等待伪元素创建完成：
          transition.ready.then(() => {
            // 新视图的根元素动画
            document.documentElement.animate(keyframes, {
              duration: 300,
              pseudoElement: '::view-transition-new(root)'
            })
          })
        } catch (error) {
          // node 环境window对象不存在，直接使用默认处理方式
          defaultHandler(mode)
        }
      }
    }, // 默认开启暗黑模式
    head: headConfig,
    markdown: {
      image: {
        lazyLoading: true  // 启用图片懒加载
      },
      lineNumbers: true, // 设置markdown代码块行号
      config: (md) => {
        md.use(tasklist) // 引入任务列表支持的插件
        md.use(footnote) // 引入脚注支持的插件
      } // 设置markdown插件
    }, // 设置markdown配置
    themeConfig: themeConfig, // 设置主题配置,
    sitemap: { hostname: 'https://z-j-wang.github.io/' },
    // transformPageData 钩子函数 https://vitejs.cn/vitepress/reference/site-config#transformpagedata
    transformPageData(pageData) {
      // 提取frontmatter数据中的作者、关键词和贡献者信息，并将其添加到页面的head中
      const { author, keywords, contributors } = pageData.frontmatter
      pageData.frontmatter.head ??= []
      pageData.frontmatter.head.push(['meta', { name: 'author', content: author || '王志杰' }])
      keywords && pageData.frontmatter.head.push(['meta', { name: 'keywords', content: keywords }])
      contributors && pageData.frontmatter.head.push(['meta', { name: 'contributors', content: contributors }])
    }
  }),
  // mermaid 配置项。详见：https://mermaid.js.org/config/setup/modules/mermaid.html
  mermaid: {},
  // optionally set additional config for plugin itself with MermaidPluginConfig
  mermaidPlugin: {
    class: 'mermaid' // set additional css classes for parent container
  }
})
