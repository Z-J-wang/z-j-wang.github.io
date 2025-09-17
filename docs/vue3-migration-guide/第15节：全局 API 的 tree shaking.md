# 第 15 节：全局 API 的 tree shaking



## 前言

> 本笔记主要基于官方文档《[迁移策略—— 全局 API Treeshaking](https://v3.cn.vuejs.org/guide/migration/global-api-treeshaking.html)》汇总而来。如有理解出入，请以官方文档为主。



## 概述

Vue 3.x 对 部分全局 API 实现了 [*tree shacking*](https://www.webpackjs.com/guides/tree-shaking/) 功能。



## 知识储备：什么是 *tree shaking*？

> *tree shaking* 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块系统中的[静态结构特性](http://exploringjs.com/es6/ch_modules.html#static-module-structure)，例如 [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 和 [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)。这个术语和概念实际上是兴起于 ES2015 模块打包工具 [rollup](https://github.com/rollup/rollup)。
>
> 新的 webpack 4 正式版本，扩展了这个检测能力，通过 `package.json` 的 `"sideEffects"` 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。
>
> 摘抄自——《[webpack——tree shaking](https://www.webpackjs.com/guides/tree-shaking/)》

作用：*tree shaking* 的作用是移除项目代码中上下文中的未引用代码(dead-code)，已达到实现项目打包文件的精简。

前提：*tree shaking* 基于 `ES2015`模块系统。也就是项目中对模块的应用和导出需要用到`import`、`export`。



## Vue 2.x 全局 API 的使用方法

在 Vue 2.x 中，我们使用全局 API (如：`nextTick`) 是不需要我们手动去导入的。如下：

```js
import Vue from 'vue'

Vue.nextTick(() => {
  // something DOM-related
})
```

也就是说，Vue 的全局 API 不是通过 `ES2015` 模块系统导入的。结合 *tree shaking* 的前提，就可以知道在 Vue 2.x 中，就算我们的代码没有使用到全局 API。在项目打包的时候，这些全局 API 相关的`dead-code`依旧会被一同打包进来。这样就造成项目打包的代码存在多余代码。为此，Vue 3.x 对部分全局 API 的引用做出了改变。



## Vue 3.x 部分全局 API 的使用方法

为了在 Vue 3.x 项目中能够使用*tree shaking*，Vue 3.x 明确规定了部分 API 需要手动使用 `ES2015` 模块系统的方法（即，·import·）去导入。如下：

```js
import { nextTick } from 'vue'

nextTick(() => {
  // something DOM-related
})
```



### Vue 2.x 中被涉及的 API 有：

- `Vue.nextTick`
- `Vue.observable` (replaced by `Vue.reactive`)
- `Vue.version`
- `Vue.compile` (only in full builds)
- `Vue.set` (only in compat builds)
- `Vue.delete` (only in compat builds)



### 组件内部的 helpers（帮助器）

除了部分全局 API，许多内部组件或 helpers（帮助器）也是使用的 *tree shaking*，从而实现编译器只打包被使用的 `features` 功能。如下：

```html
<transition>
  <div v-show="ok">hello</div>
</transition>
```

上面代码会被编译器转化为：

```js
import { h, Transition, withDirectives, vShow } from 'vue'

export function render() {
  return h(Transition, [withDirectives(h('div', 'hello'), [[vShow, this.ok]])])
}
```



### 插件中使用全局 API 用法

Vue 3.x 在插件中使用全局 API 同样需要显示的导入：

```js
import { nextTick } from 'vue'

const plugin = {
  install: app => {
    nextTick(() => {
      // ...
    })
  }
}
```



### 如何在 Vue 3.x 项目中启用*tree shaking*

需要注意的是，并不是在 Vue 3.x 中依照上面的模式编写代码就直接使用 *tree shacking* 功能了。Vue 中开启 *tree shaking* 需要在支持 *tree shaking* 的 `bundlers` （如：[Webpack](https://www.webpackjs.com/)、[Rollup](https://rollupjs.org/guide/en/)）上使用才有效。

#### Webpack 中的启用*tree shaking*

在 Webpack 开启 *tree shacking* 需要在配置文件中做如下配置：

```js
// webpack.config.js
module.exports = {
  /*...*/
  externals: {
    vue: 'Vue'
  }
}
```

#### Rollup 中的启用*tree shaking*

在 Rollup 中默认启用 *tree shacking*，但是会发出警告：`'vue'`[“Treating vue as external dependency”](https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency)。可以通过以下配置关闭这个警告。

```js
// rollup.config.js
export default {
  /*...*/
  external: ['vue']
}
```

> 关于 Webpack 和 Rollup 使用 *tree shaking* 更详细得说明，请看 Vue 官方文档：https://v3.vuejs.org/guide/migration/global-api-treeshaking.html#usage-in-plugins