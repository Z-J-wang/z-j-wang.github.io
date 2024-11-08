# 第 8 节：Data 选项



## 前言

> 本笔记主要基于官方文档《[迁移策略—— Data 选项](https://v3.cn.vuejs.org/guide/migration/data-option.html)》汇总而来。如有理解出入，请以官方文档为主。



## 概述

+ `data`选项的不再接受 JS 对象，只接受函数形式的声明。
+ 当合并来自  `mixin ` 或  `extend ` 的多个 `data` 返回值时，`data`现在变为浅拷贝形式(只合并根级属性)。



## Vue 2.x data Option 的声明

在 Vue 2.x ，声明`data`有两种方式：

+ 对象形式（常用于 Vue 根实例）

  ```js
  const app = new Vue({
    data: {
      apiKey: 'a1b2c3'
    }
  })
  ```

+ 函数形式 （常用于 Vue 组件）

  ```js
  const app = new Vue({
    data() {
      return {
        apiKey: 'a1b2c3'
      }
    }
  })
  ```

  

## Vue 3.x 只支持函数形式声明

Vue 3.x 对 `data`的声明进行了标准化。现只接受函数形式的声明形式。

上面代码变成：

```html
<script>
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        apiKey: 'a1b2c3'
      }
    }
  }).mount('#app')
</script>
```



## Mixin 的改变

当组件的`data`与`mixin`或`extends`的`data`进行合并时，Vue 3.x 只进行浅拷贝形式。

如下例子：

```js
const Mixin = {
  data() {
    return {
      user: {
        name: 'Jack',
        id: 1
      },
      pwd: '123456'
    }
  }
}

const CompA = {
  mixins: [Mixin],
  data() {
    return {
      user: {
        id: 2
      },
      pwd: '121212'
    }
  }
}
```

Vue 2.x `data`执行的结果：

```js
{
  user: {
    id: 2,
    name: 'Jack'
  },
  pwd: '121212'
}
```

Vue 2.x 中，`data`的合并是深拷贝形式。以`ComA`的`data`为主，`Mixin`的`data`里的属性将逐一跟`ComA`的`data`里的属性比较。如果属性`ComA` `data`里存在的，且是对象，则进入对象内部进行比较；若不是对象，则跳过；如果属性在`ComA` `data`里不存在，则直接添加到`ComA` `data`。

Vue 3.x `data`执行结果：

```js
{
  user: {
    id: 2
  }，
  pwd: '121212'
}
```

Vue 3.x 是浅拷贝，所以不会进入对象的内部进行比较。因此，但 Vue 发现`user`属性在`ComA`的`data`已经存在时，就直接跳过了。