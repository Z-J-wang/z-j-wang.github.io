---
head:
  - - meta
    - name: description
      content: 本文详细介绍了HTML中的<meta>标签及其作用。<meta>标签主要用于设置当前网页的元数据，如网页描述、作者、针对搜索引擎的关键字等等。<meta>元素有四个常用属性：name、http-equiv、content和charset。其中，name和http-equiv必须搭配content使用，http-equiv主要用于控制浏览器行为，charset用于设置文档的字符编码。文章还介绍了meta元素的分类，包括Meta charset类、Meta http-equiv类和Meta name类。Meta name类允许自定义，是功能最强、自由度最高的。文章还详细介绍了移动端相关的meta元素，如name="viewport"、UC移动浏览器和QQ移动浏览器等。最后，文章还介绍了其他一些常用的meta元素，如SEO相关的meta元素、referrer相关的meta元素等。
  - - meta
    - name: keywords
      content: meta,meta标签,元数据,SEO,meta 标签的作用,meta 标签的用途,meta 标签的最佳实践
---

# 认识 \<meta\> 标签

## 前言

> 为了更好的阅读本文，建议先对以下内容做了解：
>
> - `<noscript>`元素：[\<noscript\>- HTML（超文本标记语言） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/noscript)
> - Metadata content：[内容分类 - Web 开发者指南 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Content_categories#元数据内容（metadata_content）)

在了解 `<meta >`元素之前，先来看看`<head>`元素。

> HTML [`<head>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/head) 元素与 [`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body) 元素不同，它的内容不会在浏览器中显示，它的作用是保存页面的一些[元数据](https://developer.mozilla.org/zh-CN/docs/Glossary/Metadata)。
>
> 摘自——《[标签里有什么？Metadata-HTML 中的元数据 - 学习 Web 开发 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)》

实际上，`<head>`元素内存放的都是 “[Metadata content 元素](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Content_categories#%E5%85%83%E6%95%B0%E6%8D%AE%E5%86%85%E5%AE%B9%EF%BC%88metadata_content%EF%BC%89)”。Metadata content 元素用于<font color="#3170a7">修改文档其余部分的陈述/行为，建立与其他文档的链接或者传达其他外带信息.</font>。`<base>`、`<link>`、`<meta>`、`<script>`、`<noscript>`、`<style>` 和 `<title>`都属于 Metadata content 元素。

## meta 简述

**`<meta>`元素用于设置当前网页的元数据。**例如：网页描述、作者、针对搜素引擎的关键字等等。

> <font color="#3170a7">什么是元数据（**Metadata**）？</font>
>
> <font color="#3170a7">**Metadata**——元数据，简单的来说就是描述数据的数据。</font>
>
> 摘自——《[Metadata - 术语表 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Glossary/Metadata)》

`meta` 元素有如下特性：

- 是一个空元素（void element）
- 一般情况下，`<meta>`元素都存放在`<head>`元素中。
- 必须存在开始标记（`<meta`）且不能存在结束标记（`/`或`</meta>`）。例如：`<meta charset="utf-8">`
- `meta`元素主要服务于机器。尽管`meta`元素不会显示在页面上，但是浏览器、搜索引擎抓取工具、服务器等等都能使用这些信息。

> 除此之外，`meta`元素还有以下特性。
>
> - 一般情况下 ，`<meta>`元素属于元数据内容（[Metadata content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#metadata_content)）。但是如果`<meta>`元素添加了[`itemprop`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemprop)属性，`<meta>`元素可作为 [flow content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#flow_content), [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#phrasing_content).
> - 允许编写在`<head>`、 接收 [metadata content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#metadata_content) 内容的元素、接收 [flow content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#flow_content) 内容的元素中；
>   - `<meta charset>`、`<meta http-equiv>`必须写在`<head>`中;
>   - `<meta name> `可以写在任何可以接收 [metadata content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#metadata_content) 内容的标签中
>   - `<meta itemprop>`可以写在任何可以接收 [metadata content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#metadata_content) 或 [flow content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#flow_content) 内容的标签中

> <font color="#f20c00"> **注意：**</font>在 XHTML 中 <meta> 标签必须包含结束标签。

## meta 元素的属性

meta 元素的常用属性有四个：
| 属性 | 描述 |
| ------------ | ------------------------------------------------------------ |
| `name` | `name` 和 `content` 属性可以一起使用，以键值对（`key-value`）的方式给文档提供元数据，其中 name 作为元数据的名称，content 作为元数据的值。 |
| `http-equiv` | 属性定义了一个编译指示指令。所有允许的值都是特定 HTTP head 的名称。 |
| `content` | 此属性包含 `http-equiv` 或`name` 属性的值，具体取决于所使用的值 |
| `charset` | 这个属性声明了文档的字符编码。 |

使用这些属性时有几个要注意的地方：

- `name`/`http-equiv` 必须搭配 `content` 使用，与 `content` 组成键值对（`key-value`）。其中 `name`/`http-equiv` 定义了 key，`content` 则设置了 value。
- `http-equiv` 主要是用于控制浏览器行为。**其值仅支持特定的 HTTP head 的名称，并不是所有。**详见章节：常用性 meta 标签汇总
- `charset` 不需要和其他属性搭配。其值必须是字符编码，且应该写在所有的元数据前面（即，`<head>` 元素的第一个子元素）。这是因为`charset` 定义了整个 document 的编码类型，如果没定义或者位置比较靠后，浏览器在读取到 `charset` 之前可能会没法正常解析。

> <font color="#3170a7">**字符串编码说明：**</font>
>
> 绝大多数情况下，都应该字符串编码设置为`utf-8`。`utf-8` 能保证绝大多数的语言文字正常显示。
>
> 详情说明：[Choosing & applying a character encoding (w3.org)](https://www.w3.org/International/questions/qa-choosing-encodings)

> <font color="#f20c00">**注：** </font>
>
> - 如果没有提供 name 属性，那么名称/值对中的名称会采用 http-equiv 属性的值。
>
> - HTML 4.01 有个 scheme 属性，在 HTML5 被删除 。
>
> - 属性 `charset` 是 HTML5 新增的。它使字符集的定义更加容易：
>
>   - HTML 4.01： <meta http-equiv="content-type" content="text/html; charset=UTF-8">
>
>   - HTML5： <meta charset="UTF-8">

## meta 元素分类

虽然 `meta` 元素并没有严格意义上的分类，但是为了便于记忆和了解，我们还可以根据作用的不同做一下分类。

- 自成一类的字符串编码：Meta `charset` 类
- 和 HTTP 相关的：Meta `http-equiv` 类
- 功能最强，自由度最高的：Meta `name` 类

### Meta `name` 类

这里着重讲一下 Meta `name` 类。

Meta `name` 类不同于其他两类，它是允许自定义的。

除了标准元数据的 Meta `name` ，如：

```html
<!-- 页面描述 -->
<meta name="description" content="不超过150个字符" />
<!-- 页面关键词 -->
<meta name="keywords" content="" />
<!-- 网页作者 -->
<meta name="author" content="name, email@gmail.com" />
```

> 更多标准元数据名称，见：[标准元数据名称 - HTML（超文本标记语言） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta/name)

浏览器商还根据自己的需求，自定义了自己的 Meta `name`：

```html
<!-- 告诉 Google 不显示网站链接的搜索框信息  -->
<meta name="google" content="nositelinkssearchbox" />
<!-- 告诉 Google 不提供此页面的翻译 -->
<meta name="google" content="notranslate" />
<!-- 验证 Google 搜索控制台的所有权 -->
<meta name="google-site-verification" content="verification_token" />
```

所以， Meta `charset` 类往下还可以做很多细分。例如：SEO 相关的、移动端相关、不同浏览器相关的。详见章节：常用性 meta 标签汇总

## 利用 meta 标签对 viewport 进行控制

[viewport 深入理解 | 菜鸟教程 (runoob.com)](https://www.runoob.com/w3cnote/viewport-deep-understanding.html)

## 常用性 meta 元素汇总

为了便于查找，这里搜录罗列了常见的 meta 元素。

### 字符串编码

为了防止网页乱码，需要设定字符串编码。大多数情况下，设定为 UTF-8 即可。

```html
<meta charset="UTF-8" />
```

### http-equiv 相关的 meta

#### 缓存相关的 meta：http-equiv="expires" 、http-equiv="pragma"、http-equiv="Cache-Control"

- `http-equiv="expires"`：指定网页在缓存中的过期时间，一旦网页过期，必须到服务器上重新加载到本地缓存才可以进行浏览网页内容
- `http-equiv="pragma"`：**Pragma** 是 HTTP/1.0 中规定的通用首部，其值只有 `no-cache`。用于禁止缓存。
- `http-equiv="Cache-Control"`：[Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)用于设定浏览器的缓存机制。

三者在 meta 中多用于禁止浏览器缓存。可以三者选其一。如果考虑兼容只支持的 HTTP/1.0 的浏览器可以使用`http-equiv="pragma"`.

```html
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="Cache-Control" content="no-cache" />
<meta http-equiv="expires" content="0" />
```

#### http-equiv="refresh"

`http-equiv="refresh"` 用来实现页面的自动刷新。写法如下：

```html
<!-- 指定秒后刷新当前页面 -->
<meta http-equiv="refresh" content="秒数" />

<!-- 指定秒后重定向到 URL -->
<meta http-equiv="refresh" content="秒数;URL地址" />
```

#### http-equiv="window-target"

用来设置当前窗口显示方式。常用于**强制当前窗口以独立页面显示，以防止页面被 iframe 调用**

```html
<meta http-equiv="”window-target”" content="”_top”" />
```

#### http-equiv="set-cookie"

添加页面 cookie

```html
<meta http-equiv="set-cookie" content="name=value; expires=date; path=url" />
```

#### http-equiv="x-dns-prefetch-control"

设置浏览器 DNS 预读取功能。

> **`X-DNS-Prefetch-Control`** 头控制着浏览器的 DNS 预读取功能。 DNS 预读取是一项使浏览器主动去执行域名解析的功能，其范围包括文档的所有链接，无论是图片的，CSS 的，还是 JavaScript 等其他用户能够点击的 URL。
>
> 因为预读取会在后台执行，所以 [DNS](https://developer.mozilla.org/zh-CN/docs/Glossary/DNS) 很可能在链接对应的东西出现之前就已经解析完毕。这能够减少用户点击链接时的延迟。
>
> 摘自——《[X-DNS-Prefetch-Control - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control)》

```html
<meta http-equiv="x-dns-prefetch-control" content="off" />
```

#### http-equiv="Content-Security-Policy"

> HTTP 响应头 **`Content-Security-Policy`** 允许站点管理者控制用户代理能够为指定的页面加载哪些资源。除了少数例外情况，设置的政策主要涉及指定服务器的源和脚本结束点。这将帮助防止跨站脚本攻击（`Cross-Site Script`）（[XSS (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting)）。
>
> 摘自——《[Content-Security-Policy - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy)》

```html
<!-- 禁用不安全的内联/动态执行，只允许通过 https 加载这些资源（如图片、字体、脚本等） -->
<meta http-equiv="Content-Security-Policy" content="default-src https:" />
```

#### IE 兼容模式：http-equiv="X-UA-Compatible"

`http-equiv="X-UA-Compatible"` 是 IE8 后自个搞得的 meta 元素。用于指定 IE8 以上版本浏览器采用何种文档兼容模式来渲染页面的指令。

比较常用的写法如下：

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
```

`IE=edge`表示采用浏览器支持的最高文档模式渲染页面，`chrome=1`表示使用 Google Chrome Frame（谷歌内嵌浏览器框架 GCF）。

> Google Chrome Frame 允许 IE 浏览器使用谷歌浏览器内核（WebKit）渲染页面。

> 如果想要详细了解，推荐阅读：[(2 条消息) X-UA-Compatible 是什么（详解）\_hjb2722404 的博客-CSDN 博客\_x-ua-compatible](https://blog.csdn.net/hjb2722404/article/details/119034192?ops_request_misc=%7B%22request%5Fid%22%3A%22166038385316782184642125%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=166038385316782184642125&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-1-119034192-null-null.142^v40^pc_rank_34_1,185^v2^control&utm_term=x-ua-compatible&spm=1018.2226.3001.4187)

[(51 条消息) 标签大全\_crazy 的蓝色梦想的博客-CSDN 博客\_mate 标签](https://blog.csdn.net/qq_41257129/article/details/104325776?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-1-104325776-blog-51356143.pc_relevant_multi_platform_whitelistv3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-1-104325776-blog-51356143.pc_relevant_multi_platform_whitelistv3&utm_relevant_index=2)

[(51 条消息) meta 标签的作用及整理\_阿 Q 虾米的博客-CSDN 博客\_mate 标签](https://blog.csdn.net/yc123h/article/details/51356143)

[meta 标签汇总 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903881378365448)

[(52 条消息) HTML meta 标签\_ANKG 的博客-CSDN 博客\_html meta](https://blog.csdn.net/zhangank/article/details/94014629?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2~default~CTRLIST~Rate-1-94014629-blog-110565446.pc_relevant_aa&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2~default~CTRLIST~Rate-1-94014629-blog-110565446.pc_relevant_aa&utm_relevant_index=1)

### SEO 相关的 meta

SEO 常用的 meta 有：

```html
<!-- 文档作者的名字 -->
<meta name="author" content="作者名称" />

<!-- 一段简短而精确的、对页面内容的描述。一些浏览器，比如 Firefox 和 Opera，将其用作书签的默认描述 -->
<meta name="description" content="页面描述" />

<!-- 与页面内容相关的关键词，使用逗号分隔 -->
<meta name="keywords" content="关键字" />

<!-- 爬虫、协作搜寻器，或者 “机器人”，对页面的处理行为，或者说，应当遵守的规则。是一个使用逗号分隔的 -->
<meta name="robots" content="index,follow" />
```

> META name="robots" 值域说明：
>
> | 值             | 描述                                                                        | 被用于                                                                                                                                                                                                                                                                                           |
> | :------------- | :-------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | `index`        | 允许机器人索引此页面（默认）。                                              | 所有爬虫                                                                                                                                                                                                                                                                                         |
> | `noindex`      | 要求机器人不索引此页面。                                                    | 所有爬虫                                                                                                                                                                                                                                                                                         |
> | `follow`       | 允许机器人跟随此页面上的链接（默认）。                                      | 所有爬虫                                                                                                                                                                                                                                                                                         |
> | `nofollow`     | 要求机器人不跟随此页面上的链接。                                            | 所有爬虫                                                                                                                                                                                                                                                                                         |
> | `all`          | 与 `index, follow` 等价                                                     | [Google](https://support.google.com/webmasters/answer/79812)                                                                                                                                                                                                                                     |
> | `none`         | 与 `noindex, nofollow` 等价                                                 | [Google](https://support.google.com/webmasters/answer/79812)                                                                                                                                                                                                                                     |
> | `noarchive`    | 要求搜索引擎不缓存页面内容。                                                | [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives)、[Yahoo](https://help.yahoo.com/kb/search-for-desktop/SLN2213.html)、[Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240) |
> | `nosnippet`    | Prevents displaying any description of the page in search engine results.   | [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives)、[Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)                                                                     |
> | `noimageindex` | Requests this page not to appear as the referring page of an indexed image. | [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives)                                                                                                                                                                   |
> | `nocache`      | `noarchive` 的替代名称。                                                    | [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)                                                                                                                                                                                                     |
>
> 摘自——《[标准元数据名称 - HTML（超文本标记语言） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta/name#其他元数据名称)》

上面这些 meta 元素都是通用性的。此次之外，不同的搜索引擎会为自己的爬虫机器人制定专门的 meta 元素。

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

### Meta name="referrer"

referrer 指的是 HTTP Request 头部的 **`Referrer-Policy`** 。用于设置哪些访问来源信息会在 [`Referer`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referer) 中发送。

```html
<meta name="referrer" content="no-referrer" />
```

常用值域：

| 值                              | 描述                                                                                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| no-referrer                     | 整个 [`Referer`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referer) 首部会被移除。访问来源信息不随着请求一起发送。                                  |
| no-referrer-when-downgrade      | （默认值）在没有指定任何策略的情况下用户代理的默认行为。在同等安全级别的情况下，引用页面的地址会被发送 (HTTPS->HTTPS)，但是在降级的情况下不会被发送 (HTTPS->HTTP)。 |
| origin                          | 在任何情况下，仅发送文件的源作为引用地址。                                                                                                                          |
| origin-when-cross-origin        | 对于同源的请求，会发送完整的 URL 作为引用地址，但是对于非同源请求仅发送文件的源。                                                                                   |
| same-origin                     | 对于[同源的请求](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)会发送引用地址，但是对于非同源请求则不发送引用地址信息。                  |
| strict-origin                   | 在同等安全级别的情况下，发送文件的源作为引用地址 (HTTPS->HTTPS)，但是在降级的情况下不会发送 (HTTPS->HTTP)。                                                         |
| strict-origin-when-cross-origin | 对于同源的请求，会发送完整的 URL 作为引用地址；在同等安全级别的情况下，发送文件的源作为引用地址 (HTTPS->HTTPS)；在降级的情况下不发送此首部 (HTTPS->HTTP)。          |
| unsafe-url                      | 无论是同源请求还是非同源请求，都发送完整的 URL（移除参数信息之后）作为引用地址。                                                                                    |

> 注意：尽管也和 HTTP Head 有关。但并不是用 `http-equiv` 设置。

> 更多相关知识：[Referrer-Policy - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referrer-Policy)

### 移动端相关的 meta

移动端相关的 meta 非常多，正确使用移动端的 meta 元素非常重要。

#### name="viewport"

Meta name="viewport" 是移动端开发非常重要的一个 meta 元素。用于保证页面在手机上的显示效果。

如下：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no" />
```

这是比较常用的一种设置。现在网页宽度等于移动设备的宽度，初始缩放和最大缩放比例都为 1（也就是不缩放），不允许用户缩放。

> 值域说明：
>
> | 值              | 可能的附加值                           | 描述                                                                                                                                                                                                                                                            |
> | :-------------- | :------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | `width`         | 一个正整数，或者字符串 `device-width`  | 定义 viewport 的宽度，如果值为正整数，则单位为像素。                                                                                                                                                                                                            |
> | `height`        | 一个正整数，或者字符串 `device-height` | 定义 viewport 的高度。未被任何浏览器使用。                                                                                                                                                                                                                      |
> | `initial-scale` | 一个 `0.0` 和 `10.0` 之间的正数        | 定义设备宽度（宽度和高度中更小的那个：如果是纵向屏幕，就是 `device-width`，如果是横向屏幕，就是 `device-height`）与 viewport 大小之间的缩放比例。                                                                                                               |
> | `maximum-scale` | 一个 `0.0` 和 `10.0` 之间的正数        | 定义缩放的最大值，必须大于等于 `minimum-scale`，否则表现将不可预测。浏览器设置可以忽略此规则；iOS 10 开始，Safari iOS 默认忽略此规则。                                                                                                                          |
> | `minimum-scale` | 一个 `0.0` 和 `10.0` 之间的正数        | 定义缩放的最小值，必须小于等于 `maximum-scale`，否则表现将不可预测。浏览器设置可以忽略此规则；iOS 10 开始，Safari iOS 默认忽略此规则。                                                                                                                          |
> | `user-scalable` | `yes` 或者 `no`                        | 默认为 `yes`，如果设置为 `no`，用户将无法缩放当前页面。浏览器设置可以忽略此规则；iOS 10 开始，Safari iOS 默认忽略此规则。                                                                                                                                       |
> | `viewport-fit`  | `auto`、`contain` 或者 `cover`         | auto 值不影响初始布局视口，整个网页都是可见的。contain 值表示缩放视口以适应显示器内内接的最大矩形。cover 值表示缩放视口以填充设备显示。强烈建议使用[安全区域插入变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/env)，以确保重要内容不会出现在显示之外。 |
>
> 摘自——《[标准元数据名称 - HTML（超文本标记语言） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta/name#其他规范中定义的标准元数据名称)》

> 推荐阅读《[移动前端开发之 viewport 的深入理解 - 无双 - 博客园 (cnblogs.com)](https://www.cnblogs.com/2050/p/3877280.html)

#### UC 移动浏览器

```html
<!-- 在指定方向上锁定屏幕 锁定横/竖屏（UC移动浏览器） -->
<meta name="screen-orientation" content="landscape/portrait" />

<!-- 全屏显示此页面（UC移动浏览器） -->
<meta name="full-screen" content="yes" />

<!-- 即使在“文本模式”下，UC浏览器也会显示图片（UC移动浏览器） -->
<meta name="imagemode" content="force" />

<!-- 页面将以“应用模式”显示 全屏、禁止手势等（UC移动浏览器） -->
<meta name="browsermode" content="application" />

<!-- 在此页面禁用“夜间模式”（UC移动浏览器） -->
<meta name="nightmode" content="disable" />

<!-- 简化页面 减少数据传输（UC移动浏览器） -->
<meta name="layoutmode" content="fitscreen" />

<!-- 禁用的UC浏览器的功能，“当此页面中有较多文本时缩放字体”（UC移动浏览器） -->
<meta name="wap-font-scale" content="no" />
```

#### QQ 移动浏览器

```html
<!-- 在指定方向上锁定屏幕 锁定横/竖屏（QQ移动浏览器） -->
<meta name="x5-orientation" content="landscape/portrait" />

<!-- 全屏显示此页面（QQ移动浏览器） -->
<meta name="x5-fullscreen" content="true" />

<!-- 页面将以“应用模式”显示/全屏等（QQ移动浏览器） -->
<meta name="x5-page-mode" content="app" />
```

### IOS

```html
<!-- 添加到主屏后的标题（iOS 6 新增） -->
<meta name="apple-mobile-web-app-title" content="标题" />

<!-- 是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏 -->
<meta name="apple-mobile-web-app-capable" content="yes" />

<!-- 添加智能 App 广告条 Smart App Banner（iOS 6+ Safari） -->
<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL" />

<!-- 设置苹果工具栏颜色 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" />

<!-- iOS 图标 begin -->
<!-- iPhone 和 iTouch，默认 57x57 像素，必须有 -->
<link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-57x57-precomposed.png" />
<!-- Retina iPhone 和 Retina iTouch，114x114 像素，可以没有，但推荐有 -->
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/apple-touch-icon-114x114-precomposed.png" />
<!-- Retina iPad，144x144 像素，可以没有，但推荐有 -->
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="/apple-touch-icon-144x144-precomposed.png" />
<!-- iOS 图标 end -->

<!-- iOS 启动画面 begin -->
<!-- iPad 竖屏 768 x 1004（标准分辨率） -->
<link rel="apple-touch-startup-image" sizes="768x1004" href="/splash-screen-768x1004.png" />
<!-- iPad 竖屏 1536x2008（Retina） -->
<link rel="apple-touch-startup-image" sizes="1536x2008" href="/splash-screen-1536x2008.png" />
<!-- iPad 横屏 1024x748（标准分辨率） -->
<link rel="apple-touch-startup-image" sizes="1024x748" href="/Default-Portrait-1024x748.png" />
<!-- iPad 横屏 2048x1496（Retina） -->
<link rel="apple-touch-startup-image" sizes="2048x1496" href="/splash-screen-2048x1496.png" />
<!-- iPhone/iPod Touch 竖屏 320x480 (标准分辨率) -->
<link rel="apple-touch-startup-image" href="/splash-screen-320x480.png" />
<!-- iPhone/iPod Touch 竖屏 640x960 (Retina) -->
<link rel="apple-touch-startup-image" sizes="640x960" href="/splash-screen-640x960.png" />
<!-- iPhone 5/iPod Touch 5 竖屏 640x1136 (Retina) -->
<link rel="apple-touch-startup-image" sizes="640x1136" href="/splash-screen-640x1136.png" />
<!-- iOS 启动画面 end -->
```

### 其他 meta 元素

```html
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait" />

<!-- 不让百度转码 原网页呈献给移动端 -->
<meta http-equiv="Cache-Control" content="no-transform" />
<meta http-equiv="Cache-Control" content="no-siteapp" />

<!-- Web应用程序的名称(仅网站被用作一个应用时才使用它) -->
<meta name="application-name" content="应用名称" />

<!-- 验证 Google 搜索控制台的所有权 -->
<meta name="google-site-verification" content="verification_token" />

<!-- 验证 Yandex 网站管理员的所有权 -->
<meta name="yandex-verification" content="verification_token" />

<!-- 验证 Bing 网站管理员中心的所有权 -->
<meta name="msvalidate.01" content="verification_token" />

<!-- 验证 Alexa 控制台的所有权 -->
<meta name="alexaVerifyID" content="verification_token" />

<!-- 验证 Pinterest 控制台的所有权 -->
<meta name="p:domain_verify" content="code from pinterest" />

<!-- 验证 Norton 安全站点的所有权 -->
<meta name="norton-safeweb-site-verification" content="norton code" />

<!-- 生成此页面的软件的标识符（identifier）（如WordPress、Dreamweaver） -->
<meta name="generator" content="program" />

<!-- 基于网站内容给出一般的年龄分级 -->
<meta name="rating" content="General" />

<!-- 禁用自动检测和格式化可能的电话号码 -->
<meta name="format-detection" content="telephone=no" />

<!-- 地理标签 -->
<meta name="ICBM" content="latitude, longitude" />
<meta name="geo.position" content="latitude;longitude" />

<!-- 国家代码 (ISO 3166-1): 强制性, 州代码 (ISO 3166-2): 可选; 如 content="US" / content="US-NY" -->
<meta name="geo.region" content="country[-state]" />

<!-- Windows 8 磁贴颜色 -->
<meta name="msapplication-TileColor" content="#000" />

<!-- Windows 8 磁贴图标 -->
<meta name="msapplication-TileImage" content="icon.png" />

<!--即这种协议可以让网页成为一个“富媒体对象”。
		用了Meta Property=og标签，就是你同意了网页内容可以被其他社会化网站引用等，目前这种协议被SNS网站如Fackbook、renren采用。
		SNS已经成为网络上的一大热门应用，优质的内容通过分享在好友间迅速传播。为了提高站外内容的传播效率，2010年F8会议上Facebook公布 了一套开放内容协议		(Open Graph Protocol)，任何网页只要遵守该协议，SNS就能从页面上提取最有效的信息并呈现给用户 -->
<meta property="og:type" content="类型" />
<meta property="og:url" content="URL地址" />
<meta property="og:title" content="标题" />
<meta property="og:image" content="图片" />
<meta property="og:description" content="描述" />

<!-- IE10: 禁用链接点击高亮 -->
<meta name="skype_toolbar" content="skype_toolbar_parser_compatible" />

<!-- 选择渲染引擎（360浏览器） -->
<meta name="renderer" content="webkit|ie-comp|ie-stand" />
```

## 参考文章

- [标签里有什么？Metadata-HTML 中的元数据 - 学习 Web 开发 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)
- [<meta>：文档级元数据元素 - HTML（超文本标记语言） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)
- [HTML DOM Meta 对象 (w3school.com.cn)](https://www.w3school.com.cn/jsref/dom_obj_meta.asp)
- [Content categories - Developer guides | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories)
- [meta 标签的作用及整理\_阿 Q 虾米的博客-CSDN 博客\_mate 标签](https://blog.csdn.net/yc123h/article/details/51356143)
- [HTML meta 标签 看这篇就够了 - 掘金 (juejin.cn)](https://juejin.cn/post/6844904099184377870#heading-4)
- [标准元数据名称 - HTML（超文本标记语言） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta/name)
- [Google 可以识别的元标记和内嵌标记 | Google 搜索中心 | 文档 | Google Developers](https://developers.google.cn/search/docs/advanced/crawling/special-tags?hl=zh-cn)
