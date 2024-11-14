---
author: 王志杰
date: 2024-10-04
keywords: HTML 编码规范
description: 编写 HTML 代码时，我们需要遵循一定的规范，以保证代码的可读性、可维护性和一致性。本文将介绍一些常见的 HTML 编码规范，帮助大家编写出高质量的 HTML 代码。
---

# HTML 编码规范

编写 HTML 代码时，我们需要遵循一定的规范，以保证代码的可读性、可维护性和一致性。本文将介绍一些常见的 HTML 编码规范，帮助大家编写出高质量的 HTML 代码。

## 规则

### 1. 通用规则

- 标签不要大写，即便是 doctype 标签。

  ```html
  <!doctype html>
  ```

- 用两个空格来代替制表符（tab） -- 这是唯一能保证在所有环境下获得一致展现的方法。

- 嵌套元素应当缩进一次（即两个空格）。

- 对于属性的定义，永远全部使用双引号，绝不要使用单引号。

  ```html
  <!-- avoid -->
  <div class='class_name'></div>
  
  <!-- ok -->
  <div class="class_name"></div>
  ```

- 不要省略可选的结束标签（closing tag）（例如，`</li>` 或 `</body>`）。

  ```html
  <!-- avoid -->
  <section>
    <p>这是一个段落。
    <p>这是一个段落。
  </section>
  
  <!-- ok -->
  <section>
    <p>这是一个段落。</p>
    <p>这是一个段落。</p>
  </section>
  ```

### 2. HTML5 doctype

为每个 HTML 页面的第一行添加 [standards mode（标准模式）](https://developer.mozilla.org/en-US/docs/Web/HTML/Quirks_Mode_and_Standards_Mode) 声明，这样能够确保在每个浏览器中拥有一致的展现。

```html
<!doctype html>
<html>
  <head>
  </head>
</html>
```

### 3. 语言属性

根据 HTML5 规范：

> 强烈建议为 html 根元素指定 lang 属性，从而为文档设置正确的语言。这将有助于语音合成工具确定其所应该采用的发音，有助于翻译工具确定其翻译时所应遵守的规则等等。

更多关于 `lang` 属性的知识可以从 [此规范](http://www.w3.org/html/wg/drafts/html/master/semantics.html#the-html-element) 中了解。Sitepoint 站点上 [给出了一份语言代码表](https://www.sitepoint.com/iso-2-letter-language-codes/)。

```html
<html lang="en">
  <!-- ... -->
</html>
```

### 4. IE 兼容模式

> 2022年6月15日，微软正式停止对IE浏览器的更新和维护，因此不再需要考虑IE兼容模式。

IE 支持通过特定的 `<meta>` 标签来确定绘制当前页面所应该采用的 IE 版本。除非有强烈的特殊需求，否则最好是设置为 **edge mode**，从而通知 IE 采用其所支持的最新的绘制模式。

```html
<meta http-equiv="x-ua-compatible" content="ie=edge">
```

### 5. 字符编码

通过明确声明字符编码，能够确保浏览器快速并容易的判断页面内容的渲染方式。这样做的好处是，可以避免在 HTML 中使用字符实体标记（character entity），从而全部与文档编码一致（一般采用 UTF-8 编码）。

```html
<head>
  <meta charset="UTF-8">
</head>
```

### 6. 引入 CSS 和 JavaScript 文件

根据 HTML5 规范，在引入 CSS 和 JavaScript 文件时一般不需要指定 `type` 属性，因为 `text/css` 和 `text/javascript` 分别是它们的默认值。

```html
<!-- External CSS -->
<link rel="stylesheet" href="code-guide.css">

<!-- In-document CSS -->
<style>
  /* ... */
</style>

<!-- JavaScript -->
<script src="code-guide.js"></script>
```

### 7. id 的命名

+ 命名要具有描述性，可以通过命名大致了解其功能；

+ 使用  camelCase 命名法；

+ 当一个单词无法很好进行描述时，应该使用多单词组合。

### 8. class 的命名

+ 命名要具有描述性，可以通过命名大致了解其功能；

+ 统一使用小写；

+ 当一个单词无法很好进行描述时，应该使用多单词组合，首单词应该跟功能模块相关，并且通过 "-" 连接符来命名；

  ```html
  <div class="header">
      <input class="header-search" type="text">
  </div>
  ```

### 9. 属性顺序

HTML 属性应当按照以下给出的顺序依次排列，确保代码的易读性。

- `class`
- `id`, `name`
- `data-*`
- `src`, `for`, `type`, `href`, `value`
- `title`, `alt`
- `role`, `aria-*`

class 用于标识高度可复用组件，因此应该排在首位。id 用于标识具体组件，应当谨慎使用（例如，页面内的书签），因此排在第二位。

### 10. 布尔（boolean）型属性

布尔型属性可以在声明时不赋值。XHTML 规范要求为其赋值，但是 HTML5 规范不需要。

更多信息请参考 [WhatWG section on boolean attributes](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#boolean-attributes)：

> 元素的布尔型属性如果有值，就是 true，如果没有值，就是 false。

如果*一定*要为其赋值的话，请参考 WhatWG 规范：

> 如果属性存在，其值必须是空字符串或 [...] 属性的规范名称，并且不要在首尾添加空白符。

**简单来说，就是不用赋值。**

```html
<input type="text" disabled>

<input type="checkbox" value="1" checked>

<select>
  <option value="1" selected>1</option>
</select>
```

### 11. 图片属性

+ 图片通常使用 **alt** 属性。 在图片不能显示时，它能替代图片显示。

  ```html
  <img src="html5.gif" alt="HTML5">
  ```

+ 定义好图片的尺寸，在加载时可以预留指定空间，减少闪烁。

  ```html
  <img src="html5.gif" alt="HTML5" style="width:128px;height:128px">
  ```

### 12. a 标签

1. 当 a 标签用于下载时，应添加`download`属性，表明链接的资源将被下载，而不是显示在浏览器中。属性值应为下载文件名。
2. 当 a 标签链接到不安全或者不认可的第三方链接时，应添加`rel="nofollow"`属性。

```html
<!-- 下载链接 -->
<a href="**.pdf" download="**.pdf">点击下载 **.pdf 文件！</a>

<!-- 链接到第三方链接 -->
<a href="https://www.baidu.com/" rel="nofollow">百度</a>
```

### 13. 一行代码最长 80 个字符

HTML 代码过长会造成代码阅读的不便，所以每行代码尽量少于 80 个字符。

### 14. 独立模块的代码前后保留空行

当写好一个模块的代码后，为了便于阅读，应该在相关代码的前后保留一个空行加以区分。

更好的做法是，在模块代码块前面添加简短的注释。

### 15. HTML 代码注释

> 注释编写原则：以功能模块为基础，对功能模块做说明划分。

+ 单行注释

  ```html
  <!--单行注释-->
  ```

+ 多汗注释

  ```html
  <!--
      多行注释
      多行注释
      多行注释
  -->
  ```

## 参考文档

1. [Code Guide](https://codeguide.bootcss.com/#html-synta)
2. [HTML(5) 代码规范](https://www.runoob.com/html/html5-syntax.html)
