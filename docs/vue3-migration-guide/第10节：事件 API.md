# 第 10 节：事件 API



## 前言

> 本笔记主要基于官方文档《[迁移策略——  事件 API](https://v3.cn.vuejs.org/guide/migration/events-api.html)》汇总而来。如有理解出入，请以官方文档为主。
>
> #### 知识储备
>
> + 4个事件 API:
> + Vue 3.x 的 [`emits`Option](https://v3.cn.vuejs.org/guide/migration/emits-option.html)



## 概述

Vue 3.x 移除了`$on`、`$off`和`$once`这三个事件相关的API。在 Vue 3.x 中，不再支持事件发射器接口(the event emitter interface).



## Vue 2.x 的四个 Events API

Vue 2.x 可以通过 event emitter(事件发射器) api 强制附加事件触发处理程序。简单来说，就是可以随意注册一个事件监听事件，在任何地方都可以触发这个事件。实现这个功能的API有四个：

> + 事件注册 Api:
>
>   #### [vm.$on( event, callback )](https://cn.vuejs.org/v2/api/#vm-on)
>
>   - **参数**：
>
>     - `{string | Array<string>} event` (数组只在 2.2.0+ 中支持)
>     - `{Function} callback`
>
>   - **用法**：
>
>     监听当前实例上的自定义事件。事件可以由 `vm.$emit` 触发。回调函数会接收所有传入事件触发函数的额外参数。
>
>   #### [vm.$once( event, callback )](https://cn.vuejs.org/v2/api/#vm-once)
>
>   - **参数**：
>
>     - `{string} event`
>     - `{Function} callback`
>
>   - **用法**：
>
>     监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。
>
> + 事件触发 APi:
>
>   ### [vm.$emit( eventName, […args] )](https://cn.vuejs.org/v2/api/#vm-emit)
>
>   - **参数**：
>
>     - `{string} eventName`
>     - `[...args]`
>
>     触发当前实例上的事件。附加参数都会传给监听器回调。
>
> + 事件注销 API:
>
>   #### [vm.$off( [event, callback] )](https://cn.vuejs.org/v2/api/#vm-off)
>
>   - **参数**：
>
>     - `{string | Array<string>} event` (只在 2.2.2+ 支持数组)
>     - `{Function} [callback]`
>
>   - **用法**：
>
>     移除自定义事件监听器。



这四个 API，常用来实现[事件总线](https://blog.csdn.net/weixin_44869002/article/details/106072808)。



## Vue 3.x 移除`$on`、`$off`、`$once`

在 Vue 3.x 中，将不再支持`$on`、`$off`、`$once`这三个api。但是`$emit`并没有被移除，因为它用于触发由父组件声明式添加的事件处理函数。

> 因为`$on`、`$off`、`$once`在 Vue 3.x 中不再被支持。所以，像 Vue 2.x 那样使用事件总线是不行的。但是，我们可以使用外部库来实现事件总线。例如： [mitt ](https://github.com/developit/mitt)or [tiny-emitter](https://github.com/scottcorgan/tiny-emitter).