# 第 19 节：移除 `$listeners`



## 前言

> 本笔记主要基于官方文档《[迁移策略——  移除`$listeners`](https://v3.cn.vuejs.org/guide/migration/listeners-removed.html)》汇总而来。如有理解出入，请以官方文档为主。



## 概述

Vue 3.x 已经弃用`$listeners` 对象。而是将事件监听器并入`$attrs` ，作为`attrs` 的一部分。



## `$listeners` 简介

> #### [vm.$listeners](https://cn.vuejs.org/v2/api/#vm-listeners)
>
> > 2.4.0 新增
>
> - **类型**：`{ [key: string]: Function | Array<Function> }`
>
> - **只读**
>
> - **详细**：
>
>   包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件——在创建更高层次的组件时非常有用。

## Vue 2.x 向组件传递属性和监听器

在 Vue 2.x 中，我们可以通过`this.$attrs` 和 `this.$listeners` 向组件传递属性和监听器。再结合使用 `inheritAttrs: false` ，甚至可以将这些属性和监听器绑定到其他元素上而不根元素：

```html
<template>
  <label>
    <input type="text" v-bind="$attrs" v-on="$listeners" />
  </label>
</template>
<script>
  export default {
    inheritAttrs: false
  }
</script>
```

上面代码为 `input` 元素绑定父组件传递过来的属性和监听器。

## Vue 3.x 向组件传递属性和监听器

在 Vue 3.x 的虚拟 DOM 中，事件监听器只是以`on`为前缀的属性。因此，监听器被归纳为`$attrs` 的一部分，从而移除了`$listerners`。

```html
<template>
  <label>
    <input type="text" v-bind="$attrs" />
  </label>
</template>
<script>
export default {
  inheritAttrs: false
}
</script>
```

如果这个组件接收到一个 `id` 属性和一个 `v-on: close` 监听器，`$attrs `对象现在看起来如下:

```js
{
  id: 'my-input',
  onClose: () => console.log('close Event triggered')
}
```

