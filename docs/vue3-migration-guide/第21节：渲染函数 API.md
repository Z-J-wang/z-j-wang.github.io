# 第 21 节：渲染函数 API



## 前言

> 本笔记主要基于官方文档《[迁移策略——渲染函数 API](https://v3.cn.vuejs.org/guide/migration/render-function-api.html)》编写。如有理解出入，请以官方文档为主。
>
> 知识储备：
>
> + 《[渲染函数 & JSX](https://cn.vuejs.org/v2/guide/render-function.html)》
> + 《[组合式 API](https://v3.cn.vuejs.org/guide/composition-api-introduction.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%BB%84%E5%90%88%E5%BC%8F-api)》



## 概述

渲染函数的变动不会影响到使用`<template>` 编写的组件。

本次更改概括如下：

+ `h`现在全局导入，而不是作为参数传递给渲染函数
+ 在有状态组件和功能组件之间更一致的呈现函数参数
+ vnode 现在有一个扁平的 prop 结构



## `render` 函数参数

在 Vue 2.x ,`render` 函数自动接收 `h` 函数（它是 `createElement` 的常规别名）作为参数：

```js
// Vue 2 渲染函数示例
export default {
  render(h) {
    return h('div')
  }
}
```

但是在 Vue 3.x，`h` 函数改为需要收到全局导入了：

```js
// Vue 3 渲染函数示例
import { h } from 'vue'

export default {
  render() {
    return h('div')
  }
}
```



## 渲染函数签名更改

在 Vue 2.x 中，`render` 函数自动接收诸如 `h` 之类的参数。

```js
// Vue 2 渲染函数示例
export default {
  render(h) {
    return h('div')
  }
}
```



在 Vue 3.x 中，由于 `render` 函数不再接收任何参数，它将主要用于 `setup()` 函数内部。这还有一个好处：可以访问作用域中声明的响应式状态和函数，以及传递给 `setup()` 的参数。

```js
import { h, reactive } from 'vue'

export default {
  setup(props, { slots, attrs, emit }) {
    const state = reactive({
      count: 0
    })

    function increment() {
      state.count++
    }

    // 返回render函数
    return () =>
      h(
        'div',
        {
          onClick: increment
        },
        state.count
      )
  }
}
```



> 有关 `setup()` 更多知识点，可参考《[组合式 API 指南](https://v3.cn.vuejs.org/guide/composition-api-introduction.html)》

## VNode Props 结构调整

在 Vue 2.x 中，`domProps` 包含 VNode props 中的嵌套列表：

```js
// 2.x
{
  class: ['button', 'is-outlined'],
  style: { color: '#34495E' },
  attrs: { id: 'submit' },
  domProps: { innerHTML: '' },
  on: { click: submitForm },
  key: 'submit-button'
}
```

到了 Vue 3.x，整个 VNode props 结构是趋于扁平化。上面的例子，下面是它现在的样子：

```js
// 3.x 语法
{
  class: ['button', 'is-outlined'],
  style: { color: '#34495E' },
  id: 'submit',
  innerHTML: '',
  onClick: submitForm,
  key: 'submit-button'
}
```

> 想要更加细致的了解Vue 3.x  `render` 函数，可参考《[渲染函数](https://v3.cn.vuejs.org/guide/render-function.html)》