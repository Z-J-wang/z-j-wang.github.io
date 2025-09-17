# 第 28 节：v-bind 合并行为



## 前言

> 本笔记主要基于官方文档《[迁移策略——v-bind 合并行为](https://v3.cn.vuejs.org/guide/migration/v-bind.html)》编写。如有理解出入，请以官方文档为主。
>
> 知识储备：
>
> 《[Vue api —— v-bind](https://cn.vuejs.org/v2/api/#v-bind) 》



## 概述

Vue 3.x 中，`v-bind=“object”` 的绑定顺序会影响渲染结果。



## Vue 2.x 的 v-bind 合并行为

在 Vue 2.x，如果一个元素同时定义了 `v-bind="object"` 和一个相同的单独的 property （属性），那么这个单独的 property 总是会覆盖 `object` 中的绑定。

如下：

```html
<template>
  <div id="red" v-bind="{ id: 'blue' }"></div>
</template>
```

渲染的结果：

```html
<div id="red"></div>
```

可见，单独的 property 优先级高于`v-bind="object"` 里的 property 。

> 注意：
>
> “单独的 property 优先级高于`v-bind="object"` 里的 property” 只适用于 ``v-bind="object"`` 。下面写法就不适用了：
>
> ```html
> <template>
>   <div id="red" v-bind:id="'blue'"></div>
> </template>
> ```
>
> 最终的渲染结果：
>
> ```html
> <div id="blue"></div>
> ```
>



## Vue 3.x 的 v-bind 合并行为

在 Vue 3.x，如果一个元素同时定义了 `v-bind="object"` 和一个相同的单独的 property，那么声明绑定的顺序决定了它们如何合并，不再是“单独的 property 优先级高于`v-bind="object"` 里的 property”。如下：

```html
<template>
  <div id="red" v-bind="{ id: 'blue' }"></div>
  <div v-bind="{ id: 'blue' }" id="red"></div>
</template>
```

渲染的结果：

```html
<div id="blue"></div>
<div id="red"></div>
```



