
## lintOnSave

+ Type: `boolean` | `'warning'` | `'default'` | `'error'`
+ Default: `default`



#### 用途

设置是否在开发环境下每次保存代码时都启用 `eslint`验证。

value：

1. `false`：关闭 elsint 检测
2. `true`：开启每次保存都进行检测，效果与`warning`一样
3. `'warning'`：开启每次保存都进行检测，lint 报错信息将显示到控制台命令行，编译并不会失败。
4. `'default'`：开启每次保存都进行检测，lint **报错信息**将显示到浏览器页面上，且编译失败。
5. `'error'`：开启每次保存都进行检测，lint **报错信息**以及**警告信息**将显示到浏览器页面上，且编译失败。
> 感谢网友的指正。之前误以为 `value` 为 `default` 和 `error` 一样。`error` 比 `default` 更加严格，会将**警告信息**也当做报错信息，一同输出到浏览器页面。



#### 用法

```json
module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: './assets',
  indexPath: 'index.html',
  filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
}
```


## configureWebpack

+ Type: `object | Function`



#### 官方文档说明：

>如果这个值是一个对象，则会通过 [webpack-merge](https://github.com/survivejs/webpack-merge) 合并到最终的配置中。
>
>如果这个值是一个函数，则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。



#### 用途

如官方文档所说，借助 `configureWebpack`我们可以实现随`webpack`配置的`新增`与`修改`。



#### 用法

```json
module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录

  // webpack配置
  configureWebpack: (config) => {
   // config为被解析的配置
    Object.assign(config, {
      // 开发生产共同配置，新增一些别名设置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          '@p': path.resolve(__dirname, './src/pages'),
          '@v': path.resolve(__dirname, './src/views'),
        } // 别名配置
      }
    })
  }
}
```

## chainWebpack

+ Type: `Function`



#### 用途

`Webpack `配置另一种写法—— `webpack-chain`（链式操作）。



#### 用法

```json
module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        })
  }
}
```



**提示：**

理论上来说，`Webpack`的配置信息全都写在`chainWebpack`里面。这一点可以参考[webpack-chain项目中文翻译](https://blog.csdn.net/weixin_34122604/article/details/88705450)。但是关于CSS部分的配置，官方不建议使用`chainWebpack`。官方解释如下：

> 对于 CSS 相关 loader 来说，我们推荐使用 [css.loaderOptions](https://cli.vuejs.org/zh/config/#css-loaderoptions) 而不是直接链式指定 loader。这是因为每种 CSS 文件类型都有多个规则，而 `css.loaderOptions` 可以确保你通过一个地方影响所有的规则。



**想要详细了解 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain)，可查看下列文档：**

1. [Vue CLI 链式操作 (高级)](https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7)
2. [vue-cli中webpack-chain的链式操作个人理解（解决90%的疑问）](https://blog.csdn.net/weixin_34384681/article/details/91369707)
3. [webpack-chain项目中文翻译](https://blog.csdn.net/weixin_34122604/article/details/88705450)


## parallel

+ Type: `boolean`
+ Default: `require('os').cpus().length > 1`



#### 作用

官方文档：

> 是否为 Babel 或 TypeScript 使用 `thread-loader`。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。



用于提高项目打包速度。默认，当电脑CPU内核多于一个时自动启动。



#### 用法：

```json
module.exports = {
  // 是否为 Babel 或 TypeScript 使用 thread-loader。
  // 该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1
}
```
#### 文章跳转

+ 上一篇：[Vue CLI4.0 webpack配置属性——filenameHashing](https://blog.csdn.net/weixin_44869002/article/details/105820035)

+ 下一篇：[Vue CLI4.0 webpack配置属性——crossorigin](https://blog.csdn.net/weixin_44869002/article/details/105831572)

