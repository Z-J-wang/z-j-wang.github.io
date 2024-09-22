---
author: 王志杰
date: 2024-09-22
keywords: meta,SEO,meta与SEO,meta与SEO优化,meta标签,meta标签优化,meta标签SEO,meta标签SEO优化
description: 本文详细介绍了meta元素在SEO中的重要性，并详细解释了如何使用meta元素来设置网页的元数据。这些元数据包括网页标题、网页摘要、关键字、网页作者以及抓取工具的行为控制。此外，还提到了不同的搜索引擎可能会为爬虫机器人制定专门的meta元素。总的来说，这段代码是为了帮助搜索引擎更好地理解网页内容，从而提高网页在搜索引擎结果页中的显示效果和排名。
---

# 第四章：meta 与 SEO

## 前言

编写过 HTML 文档的朋友对`meta`元素一定不陌生，`meta`元素有一项非常重要的作用就是声明当前网页（即，HTML 文档）的基础信息。这些基础信息有个专业术语，叫“元数据（Metadata）”。元数据是 SEO 一个非常重要的工具。**搜索引擎就是通过这些元数据来认识网页的**。

## 认识元数据(meta)

> <font color="#3170a7">什么是元数据（**Metadata**）？</font>
>
> <font color="#3170a7">**Metadata**——元数据，简单的来说就是描述数据的数据。</font>
>
> 摘自——《[Metadata - 术语表 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Glossary/Metadata)》

**`meta`元素用于设置当前网页的元数据**。例如：网页描述、作者、针对搜素引擎的关键字等等。

`meta` 元素有如下特性：

- 是一个空元素（void element）
- 一般情况下，`meta`元素都存放在`<head>`元素中。
- 必须存在开始标记（`<meta`）且不能存在结束标记（`/`或`</meta>`）。例如：`<meta charset="utf-8">`
- `meta`元素主要服务于机器。尽管`meta`元素不会显示在页面上，但是浏览器、搜索引擎抓取工具[^1]、服务器等等都能使用这些信息。

> 除此之外，`meta`元素还有以下特性。
>
> - 一般情况下 ，`<meta>`元素属于元数据内容（[Metadata content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#metadata_content)）。但是如果`<meta>`元素添加了[`itemprop`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemprop)属性，`<meta>`元素可作为 [flow content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#flow_content), [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#phrasing_content).
> - 允许编写在【`<head>`、 接收 [metadata content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#metadata_content) 内容的元素、接收 [flow content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#flow_content) 内容的元素】中；
>   - `<meta charset>`、`<meta http-equiv>`必须写在`<head>`中;
>   - `<meta name> `可以写在任何可以接收 [metadata content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#metadata_content) 内容的标签中
>   - `<meta itemprop>`可以写在任何可以接收 [metadata content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#metadata_content) 或 [flow content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#flow_content) 内容的标签中

> <font color="#f20c00"> **注意：**</font>在 XHTML 中 <meta> 标签必须包含结束标签。

上面关于`<meta>`的描述有些拗口，可以不用深入了解。只需要知道，`<meta>`和 SEO 有关即可；一般情况下，存放在`<head>`中。

## 与 SEO 相关的 meta 元素

meta 元素的用途有很多。有控制页面刷新的；有设置移动端显示效果的；也有和 SEO 相关的。

接下来，简单讲讲那些和 SEO 相关的`meta`元素。

### 页面标题

`<title>`标签是用于设置网页标题。尽管它并不是通过`<meta>`设置，但它是 SEO 中非常重要的元数据。

google 对网页标题做如下描述：

> 标题链接非常重要，它可以让用户快速了解某条搜索结果的内容以及该结果与其查询相关的原因。它常常是用户在决定点击哪个结果时参考的主要信息，因此为您的网页提供高品质的标题文字非常重要。
>
> 摘抄自——《[如何更改 Google 搜索中的标题链接 | Google 搜索中心 | 文档 | Google Developers](https://developers.google.cn/search/docs/appearance/title-link?hl=zh-cn)》

> 这里的标题链接就是网页标题。

写法如下：

```html
<title>页面标题</title>
```

设置标题时，需要注意一下几点：

- **确保 `<title>`内容和网页内容有较强的关联性**。避免题不对文。
- 确保**为每个网页分别指定一个标题**。
- 为 `<title>`元素编写**简练的描述性**文字。
- 避免**关键字堆砌**。在 `<title>` 元素中包含几个描述性词汇有时会有帮助，但请勿多次重复使用相同的字词或短语。
- 避免 **`<title>`元素中出现重复或样板化的文字**。

> 更多相关内容请看：[如何更改 Google 搜索中的标题链接 | Google 搜索中心 | 文档 | Google Developers](https://developers.google.cn/search/docs/appearance/title-link?hl=zh-cn)

### 网页摘要

网页摘要是对网页内容的精炼提取。摘要会显示在搜索结果页上，有助于用户对网页有初步的了解。

写法如下：

```html
<meta name="description" content="这里是网页摘要！" />
```

编写摘要有如下要点：

- 尽量与页面内容有强关联性。
- 尽量能够准确概括特定网页。避免网站中所有网页的摘要都一样。

> 更多相关内容——[如何撰写元描述 | Google 搜索中心 | 文档 | Google Developers](https://developers.google.cn/search/docs/appearance/snippet?hl=zh-cn)

### 关键字

关键字即搜索关键字，是网页内容高度凝练的词组列表。关键字有助于搜索引擎索引查找网页。

写法如下：

```html
<meta name="keywords" content="关键字1,关键字2,关键字3“ >
```

编写关键字时有如下要点：

- 关键字之间要用英文逗号`,`分隔。
- 关键字要和网页内容有关联性。避免不相关的关键字。
- 设置适量的关键字。关键字太少没法完全体现网页内容，但一味的追求大量的关键字就会照成**关键字堆砌**。能充分体现网页内容即可。
- 避免关键字堆砌。

> “关键字堆砌”是指在网页中加入大量关键字或数字，试图操纵网站在 Google 搜索结果中的排名。这些关键字通常以列表或群组形式显示，或与上下文无关（内容不自然）。在网页中加入大量关键字或数字会对用户体验产生负面影响，因而可能损害网站排名。请集中精力创建实用、信息丰富的内容，并使用与上下文相关的恰当关键字。
>
> 摘自——《[不相关的关键字和关键字堆砌 | Google 搜索中心 | 文档 | Google Developers](https://developers.google.cn/search/docs/advanced/guidelines/irrelevant-keywords?hl=zh-cn)》

### 网页作者

网页开发者也是网页信息的一部分。可以如下设置：

```html
<meta name="author" content="作者1,作者2，作者3" />
```

> 注意：多个作者之前用英文逗号间隔。

### 抓取工具行为的控制

借助`<meta name="robots">`可以控制抓取工具的行为。

写法如下：

```html
<meta name="robots" content="index,follow" />
```

> META name="robots" 值域说明：
>
> | 值             | 描述                                     | 被用于                                                                                                                                                                                                                                                                                           |
> | :------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | `index`        | 允许机器人索引此页面（默认）。           | 所有爬虫                                                                                                                                                                                                                                                                                         |
> | `noindex`      | 要求机器人不索引此页面。                 | 所有爬虫                                                                                                                                                                                                                                                                                         |
> | `follow`       | 允许机器人跟随此页面上的链接（默认）。   | 所有爬虫                                                                                                                                                                                                                                                                                         |
> | `nofollow`     | 要求机器人不跟随此页面上的链接。         | 所有爬虫                                                                                                                                                                                                                                                                                         |
> | `all`          | 与 `index, follow` 等价                  | [Google](https://support.google.com/webmasters/answer/79812)                                                                                                                                                                                                                                     |
> | `none`         | 与 `noindex, nofollow` 等价              | [Google](https://support.google.com/webmasters/answer/79812)                                                                                                                                                                                                                                     |
> | `noarchive`    | 要求搜索引擎不缓存页面内容。             | [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives)、[Yahoo](https://help.yahoo.com/kb/search-for-desktop/SLN2213.html)、[Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240) |
> | `nosnippet`    | 防止在搜索引擎结果中显示页面的任何描述。 | [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives)、[Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)                                                                     |
> | `noimageindex` | 请求该页不显示为索引图像的引用页。       | [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives)                                                                                                                                                                   |
> | `nocache`      | 不要缓存该页面。`noarchive` 的替代名称。 | [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)                                                                                                                                                                                                     |
>
> 摘自——《[标准元数据名称 - HTML（超文本标记语言） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta/name#其他元数据名称)》

上面这些 meta 元素都是通用性的。除此之外，不同的搜索引擎会为自己的爬虫机器人制定专门的 meta 元素。

例如 Google 专用的:

```html
<!-- 作用等同于 name="robots",但只对谷歌搜索引擎的爬虫机器人有效 -->
<meta name="googlebot" content="index,follow" />

<!-- 用于告知 Google 不要显示站点链接搜索框 -->
<meta name="google" content="nositelinkssearchbox" />

<!-- 用于告知 Google 您不希望提供该网页的翻译 -->
<meta name="googlebot" content="notranslate" />
```

> 更多 Google 相关的 meta 元素，可查阅：《[Google 可以识别的元标记和内嵌标记 | Google 搜索中心 | 文档 | Google Developers](https://developers.google.cn/search/docs/advanced/crawling/special-tags?hl=zh-cn)》

## 结语

`<meta>`对 SEO 非常重要。它有助于搜索引擎了解页面的信息内容。这里只是列举了一些重要且常用的 SEO 相关元数据。其中**标题、摘要、关键字**最为重要。它们影响着页面在搜索引擎结果页中的显示效果和排名，是 SEO 非常重要的一环。

[^1]: 搜索引擎抓取工具是一种由搜索引擎公司开发的自动访问网站并收录网站的脚本机器人。俗称爬虫。
