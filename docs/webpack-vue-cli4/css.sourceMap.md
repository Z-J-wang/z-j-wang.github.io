## css.sourceMap

+ Type: `boolean`
+ Default: `false`



#### 用途

设置是否开启 css 的 `sourse map`功能。css 的 `sourse map`作用类似与 js 的 `sourse map`。

注意：开启可能会影响构建性能。



#### 用法

```json
module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist' // 输出文件目录

  // css相关配置
  css: {
    extract: false, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: true // 开启 CSS source maps?
  }
}
```



#### 拓展

下面是开启和关闭 css `sourse map`后，在Chrome DevTools 的展示效果。

+ 关闭：

  下面是同时关闭` css.extract`和` css.sourceMap`的效果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/008db058176be8a8ac5c4b5266936b9d.png)




​	下面是关闭` css.sourceMap`但开启` css.extract`的效果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/1857afb49c3d7d5ebda240af4e03783c.png)

+ 开启：

  下面是关闭` css.extract`但开启` css.sourceMap`的效果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/a5954445a9e7c9b436fcee8fc7ab54f6.png)



​	下面是开启` css.extract`和` css.sourceMap`的效果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/f612753403af477958563dbc43d88975.png)




由上面我们可以得出两个结论：

+ 通过` css.sourceMap`，我们可以明确的指导css代码在项目文件中的位置。 

+ 如果开启` css.extract`，那么` css.sourceMap`效果就似乎是失效了。表面上看确实如此。但实际上` css.sourceMap`还是发挥了作用。

  **为什么这么说呢？**

  很简单，因为` css.extract`的作用是分离组件中css，然后生成独立的文件，而这个css 文件是被**压缩**过的。直接看图：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/613773e5e5150574d58aced871742522.png)


  可见，打包生成的 css 文件就只用一行代码。那么控制台显示`app.b1723ec1.css:1`也就没错了。

  继续证明：

  我对`app.b1723ec1.css` 做了如下优化：

  将`#app`移到了第十行

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/f62411afa9362377fa4d2fb45c2656ca.png)

  

  然后控制台的效果如下：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/cd43c0e0f7251af9f92303e21b2d4a31.png)


  从这就可以证明` css.sourceMap`确实是有效的。

  不过呢！虽然` css.sourceMap`是生效了。但是，当` css.extract`和` css.sourceMap`时等同没用开启 css.sourceMap。所以，在使用`css.sourceMap`时，我们最好关闭` css.extract`。

#### 文章跳转
+ 上一篇：[Vue CLI4.0 webpack配置属性——productionSourceMap](https://blog.csdn.net/weixin_44869002/article/details/105832031)

+ 下一篇：[Vue CLI4.0 webpack配置属性——css.extract](https://blog.csdn.net/weixin_44869002/article/details/105831757)


