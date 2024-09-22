---
author: 王志杰
description: 前端与 SEO，第二章：站点地图 （sitemap）
keywords: SEO,前端,优化,搜索引擎,网站排名,搜索引擎优化,网站收录,网站优化,前端优化,搜索引擎抓取,robots.txt,sitemap
---

# 第二章：站点地图

## 什么是 sitemap

顾名思义，sitemap 就是网站的地图。这张“地图”描述的是网站中各个网页、图片、视频或其他文件的有关信息,甚至还可以说明这些内容之间的关系。sitemap 以文件的形式存放在域名根路径下。**需要注意的是**，这张“地图”并不是给用户看的，而是专为**搜索引擎抓取工具**[^1]: 设计的。搜索引擎会让抓取工具爬取 sitemap 文件，以便更高效的收录网站的网址。

## 为什么需要 sitemap？

> 搜索引擎的工作原理：
>
> 当搜索引擎获取的一个 URL，就会尝试去访问并解析该 URL 的网页。在解析的过程中，如果遇到新的 URL 同样会去访问解析。

搜索引擎的工作机制是**由点及面**。只要搜索引擎获取到网站的任意一个网页地址，它就有可能收录网站全部的页面。**但是！这是在理想条件下能达到的效果**。所以上面写的是”可能“，而不是”一定“。理想条件有主要两点：

1. 必须保证：**无论搜索引擎从那个页面进入网站，都能有一条路径可以访问到网站的任意页面**。（这个路径可以通过多次跳转来实现）

2. **路径的嵌套层次不能太深**，即入口网页到目标网页中间跳转次数不能太多。因为搜索引擎的深度遍历访问的深度是有限制的。嵌套太深，搜索引擎就可能访问不到了。

> 除开上面两点，还有非常重要的一点是：必须保证每个网页都允许浏览器抓取。
>
> 之所以没有在上面列举出来，是因为如果网页不允许搜索引擎抓取，做什么优化都没用。

**如果我们能保证理想条件的成立，网站可以不需要 sitemap。**

其实，许多网站都会在**footer 部分**把网站的全部页面列举出来，这其实算是一种 sitemap。不过这个方法对于规模较大的网站就不太友好了。因为大量的列举网页必定会导致 **footer 部分**篇幅过大大，会影响页面整体的效果。所以这个做法外，部分网站还会创建一个单独的网页，用来专门把全部的网页列举出来。这样就避免了对页面展示效果的影响。

> 这时可能人就觉得：“在 **footer 部分**放用户用不到的链接会不会不太好“。
>
> 确实会有这个弊端！
>
> 那通过 CSS 隐藏起来，不让用户看的是不是可以呢？理论来说可以。但是会违反部分搜索引擎的“质量指南”。
>
> “这也不行，那也不行“，就没有一劳永逸的方法吗？
>
> **上面的方法比较简陋且存在影响页面效果，维护成本较高，不灵活的弊端**。

因此人们就设计出了”sitemap“这一利器。sitemap 是专门为搜索引擎设计的，它是一个文本文件，存放在域名根路径。正常情况下，用户不会去主动访问。搜索引擎抓取工具在访问一个域名时会优先抓取 sitemap。此外，sitemap 列举项不仅仅局限于网页地址，还可以列举多媒体资源。

相较于【在页面上罗列地址】的方法，sitemap 有诸如以下的优点：

- 独立于页面，不影响页面效果
- 涵盖信息更加全面，如优先级、更新时间、抓取频率、网址
- 种类更加丰富，出了列举网址，还可以列举多媒体资源
- 维护更加简单，可随时更新，无需担心影响用户体验
- ……

> <font color="red">注意</font>：
>
> sitemap 仅仅是一个辅助手段。一般来说，在 sitemap 列举的网址，抓取工具都会去访问。但那些未在 sitemap 列举出来的网址，并不意味着其不会被收录。如果你不想要搜索引擎收录某个网址，不应该通过 sitemap 来限制，它并不能实现你的目的。你应该使用 robots.txt。

## sitemap 的文件格式

上面有提及到 sitemap 除了可以列举网页地址外，还可以列举网站中的多媒体资源。因此 sitemap 的文件格式也是多样的。

以 Google 为例，支出的格式有：

- TXT
- XML
- RSS、mRSS 和 Atom 1.0

### TXT

TXT 格式的 sitemap 是最简单的一种形式，如果你的 sitemap 只包含网页网址完全可以采用 TXT 格式。例如：

```html
http://www.example.com/file1.html http://www.example.com/file2.html
```

> <font color="#e77c8e">注意</font>：每一行只能包含一个网址。

### XML

相对于 TXT，XML 除了可以列举网页网址外，还可以对网页补充一些描述信息。例如：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
      <loc>http://www.example.com/</loc>
      <lastmod>2005-01-01</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
   </url>
</urlset>
```

> 字段说明：
>
> | 属性           |      | 描述                                                                                                                                                                                                                                                                                                                                                         |
> | :------------- | :--- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | `<urlset>`     | 必填 | 封装文件并引用当前协议标准。                                                                                                                                                                                                                                                                                                                                 |
> | `<url>`        | 必填 | 每个 URL 条目的父标记。其余标记是此标记的子项。                                                                                                                                                                                                                                                                                                              |
> | `<loc>`        | 必填 | 页面的网址。此 URL 必须以协议（如 http）开头，并以尾部斜杠结尾（如果您的 Web 服务器需要）。此值必须小于 2048 个字符。                                                                                                                                                                                                                                        |
> | `<lastmod>`    | 自选 | 上次修改页面的日期。此日期应采用 [W3C 日期时间](http://www.w3.org/TR/NOTE-datetime)格式。如果需要，此格式允许您省略时间部分，并使用 YYYY-MM-DD。请注意，必须将日期设置为上次修改链接网页的日期，而不是生成 sitemap 的日期。另请注意，此标记与服务器可以返回的 If-Modified-Since （304） 标头是分开的，并且搜索引擎可能会以不同的方式使用来自这两个源的信息。 |
> | `<changefreq>` | 自选 | 页面可能更改的频率。请注意，此标记的值被视为*提示*，而不是命令。                                                                                                                                                                                                                                                                                             |
> | `<priority>`   | 自选 | 此网址相对于您网站上其他网址的优先级。有效值范围为 0.0 到 1.0。此值不会影响您的网页与其他网站上的网页的比较方式，它只会让搜索引擎知道您认为哪些网页对抓取工具最重要。页面的默认优先级为 0.5。由于优先级是相对的，因此它仅用于在网站上的 URL 之间进行选择。                                                                                                   |
>
> 上面的只是简单的示例。建议访问 [sitemaps.org](https://www.sitemaps.org/en_GB/protocol.html) 做详细的了解。

### RSS、mRSS 和 Atom 1.0

此外，google 还支持 RRS、mRSS、Atom 1.0 来充当 sitemap。

> Google 说明如下：
>
> 如果您的博客有 RSS 或 Atom Feed，那么您可以将该 Feed 的网址作为 sitemap 提交。 大多数博客软件都能为您创建 Feed，但请注意，此类 Feed 只会提供关于近期网址的信息。
>
> - Google 支持 RSS 2.0 Feed 和 Atom 1.0 Feed。
> - 您可以使用 [mRSS（媒体 RSS）Feed](https://developers.google.cn/search/docs/advanced/sitemaps/video-sitemaps?hl=zh-cn) 向 Google 提供有关您网站上视频内容的详情。

看个例子 mRSS 例子：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">
<channel>
<title>Example MRSS</title>
<link>http://www.example.com/examples/mrss/</link>
<description>MRSS Example</description>
  <item xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">
    <link>http://www.example.com/examples/mrss/example.html</link>
    <media:content url="http://www.example.com/examples/mrss/example.flv" fileSize="405321"
      type="video/x-flv" height="240" width="320" duration="120" medium="video" isDefault="true">
      <media:player url="http://www.example.com/shows/example/video.swf?flash_params" />
      <media:title>Grilling Steaks for Summer</media:title>
      <media:description>Get perfectly done steaks every time</media:description>
      <media:thumbnail url="http://www.example.com/examples/mrss/example.png" height="120" width="160"/>
      <media:price price="19.99" currency="EUR" />
      <media:price type="subscription" />
    </media:content>
    <media:restriction relationship="allow" type="country">us ca</media:restriction>
    <dcterms:valid xmlns:dcterms="http://purl.org/dc/terms/">end=2020-10-15T00:00+01:00; scheme=W3C-DTF</dcterms:valid>
    <dcterms:type>live-video</dcterms:type>
  </item>
</channel>
</rss>
```

可以看到，有点像 XML。其实，RSS、mRSS、Atom 1.0 都是基于 XML 扩展出来的 Web 网络数据交互规范。

> RSS、mRSS、Atom 1.0 的异同:
>
> - 相同点：用于发布站点更新的 XML 文档格式
> - 不同点：
>   - 格式不一样
>   - RSS 用于经常更新资料的网站，例如博客、新闻的网摘;
>   - mRSS 是用于整合多媒体文件的 RSS 扩展项。它对内容的描述比 RSS 标准要详细得多;
>   - Atom 是一个相对较新的规范，比 RSS 更强大，功能更丰富。

## 多媒体的 sitemap

部分搜索引擎还支持为网站中的多媒体资源设置 sitemap，有助于搜索引擎收录抓取工具可能无法爬取到的多媒体资源。（例如，通过 JavaScript 添加的图片）

### 图片 sitemap

图片 sitemap 使用的是 XML 格式。如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>http://example.com/sample1.html</loc>
    <image:image>
      <image:loc>http://example.com/image.jpg</image:loc>
    </image:image>
    <image:image>
      <image:loc>http://example.com/photo.jpg</image:loc>
    </image:image>
  </url>
  <url>
    <loc>http://example.com/sample2.html</loc>
    <image:image>
      <image:loc>http://example.com/picture.jpg</image:loc>
    </image:image>
  </url>
</urlset>
```

### 视频 sitemap

视频 sitemap 支持 XML 格式以及 mRSS。

XML 示例如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
   <url>
     <loc>http://www.example.com/videos/some_video_landing_page.html</loc>
     <video:video>
       <video:thumbnail_loc>http://www.example.com/thumbs/123.jpg</video:thumbnail_loc>
       <video:title>Grilling steaks for summer</video:title>
       <video:description>Alkis shows you how to get perfectly done steaks every
         time</video:description>
       <video:content_loc>
          http://streamserver.example.com/video123.mp4</video:content_loc>
       <video:player_loc>
         http://www.example.com/videoplayer.php?video=123</video:player_loc>
       <video:duration>600</video:duration>
       <video:expiration_date>2021-11-05T19:20:30+08:00</video:expiration_date>
       <video:rating>4.2</video:rating>
       <video:view_count>12345</video:view_count>
       <video:publication_date>2007-11-05T19:20:30+08:00</video:publication_date>
       <video:family_friendly>yes</video:family_friendly>
       <video:restriction relationship="allow">IE GB US CA</video:restriction>
       <video:price currency="EUR">1.99</video:price>
       <video:requires_subscription>yes</video:requires_subscription>
       <video:uploader
         info="http://www.example.com/users/grillymcgrillerson">GrillyMcGrillerson
       </video:uploader>
       <video:live>no</video:live>
     </video:video>
   </url>
</urlset>
```

mRSS 示例：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">
<channel>
<title>Example MRSS</title>
<link>http://www.example.com/examples/mrss/</link>
<description>MRSS Example</description>
  <item xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">
    <link>http://www.example.com/examples/mrss/example.html</link>
    <media:content url="http://www.example.com/examples/mrss/example.flv" fileSize="405321"
      type="video/x-flv" height="240" width="320" duration="120" medium="video" isDefault="true">
      <media:player url="http://www.example.com/shows/example/video.swf?flash_params" />
      <media:title>Grilling Steaks for Summer</media:title>
      <media:description>Get perfectly done steaks every time</media:description>
      <media:thumbnail url="http://www.example.com/examples/mrss/example.png" height="120" width="160"/>
      <media:price price="19.99" currency="EUR" />
      <media:price type="subscription" />
    </media:content>
    <media:restriction relationship="allow" type="country">us ca</media:restriction>
    <dcterms:valid xmlns:dcterms="http://purl.org/dc/terms/">end=2020-10-15T00:00+01:00; scheme=W3C-DTF</dcterms:valid>
    <dcterms:type>live-video</dcterms:type>
  </item>
</channel>
</rss>
```

> 此外，Google 也支持创建新闻 sitemap，可通过以下链接做详细了解：
>
> - [图片 sitemap](https://developers.google.cn/search/docs/advanced/sitemaps/image-sitemaps?hl=zh-cn)
> - [视频 sitemap 和替代方案](https://developers.google.cn/search/docs/advanced/sitemaps/video-sitemaps?hl=zh-cn)
> - [Google 新闻 sitemap](https://developers.google.cn/search/docs/advanced/sitemaps/news-sitemap?hl=zh-cn)

## sitemap 的创建

sitemap 的创建有三种常用方式：

1. 手动创建 sitemap
2. 通过 CMS 平台创建 sitemap
3. 通过工具自动生成 sitemap

### 手动创建 sitemap

手动创建是最直接的的方式，如果要创建的站点地地图规模比较小，可以选择这种方式。只需要在文本编辑器按所要求的格式编写站点即可。

### 通过 CMS 平台创建 sitemap

如果网站是通过 CMS 平台创建的，那 CMS 平台可能提供 sitemap 的创建功能，或者已经自动生成了。

> CMS 平台：
>
> CMS 平台（content management system，即内容管理系统平台）是一款可以让我们轻松管理内容和创建网站的软件。CMS 平台允许我们在不编写代码的情况下制作网站。
>
> 常用的 CMS 平台有：WordPress、Wix 或 Blogger
>
> 关于 CMS 更多知识，推荐阅读：[2021 年 15 个最佳和最受欢迎的 CMS 平台（比较）](https://zhuanlan.zhihu.com/p/429851444)

### 通过工具自动生成 sitemap

对于规模比较大的网站，建议通过工具来自动生成。不过需要注意的是，自动生成工具也是通过链接爬取的形式来生成 sitemap 的。所以，那些抓取工具无法访问到的网址，照样是不会出现在生成的 sitemap 中。这就需要我们手动对生成的 sitemap 进行二次编辑了。

## 拆分较大的 sitemap

如果 sitemap 文件过大（如大于 50M），那就需要对 sitemap 做拆分，然后创建一个**sitemap 索引文件**来引导搜索引擎。

sitemap 索引文件是一个 XML 文件，使用以下 XML 标记：

- `sitemapindex` - 文件头尾的父标记
- `sitemap` - 文件中列出的每个 sitemap 的父标记（`sitemapindex` 标记的子级）
- `loc` - sitemap 的位置（`sitemap` 标记的子级）

例如：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>http://www.example.com/sitemap1.xml.gz</loc>
  </sitemap>
  <sitemap>
    <loc>http://www.example.com/sitemap2.xml.gz</loc>
  </sitemap>
</sitemapindex>
```

## sitemap 的注意事项

最后，列举一下 sitemap 的一些注意事项：

> 以下注意事项参考了 Google 文档，对其做了一些删减，抽取出比较通用的部分。
>
> Google 文档地址：[sitemap 一般指南](https://developers.google.cn/search/docs/advanced/sitemaps/build-sitemap?hl=zh-cn#general-guidelines)

1. **使用一致且完全限定的网址。** 例如，如果网站位于 `https://www.example.com/`，请勿将网址指定为 `https://example.com/`（缺少 `www`）或 `./mypage.html`（相对网址）。
2. **sitemap 可以发布在网站上的任何位置，但是 sitemap 只影响父级目录中的下级目录**。
3. **请勿在 sitemap 中包含网址的会话 ID**。这样可以减少对这些网址的重复抓取。
4. **采用 UTF-8 编码**
5. **将较大的 sitemap 拆分成数个较小的 sitemap**
6. **仅列出[规范网址](https://developers.google.cn/search/docs/advanced/crawling/consolidate-duplicate-urls?hl=zh-cn)**。
7. **请注意，sitemap 用于向 Google 建议**您认为重要的网页，Google 不承诺会抓取 sitemap 中的每个网址。

[^1]: 搜索引擎抓取工具是一种由搜索引擎公司开发的自动访问网站并收录网站的脚本机器人。俗称爬虫。
