
## devServer

+ Type: `Object`



#### 作用

通过devServer，可以在NodeJs架设起临时的服务器用于项目的运行与调试。



#### 用法

```json
module.exports = {
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    inline: true,
    host: '0.0.0.0', // 允许外部ip访问
    port: 8024, // 端口
    https: false, // 启用https
  }
}
```



#### 扩展

devServer存在许多属性，通过来自 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 的这些属性，能够用多种方式改变devServer行为。

下面将介绍一些常用的属性:

##### `devServer.inline`

+ Type: `boolean | string`
+ Default: `true`
+ 作用：用于设置代码保存时是否自动刷新页面。
+ 用法：

```json
module.exports = {
  devServer: {
    inline: true
  }
}
```

##### `devServer.hot`

+ Type: `boolean | string`
+ Default: `true`
+ 作用：用于设置代码保存时是否进行热更新（局部刷新，不刷新整个页面）。
+ 用法：

```json
module.exports = {
  devServer: {
    hot: true
  }
}
```
##### `devServer.open`

+ Type: `boolean | string`
+ Default: `false`
+ 作用：用于设置 server 启动后是否自动打开浏览器。
+ 用法：

```json
module.exports = {
  devServer: {
    open: true
  }
}
```

##### `devServer.openPage`

+ Type: `string`

+ 作用: 指定deserver 编译完成后自动打开的页面

+ 用法：

  ```json
  module.exports = {
    devServer: {
      open: true,
      openPage: '/different/page'
    }
  };
  ```

  注意：需要配合 `open`来使用。如果Vue router 为 `hash` mode。应在url前面补上`/#`。如：`openPage: '/#/about'`



##### `devServer.https`

+ Type: `boolean | object`

+ Default: `false`

+ 作用：用于设置是否启用https

+ 用法：

  ```json
  module.exports = {
    devServer: {
      https: true
    }
  }
  ```

  

##### `devServer.port`

+ Type: `number`

+ 作用: 指定要监听请求的端口号

+ 用法：

  ```json
  module.exports = {
    devServer: {
      port: 8080
    }
  }
  ```

  

##### `devServer.host`

+ Type: `string`
+ Default: `localhost`
+ 作用：用于指定devDerve使用的host。如果你希望服务器外部可以访问，设定如下：

```json
module.exports = {
  devServer: {
    host: '0.0.0.0'
  }
};
```



##### `devServer.compress`

+ Type: `boolean`

+ 作用：对devServer 所有服务启用 [gzip 压缩](https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/)。

+ 用法: 

  ```json
  module.exports = {
    devServer: {
      compress: true
    }
  };
  ```

  注： [gzip 压缩](https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/) 用于减少服务器向前端传输的数据量，提高浏览的速度。



##### `devServer.headers`

+ Type: `object`

+ 作用: 在所有响应中添加首部内容

+ 用法：

  ```json
  module.exports = {
    devServer: {
      headers: {
        'X-Custom-Foo': 'bar'
      }
    }
  };
  ```

  

##### `devServer.overlay`

+ Type: `boolean` `object: { boolean errors, boolean warnings }`

+ 作用：当出现编译器错误或警告时，在浏览器中显示**全屏覆盖层**。默认禁用。

+ 用法：

  + 其一：显示编译器错误

    ```json
    module.exports = {
      devServer: {
        overlay: true
      }
    };
    ```

  + 其二：示警告和错误

    ```json
    module.exports = {
      devServer: {
        overlay: {
          warnings: true,
          errors: true
        }
      }
    };
    ```

    

##### `devServer.proxy` 

+ Type: `object` `[object, function]`

+ 作用: 设置API访问代理。如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。

+ 用法

  ```json
  module.exports = {
    proxy: {
          '/api': {
          target: 'http://127.0.0.10:3000'
       }
    }
  };
  ```

  注意：在Vue CLI 4.0 使用devServer.proxy 一定要设置 target。


#### 文章跳转
+ 上一篇：[Vue CLI4.0 webpack配置属性——css.requireModuleExtension、css.loaderOptions](https://blog.csdn.net/weixin_44869002/article/details/105831661)
+ 下一篇：[Vue CLI4.0 webpack配置属性——devServer.proxy](https://blog.csdn.net/weixin_44869002/article/details/108814772)

  


