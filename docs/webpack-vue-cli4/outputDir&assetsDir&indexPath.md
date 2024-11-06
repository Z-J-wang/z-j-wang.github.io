


## outputDir

+ Type: `string`
+ Default: `dist`



#### 作用：

设置项目打包生成的文件的存储目录，可以是静态路径也可以是相对路径。

注意：相对路径是相对于项目文件当前的**根路径**。



#### 用法：

```json
module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
}
```

## assetsDir

+ Type: `string`
+ Default: `''`



#### 作用：

设置放置打包生成的静态资源 (js、css、img、fonts) 的目录。

注意： 该目录是相对于 `outputDir` 。



#### 用法：

```json
module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'assets'
}
```





## indexPath

+ Type: `string`
+ Default: `'index.html'`



#### 用途

用于设定打包生成的 `index.html` 文件的存储位置

注意: 

1. 该路径若是相对路径，则相对于 `outputDir`；当然，也可以是一个绝对路径；
2. 路径一定要以`文件名+后缀`结尾，最好以`index,html`结尾。



#### 用法：

```json
module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录W
  assetsDir: './assets',
  indexPath: 'index.html'
}
```

#### 文章跳转

+ 上一篇：[Vue CLI4.0 webpack配置属性——publicPath](https://blog.csdn.net/weixin_44869002/article/details/105819462)
+ 下一篇：[Vue CLI4.0 webpack配置属性——filenameHashing](https://blog.csdn.net/weixin_44869002/article/details/105820035)


