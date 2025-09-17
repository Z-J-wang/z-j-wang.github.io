# 第 20 节：Props 的默认值函数不能访问`this`



## 前言

> 本笔记主要基于官方文档《[迁移策略—— Props 的默认值函数不能访问`this`](https://v3.cn.vuejs.org/guide/migration/props-default-this.html)》汇总而来。如有理解出入，请以官方文档为主
>
> #### 知识储备
>
> + [provide / inject](https://cn.vuejs.org/v2/api/#provide-inject)



Props 默认值的工厂函数不再具有访问`this`的权限。

取而代之的是：

+ 组件接收到的原始`props`将作为参数传递给默认值的函数
+ `inject` 可以在默认函数内部使用

```js
import { inject } from 'vue'

export default {
  props: {
    theme: {
      default (props) {
        // `props` 是传递给组件的原始值。
        // 在任何类型/默认强制转换之前
        // 也可以使用 `inject` 来访问注入的 property
        return inject('theme', 'default-theme')
      }
    }
  }
}
```

