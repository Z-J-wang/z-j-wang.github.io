

# 前言

> 在[《Vue CLI4.0 webpack配置属性——devServer》](https://blog.csdn.net/weixin_44869002/article/details/105864712)中，我初略提及了 devServer.proxy 。但是并没有做详细的讲解。一、是因为，面对跨域问题，我常用的做法是让后端做处理；第二个原因呢？其实我并没有真正的设置成功过。所以我不敢写，怕误导大家。
>
> 关于后端如何处理跨域问题，可查看：[《koa2 + VueCLI 4.0 + axios 跨域问题》](https://blog.csdn.net/weixin_44869002/article/details/107992169)



# devServer.proxy 



## `devServer.proxy`

- Type: `object` `[object, function]`

- 作用: 设置API访问代理。如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。

- 用法

  ```json
  module.exports = {
    proxy: {
          '/api': {
          target: 'http://127.0.0.10:3000'
       }
    }
  };
  ```



## 常用 options （属性）

+ `targe`

  + Type:  `string`

  + 作用：代理的服务器，也就是api要访问的服务器。

  + 用法：

    ```json
    module.exports = {
      proxy: {
            '/api': {
            target: 'http://127.0.0.10:3000'
         }
      }
    };
    ```

+ `ws`

  + Type: `boolean`

  + 作用：是否代理`websocket`

  + 用法:

    ```json
    module.exports = {
      proxy: {
            '/api': {
            target: 'http://127.0.0.10:3000',
            ws: true
         }
      }
    };
    ```

+ `secure`

  + Type:  `boolean`

  + 作用：是否使用HTTPS协议。默认，false。

  + 用法：

    ```json
    module.exports = {
      proxy: {
            '/api': {
            target: 'http://127.0.0.10:3000',
            secure: true
         }
      }
    };
    ```

+ `changeOrigin`

  + Type: `boolean`

  + 作用: 将主机头的来源更改为目标URL，也就是是否允许跨域

  + 用法：

    ```json
    module.exports = {
      proxy: {
            '/api': {
            target: 'http://127.0.0.10:3000',
            changeOrigin: true
         }
      }
    };
    ```

+ `pathRewrite`

  + Type: `object`

  + 作用：重写 url 的 path 部分。

  + 用法：

    ```json
    module.exports = {
      proxy: {
            '/api': {
            target: 'http://127.0.0.10:3000',
            pathRewrite: {"^/api" : ""}
         }
      }
    };
    ```

    

# 扩展：devServer.proxy 的详细说明

## 一、url 中的`path` 是什么？

> 假设我们有这样一个url: https://github.com/chimurai/http-proxy-middleware#http-proxy-middleware

那`path`是上面那一部分呢？

首先，我要明确一点。这里的`path`不等于`url`，它是`url`中的一部分。这可能是很多人理解错的地方。

请看下图：

```
  foo://example.com:8042/over/there?name=ferret#nose
  \_/   \______________/\_________/ \_________/ \__/
   |           |            |            |        |
scheme     authority       path        query   fragment
```

这是[《http-proxy-middleware》](https://github.com/chimurai/http-proxy-middleware#context-matching)官方文档给出来的图。上面标示了一个`url`的结构。、

各个部分说明如下：

+ scheme: 请求协议
+ authority: 域名
+ path: api 的路径
+ query: 请求参数
+ fragment: 锚点, 次级资源定位符

> 类比快递：
>
> scheme 就是派送的快递；authority + path 则组成快递地址，authority 是个大致地址，就好比快递地址的城市，而 path 就是地址中城市后面的详细地址了；query就是快递本身；而fragment则是快递单的备注或者是快递的说明书。
>
> 当然了，上面的比喻可能不恰当啦！
>
> 关于这部分的更详细的讲解，可查看：[《URI's fragment》](https://www.jianshu.com/p/2c07fbb52b45)



## 二、devServer.proxy 的工作原理

proxy 接受一个对象，对象键值对的 key 用来匹配 api 的 url 中的 path。也就是说，当我们进行如下配置时：

```json
module.exports = {
  proxy: {
        '/api': {
        target: 'http://127.0.0.10:3000',
     }
  }
};
```

devServer 会自动对 path 为 `/api` 开头的 api 做代理转发。而 path 不是 `/api` 开头的就不会进行处理。

> 注意：
>
> 需要注意一点，devServer 默认传递过来的 api url 是不包含 scheme 和 authority 的。换而言之，devServer 会从传递过来的 api url 的第一个字符进行匹配。如果你给api url 补上了 scheme 和 authority 的（如：`http://127.0.0.10:3000/api/getData`），它是不匹配的，因为开头是`http`。
>
> 所以如果我们需要使用 devServer.proxy 。那就一定<font color="#f00">不能设置 axios 的 baseURL，或者把baseURL设为空字符串</font>



## 三、pathRewrite 属性讲解

pathRewrite 接受一个对象。

+ key: 对象键值对中的 key 是一个**正则表达式**。这里需要注意正则的写法，**必须与`^`开头**。熟悉正则表达式的朋友就会知道，这表明，传给 deveServer.proxy 的 api 的 url 必须是以正则表达式所要匹配的字符串开头。

  > 例如：
  >
  > 我们做了如下配置
  >
  > ```json
  > pathRewrite: {"^/api" : ""}
  > ```
  >
  > 现在这样两个 api:
  >
  > 1. `http://localhost:80/api/login`
  > 2. `/api/login`
  >
  > devServe.proxy 匹配哪个？
  >
  > 会匹配第二个，因为第二个以`/api`开头，而第一个以`http`开头。

+ value: 对象键的 value 是个字符串，用来替换 key 匹配的字符串。



## 四、pathRewrite 替换的结果

有了上面的知识，那我们就可以明白 pathRewrite 的工作原理以及结果是什么。

例如：

> 有这样的 api：`/getUserInfo`，其所在的服务器为`http://192.168.0.169`。那这个 api 的url 就应该是`http://192.168.0.169/getUserInfo`。
>
> 然后在 axios 配置的 route 是 `/api/getUserinfo`。
>
> 那为了能正常访问。就需要做如下配置：
>
> ```json
> module.exports = {
>   proxy: {
>         '/api': {
>         target: 'http://192.168.0.169',
>         pathRewrite: {"^/api" : ""}
>      }
>   }
> };
> ```
>
> 这样配置之后，devServer.proxy 就能把 url 改写成`http://192.168.0.169/getUserInfo` 





关于devServer.proxy 更详细的用法可查阅：[《vue-cli 3.0之跨域请求devServer代理配置》](https://blog.csdn.net/Liu_yunzhao/article/details/90520028 )

## proxy的简写
在阅读 Vue 官方文档说明时，你可能会看见这样的写法：

```js
module.exports = {
  devServer: {
    proxy: 'http://localhost:4000'
  }
}
```
上面其实是一种简写。等同于：
```js
module.exports = {
  proxy: {
        '/api': {
        target: 'http://localhost:4000'
     }
  }
};
```
这部分的解释可以再[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#http-proxy-middleware)插件的说明文档中看到。地址如下：[https://github.com/chimurai/http-proxy-middleware#shorthand](https://github.com/chimurai/http-proxy-middleware#shorthand)


# 参考文章
 [vue-cli 3.0之跨域请求devServer代理配置](https://blog.csdn.net/Liu_yunzhao/article/details/90520028)
[vue-cli 配置参考]( https://cli.vuejs.org/zh/config/)
[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#http-proxy-middleware)
[devserver-proxy](https://www.webpackjs.com/configuration/dev-server/#devserver-proxy)
[URI&#39;s fragment]( https://www.jianshu.com/p/2c07fbb52b45)


# 文章跳转
+ 上一篇：[Vue CLI4.0 webpack配置属性——devServer](https://blog.csdn.net/weixin_44869002/article/details/105864712)
