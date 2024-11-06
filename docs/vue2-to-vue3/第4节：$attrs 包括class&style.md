# 第四节：`$attrs`包括`class`&`style`

## 前言

> 本笔记主要基于官方文档《[迁移策略——`$attrs`包括`class`&`style`](https://v3.cn.vuejs.org/guide/migration/attrs-includes-class-style.html)》汇总而来。如有理解出入，请以官方文档为主。



## 概述

Vue 3.x 中， `$attrs`将包含传递给组件的所有属性，包括`class`和`style`



## Vue 2.x 的`$attrs`

在 Vue 2.x 中，关于父组件使用子组件有这样一个原则：

> 默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings) 将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。
>
> ——《[Vue Api :inheritAttrs](https://cn.vuejs.org/v2/api/#inheritAttrs)》

这句话的意思是，父组件调用子组件时，给子组件锚点标签添加的属性中，除了在子组件的`props`中声明的属性，其他属性会自动添加到子组件根元素上。

如下：

子组件

```html
<template>
 <label>
    <input type="text"/>
  </label>
</template>
<script>
export default {
  name: '$attrsIncludesClass&Style',
  props:{
    attrA: String
  }
}
</script>
```

父组件

```html
<template>
  <div>
    <child attrA="inProps" attrB="outProps"></child>
  </div>
</template>
<script>
import child from "@/components/classANdStyle/child.vue";
export default {
  components:{
    child
  }
};
</script>

```

浏览器渲染的结果：

```html
<div>
  <label attrb="outProps">
    <input type="text"/>
  </label>
</div>
```

可以看到，`attrA`并没有被自动添加到子组件根元素上。



然而，有时候我们并不想要属性自动添加到子组件根元素。我们要的是属性能够添加到子组件指定的元素上。

为此，Vue 2.x 添加了`inheritAttrs`。

> 当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。通过设置 `inheritAttrs ：false`，这些默认行为将会被去掉。而通过 (同样是 2.4 新增的) 实例 property `$attrs` 可以让这些 attribute 生效，且可以通过 `v-bind` 显性的绑定到非根元素上。
>
> 注意：这个选项**不影响** `class` 和 `style` 绑定。

如下：

子组件

```html
<template>
 <label>
    <input type="text" v-bind="$attrs" />
  </label>
</template>
<script>
export default {
  name: '$attrsIncludesClass&Style',
  inheritAttrs: false,
  props:{
    attrA: String
  }
}
</script>
```

父组件

```html
<template>
  <div>
    <child id="my-id" class="my-class" attrA="inProps"></child>
  </div>
</template>
<script>
import child from "@/components/classANdStyle/child.vue";
export default {
  components:{
    child
  }
};
</script>
```

浏览器渲染结果：

```html
<div>
  <label class="my-class">
    <input type="text" id="my-id" attrb="outProps"/>
  </label>
</div>
```

可以看到，属性`id`和`attrB`添加到`input`上而不是子组件根元素。

但是呢！我们还注意到，`class`并没有一并添加到`input`中。这是因为`$attrs`并没有包含`class`和`style`。

## Vue 3.x 对  `$attrs` 的调整

好在，Vue 3.x 解决了这个问题。在 Vue 3.x 中 `$attrs`将包含传递给组件的所有属性，包括`class`和`style`。

上面例子，在 Vue 3.x 中渲染结果如下：

```html
<div>
  <label>
    <input type="text" id="my-id" class="my-class" attrb="outProps" />
  </label>
</div>
```

