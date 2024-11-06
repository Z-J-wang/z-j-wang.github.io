> 更新记录：
> 【2020-6-18】增加图片压缩配置；增加 Jquery 配置：
> 
####  前言

从Vue CLI 3.0 开始，Webpack的配置文件从`webpack.config.js`变为了`vue.config.js`。此外，Vue 对配置文件的写法也进行了一些改动。因此，本文参考其他大神的对webpack的说明以及Vue CLI 4.0 关于webpack的说明文档。起草了一份Vue CLI 4.0 的基本配置，供大家参考：



```javascript
const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  productionSourceMap: true, // 生产环境是否生成 sourceMap 文件

  chainWebpack: config => {
    // 开启图片压缩
    config.module.rule('images')
    .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    .use('url-loader')
        .loader('url-loader')
        .options({
           limit: 10240    // 图片小于10k转为base64,默认4k
    	})
        .end()
    .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({ bypassOnDebug: true })
        .end()
      
     // 配置Jquery
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }]);
      
    // 开启js、css压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin')
      .use(new CompressionPlugin({
        test:/\.js$|\.html$|.\css/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false // 不删除源文件
      }))
    }
  },
    
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'

      // 将每个依赖包打包成单独的js文件
      const optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name (module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        },

        // 移除console
        minimizer: [new UglifyPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true, // console
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })]
      }
      Object.assign(config, {
        optimization
      })
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          '@p': path.resolve(__dirname, './src/pages'),
          '@v': path.resolve(__dirname, './src/views'),
        } // 别名配置
      }
    })
  },

  // css相关配置
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: true, // 开启 CSS source maps?
    requireModuleExtension: true, // 是否仅对文件名包含module的css相关文件使用 CSS Modules
    loaderOptions: {
      css: {
        modules: {
          localIdentName: '[local]_[hash:base64:8]' // 设定 CSS Modules 命名规则
        }
      }
    } // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
  },
  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    inline: true, // 开启实时刷新
    host: '0.0.0.0', // 允许外部ip访问
    port: 8024, // 端口
    https: false, // 启用https
    overlay: {
      warnings: true,
      errors: true
    }, // 错误、警告在页面弹出
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true, // 允许websockets跨域
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    } // 代理转发配置，用于调试环境
  },
  // 第三方插件配置
  pluginOptions: {}
}

```

需要注意一点，上面的配置中引用了`uglifyjs-webpack-plugin`、`image-webpack-loader`和`compression-webpack-plugin`插件。所以，使用时记得安装插件：

```powershell
npm i uglifyjs-webpack-plugin --save-dev
```

```powershell
npm i compression-webpack-plugin --save-dev
```

```powershell
npm i image-webpack-loader --save-dev
```

```powershell
npm i jquery --save-dev
```



> 注意：
>
> 使用 Jquery 使还需要再 `main.js` 引入 Jquery:
>
> ```js
> import $ from 'jquery'
> ```
> 此外，如果某个插件无法正常安装，可以尝试降低安装的版本。上面的命令默认安装最新版本。



**若想进一步了解Vue CLI 4.0 webpack的各种属性，请移步下面这篇文章查看**
[Vue CLI 4.0 webpack属性讲解以及创建vue.config.js](https://blog.csdn.net/weixin_44869002/article/details/105838825)

#### 参考文档：

- [vue-cli3搭建项目之webpack配置](https://blog.csdn.net/u014440483/article/details/87267160)
- [解决vue cli3.x打包更新版本,浏览器缓存问题](https://blog.csdn.net/qq_40544291/article/details/104475645)
- [vue-cli3 编译打包文件图片的压缩优化](https://blog.csdn.net/weixin_45416117/article/details/100927239?utm_medium=distribute.pc_relevant.none-task-blog-baidujs-2)






