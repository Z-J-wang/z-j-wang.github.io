# 第 17 节：Key 属性



## 前言

> 本笔记主要基于官方文档《[迁移策略—— key attribute](https://v3.cn.vuejs.org/guide/migration/key-attribute.html)》汇总而来。如有理解出入，请以官方文档为主。



## 概述

+ Vue 3.x 给 `v-if`/`v-else`/`v-else-if` 分支添加 `key` 属性不再是必须的了。因为在 Vue 3.x 中，Vue 会自动生成唯一 `key`。
+ 对 `<template v-for>` 的 `key` 应该添加到 `<template>` 标签中，而不是放在其子标签中。



## Key 属性的介绍

> `key` 属性主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
>
> 有相同父元素的子元素必须有**独特的 key**。重复的 key 会造成渲染错误。
>
> 摘抄自——《[Vue.js API——特殊 attribute：key](https://cn.vuejs.org/v2/api/#key)》
>
> 此外，还可以查看《 [Maintaining State](https://v3.vuejs.org/guide/list.html#maintaining-state) 》了解Vue 3.x 渲染机制，进一步理解`key`的作用。



## 条件分支的`key`

> 条件分支：即由 `v-if`/`v-else`/`v-else-if`  可控制的代码块

在 Vue 2.x，建议在 `v-if`/`v-else`/`v-else-if`  分支上添加 `key`。

```html
<!-- Vue 2.x -->
<div v-if="condition" key="yes">Yes</div>
<div v-else key="no">No</div>
```

到了 Vue 3.x，我们仍然可以像上面那样做。但是，这个做法不再被推荐使用了。因为Vue 3.x 会自动为条件分支生成唯一的 `key`。

```html
<!-- Vue 3.x -->
<div v-if="condition">Yes</div>
<div v-else>No</div>
```

## `<template v-for>` 的 `key`

在 Vue 2.x，`<template>` 标签不能添加`key` 属性。取而代之的是在其子元素上添加`key`。如下：

```html
<!-- Vue 2.x -->
<template v-for="item in list">
  <div :key="item.id">...</div>
  <span :key="item.id">...</span>
</template>
```

到了 Vue 3.x，`key`  则应该被设置在 `<template>` 标签上。

```html
<!-- Vue 3.x -->
<template v-for="item in list" :key="item.id">
  <div>...</div>
  <span>...</span>
</template>
```

