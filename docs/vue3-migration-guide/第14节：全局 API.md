# 第 14 节：全局 API

## 前言

> 本笔记主要基于官方文档《[迁移策略—— 全局 API](https://v3.cn.vuejs.org/guide/migration/global-api.html)》汇总而来。如有理解出入，请以官方文档为主。



## 概述

新增一个新的 API `createApp`，调用其返回一个 app 实例。`createApp`返回的实例之间相互独立。



## Vue 2.x 全局 api 的举例

Vue 2.x 拥有许多  <font color="#8076a3">全局 api</font> 和  <font color="#8076a3">全局配置</font>。在全局范围内，这些 API 和配置改变了 Vue 的行为。

例如，创建一个全局组件：

```js
Vue.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Clicked {{ count }} times.</button>'
})
```

或创建一个全局指令：

```js
Vue.directive('focus', {
  inserted: el => el.focus()
})
```

又或者全局使用一个插件：

```js
var Vue = require('vue')
var VueRouter = require('vue-router')

Vue.use(VueRouter)
```

> Vue 2.x 的全局 API:
>
> 1. [Vue.extend( options )](https://cn.vuejs.org/v2/api/#Vue-extend)
> 2. [Vue.nextTick( [callback, context] )](https://cn.vuejs.org/v2/api/#Vue-nextTick)
> 3. [Vue.set( target, propertyName/index, value )](https://cn.vuejs.org/v2/api/#Vue-set)
> 4. [Vue.delete( target, propertyName/index )](https://cn.vuejs.org/v2/api/#Vue-delete)
> 5. [Vue.directive( id, [definition] )](https://cn.vuejs.org/v2/api/#Vue-directive)
> 6. [Vue.filter( id, [definition] )](https://cn.vuejs.org/v2/api/#Vue-filter)
> 7. [Vue.component( id, [definition] )](https://cn.vuejs.org/v2/api/#Vue-component)
> 8. [Vue.use( plugin )](https://cn.vuejs.org/v2/api/#Vue-use)
> 9. [Vue.mixin( mixin )](https://cn.vuejs.org/v2/api/#Vue-mixin)
> 10. [Vue.compile( template )](https://cn.vuejs.org/v2/api/#Vue-compile)
> 11. [Vue.observable( object )](https://cn.vuejs.org/v2/api/#Vue-observable)
> 12. [Vue.version](https://cn.vuejs.org/v2/api/#Vue-version)
>
> Vue 2.x 的全局配置：
>
> 1. [silent](https://cn.vuejs.org/v2/api/#silent)
> 2. [optionMergeStrategies](https://cn.vuejs.org/v2/api/#optionMergeStrategies)
> 3. [devtools](https://cn.vuejs.org/v2/api/#devtools)
> 4. [errorHandler](https://cn.vuejs.org/v2/api/#errorHandler)
> 5. [warnHandler](https://cn.vuejs.org/v2/api/#warnHandler)
> 6. [ignoredElements](https://cn.vuejs.org/v2/api/#ignoredElements)
> 7. [keyCodes](https://cn.vuejs.org/v2/api/#keyCodes)
> 8. [performance](https://cn.vuejs.org/v2/api/#performance)
> 9. [productionTip](https://cn.vuejs.org/v2/api/#productionTip)



## Vue 2.x 全局 api 的弊端

Vue 2.x 没有 "APP"  概念（APP 一个重要的特点就是相互独立）。Vue 2.x 所谓的 app 是通过 `new Vue()` 创建的 `Vue` 根实例。这样有一个巨大的弊端：从相同的 Vue 构造函数创建的每个根实例都共享同一套全局环境。这样就导致一个问题，只要某一个根实例对 <font color="#8076a3">全局 API </font>和  <font color="#8076a3">全局配置</font>做了变动，就会影响由相同 Vue 构造函数创建的其他根实例。



## Vue 3.x 的改动

### 引入`createApp`

Vue 3.x 引入一个新的 API`createApp`，用来替代 `new Vue()` 来创建 app 实例。

```js
import { createApp } from 'vue'

const app = createApp({})
```

app 实例拥有全局 API 的一个子集。所有**会**改变了 Vue 的行为的 <font color="#8076a3">全局 API </font> 和  <font color="#8076a3">全局配置</font> 都迁移到这个子集中来。具体变动如下表格：

| 2.x Global API             | 3.x Instance API (`app`)                                     |
| -------------------------- | ------------------------------------------------------------ |
| Vue.config                 | app.config                                                   |
| Vue.config.productionTip   | *removed* ([详情请看](https://v3.vuejs.org/guide/migration/global-api.html#config-productiontip-removed)) |
| Vue.config.ignoredElements | app.config.isCustomElement ([详情请看](https://v3.vuejs.org/guide/migration/global-api.html#config-ignoredelements-is-now-config-iscustomelement)) |
| Vue.component              | app.component                                                |
| Vue.directive              | app.directive                                                |
| Vue.mixin                  | app.mixin                                                    |
| Vue.use                    | app.use ([详情请看](https://v3.vuejs.org/guide/migration/global-api.html#a-note-for-plugin-authors)) |
| Vue.prototype              | app.config.globalProperties ([详情请看](https://v3.vuejs.org/guide/migration/global-api.html#vue-prototype-replaced-by-config-globalproperties)) |

所有其他**不会**改变了 Vue 的行为的全局 API 都通过 `exports` 导出，调用时需要手动导入。例如：

```js
import { nextTick } from 'vue'

nextTick(() => {
  // something DOM-related
})
```

具体请看下一节： [Global API Treeshaking](https://v3.cn.vuejs.org/guide/migration/global-api-treeshaking.html)

### 移除 `Vue.config.productionTip`

> Vue 2.x `Vue.config.productionTip `的说明：
>
> - **类型**：`boolean`
>
> - **默认值**：`true`
>
> - **用法**：
>
>   设置为 `false` 以阻止 vue 在启动时生成生产提示。

在 Vue 3.x，只有在使用 "dev + full build"（该构建器具有运行时编译器功能和警告提示功能）时，才会显示“use production build”的提示。对于“ES modules”构建器，因为其与“bundler”一起使用，而且在大多数情况下“CLI”或其他 “boilerplate ”（又叫手脚架 ）都会正确的配置项目环境。因此，在绝大多数的情况下`productionTip`不会出现，所以可以去掉了。

### `Vue.config.ignoredElements`重命名为`app.config.isCustomElement`

> Vue 2.x `Vue.config.ignoredElements`的说明：
>
> - **类型**：`Array<string | RegExp>`
>
> - **默认值**：`[]`
>
> - **用法**：
>
>   ```
>   Vue.config.ignoredElements = [
>     'my-custom-web-component',
>     'another-web-component',
>     // 用一个 `RegExp` 忽略所有“ion-”开头的元素
>     // 仅在 2.5+ 支持
>     /^ion-/
>   ]
>   ```
>
>   须使 Vue 忽略在 Vue 之外的自定义元素 (e.g. 使用了 Web Components APIs)。否则，它会假设你忘记注册全局组件或者拼错了组件名称，从而抛出一个关于 `Unknown custom element` 的警告。

引入`ignoredElements`的目的时为了支持本地自定义元素（即，Vue 外部定制的自定义元素），因此新的命名相比旧的命名更加浅显易懂。此外，`config.isCustomElement`接收的函数比旧的`string/RegExp`模式更加的灵活：

```js
// before
Vue.config.ignoredElements = ['my-el', /^ion-/]

// after
const app = Vue.createApp({})
app.config.isCustomElement = tag => tag.startsWith('ion-')
```

> <font color="#c04851">着重提醒</font>：
>
> 在 Vue 3.x 中，对自定义元素是否是组件名的检查已经移动到模板编译阶段执行。所以，只有“**Runtime + Compiler**”构建器支持`app.config.isCustomElement`。如果，使用的是“ **Runtime-only**”构建器，则必须在构建器中配置`isCustomElement `。例如，通过在webpack的配置文件中的`vue-loader`的`compilerOptions `配置。
>
> ```js
> // in webpack config
> rules: [
>   {
>     test: /\.vue$/,
>     use: 'vue-loader',
>     options: {
>       compilerOptions: {
>         isCustomElement: tag => tag === 'plastic-button'
>       }
>     }
>   }
>   // ...
> ]
> ```
>
> 关于“**Runtime + Compiler**”与“ **Runtime-only**”的区别，具体可看：《[对Vue中 runtime-compiler 和 runtime-only 两种模式的理解](https://blog.csdn.net/qq_40938301/article/details/104357910)》

### `Vue.prototype` 替换为`app.config.globalProperties`

在 Vue 2.x 中，Vue.prototype 通常用于添加可在所有组件中访问的属性（即，全局属性）。Vue 3.x 的`app.config.globalProperties`与其完全相同。

```js
// before - Vue 2
Vue.prototype.$http = () => {}

// after - Vue 3
const app = Vue.createApp({})
app.config.globalProperties.$http = () => {}
```

### `Vue.use`改为`app.use`

两者的作用及用法完全相同。在 Vue 3.x 已经不再支持`Vue.use`，统一使用`app.use`来安装插件。



### 将根实例挂载到页面上

通过`createApp`创建好根实例后，我们还需要将根实例挂在到页面上，才能看到效果。如下：

```js
const app = createApp(MyApp)

app.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Clicked {{ count }} times.</button>'
})

app.directive('focus', {
  mounted: el => el.focus()
})

// 通过 app.mount 将 app 挂载到html文件中id为`#app`的元素上
app.mount('#app')
```

##  Provide / Inject

与 Vue 2.x 一样，Vue 3.x app 实例同样支持 `provide`和`inject`。如下：

```js
// in the entry
app.provide('guide', 'Vue 3 Guide')

// in a child component
export default {
  inject: {
    book: {
      from: 'guide'
    }
  },
  template: `<div>{{ book }}</div>`
}
```

> 关于 `provide`和`inject`更多知识：[provide / inject](https://cn.vuejs.org/v2/api/#provide-inject)

## 在多个 app 是实例间共享配置

Vue 3.x 提供了一个多个 app 共享配置的方法：设置一个创建 app 的工厂函数。如下：

```js
import { createApp } from 'vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const createMyApp = options => {
  const app = createApp(options)
  app.directive('focus' /* ... */)

  return app
}

createMyApp(Foo).mount('#foo')
createMyApp(Bar).mount('#bar')
```

很显然，这个方法的共享并不是多个实例使用同一个配置环境。而是，借助工厂函数对每一个 app 实例做相同的配置。彼此之间的配置是不通用。也就是说，在具体的一个 app 实例的子组件中对全局配置做改动，并不会影响到其他 app 实例。