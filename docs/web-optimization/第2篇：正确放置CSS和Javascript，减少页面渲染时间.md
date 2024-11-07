# Web 性能优化——正确放置 CSS 和 Javascript，减少页面渲染时间

> [!warning] 阅前悉知
>
> - 其一、**本文是[《Web 性能优化》](./index.md)系列的第二篇。该系列是我查阅了大量资料总结而来的。其中可能存在不足之处。`希望大家在阅读时，抱着质疑的态度去阅读`**。
> - 其二、因为本文内容是承接本系列的第一篇文章所讲内容。所以阅读本文前，希望各位优先看下第一篇：[《Web 优化——简述访问某个网址浏览器背后所做的工作》](./第1篇：简述访问某个网址浏览器背后所做的工作)。有第一篇的基础，可以比较好的进行理解。
> - 其三、本文将从 CSS 和 JavaScript 两者出发，讲述如何减少页面渲染时间。

### 前言

在《Web 优化——简述访问某个网址浏览器背后所做的工作》一文中了解到浏览器`渲染页面`的工作原理：

> 浏览器会解析 HTML 文件以及 CSS 文件生成`DOM Tree`和`CSS Rule Tree`，两者结合生成`Rendering(渲染) Tree`。接着执行布局过程（`layout`和`reflow`），确定每个节点在屏幕上的确切坐标。最后调用操作系统 Native GUI 的 API，paint(绘制)`Rendering(渲染) Tree`每个节点。
>
> 这个过程有两个特点：
>
> - 其一，如果渲染过程中（包括刚刚渲染完时），加载解析 CSS，会引发**Reflow（回流）与 Repaint（重绘）**。
>
> - 其二，如果浏览器加载到`<script>`会暂停渲染，优先去加载、解析、执行 Javascript。直到 Javascrip 执行完成。这是因为 Javascript 可能会影响`Rendering(渲染) Tree`。

如果对上面存在疑问，可查阅[《Web 优化——简述访问某个网址浏览器背后所做的工作》]()做进一步了解。

### 优化一：将 CSS 放在页面最上面，Javascript 放在页面最下面

切确的说，建议把 CSS 文件`<head>`里，将`<script>`移到`<body>`标签最底部。

理由如下：

- 把 CSS 文件`<head>`里：这样做可以使尽量多的 CSS 在渲染前可以被加载、解析。这样一来，即使因为`CSS Rule Tree`的变动导致**Reflow（回流）与 Repaint（重绘）**，造成的影响也已经降到最小了。
- 将`<script>`移到`<body>`标签最底部：与 CSS 相反，Javascript 则是建议放在`<body>`标签最底部。上面说到，`<script>`会阻塞页面的渲染。因为浏览器是解析、渲染完一部分就显示一部分。将`<script>`移到`<body>`标签最底部，这样就可以保证需要显示在网页上的部分不会被`<script>`阻塞。这样用户就不会在视觉上感受到`<script>`造成的阻塞了。但如果页面解析时就需要用到 javascript，这时放到底部就不合适了。

### 优化二：对编写 CSS 选择器的建议

**一般的，大多数人都认为 CSS 选择器的匹配规则是从左往右。但是，实际上 CSS 选择器的匹配规则是从右往左的！**

例如：`.list li{}`。浏览器就会先把页面中所有的`<li>`进行匹配，再从这些`<li>`中查找`.list`。

###### 这么做的原因

上面提及到，浏览器的渲染时根据解析生成的`DOM Tree`，CSS 选择器的匹配规则**从右往左**正是为快速从 Tree 中查找出匹配的元素。专业解释如下：

> - HTML 经过解析生成 DOM Tree（这个我们比较熟悉）；而在 CSS 解析完毕后，需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render Tree，最终用来进行绘图。Render Tree 中的元素（WebKit 中称为「renderers」，Firefox 下为「frames」）与 DOM 元素相对应，但非一一对应：一个 DOM 元素可能会对应多个 renderer，如文本折行后，不同的「行」会成为 render tree 种不同的 renderer。也有的 DOM 元素被 Render Tree 完全无视，比如 display:none 的元素。
>
> - 在建立 Render Tree 时（WebKit 中的「Attachment」过程），浏览器就要为每个 DOM Tree 中的元素根据 CSS 的解析结果（Style Rules）来确定生成怎样的 renderer。对于每个 DOM 元素，必须在所有 Style Rules 中找到符合的 selector 并将对应的规则进行合并。选择器的「解析」实际是在这里执行的，在遍历 DOM Tree 时，从 Style Rules 中去寻找对应的 selector。
>
> - 因为所有样式规则可能数量很大，而且绝大多数不会匹配到当前的 DOM 元素（因为数量很大所以一般会建立规则索引树），所以有一个快速的方法来判断「这个 selector 不匹配当前元素」就是极其重要的。
>
> - 如果正向解析，例如「div div p em」，我们首先就要检查当前元素到 html 的整条路径，找到最上层的 div，再往下找，如果遇到不匹配就必须回到最上层那个 div，往下再去匹配选择器中的第一个 div，回溯若干次才能确定匹配与否，效率很低。
>   逆向匹配则不同，如果当前的 DOM 元素是 div，而不是 selector 最后的 em，那只要一步就能排除。只有在匹配时，才会不断向上找父节点进行验证。
>
> - 但因为匹配的情况远远低于不匹配的情况，所以逆向匹配带来的优势是巨大的。同时我们也能够看出，在选择器结尾加上「\*」就大大降低了这种优势，这也就是很多优化原则提到的尽量避免在选择器末尾添加通配符的原因。
>
>   ————————————————
>   版权声明：本文为 CSDN 博主「\_陌默」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
>   原文链接：https://blog.csdn.net/qq_21397815/article/details/72874932

**`简单的来说，浏览器从右到左进行查找的好处是为了尽早过滤掉一些无关的样式规则和元素。`**

###### 根据 CSS 选择器的匹配规则，做如下建议（总原则：减少浏览器匹配次数）

1. 使用**层次选择器**时，尽量提高第一个匹配符的辨识度。

2. 尽量使用**子代选择符**，减少使用**后代选择符**。

   例如：

   ```html
   <div>
     <p class="p1">I am P1!</p>
   </div>
   <div class="list">
     <p class="p2">I am P2!</p>
   </div>
   ```

   如果要匹配上面的`.p2`标签。`.list p`和`.list>p`都可以匹配到。使用`.list>p`查找范围就限定在父子两层，可以快速排出`p1`。如果使用`.list p`，在对`.p1`进行检索是就会不断往上查找，直到查找的 Tree 根节点。

3. 在**层次选择器**中不要使用通配符`*`.

### 优化三：Javascript 加载优化

前面说到，因为页面加载时遇到`<script>`标签会立即加载执行并暂停页面的渲染，然后建议将`<script>`移到`<body>`标签最底部。但是呢！总有些特殊需求必须要求某一些`<script>`放在`<head>`里。面对这种情况，如果这些 Javascript 不需要一定要立即执行的话，我们可以对这些 Javascript 做**延迟执行处理**：

1. 给`<script>`添加`defer`属性（仅适用于 IE 和 Firefox 3.5 以上版本）。`defer` 属性规定是否对脚本执行进行延迟，直到页面加载为止。
2. 给`<script>`添加`defer`属性（仅适用于外部脚本）。设置后，脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行）

### 结语

上面对 CSS、Javascript 的优化主要从代码结构方面来进行的。一方面，遵从浏览器规则，尽可能较少浏览器无所谓的工作和等待（**优化 CSS、Javascript 的位置**）；另一方面，进行代码优化，从代码层面减少浏览器的工作（**编写 CSS 选择器的建议、Javascript 加载优化**）。从而减少浏览器渲染的时间，使的网站首页能尽快显示出来。

尽管上面做了这么多优化，但是如果网络原因导致，浏览器加载资源很慢的话，上面所作的优化也就体现不出来了。上游决定下游。对资源加载的优化就显得格外重要了。关于浏览器资源加载，具体请看：Web 优化——资源加载优化》。

### 参考文档：

- [浏览器解析 css 选择器的规则](https://blog.csdn.net/qq_21397815/article/details/72874932?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-3)
- [浏览器加载、解析、渲染的过程](https://blog.csdn.net/XIAOZHUXMEN/article/details/52014901?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1)

### 本系列其他文章：

- [Web 优化——浏览器访问某个网址背后所做的工作](https://blog.csdn.net/weixin_44869002/article/details/106764779)
- [Web 优化——资源加载优化](https://blog.csdn.net/weixin_44869002/article/details/106717640)

---

恰饭时间，嘻嘻！！！

推荐的是齐伟老师的两门课程：《8 小时 Python 零基础轻松入门》《迈向数据科学家：带你玩转 Python 数据分析》

[video(video-aRXmjtD8-1592043158500)(type-edu_course)(url-https://edu.csdn.net/course/blogPlay?goods_id=19165&blog_creator=weixin_44869002&marketing_id=162)(image-https://i-blog.csdnimg.cn/blog_migrate/43fe276294efeee7ea2ea6e6b68edbd0.jpeg)(title-8 小时 Python 零基础轻松入门)]

[video(video-R6aaJZDe-1592043185413)(type-edu_course)(url-https://edu.csdn.net/course/blogPlay?goods_id=17702&blog_creator=weixin_44869002&marketing_id=144)(image-https://i-blog.csdnimg.cn/blog_migrate/98ce524b977fd4df6de604159cf9b9cd.jpeg)(title-迈向数据科学家：带你玩转 Python 数据分析)]
