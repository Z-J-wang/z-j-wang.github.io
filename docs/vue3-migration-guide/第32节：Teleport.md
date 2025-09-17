## Teleport

## 前言

> 本笔记主要基于官方文档《[Vue 3 教程-Teleort](https://v3.cn.vuejs.org/guide/teleport.html#%E4%B8%8E-vue-components-%E4%B8%80%E8%B5%B7%E4%BD%BF%E7%94%A8)》汇总而来。如有理解出入，请以官方文档为主。建议您以官方文档为主，本文为辅。这样您可以“以自己为主”审视的阅读，从而不被我的观点带偏。

## 什么是 Teleport ?

> Teleport 是 Vue 3.x 新增自定义元素，借助 Teleport 可以控制 Teleport 内部的内容挂载到具体的元素中。

### 场景模拟

我们先看这样的一个场景

> 在一个多层嵌套的组件中，我们构建了一个模态框。我们想要这个模态框相对于最顶层的元素显示，该怎么做呢？
>
> 常见的解决方法有：
>
> + 设置CSS属性`position:fixed;`。让模态框相对于浏览器窗口进行定位。
>
> + 设置CSS属性`position:relative;`和`position:absolute;`。让设置了`position:absolute;`的元素相对于`position:relative;`属性进行定位。但是这个方法有个缺点：**两者必须是嵌套关系，而且中间直系层级不能存在其他设置了`position:relative;`或`position:absolute;`的元素**。
>
> 换一个场景，如果模态框是相对于其具体的某个父辈元素显示呢？
>
> 这时我们就只能采用第二种方法了。而第二种方法的缺点我们刚刚也说了。

面对上面两种情景，这时我们可能就会想：“如果`position:relative;`元素和`position:absolute;`元素的相对关系不被其他设置了`position:relative;`或`position:absolute;`的元素影响就好了。”

Vue 3.x 有吗？Teleport 是不是就是用来实现了这个功能？

很遗憾！Vue 3.x 并没解决“**`position:relative;`元素和`position:absolute;`元素的相对关系被其他设置了`position:relative;`或`position:absolute;`的元素影响**”这个问题。

### Teleport 的原理

> 注意：这里并不是讲解 Teleport 的底层代码。仅仅是说明的其背后的逻辑。

首先，Teleport 并没有解决`position:relative;`与`position:absolute;`的弊端。但是Vue 3.x 换了一个思路来解决这个问题。

#### `position:relative;`与`position:absolute;`的弊端无法解决

就算Vue 再强大，它都是基于 HTML+CSS+JavaScript 三者来构建的。`position:relative;`与`position:absolute;`关系是CSS创建之时已经固定，是 Vue 世界的“世界准则”，无法改变。Vue 只是基于这些准则构建起来的一个“世界”，故无法改变。

#### 让`position:relative;`与`position:absolute;`之间的元素消失

> 既然无法改变，那我们就要寻找“准则”的漏洞。

既然中间的元素可能影响到`position:relative;`元素与`position:absolute;`元素的相对关系。那如果我们让中间元素消失是不是就可以解决这个问题呢？

没错，这就是 Teleport 的最基本的思路。Vue 3.x 是怎么做呢？

Vue 3.x 并不是删除中间的元素，而是将`position:absolute;`元素从原本的位置移动到`position:relative;`元素内部，作为`position:relative;`元素的子元素（注意区分子元素和子孙元素）。这样子，他们之间就不存在其他元素了。

> 请注意，Teleport 是移动 DOM 节点，而不是被销毁和重新创建，并且它还将保持任何组件实例的活动状态。所有有状态的 HTML 元素 (即播放的视频) 都将保持其状态。

### 小结

以上就算对 Teleport 用途的讲解。概括来讲：**借助 Teleport，我们可以控制一段 HTML 代码在 Vue Document 中的任何一个地方显示渲染**。上面的情景模拟仅仅是 Teleport 的一种用途，请不要拘泥于此。

## Teleport 的Props参数

| 属性       | 数据类型  | 必要 | 说明                                                         |
| ---------- | --------- | ---- | ------------------------------------------------------------ |
| `to`       | `string`  | 必填 | 用于指定一个目标元素将  Teleport 内容移动到其中。必须是有效的CSS选择器 |
| `disabled` | `boolean` | 可选 | 用于禁用 `<teleport>` 的功能，这意味着其插槽内容将不会移动到任何位置 |

举例：

```html
<!-- to 正确用法 -->
<teleport to="#some-id" />
<teleport to=".some-class" />
<teleport to="[data-teleport]" />
  
<!-- to 错误用法 -->
<teleport to="h1" />
<teleport to="some-string" />

<!-- disabled 用法 -->
<teleport to="#popup" :disabled="displayVideoInline">
  <video src="./my-movie.mp4">
</teleport>

```



## 在组件中使用 Teleport

前面我们说到，Teleport 可以将其内部的内容移动到目标元素内部，并充当目标元素的子元素。这个目标元素可以是当前**组件内的**也可以是**组件外部的**。

这时可能大家机会疑惑？如果移动到外部，那当前组件是否还可以操作移出去的那部分元素呢？

不用担心，我们依旧可以像往常一样操作。如下官方的例子：

```js
const app = Vue.createApp({
  template: `
    <h1>Root instance</h1>
    <parent-component />
  `
})

app.component('parent-component', {
  template: `
    <h2>This is a parent component</h2>
    <teleport to="#endofbody">
      <child-component name="John" />
    </teleport>
  `
})

app.component('child-component', {
  props: ['name'],
  template: `
    <div>Hello, {{ name }}</div>
  `
})
```

在这种情况下，即使在不同的地方渲染 `child-component`，它仍将是 `parent-component` 的子级，并将从中接收 `name` prop。

这也意味着来自父组件的注入按预期工作，并且子组件将嵌套在 Vue Devtools 中的父组件之下，而不是放在实际内容移动到的位置。



## 在同一目标上使用多个 Teleport

多个 `<teleport>` 组件可以将其内容挂载到同一个目标元素。顺序将是一个简单的追加——稍后挂载将位于目标元素中较早的挂载之后。

```html
<teleport to="#modals">
  <div>A</div>
</teleport>
<teleport to="#modals">
  <div>B</div>
</teleport>

<!-- result-->
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```



## 参考文档

+ [Vue 3 教程-Teleort]:https://v3.cn.vuejs.org/guide/teleport.html#%E4%B8%8E-vue-components-%E4%B8%80%E8%B5%B7%E4%BD%BF%E7%94%A8

+ [Vue 3 Api 说明-Teleport]:https://v3.cn.vuejs.org/api/built-in-components.html#teleport

