---
author: 王志杰
date: 2024-09-22
keywords: CSS, white-space, 空白处理模型
description: CSS 中的 "white-space" 处理模型是什么？其工作机制如何？如何使用？
---

# CSS 中的 "white-space" 处理模型

写在最前面。本文主体内容翻译自：《[Text (w3.org)](https://www.w3.org/TR/CSS22/text.html#white-space-model)》。建议直接去[阅读原文](https://www.w3.org/TR/CSS22/text.html#white-space-model)。（因为我个人也没吃透，部分规则也无法重现。）

## 前言

在编写 HTML 时，我们经常会通过换行来使代码易于阅读。但是如果我们文本中间进行换行，就会导致页面中多出一个空格。如：

```html
<div>在文本中间 插入换行符</div>
```

另外，在编写文本时，如果在文本中间插入一个空格，在页面中就会多出一个空格。但是如果连续插入多个空格，在页面上最终显示出来的却只有一个空格。如：

```html
<p>练习空格在页面上显示时 只会显示一个</p>
```

这是为什么？其实这一切都与**"white-space" 处理模型**有关。

## "white-space" 处理模型

"white-space" 处理模型指的是浏览器对空白的处理规则。主要分为内联元素布局（ inline element）和块级容器的内联布局（the block container's inlines）两部分。每部分都有各自的一系列处理规则。

### 内联元素布局

对于每个内联元素(包括匿名内联元素)，执行以下步骤，将双向格式字符（bidi formatting characters）视为不存在的字符:

1. 如果`white-space`被设置为`normal`/`nowrap`/`pre-line`，制表符 (U+0009)、回车符(U+000D)或换行符(U+000A)三者周围的空格(U+0020)字符将被移除。
2. 如果`white-space`被设置为`pre`/`pre-warp`，任何不被元素边界打断的空格序列 (U+0020) 都被视为不打断空格的序列。但是，对于`pre-wrap`，在序列末尾存在换行机会。
3. 如果`white-space`被设置为`normal`/`nowarp`，根据基于内容脚本的 UA-specific 算法（UA-specific algorithms），将换行符转化成以下字符之一：空格字符、零宽度空格字符(U+200B)或无字符(即不呈现)。
4. 如果`white-space`被设置为`normal`/`nowarp`/`pre-line`:
   1. 任何制表符 (U+0009)都被转化为一个空格字符(U+0020)
   2. 如果在一个空格字符 (U+0020) 之后还跟着其他空格字符（即使他们不同属一个内联元素），后面跟随的空格都会被移除。

简单举例：

| 字符编码 | 说明                                                                                |
| -------- | ----------------------------------------------------------------------------------- |
| `&#10;`  | 换行 Line feed。等同于按回车键。注意换行符不同于`<br>`标签。                        |
| `&#9;`   | 制表符 Tab。等同于按 Tab 键，不过有些代码编辑器会把制表符转化为多个空格字符的输入。 |
| `&#13;`  | 回车 Carriage Return。等同于按回车键。                                              |

```html
<!-- 规则一：如果`white-space`被设置为`normal`/`nowrap`/`pre-line`，制表符 (U+0009)、回车符(U+000D)或换行符(U+000A)三者周围的空格(U+0020)字符将被移除。 -->
<p style="white-space: normal;">
  制表符 (U+0009) &#9; 周围的空格、回车符(U+000D) &#13; 周围的空格、换行符(U+000A) &#10; 周围的空格
</p>

<!-- 规则三：如果`white-space`被设置为`normal`/`nowarp`，根据基于内容脚本的 UA-specific 算法（UA-specific algorithms），将换行符转化成以下字符之一：空格字符、零宽度空格字符(U+200B)或无字符(即不呈现)。 -->
<p style="white-space: normal;">换行符&#10;的呈现效果</p>

<!-- 规则四：如果`white-space`被设置为`normal`/`nowarp`/`pre-line`:任何制表符 (U+0009)都被转化为一个空格字符(U+0020) -->
<p style="white-space: normal;">制表符&#9;转化为一个空格字符</p>
<!-- 规则四：如果`white-space`被设置为`normal`/`nowarp`/`pre-line`:连续空格只显示一个 -->
<p style="white-space: normal;">连续空格 只会显示一个</p>
<!-- 规则四：如果`white-space`被设置为`normal`/`nowarp`/`pre-line`: 跨内联元素的连续空格也只显示一个-->
<p style="white-space: normal;"><span>不同内联元素 </span><span> 连续空格也只显示一个</span></p>
```

> 注意：这几条规则是组合生效的，并不是生效一个规则，其他规则就不生效了。而且按顺序依次生效的。
>
> 例如规则一的示例。在页面上你会看到制表符、回车符、换行符都被替换成了一个空格，而且其周围的空白字符被删除。这是因为第一条规则把周围的空白字符删除了，然后后面的规则把制表符、回车符、换行符转化成空白字符了。

### 块级标签的内联布局

块级标签的内联布局上，分两种情况处理。针对于每一行文本内的布局，遵循**内联元素布局规则**。存在换行时，根据**内联元素布局格式化之前的文本**确定换行机会。

每一行文本（即，文本块）的布局规则如下：

1. 在`white-space`被设置为`normal`/`nowrap`/`pre-line`时，如果空格字符 (U+0020)位于于行首，将被移除。
2. 所有制表符 (U+0009) 都呈现为水平移位，将下一个字形的开始边缘与下一个制表位对齐。制表位出现在从块的起始内容边缘以块的字体呈现的空间宽度 (U+0020) 的 8 倍的点处。
3. 在`white-space`被设置为`normal`/`nowrap`/`pre-line`时，如果空格字符 (U+0020)位于于行末，将被移除。
4. 在`white-space`被设置为`pre-wrap`时，如果空格字符 (U+0020) 和制表符 (U+0009)位于行末，在视觉呈现上它们会被折叠。

## 结语

了解了"white-space"处理模型后，我们也理解前言提及到了两个问题的缘由。在 HTML 编码过程中，如果遇到文本字符的缺失或者新增，不妨往"white-space" 处理模型思考，可能就会发现问题的原因了。

在这最后，本文仅是个人理解。可能存在有误。部分规则本人还未在代码中重现处理。极力建议"white-space" 处理模型说明原文——《[Text (w3.org)](https://www.w3.org/TR/CSS22/text.html#white-space-model)》。本文仅仅是个引子。

## 参考文章

- 《[Text (w3.org)](https://www.w3.org/TR/CSS22/text.html#white-space-model)》
