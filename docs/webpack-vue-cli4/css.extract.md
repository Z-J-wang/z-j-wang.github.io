## css.extract

+ Type: `boolean | Object`
+ Default: 生产环境下是 `true`，开发环境下是 `false`



#### 官方文档说明

> 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
>
> 同样当构建 Web Components 组件时它总是会被禁用 (样式是 inline 的并注入到了 shadowRoot 中)。
>
> 当作为一个库构建时，你也可以将其设置为 `false` 免得用户自己导入 CSS。
>
> 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。然而，你仍然可以将这个值显性地设置为 `true` 在所有情况下都强制提取。



#### 用途

官方文档说了这么多。总之一句话，`css.extract`用于控制是否强制分离vue 组件内的css。



#### 用法

```json
module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist' // 输出文件目录

  // css相关配置
  css: {
    extract: false  // 是否使用css分离插件 ExtractTextPlugin
  }
}
```



#### 例子

以下对同一个项目开启和关闭`css.extract`的结果：

关闭：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/c71547df676a2b32030d50da78eff039.png)



开启：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/aab15af0c17525438d81550cbf144124.png)



可以看到，开启`css.extract`后，打包的结果会多出一个 css 文件夹以及css 文件。

再来看看浏览器控制台的效果：

关闭：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ba90fd5b5e3c682d48c016bf7bd3e956.png)





开启：



可以看到如果没有开启`css.extract`，组件样式以**内部样式表**的形式加载的。![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/a9704289bbe177bc582c8b4ba235b46c.png)
#### 文章跳转
+ 上一篇：[Vue CLI4.0 webpack配置属性——css.sourceMap](https://blog.csdn.net/weixin_44869002/article/details/105831784)

+ 下一篇：[Vue CLI4.0 webpack配置属性——css.requireModuleExtension、css.loaderOptions](https://blog.csdn.net/weixin_44869002/article/details/105831661)



