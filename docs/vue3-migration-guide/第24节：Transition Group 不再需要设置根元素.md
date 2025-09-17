# 第 24 节：Transition Group 不再需要设置根元素



## 前言

> 本笔记主要基于官方文档《[迁移策略——Transition Group 根元素](https://v3.cn.vuejs.org/guide/migration/transition-group.html)》汇总而来。如有理解出入，请以官方文档为主。



## 概述

`<transition-group>` 不再默认渲染根元素，但仍可以使用 `tag` prop创建一个根元素。



## Vue 2.x 的`<transition-group>`

 Vue 2.x  `<transition-group>` 跟自定义组件一样，需要一个根元素。我们可以通过`tag` prop 来进行手动设定。如果我们不进行手动的设定，Vue 会默认添加`<span>`作为根元素。

```html
<template>
  <transition-group tag="ul">
    <li v-for="item in items" :key="item">
      {{ item }}
    </li>
  </transition-group>
</template>
<script>
export default {
  data() {
    return {
      items: [1, 2, 3],
    };
  },
};
</script>
```

> 需要注意：
>
> 根元素的添加只能通过 `tag` prop 添加。下面做法是无效的：
>
> ```html
> <transition-group>
>   <ul>
>     <li v-for="item in items" :key="item">
>       {{ item }}
>     </li>
>   </ul>
> </transition-group>
> ```
>
> 最终，Vue 还是会用一个`<span>`元素包裹`<ul>`

## Vue 3.x `<transition-group>` 不再需要根元素

到了 Vue 3.x，Vue 不再需要添加根元素。但是我们仍可以通过`tag` prop 来进行手动设定根元素。只是如果我们不主动设置，Vue 不再会自动添加`<span>`根元素了。

- 如果您已经`tag`在Vue 2代码中定义了prop，就像上面的示例一样，一切将像以前一样工作
- 如果您没有定义一个样式，而您的样式或其他行为依赖于`<span>`根元素的存在才能正常工作，则只需添加 `tag="span"` 到 `<transition-group>`：

```html
<transition-group tag="span">
  <!-- -->
</transition-group>
```