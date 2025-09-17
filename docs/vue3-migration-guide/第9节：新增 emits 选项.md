# 第 9 节：新增 `emits` 选项



## 前言

> 本笔记主要基于官方文档《[迁移策略—— emits 选项](https://v3.cn.vuejs.org/guide/migration/emits-option.html)》汇总而来。如有理解出入，请以官方文档为主。



## 概述

Vue 3.x 新增了一个`emits` 组件选项，用来定义组件可以向父组件 `emit` 的事件。其类似于 `props`。



## Vue 2.x 的 `emit`

在 Vue 2.x , 我们可以定义组件接收的`props`，但是我们不能声明组件可以`emit`哪些`event`。

```html
<template>
  <div>
    <p>{{ text }}</p>
    <button v-on:click="$emit('accepted')">OK</button>
  </div>
</template>
<script>
  export default {
    props: ['text']
  }
</script>
```



## Vue 3.x 的 `emit`

到了 Vue 3.x ，组件所有 `emit` 的事件必须要在`emits` 选项中声明。

```html
<template>
  <div>
    <p>{{ text }}</p>
    <button v-on:click="$emit('accepted')">OK</button>
  </div>
</template>
<script>
  export default {
    props: ['text'],
    emits: ['accepted']
  }
</script>
```

此外，`emits` 可以接收一个对象。每个属性的值可以为空，也可以为验证器函数。

```html
<template>
  <div>
    <p>{{ text }}</p>
    <button v-on:click="$emit('click')">click</button>
    <button v-on:click="$emit('submit')">submit</button>
  </div>
</template>
<script>
  export default {
    props: ['text'],
    emits: {
    // no validation
    click: null,

    // with validation
    submit: payload => {
      if (payload.email && payload.password) {
        return true
      } else {
        console.warn(`Invalid submit event payload!`)
        return false
      }
    }
  }
  }
</script>
```

> 强烈建议组件中使用的所有通过`emit`触发的`event`都在`emits`中声明。
>
> 因为Vue 3.x 中移除的`.native`修饰符。任何没有在`emits`中进行声明的`event`，将会自动被添加到`$attrs`。而`attrs`默认情况下是绑定到根组件的。这样
>
> 英文原文：
>
> It is highly recommended that you document all of the events emitted by each of your components using `emits`.
>
> This is especially important because of [the removal of the `.native` modifier](https://v3.vuejs.org/guide/migration/v-on-native-modifier-removed.html). Any listeners for events that aren't declared with `emits` will now be included in the component's `$attrs`, which by default will be bound to the component's root node.

就会造成，如果`emit`的是原生的事件（如，`click`）,就会存在两次触发。如：

```html
<template>
  <button v-on:click="$emit('click', $event)">OK</button>
</template>
<script>
export default {
  emits: [] // without declared event
}
</script>
```

+ 一次来自于`$emit`的触发；
+ 一次来自于根元素原生事件监听器的触发；