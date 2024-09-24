---
author: 王志杰
date: 2024-09-24
keywords: CSS Modules, 样式全局化, 模块化, Vue CLI, Vue, Webpack, vite
description: CSS Modules 是一种构建步骤中的进程，通过构建工具（如 Webpack）将 CSS 的 class 名称作用域化，实现样式的模块化，解决样式全局化导致的样式覆盖问题。它默认将 CSS 样式限定在本地作用域，避免不同组件间样式冲突。CSS Modules 需要配置在 Vue 项目中，通过修改 webpack.config.js 或 vue.config.js 文件启用。在 Vue 组件中，通过 <style module> 标签使用 CSS Modules，并可以通过 $style 对象在模板中绑定局部样式。此外，CSS Modules 还支持 :local() 和 :global() 伪类来分别设置局部和全局作用域，以及使用 composes 语法来组合不同选择器的样式。开发者还可以通过配置文件自定义 CSS 类名的重命名规则，以提高样式的可维护性和复用性。
---

# 浅谈 CSS Modules 以及 CSS Modules 在 Vue 上的使用

## 什么是 CSS Modules?

官方文档：

> 所有的 class 的名称和动画的名称默认属于本地作用域的 CSS 文件。
>
> 所以 CSS Modules 不是一个官方的规范，也不是浏览器的一种机制，它是一种构建步骤中的一个进程。（构建通常需要 webpack 或者 browserify 的帮助）。通过构建工具的帮助，可以将 class 的名字或者选择器的名字作用域化。（类似命名空间化）。

看了官方文档的介绍是不是很懵？

其实，上面的那两段话提取出来有两个意思：

- 其一，第一段讲的是 CSS Modules 的作用。CSS Modules 将 CSS 的 class 和动画名称做了限定，让全局生效的 CSS 样式默认只在本地（当前）作用域生效。

- 其二，第二段则是解释了 CSS Modules 并不是新增的官方规范或者浏览器新增机制，它只是一个解决某一类问题的解决方案，需要借助构建工具（如：**Webpack**）去实现。

## 为什么会有 CSS Modules?

每一项新技术的出现都是为了解决某一个或者某一类问题。所以，CSS Modules 的出现一定是因为现有原生的 CSS 规范已经满足不了当前的开发需求。

那是什么问题促使 CSS Modules 的诞生呢？

### 1. 样式全局化

导致 CSS Modules 诞生的原因之一是 CSS 生效机制——**样式全局化**。稍微回顾之前的开发我们就会发现，**CSS 的作用域都是全局的（即，整个网页）**。

可能有人觉得：“**这不是很合理嘛！我写给这个页面的 CSS 在这个页面生效不很正常嘛！它又不会跑到其他页面生效，为什么会说全局化呢？**”。

确实，相对于非框架（框架：Vue、Angular、react 等）搭建页面来说，表面上看并没有全局化。但需要注意的是，现在的前端开发基本上都是基于**Vue**、**Angular**和**React**三大框架进行开发的。他们之间有一个共同的特点——采用 SPA 开发模式。就拿 **Vue** 来说，**Vue** 开发出来的网址是一个单页面系统，**它的页面跳转操作本质上是通过切换组件来完成的**。换而言之，**Vue** 操作的页面自始至终都是同一个 HTML 文件。

因此，组件内部的 CSS 最终在网页生效时都会被提升到页面全局。这样就会导致这样一个问题——如果当前页面有两个组件(A 组件和 B 组件)，它们都有同样的 class。那么最终在页面渲染时必定造成样式覆盖。

### 2. CSS 的模块化解决方案

模块化的有如下优势：

- **模块化**使得代码更加清晰、易读、易维护；
- **模块化**使得代码更加独立、可复用；
- **模块化**使得代码更加安全，避免全局污染。

在此之前，CSS 缺少成熟统一模块化解决方案。

## CSS Modules 怎么解决问题的？

其实呢！**样式全局化问题**本质就是**因为样式选择器重名而导致样式覆盖的问题**。就算没有**模块化**，我们在开发中也会经常遇到。解决方法我们也都非常清楚，无非就一下几种：

1. 给每个样式都起与众不同的名字，保证不会出现重名 class；
2. 增加 CSS 样式选择器的深度，提高样式的权重；
3. 使用`!important`提高所要生效样式的权重；
4. 给需要局部生效的样式增加一个独特的命名空间，如：`#app .color`。

上面四种方案中，方案二和方案三仅仅是强制让自己所希望的样式生效，本质上还是对样式覆盖了。而方案一和方案四是比较好的解决方法。这两个方法都是从根本上避免了样式覆盖的可能性。CSS Modules 就是采用了第一种方法。CSS Modules 在最终构建页面时会自动重命名 class，保证全部的 class 都不会重名。

例如：下面是 Vue 里一个组件，其样式使用了 CSS Modules。

```vue
<template>
  <div class="hello">
    <!-- 使用 CSS Modules 声明的样式 -->
    <h1 :class="$style.color">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

// 使用 CSS Modules
<style module>
.color {
  color: #42b983;
}
</style>
```

编译出来的结果如下图：

![img](./浅谈%20CSS%20Modules.assets/image1.png)

可以看到，class `.color`被重命名为了`.HelloWorld_color_1DT2e`。

## 如何使用 CSS Modules

关于 CSS Modules 的使用在三大框架里大同小异。下面我将讲解的在 **Vue** 里面 CSS Modules 的使用方法。

### CSS Modules 在 Vue 的使用

前面的官方文档讲过，CSS Modules 需要借助构建工具来使用。[**Vue CLI**](https://cli.vuejs.org/zh/) 的构建工具是 **Webpack**。所以，想要在项目中使用 CSS Modules 就必须先配置`webpack.config.js`。配置如下：

```js
{
  module: {
    rules: [
      // ... 其它规则省略
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              // 开启 CSS Modules
              modules: true
            }
          }
        ]
      }
    ]
  }
}
```

> _需要注意的是，在 **Vue CLI 3.0** 之前，配置文件是 `webpack.config.js`。3.0 之后就变成了`vue.config,js`。Vue 3 之后配置文件为 `vite.config.js`_。

配置完后，我们就可以在组件内使用 CSS Modules 了。使用方法如下：

```css
/* 在 <style> 上添加 module 特性 */
<style module>
.color {
  color: #42b983;
}
</style>
```

关于`module`的作用，Vue 官方文档解释如下：

> 一个 `<style module>` 标签会被编译为 CSS Modules 并且将生成的 CSS class 作为 `$style` 对象暴露给组件。

在模板中使用 CSS Modules 声明的 class:

```vue
<template>
  <div class="hello">
    <!-- 使用 CSS Modules 声明的样式 -->
    <h1 :class="$style.color">{{ msg }}</h1>
    {{ base }}
  </div>
</template>
```

上面就是 CSS Modules 的基本使用方法了。除了上面讲到了，CSS Modules 还设计一些基本语法：

### :local() 与 :global()

CSS Modules 分**局部作用域**和**全局作用域**。两者的区分是通过`:local()` 与` :global()`来设定的。因为 CSS Modules 默认的是**局部作用域**，所以，`:local()`默认省略。因此，上面例子的 CSS 部分也可以这样写：

```css
<style module>
:local(.color) {
  color: #42b983;
}
</style>
```

如果要某个样式暴露给全局则需要使用`:global（）`：

```css
<style module>
/* 使用 CSS Modules */
.color {
  color: #42b983;
}
:global(.g_color){
  color: #14d5ee;
}
</style>
```

需要注意的是，`:global()`修饰的样式是**不会被重命名的**，使用全局样式时直接赋值给 class 就行了，不需要进行类绑定。

```vue
<template>
  <div class="hello">
    <!-- 使用 CSS Modules 声明的样式 -->
    <h1 :class="$style.color">{{ msg }}</h1>
    <h2 class="g_color">使用:global 声明的样式</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style module>
/* 使用 CSS Modules */
.color {
  color: #42b983;
}
:global(.g_color) {
  color: #14d5ee;
}
</style>
```

Webpack 解析如下：

![img](./浅谈%20CSS%20Modules.assets/image2.png)

### composes：Class 的组合

在 CSS Modules 可以将两个选择器的样式组合在一起。换而言之，一个选择器可以**继承**另一个选择的样式。通过`composes`来实现。`composes`两者来源的 class:

- 组合当前样式表的 class

  ```css
  .bg_green {
    background-color: green;
  }

  .text_One {
    composes: bg_green;
    color: aqua;
  }
  ```

- 组合导入样式表的 class

  ```css
  /* ./base.css */
  .bgColor {
    background-color: rgb(236, 215, 22);
  }
  ```

  ```css
  .text_Two {
    composes: bgColor from './base.css';
    color: blue;
  }
  ```

接下来，在组件中使用`.text_One`、`.text_Two`:

```vue
<template>
  <div class="hello">
    <!-- 使用 CSS Modules 声明的样式 -->
    <h1 :class="$style.color">{{ msg }}</h1>
    <h2 class="g_color">使用:global 声明的样式</h2>
    <h3 :class="$style.text_One">composes: class 组合当前样式表的class</h3>
    <h3 :class="$style.text_Two">composes: class 组合导入样式表的class</h3>
  </div>
</template>
```

![img](./浅谈%20CSS%20Modules.assets/image3.png)

### 设置重命名规则

前面讲到，CSS Modules 会自动重命名 class。其实，我们可以对重命名设定规则的。

规则的设定通过配置文件来实现：

配置如下：

```js
{
  module: {
    rules: [
      // ... 其它规则省略
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              // 开启 CSS Modules
              modules: true,
              // 自定义生成的类名
              localIdentName: '[local]_[hash:base64:8]'
            }
          }
        ]
      }
    ]
  }
}
```

配置前的效果：

![在这里插入图片描述](./浅谈%20CSS%20Modules.assets/image4.png)

配置后的效果：

![在这里插入图片描述](./浅谈%20CSS%20Modules.assets/image5.png)

## 结语

对于样式全局化问题，除了 CSS Modules，还有其他的解决方案，如：Vue.js 的 `scoped`、CSS 预处理器(Sass/Less 等)。他们各有优点，这里不谈好坏。此外，CSS Modules 还支持变量，在这里我就不讲了，可以参考[CSS Modules 用法教程](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)。

## 参考文献

1. [CSS Modules 入门教程](http://www.mamicode.com/info-detail-2427137.html)
2. [Vue CLI CSS Modules](https://cli.vuejs.org/zh/guide/css.html#css-modules)
3. [CSS Modules 用法教程](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)
4. [CSS Modules](https://github.com/css-modules/css-modules)
