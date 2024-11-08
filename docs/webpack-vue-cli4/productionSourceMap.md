## productionSourceMap

+ Type: `boolean`
+ Default: `true`



#### 用途：

设置生产环境的 source map 开启与关闭。



#### 用法：

```json
module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: './assets',
  indexPath: 'index.html',
  filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  productionSourceMap: true, // 生产环境是否生成 sourceMap 文件
}
```



#### 扩展：

**什么是 `source map`?**

**source map** 直译过来就是**资源地图**。所以，**source map**的作用就是定位。**source map**定位的时浏览器控制台输出语句在项目文件的位置。

##### 请看例子：

在`main.js` 添加这样一条代码：`console.log('test')`

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ab9d331e690f306cb106f8d634dcca38.png)


打包：

没有开启 `productionSourceMap `运行后浏览器控制台显示效果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/91d0b422f46098b5c370df8fb014ca9e.png)


开启` productionSourceMap`运行后浏览器控制台显示效果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/4dd51285ff3cf41f47ec5d2432f97ed6.png)




可以看出，开启` productionSourceMap`后，浏览器控制台明确的告诉我们`test`这条结果的输出语句在`main.js`的20行。这就是`source map`的作用，对于开发人员差错时非常有用的。



下面时开启/关闭` productionSourceMap`打包出来的项目文件对比：



未开启：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/e158e40e4e1543716131cc7831d3aeb9.png)




开启：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/0c76b7693e9bc80697f8ed31dec384ff.png)



可以看出，开启` productionSourceMap`后，打包生成的 js 文件都有一个 .map 文件。这里要注意，只有 js 才有 .map 文件。

#### 文章跳转
+ 上一篇：[Vue CLI4.0 webpack配置属性——crossorigin](https://blog.csdn.net/weixin_44869002/article/details/105831572)

+ 下一篇：[Vue CLI4.0 webpack配置属性——css.sourceMap](https://blog.csdn.net/weixin_44869002/article/details/105831784)


