# 第三节：Attribute Coercion Behavior （属性强制行为）

## 前言

> 本笔记主要基于官方文档《[迁移策略——attribute 强制行为](https://v3.cn.vuejs.org/guide/migration/attribute-coercion.html)》汇总而来。如有理解出入，请以官方文档为主。
>
> #### 知识储备：
>
> - HTML 属性
> - 内容属性与 IDL 属性的区别
> - 布尔属性与枚举属性的区别
>
> 如果对上面知识点不了解，可先查看一下文章做初步了解：
>
> - 《[IDL 属性与内容属性、布尔值属性与枚举属性傻傻分不清楚？](https://zhuanlan.zhihu.com/p/144954383)》
> - 《[MDN: Web 开发技术>HTML（超文本标记语言）>HTML 属性参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes)》
>
> 当然，本笔记做了初步说明。

## 概述

> - 删除枚举属性的内部概念，并将枚举属性视为普通的非布尔属性
> - 如果属性的绑定值为`false`，Vue 将不再删除该属性。相反的，布尔值`false`将被转换成字符串`'false'` 赋给属性。在 Vue 3.x 中，如果要删除一个属性，需要通过`null`、`undefined`来进行显式删除。（本条变化，好像适用于布尔属性和枚举属性）

> <font color="#c04851">Tip:</font>
>
> <font color="#c04851">这是一个低级别的内部更改，对一般正常开发的影响不大。</font>

## 布尔属性、枚举属性

> 在深入理解这些变动前，需要先知道什么是**布尔属性**、**枚举属性**及其他相关的知识点。

学习 `html` 相关知识的时候，我们都知道标签有着许许多多的属性。其实呢！这些属性还做了进一步的分类。常见的有：

- <font color="#8076a3">布尔属性</font>（如：`required`）；
- <font color="#8076a3">枚举属性</font>（如：`input`标签的 `type`）;

### 布尔属性

布尔属性有个特点：<font color="#c04851">当声明了这个属性时，其值为 true；而未声明时，其值为 false</font>。

> HTML5 定义了布尔值属性允许的取值：如果属性存在，其值必须是一个空字符串（即该属性的值未分配），或者是一个大小写无关的 ASCII 字符串，该字符串与属性名严格相同，前后都没有空格。
>
> ——摘自《MDN: Web 开发技术>HTML（超文本标记语言）>HTML 属性参考>[布尔值属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes#布尔值属性)》

```html
<div itemscope>This is valid HTML but invalid XML.</div>
<div itemscope="itemscope">This is also valid HTML but invalid XML.</div>
<div itemscope="">This is valid HTML and also valid XML.</div>
<div itemscope="itemscope">This is also valid HTML and XML, but perhaps a bit verbose.</div>
```

上面四种写法是等效的。所以，布尔值属性不能取值为 "`true`" 和 "`false`"。如果需要表示 false 值，布尔值属性需要整个忽略不写。

### 枚举属性

> 枚举属性，顾名思义，就是取值是一个由若干关键词组成的枚举集合。例如 input 元素的 autocomplete 属性，这个属性可取值为 username、email、country、tel、url 等等。
>
> ——摘自《[IDL 属性与内容属性、布尔值属性与枚举属性傻傻分不清楚？](https://zhuanlan.zhihu.com/p/144954383)》

需要注意的是有些枚举属性只接受两个枚举值：`true`和`false`。而且，<font color="#8076a3">空字符串</font> 或者 <font color="#8076a3">不给属性赋值</font> 都等于`true`。

下面写法都代表`true`

```html
<div contenteditable>An editable item</div>
<div contenteditable="">An editable item</div>
<div contenteditable="true">An editable item</div>
```

下面写法都代表`false`

```html
<div contenteditable="false">An editable item</div>
<div contenteditable="abcdefg">An editable item</div>
<div>An editable item</div>
```

### 其他属性

除开上面两种属性分类，其余的属性可以归类于常规属性了。

> <font color="#8076a3">内容属性  </font>和 <font color="#8076a3">IDL（接口描述语言）属性</font>：
>
> HTML 中，属性还有 <font color="#8076a3">内容属性</font> 和 <font color="#8076a3">IDL 属性</font> 说法。注意，这两种属性，并不是对标签属性的划分。他们只是属性不同地方的<font color="#8076a3">不同描述和写法</font>而已。
>
> <font color="#8076a3">内容属性</font> 接收的值都是字符串。编写 HTML 时，直接写在标签中的就是内容属性。此外，<font color="#8076a3">内容属性</font>还可以通过 JS 的 `setAttribute()` 来设置。
>
> ```html
> <div contenteditable>An editable item</div>
> ```
>
> ```js
> input.setAttribute('type', 'text')
> input.getAttribute('type')
> ```
>
> 而 <font color="#8076a3">IDL 属性</font> 是一个 JavaScript 属性（property），是 DOM 提供给 JS 的真正属性。通过 `.` 运算符来设置，且只接收正确类型的值。如果接收值的类型不正确，会自动转化成正确的类型。
>
> ```js
> input.type = 'password'
> ```

关于 HTML 更多详细知识，可查看：

- 《[IDL 属性与内容属性、布尔值属性与枚举属性傻傻分不清楚？](https://zhuanlan.zhihu.com/p/144954383)》
- 《[MDN: Web 开发技术>HTML（超文本标记语言）>HTML 属性参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes)》

## vue 2.x 对`v-bind`属性的处理

- 对于某些属性/元素对，Vue 采用<font color="#8076a3"> IDL 属性 </font> 形式处理：如 [`value` of `<input>`, `<select>`, `<progress>`, etc ](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L11-L18).
- 对于 <font color="#8076a3">布尔值属性</font> 和 <font color="#8076a3">xlinks</font>，Vue 通过判断 是否是`falsy`(`undefined`、 `null`、`false`)值来决定添加或是删除属性。
- 对于 <font color="#8076a3">枚举属性</font>， Vue 强制转化为字符串。
- 对于其他（普通非布尔）属性，如果传递过来的值是 `falsy` 值则删除，否则直接添加

以下是官方给出的普通非布尔属性和枚举属性的结果对照例子：

| `v-bind`表达式      | 普通非布尔属性：`foo` | 枚举属性：`draggable` |
| ------------------- | --------------------- | --------------------- |
| `:attr="null"`      | /                     | `draggable="false"`   |
| `:attr="undefined"` | /                     | /                     |
| `:attr="true"`      | `foo="true"`          | `draggable="true"`    |
| `:attr="false"`     | /                     | `draggable="false"`   |
| `:attr="0"`         | `foo="0"`             | `draggable="true"`    |
| `attr=""`           | `foo=""`              | `draggable="true"`    |
| `attr="foo"`        | `foo="foo"`           | `draggable="true"`    |
| `attr`              | `foo=""`              | `draggable="true"`    |

从上面的对照表可以看出，两者的表现是不一致。这样会造成使用时的不便。

## Vue 3.x 对 `v-bind`属性的处理

在 Vue 3.x 中移除了<font color="#8076a3">枚举属性</font>的概念，统一将他们视为<font color="#8076a3">普通非布尔属性</font>。这样做的好处：

- 消除了<font color="#8076a3">普通非布尔属性</font>和<font color="#8076a3">枚举属性</font>表现形式的不一致（换而言之，在 Vue 3.x 中，只存在<font color="#8076a3">非布尔属性</font>和<font color="#8076a3">布尔属性</font>）
- 意味着可以对 <font color="#8076a3">枚举属性</font> 使用除 `true` 和 `false` 以外的值，甚至是未使用的关键字。

此外，对于<font color="#8076a3">非布尔属性</font>，如果传递的值是`false`，Vue 将不再会删除属性了，而是强制转化为字符串`'false'`。

上面那张表格，在 Vue 3.x 中的表现则变成：

| `v-bind`表达式      | 普通非布尔属性：`foo` | 枚举属性：`draggable` |
| ------------------- | --------------------- | --------------------- |
| `:attr="null"`      | /                     | /                     |
| `:attr="undefined"` | /                     | /                     |
| `:attr="true"`      | `foo="true"`          | `draggable="true"`    |
| `:attr="false"`     | `foo="false"`         | `draggable="false"`   |
| `:attr="0"`         | `foo="0"`             | `draggable="0"`       |
| `attr=""`           | `foo=""`              | `draggable=""`        |
| `attr="foo"`        | `foo="foo"`           | `draggable="foo"`     |
| `attr`              | `foo=""`              | `draggable=""`        |

可以看到，<font color="#8076a3">普通非布尔属性</font> 和 <font color="#8076a3">枚举属性</font> 结果是一致的。

## 删除属性

对于 <font color="#8076a3">非布尔属性</font>，`false` 被强制转化为`'false'`，不再删除属性。所以，在 Vue 3.x 中，应该使用`undefined`和`null`来显式删除属性。

> 注意，<font color="#8076a3">布尔属性</font> 表现并改变，和 Vue 2.x 保持一致。

| Attribute                                                                   | `v-bind` value 2.x                   | `v-bind` value 3.x           | HTML output |
| --------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ----------- |
| Vue 2.x 中的枚举属性，如： `contenteditable`, `draggable` and `spellcheck`. | `undefined`, `false`                 | `undefined`, `null`          | _removed_   |
|                                                                             | `true`, `'true'`, `''`, `1`, `'foo'` | `true`, `'true'`             | `"true"`    |
|                                                                             | `null`, `'false'`                    | `false`, `'false'`           | `"false"`   |
| Vue 2.x 中的普通非布尔属性，如：`aria-checked`, `tabindex`, `alt`, etc.     | `undefined`, `null`, `false`         | `undefined`, `null`          | _removed_   |
|                                                                             | `'false'`                            | `false`, `'false'`           | `"false"`   |
| 布尔属性：`required`、`disabled`、`readonly`                                | `false`、`null`、`undefined`         | `false`、`null`、`undefined` | _removed_   |

## 实际代码测试

可以在 Vue 3.x 项目中执行下面代码，然后到浏览器控制台看实际代码渲染的结果。

```html
<div style="width: 500px">
  非枚举非布尔属性:true:<input type="text" :foo="true" /> 非枚举非布尔属性:false:<input type="text" :foo="false" />
  非枚举非布尔属性:undefined:<input type="text" :foo="undefined" /> 非枚举非布尔属性:null:<input
    type="text"
    :foo="null"
  />
  非枚举非布尔属性:0:<input type="text" :foo="0" />

  <hr />
  枚举属性:true:<input type="text" :spellcheck="true" /> 枚举属性:false:<input type="text" :spellcheck="false" />
  枚举属性:undefined:<input type="text" :spellcheck="undefined" /> 枚举属性:null:<input
    type="text"
    :spellcheck="null"
  />
  枚举属性:0:<input type="text" :spellcheck="0" />

  <hr />
  布尔属性required:true:<input type="text" :required="true" /> 布尔属性required:false:<input
    type="text"
    :required="false"
  />
  布尔属性required:undefined:<input type="text" :required="undefined" /> 布尔属性required:null:<input
    type="text"
    :required="null"
  />
  布尔属性required:0:<input type="text" :required="0" />
</div>
```

![](./images/1.png)
