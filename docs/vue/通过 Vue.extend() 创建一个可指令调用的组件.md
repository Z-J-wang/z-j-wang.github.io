# 通过 Vue.extend() 创建一个可指令调用的组件

## 实现思路

+ 组件的实现
+ 组件的挂载位置
+ 组件的注册
+ 组件的调用

## 背景

使用过 element-ui 的朋友，应该都用过 **MessageBox 弹框** 组件。**MessageBox 弹框** 只需要一条JS代码就可以调用使用，非常方便。那这是怎么实现的呢？我们也来搞一个这样的组件。



## 分析

**MessageBox 弹框** 有这么几个特点：

+ 指令调用（JS代码调用）
+ 组件渲染的位置在始终为body的子集
+ 组件关闭后，会从HTML中移除
+ 确认、取消 事件返回`Promise`



### 使用常规的子组件形式实现

看到上面几个特性，我们很容易就可以想到借助 vuex 就可以实现了。

首先，将 MessageBox 弹窗组件挂载到最顶层的 App.vue，然后通过 vuex 的 state 属性控制显示。

```html
<div id="app">
  <Message-box v-if="$store.state.visible"></Message-box>
</div>
```

然后在任意地方修改 `state.visible` 的值，就可以控制 MessageBox 弹窗组件的显示了。

```js
this.$store.commit('MessageBoxVisible', true)
```

因为是用 v-if 控制显示隐藏的， 所以为 `false` 时HTML会被移除。至于返回 `promise`，只需要 mutations 函数返回就行了。

### vuex的弊端

尽管如此，但是使用 vuex 实现  MessageBox 弹窗存在以下弊端：

+ 使用不便，需提前在 App.vue 中添加组件，再通过vuex控制显示与隐藏以及显示的内容；
+ 必须配合 vuex，如果项目中不需要 vuex 时，就需要为了 **MessageBox 弹框** 组件特意引入 vuex，通用性不强；



那有什么更好的方法呢？

当然有，那就是通过 ` Vue.extend` 来实现。这也是市面上常用的方法。



## 什么是 Vue.extend ？

首先，认识认识 `Vue.extend`。

先上官方文档：

> ### [Vue.extend( options )](https://cn.vuejs.org/v2/api/#Vue-extend)
>
> - **参数**：
>
>   - `{Object} options`
>
> - **用法**：
>
>   使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
>
>   `data` 选项是特例，需要注意 - 在 `Vue.extend()` 中它必须是函数
>
>   ```html
>   <div id="mount-point"></div>
>   ```
>
>   ```js
>   // 创建构造器
>   var Profile = Vue.extend({
>     template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
>     data: function () {
>       return {
>         firstName: 'Walter',
>         lastName: 'White',
>         alias: 'Heisenberg'
>       }
>     }
>   })
>   // 创建 Profile 实例，并挂载到一个元素上。
>   new Profile().$mount('#mount-point')
>   ```
>
>   结果如下：
>
>   ```html
>   <p>Walter White aka Heisenberg</p>
>   ```
>
> - **参考**：[组件](https://cn.vuejs.org/v2/guide/components.html)
>
>  
>
> 摘抄自——《[Vue Api](https://cn.vuejs.org/v2/api/)》



### 文档解析

上面文档关于 `Vue.extend` 作用说明总共三句话，最重要的是第一句。

第一句：**使用基础 Vue 构造器，创建一个“子类”。**

这句话有两个关键词：“Vue 构造器”、“子类”。

先说构造器。构造器也就是是构造函数，vue 的常见构造器是什么？是 `new Vue()` 中的 `Vue 构造器`，借助它我们创建了 Vue 的根实例。我们对于 Vue 的所有操作都是在 `new Vue()`创建的实例中进行的。

结合"使用基础 Vue 构造器。创建一个‘子类’ 。"这句话，可以推断出`Vue.extend()`创建了一个 vue 实例构造器，该构造器是`Vue 构造器`的子类。因为该构造器是`Vue 构造器`的子类，其构造出来的实例固然继承了 `Vue` 的特性但又独立于`new Vue()`根实例的（两种构造器创建的实例必然死独立的）。它的用法应该和`new Vue()`根实例一模一样。这一点我们可以从文档中的例子看出来。

> `new Vue()`用法举例：
>
> ```html
> <div id="app">
>   {{ message }}
> </div>
> ```
>
> ```js
> var app = new Vue({
>   el: '#app',
>   data: {
>     message: 'Hello Vue!'
>   }
> })
> ```
>
>  
>
> 小知识：
>
>  [el](https://cn.vuejs.org/v2/api/?#el) 与`$mount`的关系：
>
> `el`用于在 `new Vue()` 创建实例时指定一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。在实例挂载之后，元素可以用 `vm.$el` 访问。
>
> 如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显式调用 `vm.$mount()` 手动开启编译。
>
> 也就是说，两者的作用是一致的。
>
> [template](https://cn.vuejs.org/v2/api/?#template) 的作用：
>
> 一个字符串模板作为 Vue 实例的标识使用。模板将会**替换**挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发插槽。

综上可知，`Vue.extend`创建的构造器可以像 `new Vue()`一样任意挂载到 HTML Dom 上。从而实现组件的添加、显示与操作。如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      {{ message }}
    </div>
    <div id="mount-point"></div>
    <script>
      new Vue({
        el: '#app',
        data: {
          message: 'Hello Vue!'
        }
      });
      // 创建构造器
      var Profile = Vue.extend({
        template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
        data: function() {
          return {
            firstName: 'Walter',
            lastName: 'White',
            alias: 'Heisenberg'
          };
        }
      });
      // 创建 Profile 实例，并挂载到一个元素上。
      new Profile().$mount('#mount-point');
    </script>
  </body>
</html>

```





## Vue.extend 实现 MessageBox 弹窗

`Vue.extend` 实现 MessageBox 弹窗。简单来讲也就是` Vue.extend` 添加一个组件，只是在这个组件特别了点。

首先来看看`Vue.extend` 如何添加一个组件的。以官方文档例子为例：

```js
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
```

一共就两个步骤：

+ 创建构造器
+ 实例化构造器

### 创建 MessageBox 构造器

前面的文档说到，`Vue.extend`的参数是一个包含组件选项的对象。其实这个**包含组件选项的对象**实际上就是我们常写的 `.vue` 文件。所以，上面的构造器的创建可以改写成：

profile.vue 组件文件

```html
<template>
	<p>{{firstName}} {{lastName}} aka {{alias}}</p>
</template>
<script>
	export default {
    data(){
      return{
        firstName: 'Walter',
        lastName: 'White',
        alias: 'Heisenberg'
      }
    }
  }
</script>
```

`Vue.extend` 实现的JS文件

```js
import profileVue from "./profileVue.vue"

// 创建构造器
var Profile = Vue.extend(profileVue)
```

所以，创建 MessageBox 构造器分为两步：

+ 编写 MessageBox 组件
+ 引用编写好的 MessageBox  组件创建 `Vue.extend`构造器

这里不详情讲解 MessageBox 组件的编写了。文末会有完整的代码。

### 实例化构造器

构造器创建好后，接下来就是实例化构造器了。

根据前面的分析，我们知道 `Vue.extend` 构造器实例化和 `new Vue()`一模一样。

案例的写法如下：

```js
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
```

其实还可以这样写：

```js
new Profile({
  el:'#mount-point'
})
```

是不是很熟悉？还可以添加 data 属性，来修改组件的data属性值。

```js
new Profile({
  el:'#mount-point'，
  data:{
  	firstName:'Jay'
	}
})
```

其实，也就是`new Vue()`的用法。

知道了构造器的实例化方法，接下来就是真正 MessageBox 实例化的方法了。

#### MessageBox 构造器的实例化

 MessageBox 弹窗的实现，全都是通过对 MessageBox 构造器实例化方法的特殊改造完成的。还记得一开始我们说的 MessageBox 弹窗的几个特性吗？

+ 指令调用（JS代码调用）
+ 组件渲染的位置在始终为body的子集
+ 组件关闭后，会从HTML中移除
+ 确认、取消 事件返回`Promise`

除了第三点，其余三个特性都是在实例化这一阶段实现的。接下来，我们逐一实现这几个特性。

> 接下来的代码，我们将讲解 MessageBox 的实现。由于前文并未明说，MessageBox  的 `Vue.extennd`的构造器。所以在这里先假定其为 `MessageBox`
>
> ```js
> import Vue from 'vue';
> import messageBoxVue from './messageBox.vue';
> 
> const MessageBox = Vue.extend(messageBoxVue); 
> ```
>
> 

##### 指令调用的实现

只要我们调用了实例化代码`new MessageBox().$mount('#mount-point')`，MessageBox 弹窗组件就添加到页面上了。所以，我们不能在页面初始化时就执行这个代码。需要将实例化代码包裹在函数中，通过函数的调用来实现**指令调用**。

```js
const messageBox = () => {
  new MessageBox().$mount('#mount-point')
};
```

##### 组件渲染的位置在始终为body的子集

接下来，我们需要把 MessageBox 添加到 body 标签里面。那是不是直接这样子写呢？

```js
const messageBox = () => {
  new MessageBox().$mount('body')
};
```

如果你这样子写，运行后你就是发现 body 标签里面就只剩下 MessageBox 了。还记得`template` 的作用吗？**替换挂载的元素、，挂载元素的内容都将被忽略**。

所以我们要稍微改造一下：

```js
const messageBox = () => {
  // 挂载但是并未插入dom。注意，$mount()不能省略，如果省略了就无法通过 $el 获取 MessageBox  组件的DOM了
  const instance = new MessageBox().$mount();	
  document.body.appendChild(instance.$el); // 将dom插入body
};
```

##### 确认、取消 事件返回`Promise`

其实返回 Promise 对象并不难。我们本来就是调用函数来通知程序执行实例化的。让这个函数返回 Promise 即可：

```js
const messageBox = () => {
  return new Promise((resolve, reject) => {
    try{
      // 挂载但是并未插入dom。注意，$mount()不能省略，如果省略了就无法通过$el获取 profile 组件的DOM了
      const instance = new MessageBox().$mount();	
  	  document.body.appendChild(instance.$el); // 将dom插入body
       resolve();
    }catch(error){
		 reject(error);
    }
  })
};
```

但是，这并不能满足 MessageBox 弹窗组件的需求。MessageBox 弹窗组件需要用户点击“确定”按钮 `Promise`返回 `resolve`，点击“取消”返回 `reject`。所以还需进一步改造。

我们需要给 MessageBox 组件添加一个回调函数，但用户点击"确定"按钮时点击事件执行回调函数，返回一个`true`；点击“取消”时执行回调函数返回一个`false`：

```js
const messageBox = () => {
  const callback = ret => {
    if (ret === true) {
      resolve();
    } else if (ret === false) {
      reject();
    }
  };
  
  return new Promise((resolve, reject) => {
    // 挂载但是并未插入dom。注意，$mount()不能省略，如果省略了就无法通过$el获取 profile 组件的DOM了
    const instance = new MessageBox({
      data:{
        callback: callback	// 借助 data 向组件传递一个回调函数
      }
    }).$mount();	
  	document.body.appendChild(instance.$el); // 将dom插入body
  })
};
```

##### 组件关闭后，会从HTML中移除

这一点的实现其实是在组件内部实现的。当 MessageBox 弹窗组件隐藏后，我们需要将 MessageBox 弹窗组件移除掉。这里的移除要从两个方面移除：

+ DOM 的移除
+ vue 组件的卸载

可以添加这样的方法实现：

```js
export default {
  methods: {
    // 组件移除事件
    remove() {
      setTimeout(() => {
        this.$destroy(this);
        this.$el.remove(); // 等过渡效果结束后，再移除组件 DOM
      }, 500);
    }
  }
};

```



## 结语

`Vue.extend` 实现 MessageBox 弹窗组件的方法基本就是这么多了。简单来说，就是借助`Vue.extend` 一般性使用。只要熟悉了 `Vue.extend` 的用法，你就可以自己创建 MessageBox 弹窗这一类可以通过指令调用的组件（JS代码调用）了。虽然**指令调用的组件**看上去非常不错，但是也不要滥用。它一般适用于全局性的一次性组件。

关于 MessageBox 弹窗组件具体实现方法，请跳转：
