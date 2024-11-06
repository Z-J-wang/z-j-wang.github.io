

## css.requireModuleExtension

+ Type: `boolean`
+ Default: `true`



#### 用途

用于设定，是否只有 `*.module.[ext]` 结尾的文件才会被视作**CSS Modules 模块**。

默认情况下，只有文件名中含有`.modules`的CSS相关文件还能使用**CSS Modules**。



> 这里需要注意一点：
>
> 如果我们进行了关于`css.loaderOptions.css`的配置。一定要在配置文件中显性的指出`css.requireModuleExtension`的值。也就是说，我们一定要配置`css.requireModuleExtension`。



#### 用法

```json
module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist' // 输出文件目录

  // css相关配置
  css: {
    extract: false, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: true, // 开启 CSS source maps?
    
    // 因为配置了loaderOptions.css, 尽管requireModuleExtension的值为默认值，我们也需要指出
    requireModuleExtension: true,
    loaderOptions: {
      css: {
        // 注意：以下配置在 Vue CLI v4 与 v3 之间存在差异。
        // Vue CLI v3 用户可参考 css-loader v1 文档
        // https://github.com/webpack-contrib/css-loader/tree/v1.0.1
        modules: {
          localIdentName: '[local]_[hash:base64:8]'
        }
      }
    }
  }
}
```





**附：**

如果你不了解**CSS Modules**，请查看本人关于**CSS Modules**拙作：[浅谈CSS Modules以及CSS Modules在Vue.js上的使用](https://blog.csdn.net/weixin_44869002/article/details/105806021)



## css.loaderOptions

+ Type: `Object`
+ Default: `{}`



#### 用途

用于向 CSS 相关的 loader 传递选项（设置）。

> 相关的loader有：
>
> - css-loader
> - postcss-loader
> - sass-loader
> - less-loader
> - stylus-loader



当然，我们也可以通过`chainWebpack`手动去设置loader。当时，`css.loaderOptions`是官方推荐的方法。官方文档说明如下：

> 这样做比使用 `chainWebpack` 手动指定 loader 更推荐，因为这些选项需要应用在使用了相应 loader 的多个地方。



#### 用法

```json
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      // 这里的选项会传递给 css-loader
	  css: {
        // 配置 CSS Modules 的class命名规则
        modules: {
          localIdentName: '[local]_[hash:base64:8]'
        }
      },
      // 这里的选项会传递给 postcss-loader
      postcss: {
      },
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v7 中，这个选项名是 "data"
        prependData: `@import "~@/variables.sass"`
      },
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `data` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        prependData: `@import "~@/variables.scss";`
      },
      // 给 less-loader 传递 Less.js 相关选项
      less:{
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: '#fff'
        }
      }
    }
  }
}
```

#### 文章跳转
+ 上一篇：[Vue CLI4.0 webpack配置属性——css.extract](https://blog.csdn.net/weixin_44869002/article/details/105831757)
+ 下一篇：[Vue CLI4.0 webpack配置属性——devServer](https://blog.csdn.net/weixin_44869002/article/details/105864712)


