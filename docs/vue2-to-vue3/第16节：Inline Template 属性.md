# 第 16 节：Inline Template 属性



## 前言

> 本笔记主要基于官方文档《[迁移策略—— Inline Template 属性](https://v3.cn.vuejs.org/guide/migration/inline-template-attribute.html)》汇总而来。如有理解出入，请以官方文档为主。



## 概述

Vue 3.x 不在支持`inline-template`属性。



## 什么是 [Inline Template](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E5%86%85%E8%81%94%E6%A8%A1%E6%9D%BF)?

> 当 `inline-template` 这个特殊的 attribute 出现在一个子组件上时，这个组件将会使用其里面的内容作为模板，而不是将其作为被分发的内容。这使得模板的撰写工作更加灵活。
>
> 不过，`inline-template` 会让模板的作用域变得更加难以理解。所以作为最佳实践，请在组件内优先选择 `template` 选项或 `.vue` 文件里的一个 `<template>` 元素来定义模板。
>
> 摘抄自——《[Vue2.x——模板定义的替代品](https://cn.vuejs.org/v2/guide/components-edge-cases.html#模板定义的替代品)》

例如：

```html
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```

这串代码最终渲染的是，`<div>`元素及其内部的内容，而不是组件`my-component`。

`inline-template` 的出现是用来替代常规的 `template` 写法。至于其使用场景，因为没用过，所以不太清楚。但是有一点需要注意的是，在 `inline-template` 包裹的 HTML 代码的作用域还是组件的作用域。如下：

```html
<template>
  <div>
    <child str1="strig1" inline-template>
      <p>{{ str1 }} - {{ str2 }}</p>
    </child>
  </div>
</template>
```

```html
<template>
 <label>
    <input type="text" v-bind="$attrs" />
  </label>
</template>
<script>
export default {
  props:{
    str1: String
  }，
  data(){
    return{
      str2:'string2'
		}
	}
}
</script>

```

根据这个特性，可以用来对子组件进行再次排版。或者在定义子组件时不进行排版，在使用时再决定版面。

> 关于 Vue 2.x `inline-template` 更多的知识，请看《[Vue2.x——模板定义的替代品](https://cn.vuejs.org/v2/guide/components-edge-cases.html#模板定义的替代品)》



## Vue 3.x 的Inline Template 属性

在 Vue 3.x，`inline-tempalte`属性将会被移除，不在支持该用法了。

但是，有些情况下我们有想使用`inline-template` 功能。有两个替代方法：

### 使用 `<script>`方法

因为 `inline-template` 的大多数用例都假设没有构建工具设置，所有模板都直接写在 HTML 页面中。在这种情况下，最简单的解决方法是将 `<script>` 与其他类型一起使用：

定义`template`

```html
<script type="text/html" id="my-comp-template">
  <div>{{ hello }}</div>
</script>
```

在组件定义中，使用选择器绑定`template`

```js
const MyComp = {
  template: '#my-comp-template'
  // ...
}
```

### 使用默认插槽

我们还可以使用默认插槽进行重构，这使得数据范围更加明确，同时保留了内联编写子内容的便利性：

```html
<!-- Default Slot Version -->
<my-comp v-slot="{ childState }">
  {{ parentMsg }} {{ childState }}
</my-comp>
```

```html
<!--
  in child template, render default slot while passing
  in necessary private state of child.
-->
<template>
  <slot :childState="childState" />
</template>
```

