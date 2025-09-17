# 第 25 节： `v-on.native`修饰符被移除



## 前言

> 本笔记主要基于官方文档《[迁移策略—— 移除`v-on.native`修饰符](https://v3.cn.vuejs.org/guide/migration/v-on-native-modifier-removed.html)》汇总而来。如有理解出入，请以官方文档为主。
>
> #### 知识储备
>
> + [将原生事件绑定到组件](https://cn.vuejs.org/v2/guide/components-custom-events.html#将原生事件绑定到组件)
> + [`emits`Option](https://v3.cn.vuejs.org/guide/migration/emits-option.html)



## 概述

在 Vue 3.x `v-on` 的 `.native` 修饰符将被移除。



## Vue 2.x 的 `.native` 修饰符

在 Vue 2.x，如果想要在一个组件的根元素上直接监听一个原生事件，需要使用`v-on` 的 `.native` 修饰符。

```html
<base-input v-on:focus.native="onFocus"></base-input>
```



## Vue 3.x 取消 `.native` 修饰符

`.native` 修饰符在 Vue 3.x 已经移除掉了。取而代之的是，在新增的 `emits` 选项中定义当前组件确定触发的事件，当原生事件在`emits`中定义时，原生事件会被当做组件事件。此外，Vue 现在将所有为在组件`emits` 选项中定义的事件作为原生事件添加到子组件的根元素中（除非子组件选项中设置了 `inheritAttrs: false`）。

```html
<my-component
  v-on:close="handleComponentEvent"
  v-on:click="handleNativeClickEvent"
/>
```

`MyComponent.vue`

```html
<template>
	<div>
		<button v-on:click="$emit('click')">click</button>
		<button v-on:click="$emit('close')">close</button>
	</div>
</template>
<script>
  export default {
    emits: ['close']
  }
</script>
```

上面代码的执行结果是：`click`事件会被自动添加到`<div>`中，所以当子组件被点击时，就会触发`click`事件。

若改成这样：

```html
<template>
	<div>
		<button v-on:click="$emit('click')">click</button>
		<button v-on:click="$emit('close')">close</button>
	</div>
</template>
<script>
  export default {
    emits: ['close', 'click']
  }
</script>
```

则`click`事件不会被添加给`<div>`。

> 强烈建议组件中使用的所有通过`emit`触发的`event`都在`emits`中声明。