# koa2 实现 Http 请求代理

## 所需插件

### [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware)

http-proxy-middleware 是配置代理的中间件。基础用法如下：

```js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true }));
app.listen(3000);
```

> 注意，上面的例子是 Express 的用法。因为 http-proxy-middleware 是 Express 的中间件。如果要在 koa 中使用，需要借助 koa-connect。

### [koa2-connect](https://www.npmjs.com/package/koa2-connect)

koa-connect 的作用是让 Express 的中间件可以在 koa 中使用。 用法如下：

```js
const Koa = require('koa')
const c2k = require('koa2-connect')
 
// 创建一个 Express 中间件
function connectMiddlware (req, res, next) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('From the Connect middleware')
  next()
}
 
// 创建一个 Koa2 中间件
async function koaMiddleware(ctx, next) {
  try {
    await next();
  } catch (e) {
    // Normal error handling
  }
  // Normal control flow
}
 
const app = new Koa()
app.use(koaMiddlware) // 在 koa 中使用 koa 中间件
app.use(c2k(connectMiddlware)) // 在 koa 中使用 Express 中间件
app.use((ctx, next) => {
  console.log('It will continue on to here')
})
 
app.listen(3000)
```



## 在 koa 中使用 http-proxy-middleware

```js
// koa2 app.js
const Koa = require('koa');
const app = new Koa();
const { createProxyMiddleware } = require('http-proxy-middleware');
const koaConnect = require('koa2-connect');

app.use(
	koaConnect(
    // 代理全部以 /api 开头的 HTTP 请求
		createProxyMiddleware('/api', {
			target: 'http://www.example.org', // 目标服务器地址
			changeOrigin: true	// 允许跨域
		})
	)
);

module.exports = app;
```

通过以上配置就可以简单实现 koa HTTP 请求的代理功能了。