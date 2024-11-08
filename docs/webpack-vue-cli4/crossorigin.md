## crossorigin

+ Type: `string`
+ Default: `undefined`



#### 用途

官方文档：

> 设置生成的 HTML 中 `<script>` 和 `<link rel="stylesheet">` 标签的 `crossorigin` 属性。
>
> 需要注意的是该选项仅影响由 `html-webpack-plugin` 在构建时注入的标签 - 直接写在模版 (`public/index.html`) 中的标签不受影响。

这里需要注意两点：

1. `crossorigin` 针对 `<script>` 和 `<link rel="stylesheet">`标签

2. 生效的页面一定是由`html-webpack-plugin`自动生成的HTML文件

   

#### 用法

```json
module.exports = {
  crossorigin: 'use-credentials'
}
```



#### 扩展

`crossorigin`涉及的是跨域同源问题的安全证书验证。

在HTML5中，一些 HTML 元素提供了对 [CORS](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS) 的支持。这些元素包括：

+ `<audio>`
+ `<img>`
+ `<link>`
+ `<script>`
+ `<video>`

等

`crossorigin`接收的属性有：

| 属性值            | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| `anonymous`       | 对此元素的 CORS 请求将不设置凭据标志。即，不进行安全验证。   |
| `use-credentials` | 对此元素的CORS请求将设置凭证标志；这意味着请求将提供凭据进行验证 |
| `""`              | 设置一个空的值，如 `crossorigin` 或 `crossorigin=""`，和设置 `anonymous` 的效果一样。 |



提示：

关于`crossorigin`的使用比较少。一般不用去设置。



参考文档：

[MDN: CORS settings attributes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_settings_attributes)



更多关于`crossorigin`,推荐阅读：

[HTML5 \<script\> 标签里的 crossorigin 属性到底有什么用？](https://www.chrisyue.com/what-the-hell-is-crossorigin-attribute-in-html-script-tag.html)

#### 文章跳转
+ 上一篇：[Vue CLI4.0 webpack配置属性——lintOnSave、configureWebpack、chainWebpack、parallel](https://blog.csdn.net/weixin_44869002/article/details/105831476)

+ 下一篇：[Vue CLI4.0 webpack配置属性——css.requireModuleExtension、css.loaderOptions](https://blog.csdn.net/weixin_44869002/article/details/105831661)

