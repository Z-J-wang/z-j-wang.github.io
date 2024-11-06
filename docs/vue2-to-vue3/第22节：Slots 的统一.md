# 第 22 节：Slots 的统一



## 前言

> 本笔记主要基于官方文档《[迁移策略—— Slot 统一](https://v3.cn.vuejs.org/guide/migration/slots-unification.html)》汇总而来。如有理解出入，请以官方文档为主。
>
> #### 知识储备
>
> 如果你并不属性 Vue 的渲染函数，需先了解一下知识：
>
> + 《[渲染函数 & JSX——基础](https://cn.vuejs.org/v2/guide/render-function.html#%E5%9F%BA%E7%A1%80)》
> + 《[渲染函数&JSX——`createElement` 参数](https://cn.vuejs.org/v2/guide/render-function.html#createElement-参数)》
> + 《[vm.$slots](https://cn.vuejs.org/v2/api/#vm-slots)》
> + 《[this.$scopedSlots](https://cn.vuejs.org/v2/api/#vm-scopedSlots) 》



## 概述

Vue 3.x 统一了`$slots` 和 `$scopedSlots`:

+ `this.$slots` 作为函数对位暴露
+ 移除 `this.$scopedSlots`



## Vue 2.x 的 ` $slots` 和  `$scopedSlots`

Vue 2.x，当我们用渲染函数书写组件时，就需要用到` $slots` 和  `$scopedSlots`。

> 你可以通过 [`this.$slots`](https://cn.vuejs.org/v2/api/#vm-slots) 访问静态插槽的内容，每个插槽都是一个 VNode 数组：
>
> ```js
> render: function (createElement) {
> // `<div><slot></slot></div>`
> return createElement('div', this.$slots.default)
> }
> ```
>
> 也可以通过 [`this.$scopedSlots`](https://cn.vuejs.org/v2/api/#vm-scopedSlots) 访问作用域插槽，每个作用域插槽都是一个返回若干 VNode 的函数：
>
> ```js
> props: ['message'],
> render: function (createElement) {
> 	// `<div><slot :text="message"></slot></div>`
>   return createElement('div', [
>      this.$scopedSlots.default({
>          text: this.message
>      })
>   ])
> }
> ```
> 摘抄自——《[渲染函数&JSX——插槽](https://cn.vuejs.org/v2/guide/render-function.html#%E6%8F%92%E6%A7%BD)》



## Vue 3.x 的 ` $slots` 和  `$scopedSlots`

在 Vue 3.x, slots 被定义为当前节点的子节点且作为一个对象：

```js
render: function (createElement) {
// `<div><slot name="header"></slot></div>`
return createElement('div',{}，{
	header: ()=> createElement('div')
	})
}
```

当你需要以编程方式引用作用域 slot 时，它们现在被统一到 `$slots` 选项中

```js
// 2.x Syntax
this.$scopedSlots.header

// 3.x Syntax
this.$slots.header()
```







