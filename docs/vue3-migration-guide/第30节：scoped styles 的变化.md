

## 前言

> 本笔记主要基于官方文档《[0023-scoped-styles-changes.md](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)》汇总而来。如有理解出入，请以官方文档为主。建议您以官方文档为主，本文为辅。这样您可以“以自己为主”审视的阅读，从而不被我的观点带偏。



## 一个改变： 深度选择器

在Vue3.中，Vue 2.x 的[深度选择器](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8) `>>>`、`/deep/`已经被弃用了。`::v-deep` 作为组合器的**写法**同样被弃用。

```html
<style scoped>
/* 以下三种写法被弃用 */
.a >>> .b { /* ... */ }
.a /deep/ .b { /* ... */ }
.a::v-deep .b { /* ... */ }
</style>
```



取而代之的是将`::v-deep` 作为伪元素，并接受其他选择器作为参数。

```css
<style scoped>
.a::v-deep(.b) { /* ... */ }
</style>
```

### 为什么要这样变动？

弃用`>>>`: 因为 `>>>` 在某些css预编译处理器（如：sass）是不支持的。为了统一写法，直接弃用。

弃用 `/deep`/: `/deep/`是vue2.x中`>>>`替代方案，在 css预编译处理器可以正常使用。但是，***Chrome打算弃用了`/deep/`组合器，并且在IE中会报错。***所以 Vue3.x 预见性的弃用了`/deep/`。

`::v-deep`写法的改变：因为 `::v-deep` 实际上不是组合器，Vue 认为：相比之前的写法，伪元素的写法更加贴切。

> 关于这部分更加细致说明，可查看：[Deep Selectors](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md#deep-selectors)

## 两个新增：全局样式和 slot 样式



#### 全局样式 `::v-global()` `:global()`

在 Vue 2.x scoped styles 的样式只能在局部生效。但是到了 Vue 3.x, 这样的“局面”发生了变化。Vue 3.x 增加了一个全新的伪元素`::v-global()`，借助`::v-global()`，我们可以让 scoped styles 中的样式到全局中生效。用法如下：

```css
::v-global(.foo) {}
```

> `:global()` 是`::v-global()`的简写。

在 Vue2.x 如果想要在组件中写全局样式，只能用两个`<style>`区分开全局样式和局部样式：

```css
<style>
/* 全局样式 */
</style>

<style scoped>
/* 局部样式 */
</style>
```

在 Vue 3.x 我们借助 `::v-global()`可以直接在  scoped styles 中写全局样式。所以不再需要在一个组件设置两个 `<style>`。这样整个组件文件看起也更加简洁。



####  slot 样式：`::v-slotted()`

 Vue 2.x 中，父组件通过 slot 传给子组件的内容是不受子组件局部样式的影响的。到了 Vue 3.x ，我们可以借助新伪元素`::v-slotted()`，实现子组件控制 slot 的样式。

```css
::v-slotted(.foo) {}
```

## 参考文档

[深度作用选择器]:https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8
[0023-scoped-styles-changes.md]:https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md
[/deep/深度作用选择器作用及使用]:https://blog.csdn.net/weixin_45842655/article/details/103547362?utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control&dist_request_id=1331979.14830.16186684149087841&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control

***
## 本系列目录

+ [Vue 3 迁移策略笔记—— 第1节：v-for 中的 Ref 数组](https://blog.csdn.net/weixin_44869002/article/details/113173819)

+ [Vue 3 迁移策略笔记—— 第2节：Async Components 异步组件](https://blog.csdn.net/weixin_44869002/article/details/113174206)

+ [Vue 3 迁移策略笔记—— 第3节：Attribute Coercion Behavior （属性强制行为）](https://blog.csdn.net/weixin_44869002/article/details/113174285)
+ [Vue 3 迁移策略笔记——第4节：$attrs 包括class&style](https://blog.csdn.net/weixin_44869002/article/details/113174490)
+ [Vue 3 迁移策略笔记—— 第5节：移除 $children](https://blog.csdn.net/weixin_44869002/article/details/113174530)
+ [Vue 3 迁移策略笔记—— 第6节：自定义指令](https://blog.csdn.net/weixin_44869002/article/details/113174573)
+ [Vue 3 迁移策略笔记—— 第7节：自定义元素交互](https://blog.csdn.net/weixin_44869002/article/details/113174591)
+ [Vue 3 迁移策略笔记—— 第8节：Data 选项](https://blog.csdn.net/weixin_44869002/article/details/113174676)
+ [Vue 3 迁移策略笔记—— 第9节：新增 emits 选项](https://blog.csdn.net/weixin_44869002/article/details/113174738)
+ [Vue 3 迁移策略笔记—— 第10节：事件 API](https://blog.csdn.net/weixin_44869002/article/details/113174756)
+ [Vue 3 迁移策略笔记—— 第11节：移除过滤器](https://blog.csdn.net/weixin_44869002/article/details/113174778)
+ [Vue 3 迁移策略笔记—— 第12节：片段](https://blog.csdn.net/weixin_44869002/article/details/113174804)
+ [Vue 3 迁移策略笔记—— 第13节：函数式组件](https://blog.csdn.net/weixin_44869002/article/details/113174857)
+ [Vue 3 迁移策略笔记—— 第14节：全局 API](https://blog.csdn.net/weixin_44869002/article/details/113175703)
+ [Vue 3 迁移策略笔记—— 第15节：全局 API 的 tree shaking](https://blog.csdn.net/weixin_44869002/article/details/113175726)
+ [Vue 3 迁移策略笔记—— 第16节：Inline Template 属性](https://blog.csdn.net/weixin_44869002/article/details/113176009)
+ [Vue 3 迁移策略笔记—— 第17节：Key 属性](https://blog.csdn.net/weixin_44869002/article/details/113176031)
+ [Vue 3 迁移策略笔记—— 第18节：按键修饰符](https://blog.csdn.net/weixin_44869002/article/details/113176050)
+ [Vue 3 迁移策略笔记—— 第19节：移除 $listeners](https://blog.csdn.net/weixin_44869002/article/details/113176068)
+ [Vue 3 迁移策略笔记—— 第20节：Props 的默认值函数不能访问this](https://blog.csdn.net/weixin_44869002/article/details/113176085)
+ [Vue 3 迁移策略笔记—— 第21节：渲染函数 API](https://blog.csdn.net/weixin_44869002/article/details/113176112)
+ [Vue 3 迁移策略笔记—— 第22节：Slots 的统一](https://blog.csdn.net/weixin_44869002/article/details/113176125)
+ [Vue 3 迁移策略笔记—— 第23节：Transition Class 的变化](https://blog.csdn.net/weixin_44869002/article/details/113176143)
+ [Vue 3 迁移策略笔记—— 第24节：Transition Group 不再需要设置根元素](https://blog.csdn.net/weixin_44869002/article/details/113176169)
+ [Vue 3 迁移策略笔记—— 第25节：v-on.native修饰符被移除](https://blog.csdn.net/weixin_44869002/article/details/113176244)
+ [Vue 3 迁移策略笔记—— 第26节：在组件上使用 v-model 的变化](https://blog.csdn.net/weixin_44869002/article/details/113176262)
+ [Vue 3 迁移策略笔记—— 第27节：v-if 和 v-for 的优先级](https://blog.csdn.net/weixin_44869002/article/details/113176324)
+ [Vue 3 迁移策略笔记—— 第28节：v-bind 合并行为](https://blog.csdn.net/weixin_44869002/article/details/113176344)
+ [Vue 3 迁移策略笔记—— 第29节：数组的监听](https://blog.csdn.net/weixin_44869002/article/details/113176356)
+ [Vue 3 迁移策略笔记—— 第30节：新增功能——Teleport](https://blog.csdn.net/weixin_44869002/article/details/115834756)