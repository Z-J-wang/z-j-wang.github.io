---
head:
  - - meta
    - name: description
      content: 本文详细介绍了单页应用（SPA）与服务器端渲染（SSR）对SEO的影响。SPA模式由于页面内容是通过JavaScript动态渲染的，导致搜索引擎无法很好地解析页面信息，从而导致SEO工作无法展开。尽管部分搜索引擎增加了“呈现步骤”来解决这个问题，但并不是所有的搜索引擎都会这样做。SSR模式通过在服务器端渲染页面，使得搜索引擎可以获取到可以直接解析出页面关键信息的HTML文件，从而解决了SPA模式对SEO的影响。然而，SSR模式也有其缺点，如页面白屏时间过长和服务器的运行压力增加。因此，根据实际情况，网站开发人员需要在SPA和SSR之间做出选择。
  - - meta
    - name: keywords
      content: SEO,单页应用（SPA）,服务器端渲染（SSR）,搜索引擎的工作方式,提高网页的用户体验
---

# 第五章：SPA 与 SSR 对 SEO 的影响

## 前言

由于 MVVM 开发模式的兴起，很多网站的采用 SPA 模式进行开发。尽管 SPA 模式有着诸多好处，但由于其特性，在 SEO 方面不太理想。

## SPA 与 SEO

先对 SPA 做个简单了解。

> 什么是 SPA?
>
> 单页 Web 应用（single page web application，SPA），就是只有一张 Web 页面的应用。单页应用程序 (SPA) 是加载单个 HTML 页面并在用户与应用程序交互时动态更新该页面的 Web 应用程序。浏览器一开始会加载必需的 HTML、CSS 和 JavaScript，所有的操作都在这张页面上完成，都由 JavaScript 来控制。
>
> 摘自——《[SPA（单页应用程序）\_百度百科 (baidu.com)](https://baike.baidu.com/item/SPA/17536313)》

概括来说，SPA 模式开发的页面在一开始加载时只有很简单的 HTML，没有任何与页面内容有关的东西。具体内容都是通过运行 JavaScript 动态渲染出来的。

正是因为这个特性，导致页面 SEO 的问题。

搜索引擎的收录网站的工作流程大致如下：

1. [**抓取**](https://developers.google.com/search/docs/advanced/guidelines/how-search-works#crawling)：搜索引擎会使用名为“抓取工具”的自动程序从互联网上发现各类网页，并下载其中的文本、图片和视频。
2. [**索引编制**](https://developers.google.com/search/docs/advanced/guidelines/how-search-works#indexing)：搜索引擎会分析网页上的文本、图片和视频文件，并将信息存储在大型数据库 Google 索引中。
3. [**呈现搜索结果**](https://developers.google.com/search/docs/advanced/guidelines/how-search-works#serving)：当用户在搜索引擎中搜索时，Google 会返回与用户查询相关的信息。

当搜索引擎在抓取一个 SPA 网页进行解析时，由于 HTML 文件中不存在任何内容相关性的东西，搜索引擎就解析不出来任何有用的信息。所以说 SPA 页面对 SEO 极其不友好。

## 对 SPA 页面的优化——增加“呈现步骤”

对于 SPA 页面，部分搜索引擎增加了呈现步骤。以 Google 为例：

> Googlebot 会将所有网页都加入呈现队列，除非[漫游器元标记或标头](https://developers.google.cn/search/docs/crawling-indexing/robots-meta-tag?hl=zh-cn)告知 Google 不要将网页编入索引。网页在此队列中的存在时长可能会是几秒钟，但也可能会是更长时间。一旦 Google 的资源允许，无头 Chromium 便会呈现相应网页并执行 JavaScript。Googlebot 会再次解析所呈现的链接 HTML，并将找到的网址加入抓取队列。Google 还会使用所呈现的 HTML 将网页编入索引。
>
> 摘自——《[了解 JavaScript SEO 基础知识 | Google 搜索中心 | 文档 | Google Developers](https://developers.google.cn/search/docs/crawling-indexing/javascript/javascript-seo-basics?hl=zh-cn)》

简单来说，**“呈现步骤”就是搜索引擎构建一个虚拟的浏览器环境，页面会在这个虚拟的浏览器中进行正常的页面渲染操作，等页面渲染完毕后，搜索引擎再对渲染后得页面进行解析。**

但需要注意的是，并不是所以的搜索引擎都会增加“呈现步骤”。没有“呈现步骤”的搜索引擎依旧存在 SEO 问题。所以我们需要寻找一种根本性的解决方案。

## SSR 模式

**SPA 模式对 SEO 不友好的原因是——搜索引擎抓取到的 HTML 文件是还没有进行 JS 渲染的**。这时人们就思考，如果能让 HTML 提前渲染就好了。SSR 模式刚好就满足这个条件。

SSR 是**Server-Side Rendering**的缩写，翻译过来就是**服务端渲染**。SSR 原理很简单，就是 HTML 先在服务端渲染好，再发送给客户端（浏览器等）。因此，搜索引擎抓取 SSR 模式的页面时，获取到的不再是一个没有意义的 HTML 文件了，而是可以直接解析出页面关键信息的 HTML 文件。

所以，**如果网站非常注重 SEO，SSR 是一个非常好的解决方案**。

> **需要注意的是**，SSR 模式并不是没有缺点。
> 由于页面的初步渲染在服务器中进行，这就会导致客户端向服务器请求一个页面时，需要增加一个等待渲染的过程。如果这个页面非常复杂，就会造成页面白屏时间过长的现象。此外，服务器渲染页面也会占用服务器资源，增加服务器的运行压力。

## 结语

由于 SPA 页面在客户端渲染的机制，导致搜索引擎无法很好的解析页面信息，从而导致 SEO 工作无法展开。尽管 Google 等部分搜索引擎会对 SPA 进行虚拟渲染再解析，但是并不是所有的搜索引擎都会这样做。好在 SSR 模式能很好的兼顾到 SEO。当然，并不是所有的网站开发都要摒弃 SPA 转而使用 SSR。两者各有利弊，根据实际情况决定。

## 参考文章

- [SPA（单页应用程序）\_百度百科 (baidu.com)](https://baike.baidu.com/item/SPA/17536313)

- [了解 JavaScript SEO 基础知识 | Google 搜索中心 | 文档 | Google Developers](https://developers.google.cn/search/docs/crawling-indexing/javascript/javascript-seo-basics?hl=zh-cn)
