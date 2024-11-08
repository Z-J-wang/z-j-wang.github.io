---
author: 王志杰
date: 2024-09-22
keywords: robots.txt,SEO,搜索引擎优化
description: robots.txt 文件是网站对搜索引擎抓取工具的抓取行为的规则声明。robots.txt 文件中写明了**什么搜索引擎抓取工具可以做什么事**。它就类似于学校的学生行为规范。
---

# 第三章：robots.txt

## 简介

robots.txt 文件是网站对搜索引擎抓取工具[^1]的抓取行为的规则声明。robots.txt 文件中写明了**什么搜索引擎抓取工具可以做什么事**。它就类似于学校的学生行为规范。

### robots.txt 的作用

**robots.txt 主要用于限制抓取工具对资源访问**。例如不想让抓取工具抓取不重要或者相似的网页。

> robots.txt 除了可以规定抓取工具对网页的抓取行为，还可以规定抓取工具对媒体文件以及资源文件的抓取行为。

### robots.txt 的不足

需要注意的是，robots.txt 并不能完全阻止网页被收录。原因如下：

- **并非所有的搜索引擎都支持 robots.txt**。robots.txt 文件中的命令并不能强制规范抓取工具对网站采取的行为；是否遵循这些规范由抓取工具自行决定。一般的，正规的搜索引擎抓取工具都会遵循 robots.txt 文件中的规则。
- **不同的搜索引擎抓取工具会以不同的方式解析语法**。需要为不同的搜索引擎抓取工具编写不同的语法。
- **如果其他网站上有链接指向被 robots.txt 文件屏蔽的网页，则此网页仍可能会被编入索引**。阻止网页被收录的正确做法应该是为服务器上的文件设置密码保护、使用 noindex 元标记或响应标头，或者彻底移除网页。

## 创建 robots.txt

对 robots.txt 有了初步了解后，接下来就是创建 robots.txt。
创建 robots.txt 步骤非常简单：**编写 robots.txt 文件，然后将写好的 robots.txt 文件上传的服务器的正确位置即可**。

### 第一步：编写 robots.txt

先来了解 robots.txt 的构成：

> robots.txt 是一种遵循[漫游器排除标准](https://en.wikipedia.org/wiki/Robots_exclusion_standard#About_the_standard)的纯文本文件，由一条或多条规则组成。每条规则可禁止或允许特定抓取工具抓取相应网站的指定文件路径下的文件。除非您在 robots.txt 文件中另行指定，否则所有文件均隐式允许抓取。
>
> ——摘抄自《[创建 robots.txt 文件](https://developers.google.cn/search/docs/advanced/robots/create-robots-txt?hl=zh-cn)》

robots.txt 是由一条条规则组成的。创建 robots.txt，也就是编写 robots.txt 规则然后将编写好的文件保存为纯文本文件。

下面是一个适用于 Google 的 robots.txt 文件，其包含两条规则：

```text
User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: *
Allow: /
```

**其含义如下**：

1. 名为 Googlebot 的用户代理（即，Google 的抓取工具）不能抓取任何以 `http://example.com/nogooglebot/` 开头的网址。
2. 其他搜索引擎抓取工具均可抓取整个网站。不指定这条规则也无妨，结果是一样的；默认行为是搜索引擎抓取工具可以抓取整个网站。

> 注意：robots.txt 文件必须是采用`UTF-8`编码（包括 ASCII）的文本文件。Google 可能会忽略不属于`UTF-8`范围的字符，从而可能会导致 robots.txt 规则无效。

##### robots.txt 的基本指令

一条规则主要由`User-agent`、`allow`、`disallow`三个指令组成：

| 指令         | 是否必需                                                          | 数值类型      | 描述                                                                                                                                                                                                                  |
| ------------ | ----------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `User-agent` | required（每条规则需含一个或多个）                                | [name]        | 指定了规则适用的抓取工具。必须在 `allow`/`disallow`的前面。指定多个抓取工具时可以列举多个 `User-agent`。`User-agent: *`表示匹配所有的抓取工具。                                                                       |
| `allow`      | optional（每条规则需含至少一个或多个 `disallow` 或 `allow` 条目） | [path]        | 其值为**路径/目录**（相对于根网域）。用于指定**允许**访问的**目录与网页**。如果指定的是网页，则必须提供浏览器中显示的完整网页名称且必须以 `/` 字符开头；如果指定的是某个目录，则必须以 `/` 标记结尾。**区分大小写**。 |
| `disallow`   | optional（每条规则需含至少一个或多个 `disallow` 或 `allow` 条目） | [path]        | 其值为**路径/目录**（相对于根网域）。用于指定**禁止**访问的**目录与网页**。如果指定的是网页，则必须提供浏览器中显示的完整网页名称且必须以 `/` 字符开头；如果指定的是某个目录，则必须以 `/` 标记结尾。**区分大小写**。 |
| `sitemap`    | optional（每个文件可含零个或多个 sitemap 条目）                   | [absoluteURL] | 其值为**绝对路径**。用于指出网站的站点地图的位置。                                                                                                                                                                    |

举例：

```text
user-agent: otherbot
disallow: /kale

sitemap: https://example.com/sitemap.xml
```

#### 规则分组

一般来说，一个`user-agent`指令搭配`allow`/`disallow`就组成了一条规则。如

```
## 规则一
user-agent: e
disallow: /g

## 规则二
user-agent: f
disallow: /g
```

不过，上面两个规则是可以组合在一块写的：

```
## 规则一与规则二合并成一组
user-agent: e
user-agent: f
disallow: /g
```

即，将具有相关规则的`user-agent`指令写在一块，组成**规则组**。

事实上，一条`user-agent`的规则也是一个规则组，它是最小、最基本的规则组。

又如:

```
user-agent: a
disallow: /c

user-agent: b
disallow: /d

user-agent: e
user-agent: f
disallow: /g

user-agent: h
```

上面示例中有四个不同的规则组：

- 用户代理“a”为一组
- 用户代理“b”为一组
- 用户代理“e”和“f”为一组
- 用户代理“h”为一组

##### robots.txt 编写说明

> 1. robots.txt 文件包含一个或多个规则组；
>
> 2. 每个组由多条规则或指令（命令）组成，每条指令各占一行。每个组都以 `User-agent` 行开头，该行指定了组适用的目标。
>
> 3. 每个组包含以下信息：
>
>    - 组的适用对象（用户代理）
>
>    - 代理可以访问的目录或文件。
>
>    - 代理无法访问的目录或文件。
>
> 4. 抓取工具会按从上到下的顺序处理组。一个用户代理只能匹配 1 个规则集（即与相应用户代理匹配的首个最具体组）。
>
> 5. 系统的默认假设是：用户代理可以抓取所有未被 `disallow` 规则屏蔽的网页或目录。
>
> 6. 规则区分大小写。例如，`disallow: /file.asp` 适用于 `https://www.example.com/file.asp`，但不适用于 `https://www.example.com/FILE.asp`。
>
> 7. `#` 字符表示注释的开始处。
>
> ——摘抄自《[创建 robots.txt 文件](https://developers.google.cn/search/docs/advanced/robots/create-robots-txt?hl=zh-cn)》

### 第二步：将 robots.txt 放置到服务器的正确位置

写好 robots.txt 后，剩下的就是将 robots.txt 放置到服务器的正确位置——**robots.txt 文件必须位于其要应用到的网站主机的根目录下，且文件名必须是 robots.txt**。

基于上面的要求，可以得出如下几个要点：

- **文件必须命名为 robots.txt**
- **网站只能有 1 个 robots.txt 文件**。
- **robots.txt 文件必须位于其要应用到的网站主机的根目录下**。例如，若要控制对 `https://www.example.com/` 下所有网址的抓取，就必须将 robots.txt 文件放在 `https://www.example.com/robots.txt` 下，一定不能将其放在子目录中（例如 `https://example.com/pages/robots.txt` 下）。

## 搜索引擎对 robots.txt 的处理

> 以 Google 为例

### 用户代理的优先顺序

> 对于某个抓取工具而言，只有一个组是有效的。Google 抓取工具会在 robots.txt 文件中查找与抓取工具相匹配的最具体的规则组，从而确定正确的规则组。其他组会被忽略。所有非匹配文本都会被忽略（例如，`googlebot/1.2` 和 `googlebot*` 均等同于 `googlebot`）。这与 robots.txt 文件中的组顺序无关。
>
> 如果为抓取工具声明多个特定规则组，则这些规则组中适用于该抓取工具的规则会在自动合并成一个规则组。 特定的抓取工具的规则组和全局规则组 (`*`) 不会合并。
>
> ——摘抄自《[Google 如何解读 robots.txt 规范](https://developers.google.com/search/docs/advanced/robots/robots_txt)》

如果 robots.txt 文件中有多个规则组与特定抓取工具相关，则 Google 抓取工具会在内部合并这些组。如：

```
user-agent: googlebot-news
disallow: /fish

user-agent: *
disallow: /carrots

user-agent: googlebot-news
disallow: /shrimp
```

抓取工具会自动合并并分组：

```
user-agent: googlebot-news
disallow: /fish
disallow: /shrimp

user-agent: *
disallow: /carrots
```

> 如果想要进一步了解，可通过此链接学习：https://developers.google.com/search/docs/advanced/robots/robots_txt#order-of-precedence-for-user-agents

#### 规则的优先顺序

匹配 robots.txt 规则与网址时，抓取工具会根据规则路径的长度使用最具体的规则。如果规则（包括使用通配符的规则）存在冲突，Google 将使用限制性最弱的规则。

> 相关案例说明：https://developers.google.com/search/docs/advanced/robots/robots_txt#order-of-precedence-for-rules

### 参考文章

- 《[Robots.txt 简介与指南 | Google 搜索中心 | 文档 | Google Developers](https://developers.google.com/search/docs/advanced/robots/intro)》
- 《[创建并提交 robots.txt 文件 | Google 搜索中心 | 文档 | Google Developers](https://developers.google.com/search/docs/advanced/robots/create-robots-txt)》
- 《[Google 如何解读 robots.txt 规范 | 文档 | Google Developers](https://developers.google.com/search/docs/advanced/robots/robots_txt)》

[^1]: 搜索引擎抓取工具是一种由搜索引擎公司开发的自动访问网站并收录网站的脚本机器人。俗称爬虫。
