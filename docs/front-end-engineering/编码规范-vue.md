---
author: 王志杰
date: 2024-10-04
keywords: Vue 编码规范
description: 编写 Vue 代码时，我们需要遵循一定的规范，以保证代码的可读性、可维护性和一致性。本文将介绍一些常见的 Vue 编码规范，帮助大家编写出高质量的 Vue 代码。
---

# Vue 编码规范

编写 Vue 代码时，我们需要遵循一定的规范，以保证代码的可读性、可维护性和一致性。本文将介绍一些常见的 Vue 编码规范，帮助大家编写出高质量的 Vue 代码。

> 本规范是基于 Vue 官方文档所给出的[《风格指南》](https://v2.cn.vuejs.org/v2/style-guide/)所编写的。在其基础上做了细致的规定。

## 细则

### 1. 采用 2 空格缩进

采用 2 空格来进行代码缩进，而不是使用 tab 来进行缩进代码。除非你在编译器做了一下设定：

1.  一个 tab 等于 2 空格数；
2.  按 tab 时插入空格。

```json
// VS Code 配置如下：

// 一个 tab 等于 2 空格数
"editor.tabSize": 2

// 按 tab 时插入空格
"editor.insertSpaces": true
```

### 2. 换行

**使用 UNIX 风格的换行符 (\n)，同时在每个文件的结尾添加一个换行符。 禁止使用 Windows 风格的换行符 (\r\n) 。这是为了修复项目部署到服务器可能出现的不兼容。**

```json
// VS Code 配置如下：
"files.eol": "\n"
```

### 3. 单行代码长度

**无论 HTML 代码还是 JavaScript 代码，一行代码长度都不应该超过**80**个字符。如果超过应该手动换行。**

### 4. Vue 指令统一使用缩写

**用 `:` 表示 `v-bind:`、用 `@` 表示 `v-on:` 和用 `#` 表示 `v-slot:`**

### 5. [组件/实例的选项的顺序推荐](https://v2.cn.vuejs.org/v2/style-guide/#组件-实例的选项的顺序推荐)

**组件/实例的选项应该有统一的顺序。**

这是我们推荐的组件选项默认顺序。它们被划分为几大类，所以你也能知道从插件里添加的新 property 应该放到哪里。

1. **副作用** (触发组件外的影响)
   - `el`
2. **全局感知** (要求组件以外的知识)
   - `name`
   - `parent`
3. **组件类型** (更改组件的类型)
   - `functional`
4. **模板修改器** (改变模板的编译方式)
   - `delimiters`
   - `comments`
5. **模板依赖** (模板内使用的资源)
   - `components`
   - `directives`
   - `filters`
6. **组合** (向选项里合并 property)
   - `extends`
   - `mixins`
7. **接口** (组件的接口)
   - `inheritAttrs`
   - `model`
   - `props`/`propsData`
8. **本地状态** (本地的响应式 property)
   - `data`
   - `computed`
9. **事件** (通过响应式事件触发的回调)
   - `watch`
   - 生命周期钩子 (按照它们被调用的顺序)
     - `beforeCreate`
     - `created`
     - `beforeMount`
     - `mounted`
     - `beforeUpdate`
     - `updated`
     - `activated`
     - `deactivated`
     - `beforeDestroy`
     - `destroyed`
10. **非响应式的 property** (不依赖响应系统的实例 property)
    - `methods`
11. **渲染** (组件输出的声明式描述)
    - `template`/`render`
    - `renderError`

### 6. 多个 attribute 的元素应该分多行撰写，每个 attribute 一行

**若 HTML 元素的 `attribute` 数量大于 1，则应该将 `attribute ` 分多行撰写，每个 `attribute` 一行。**

```js
<el-button
    type="primary"
    icon="el-icon-plus"
    @click="addItemVisible = true"
>新增一笔</el-button>
```

### 7. 元素 attribute 的顺序

> 该部分的参考了《风格指南》中的 “[元素 attribute 的顺序](https://v2.cn.vuejs.org/v2/style-guide/#元素-attribute-的顺序推荐)” 。将`attribute `分为 10 个类别。

1. **定义** (提供组件的选项)
   - `is`
2. **列表渲染** (创建多个变化的相同元素)
   - `v-for`
3. **条件渲染** (元素是否渲染/显示)
   - `v-if`
   - `v-else-if`
   - `v-else`
   - `v-show`
   - `v-cloak`
4. **渲染方式** (改变元素的渲染方式)
   - `v-pre`
   - `v-once`
5. **全局感知** (需要超越组件的知识)
   - `id`
6. **唯一的 attribute** (需要唯一值的 attribute)
   - `ref`
   - `key`
7. **双向绑定** (把绑定和事件结合起来)
   - `v-model`
8. **其它 attribute** (所有普通的绑定或未绑定的 attribute)
9. **事件** (组件事件监听器)
   - `v-on`
10. **内容** (覆写元素的内容)
    - `v-html`
    - `v-text`

> #### 说明
>
> - 同类型的 attribute 由短到长排序；
> - 第八点的 attribute 非动态绑定属性全部排在动态绑定属性之前，再由短到长排序；
> - 有些第三方组件的`event`是通过`attribute`来绑定的。这类`attribute`排在第八点最后；
>

### 8. 事件

1. HTML 标签（Tag）绑定的`event`间的顺序根据`event`名的字母顺序来排列；

2. 参数：

   - 没有参数：直接使用`function`名进行绑定，不需要添加括号；这样是为了表明`function`是刻意没有参数的。

     ```html
     <input type="number" @change="handleChange" />
     ```

   - 含有参数：`function`名+括号+传参。原则上，只要`function`定义了参数，都需要传参；

     ```html
     <input type="number" @change="handleChange(id)" />
     ```



### 9. 把组件代码抽离成独立的文件或者目录

一个组件对应一个`.vue`，把组件相关代码提取成独立的文件，以便于查阅与维护。

如果`.vue`文件的代码量较大，不利于维护与查阅，则应将`<script></script>`和`<style></style>`中的代码抽离成单独的文件。

::: details 分离前
```vue
<!-- MyComponent.vue -->
<script>
export default {
   name: 'MyComponent',
}
</script>

<template>
   <div id="MyComponent"></div>
</template>

<style>
#MyComponent{
   
}
</style>
```
:::

::: details 分离后

```JavaScript
// MyComponent/script.js
export default {
   name: 'MyComponent',
}
```

```css
/* MyComponent/style.css */
#MyComponent{
   
}
```

```vue
<!-- MyComponent/index.vue -->
<script src="./script.js"></script>

<template>
   <div id="MyComponent"></div>
</template>

<style src="./style.css"></style>
```
:::

### 10. 组件命名

#### 组件名应以多个单词组成

**组件名应该始终是多个单词的，而且采用 PascalCase 命名规则。根组件 `App` 以及 `<transition>`、`<component>` 之类的 Vue 内置组件除外。**

这样做可以避免跟现有的以及未来的 HTML 元素[相冲突](https://w3c.github.io/webcomponents/spec/custom/#valid-custom-element-name)，因为所有的 HTML 元素名称都是单个单词的。

<font color="#ff0000">注意：尽量不要使用单词的缩写。</font>

```js
// bad
Vue.component('todo', {
  // ...
})
export default {
  name: 'Todo',
  // ...
}


// good
Vue.component('todo-item', {
  // ...
})

export default {
  name: 'TodoItem',
  // ...
}
```

#### 组件名中的单词顺序

组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾。

详见：[风格指南 — Vue.js (vuejs.org)](https://v2.cn.vuejs.org/v2/style-guide/#组件名中的单词顺序强烈推荐)

####  单文件组件的文件名命名统一单词大写开头 (PascalCase)

单文件组件的文件名命名统一单词大写开头，而且要与组件名一致。

```js
components/
|- MyComponent.vue
```

#### 基础组件命名

**应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以特定前缀`Base`开头。**

```js
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

详见：[风格指南 — Vue.js (vuejs.org)](https://v2.cn.vuejs.org/v2/style-guide/#基础组件名强烈推荐)

#### 单例组件命名

**只应该拥有单个活跃实例的组件应该以 `The` 前缀命名，以示其唯一性。**

> 什么是单例组件？
>
> 单例组件并不意味着只可用于一个单页面，而是*每个页面*只使用一次。这些组件永远不接受任何 prop，因为它们是为你的应用定制的，而不是它们在你的应用中的上下文。如果你发现有必要添加 prop，那就表明这实际上是一个可复用的组件，*只是目前*在每个页面里只使用一次。

```js
components/
|- TheHeading.vue
|- TheSidebar.vue
```

详见：[风格指南 — Vue.js (vuejs.org)](https://v2.cn.vuejs.org/v2/style-guide/#单例组件名强烈推荐)

#### 紧密耦合的组件命名

**和父组件紧密耦合的子组件应该以父组件名作为前缀命名。**

> 如果一个组件只在某个父组件的场景下有意义，这层关系应该体现在其名字上。因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起。

详见：[风格指南 — Vue.js (vuejs.org)](https://v2.cn.vuejs.org/v2/style-guide/#紧密耦合的组件名强烈推荐)

### 10. 组件的使用

- 接受导入组件的变量命名应该跟组件名一致

  ```js
  import MyComponent from '../components/MyComponent.vue'
  ```

- 组件挂载写法应遵循 js 对象属性规则

  ```js
  components: {
    MyComponent
  },
  ```

### 11. 组件的 `data` 必须是一个函数

当在组件中使用 `data` property 的时候 (除了 `new Vue` 外的任何地方)，它的值必须是返回一个对象的函数。

> **详解**：
>
> 当 `data` 的值是一个对象时，它会在这个组件的所有实例之间共享。想象一下，假如一个 `TodoList` 组件的数据是这样的：
>
> ```js
> data: {
>   listTitle: '',
>   todos: []
> }
> ```
>
> 我们可能希望重用这个组件，允许用户维护多个列表 (比如分为购物、心愿单、日常事务等)。这时就会产生问题。因为每个组件的实例都引用了相同的数据对象，更改其中一个列表的标题就会改变其它每一个列表的标题。增删改一个待办事项的时候也是如此。
>
> 取而代之的是，我们希望每个组件实例都管理其自己的数据。为了做到这一点，每个实例必须生成一个独立的数据对象。在 JavaScript 中，在一个函数中返回这个对象就可以了：
>
> ```js
> data: function () {
>   return {
>     listTitle: '',
>     todos: []
>   }
> }
> ```

### 12. Prop

#### 1. Prop 命名

在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 [JSX](https://v2.cn.vuejs.org/v2/guide/render-function.html#JSX) 中引用时应始终使用 kebab-case。

```Vue
props: {
  greetingText: String
}

<WelcomeMessage greeting-text="hi" />
```

#### 2. Prop 定义应该尽量详细

**prop 的定义应该尽量详细，至少需要指定其类型。**

> #### 细致的 [prop 定义](https://v2.cn.vuejs.org/v2/style-guide/components-props.html#Prop-验证)有两个好处：
>
> - 它们写明了组件的 API，所以很容易看懂组件的用法；
> - 在开发环境下，如果向一个组件提供格式不正确的 prop，Vue 将会告警，以帮助你捕获潜在的错误来源。
>
> ```js
> // 这样做只有开发原型系统时可以接受
> props: ['status']
>
> // 较好的做法
> props: {
>   status: String
> }
>
> // 更好的做法！
> props: {
>   status: {
>     type: String,
>     required: true,
>     validator: function (value) {
>       return [
>         'syncing',
>         'synced',
>         'version-conflict',
>         'error'
>       ].indexOf(value) !== -1
>     }
>   }
> }
> ```

### 13. 为 `v-for` 设置键值必要

> 使用`v-for`是，都应该为其添加`key`。

在组件上总是必须用 `key` 配合 `v-for`，以便维护内部组件及其子树的状态。甚至在元素上维护可预测的行为，比如动画中的[对象固化 (object constancy)](https://bost.ocks.org/mike/constancy/)，也是一种好的做法。

详见：[风格指南 — Vue.js (vuejs.org)](https://v2.cn.vuejs.org/v2/style-guide/#为-v-for-设置键值必要)

### 14. 避免 `v-if` 和 `v-for` 用在一起必要

> 永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上。

一般我们在两种常见的情况下会倾向于这样做：

- 为了过滤一个列表中的项目 (比如 `v-for="user in users" v-if="user.isActive"`)。在这种情形下，请将 `users` 替换为一个计算属性 (比如 `activeUsers`)，让其返回过滤后的列表。
- 为了避免渲染本应该被隐藏的列表 (比如 `v-for="user in users" v-if="shouldShowUsers"`)。这种情形下，请将 `v-if` 移动至容器元素上 (比如 `ul`、`ol`)。

详见：[风格指南 — Vue.js (vuejs.org)](https://v2.cn.vuejs.org/v2/style-guide/#避免-v-if-和-v-for-用在一起必要)

### 15. 为组件样式设置作用域

**对于应用来说，顶级 `App` 组件和布局组件中的样式可以是全局的，但是其它所有组件都应该是有作用域的。**

这条规则只和[单文件组件](https://v2.cn.vuejs.org/v2/guide/single-file-components.html)有关。你*不一定*要使用 [`scoped` attribute](https://vue-loader.vuejs.org/zh-cn/features/scoped-css.html)。设置作用域也可以通过 [CSS Modules](https://vue-loader.vuejs.org/zh-cn/features/css-modules.html)，那是一个基于 class 的类似 [BEM](http://getbem.com/) 的策略，当然你也可以使用其它的库或约定。

**不管怎样，对于组件库，我们应该更倾向于选用基于 class 的策略而不是 `scoped` attribute。**

这让覆写内部样式更容易：使用了常人可理解的 class 名称且没有太高的选择器优先级，而且不太会导致冲突。

### 16. 父子组件通讯

应该优先通过 `prop` 和 `event` 进行父子组件之间的通信，而不是 `this.$parent` 或变更 `prop`。

::: details 查看反例
```js
Vue.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  template: '<input v-model="todo.text">'
})
```
---
```vue
Vue.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeTodo () {
      var vm = this
      vm.$parent.todos = vm.$parent.todos.filter(function (todo) {
        return todo.id !== vm.todo.id
      })
    }
  },
  template: `
    <span>
      {{ todo.text }}
      <button @click="removeTodo">
        X
      </button>
    </span>
  `
})
```
:::

::: details 查看正例
```js
Vue.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  template: `
    <input
      :value="todo.text"
      @input="$emit('input', $event.target.value)"
    >
  `
})
```
---
```vue
Vue.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  template: `
    <span>
      {{ todo.text }}
      <button @click="$emit('delete')">
        X
      </button>
    </span>
  `
})
```
:::

### 17. 代码注释

1. data 和 props 的每个属性都需要编写注释说明用途。这样便于后期快速理解查找；
2. 不需要对 Vue 的 option 进行注释（如生命周期的钩子函数、data 、watch、methods 等），因为这些都是大家都熟知的。注意，option 里面的代码还是需要进行必要的注释的。

## 参考文档

- [风格指南](https://v2.cn.vuejs.org/v2/style-guide/)
