# require.context() ——实现 vue 模块的自动化导入

## 情景介绍

当项目逐渐庞大的时候，就有可能出现在一个文件中插入许多条导入语句。

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import loginModule from './modules/login-module'
import userCenter from './modules/user-center'
import solution from './modules/solution'
import partner from './modules/partner'
```

如上，因为项目将 vue 路由按模块拆分成四个部分，所以 vue-router 配置文件需要对它们进行导入。如果拆分的模块越多，那就需要插入更多的导入语句。这样就会造成不便。

如果能实现模块的自动化导入，就可以解决这个问题。

> 模块的自动化导入：
>
> 模块的自动化导入就是在项目运行的时候自动到指定的目录去读取加载相应的模块，而不用人为的加以干扰设定。
>
> （这里所说的模块特指通过 ES6 的 `export`、`export default`或 CommonJS 的 `exports`、`module.exports` 导出的 JS 文件）

## require.context()

自动化的难点在于如何才能让编译器去自动访问读取模块文件。刚好`require.context()`就可以实现这部分功能。

`require.context()`是`webpack`提供的一个方法，用于查找指定文件夹下的指定类型文件。

用法如下：

```js
let modules = require.context(directory, useSubdirectories, regExp)
```

其接收三个参数：

|       参数        |          描述          |  类型   |
| :---------------: | :--------------------: | :-----: |
|     directory     |   要查找的目录的路径   | string  |
| useSubdirectories |     是否查找子目录     | boolean |
|      regExp       | 要匹配文件的正则表达式 |         |

`require.context()`的返回值一个函数`webpackContext`。该函数相当于 `require` ，接收一个路径字符串参数。该路径参数只能是 `require.context` 查找到的路径；

```js
// 查找当前目录下的 modules 目录中的全部 js 文件
const webpackContext = require.context('./modules', true, /\.js/)；

// 查找到的第一个模块路径
let modulePath = webpackContext.keys()[0];

webpackContext(modulePath);	// require.context查找到的路径，加载成功
webpackContext('./test.js');	// 非 require.context 查找到的路径，加载失败
```

此外`webpackContext`还有两个静态方法 keys 和 resolve 以及一个属性 id：

| 属性/方法 | 描述                                                                                     | 类型     |
| --------- | ---------------------------------------------------------------------------------------- | -------- |
| keys      | 返回成功获取到的模块组成的数组                                                           | function |
| resolve   | 接收参数为匹配成功的模块路径，即 keys 中存储的值；其返回匹配文件相对于整个项目的相对路径 | function |
| id        | 上下文模块的模块 ID                                                                      | string   |

## 借助 require.context()实现 vue 路由子模块自动化导入

假设，子模块的路由配置文件都放在`/router/modules`下：

```
│?? ├── router                              vue-router
│?? │?? ├── modules                         vue-router 模块分离
│?? │?? └── index.js
```

在 index.js 添加如下代码：

```js
// router/index.js

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
];

// 查找 /router/modules 下的全部js文件
let webpackContext = require.context('./modules', true, /\.js/);

// 遍历查询结果，将查询到的文件加载后插入数组modules
let moudulesRoutes = webpackContext.keys().map((item => {
  // 逐一加载模块
  let route = webpackContext(item);

  return route;
}))；

// 将加载到的路由合并到 routes 中
moudulesRoutes.forEach(item => {
  routes.push(...item);
});

const router = new VueRouter({
  routes
});

export default router;
```

通过上面的代码，就可以实现路由子模块的自动化导入了。

其实上面的代码还可以优化，可以将自动化模块加载部分提取出来，以便于其他地方使用。

优化如下：

```js
// automoted-import-modules.js
/**
 * 自动化批量导入模块
 *
 * 本函数需要配合 webpage 函数 require.context 来使用。
 * @param {Function} context require.context()返回的结果；
 * @returns {Array} 查找到的模块加载后,存入一个数组抛出
 */
function automatedImport(context) {
  return context.keys().map((item) => {
    var value = context(item)

    return value.default || value
  })
}

export default automatedImport
```

> 这里需要注意一点，require.context() 不能放在函数中，放在函数中 webpak 将无法解析。

然后，如下调用：

```js
// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import automatedImport from '@/util/automoted-import-modules'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

// 自动加载项目里全部模块的路由文件
const moudulesRoutes = automatedImport(require.context('./modules', true, /\.js/))

// 将加载到的路由合并到 routes 中
moudulesRoutes.forEach((item) => {
  routes.push(...item)
})

const router = new VueRouter({
  routes
})

export default router
```

## 结语

以上就是 vue 模块自动化导入的实现方法了。其实，该方法不仅仅局限于 Vue，因为 `require.context`是`webpack`提供的方法，所以凡是基于`webpack`的项目都可以这样实现模块化自动导入。

## 参考文章

- [webpack 中 require.context 的作用](https://zhuanlan.zhihu.com/p/59564277)

- [vue 自动化导入文件](https://blog.csdn.net/weixin_40509884/article/details/104927771)
- [webpack——require.context](https://webpack.js.org/guides/dependency-management/#requirecontext)
