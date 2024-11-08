# 解决“图片因为 CSS 样式缩放操作导致变糊”问题

## 前言

对于图片的放大缩小，我们都会自然而然的认为：图片放大，会变得模糊，图片变小会变得较为清晰。放大，会把瑕疵更明显的暴露出来；缩小，可以让瑕疵难以发觉。这是生活中的自然现象。但是，这个现象放到网页上的图片就“变了味”。

变成什么“味”了呢？

> 通过 CSS 样式对图片做等比例的放大缩小操作，图片都会变模糊。和通过滚轮对图片做放大缩小操作差异很大。

## 问题演示

假设有这样一张图：

![原图](.\img\image.png)

通过 win11 的“图片”软件对其放大缩小。

![600px](.\img\image_600px.png)

![](.\img\image_300px.png)

通过编写 HTML 将三者在浏览器中显示。

代码：

```html
<div style="text-align: center">
  <img src="/image_600px.png" />
  <img src="/image.png" />
  <img src="/image_300px.png" />
</div>
```

结果如下：

![](.\img\对照组一.png)

接下来，通过 CSS 样式调整中间原图的大小。

![](.\img\对照组一.gif)

可以看到，无论是放大还是缩小，中间的原图都变模糊了。从这里我们可以推断出，在浏览器通过 CSS 的样式对图片做放大缩小操作是不同于专门的图片处理软件的。其效果远不如专门的图片软件处理结果好。

但是在网页上使用图片时是无法避免 CSS 样式对图片进行放大缩小的（我们总不能为每个尺寸都设置相应的图片吧！）。对于这个问题，前端可以通过 CSS 样式属性`image-rendering`来优化。

## 前端的优化方法 —— image-rendering

在网页上通过 CSS 样式对图片进行缩放从而导致图片模糊，究其原因是因为浏览器的缩放算法和图片处理软件的不同导致的差异。所以，要解决这个问题，就需要优化浏览器的缩放算法。CSS 属性`image-rendering`正是为此而存在的。

> # image-rendering
>
> [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 属性 **`image-rendering`** 用于设置图像缩放算法。它适用于元素本身，适用于元素其他属性中的图像，也应用于子元素。
>
> 举个例子，如果有一张尺寸为 `100×100px` 的图片，但作者有意将尺寸设置为 `200×200px`（或`50×50px`），然后，图片便会根据 `image-rendering` 指定的算法，缩小或放大到新尺寸。此属性对于未缩放的图像没有影响。
>
> 截取自——《[MDN——image-rendering](https://developer.mozilla.org/zh-CN/docs/Web/CSS/image-rendering)》

`image-rendering`可选属性值如下表：

| 属性值        | 说明                                                                                                                                                                                                                                                                                            |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`        | 自 Gecko 1.9 （Firefox 3.0）起，Gecko 使用*双线性*（_bilinear_）算法进行重新采样（高质量）。                                                                                                                                                                                                    |
| `crisp-edges` | 必须使用可有效保留对比度和图像中的边缘的算法来对图像进行缩放，并且，该算法既不会平滑颜色，又不会在处理过程中为图像引入模糊。合适的算法包括*最近邻居*（_nearest-neighbor_）算法和其他非平滑缩放算法，比如 _2×SaI_ 和 \*hqx-\*\* 系列算法。此属性值适用于像素艺术作品，例如一些网页游戏中的图像。 |
| `pixelated`   | 放大图像时, 使用最近邻居算法，因此，图像看着像是由大块像素组成的。缩小图像时，算法与 `auto` 相同。                                                                                                                                                                                              |

`auto`是浏览器默认的缩放算法；放大图像时，`crisp-edges`的效果和`auto`一致，缩小时，`crisp-edges`的效果比`auto`更好；如果设置了`pixelated`，无论放大还是缩小图像，看起来都比`auto`更明亮了，只不过锯齿也高了。

设置`crisp-edges`的效果图：

![](.\img\对照组二gif.gif)

设置 `pixelated`的效果图：

![](.\img\对照组三.gif)

> `crisp-edges`属性说明：
>
> 大多数浏览器不再支持`image-rendering: crisp-edges;`这种写法了。需要通过非标准写法来实现设置，兼容性写法如下：
>
> ```css
> .crisp-edges {
>   image-rendering: -moz-crisp-edges;
>   image-rendering: -o-crisp-edges;
>   image-rendering: -webkit-optimize-contrast;
>   image-rendering: crisp-edges;
>   -ms-interpolation-mode: nearest-neighbor;
> }
> ```

`image-rendering`兼容性问题：

和其他 CSS 属性一样，`image-rendering`存在浏览器兼容性问题。例如 IE 就没有支持该属性。

![](.\img\兼容性.png)

> 有关兼容性的更多资讯，请查看：["image-rendering" | Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/?search=image-rendering)

## 后端的优化方法

尽管借助`image-rendering`可以降低浏览器对图像缩放的影响。但是因为浏览器支持问题，这种方式或多或少存在着隐患——不同的浏览器显示效果不一致。因此，为了保证图片的在不同浏览器的保持一致。我们就不能在浏览器上通过 CSS 对图像做缩放操作。换而言之就是服务器提供不同尺寸的图片。

这要怎么做呢？同样的图片上传不同尺寸到服务器？这是非常吃力不讨好的事情，显然不能成为可行的方案。

正确的做法应该是，**服务器存储一张原图，然后根据请求参数的不同导出不同尺寸的图片，再传输给前端**。

具体实现过程属于后端范畴，这里就不展开了（我也不会呀！(￣ y▽,￣)╭ ）。

> 提供一个思路：可使用[imgproxy](https://evilmartians.com/chronicles/introducing-imgproxy)来实现。
>
> 相关文档：
>
> - [图片服务器 imgproxy 入门教程--实现图片实时裁剪/压缩/处理等操作](https://blog.csdn.net/Aria_Miazzy/article/details/103607201)
> - [imgproxy documentation](https://docs.imgproxy.net/#/GETTING_STARTED?id=getting-started)
> - [imgproxy: Resize your images instantly and securely — Martian Chronicles, Evil Martians’ team blog](https://evilmartians.com/chronicles/introducing-imgproxy)

## 参考文献

- 《[MDN——image-rendering](https://developer.mozilla.org/zh-CN/docs/Web/CSS/image-rendering)》
- ["image-rendering" | Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/?search=image-rendering)
- [css 缩小图片后，图片变模糊的解决办法](https://blog.csdn.net/yihanzhi/article/details/110862021?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_utm_term~default-0.no_search_link&spm=1001.2101.3001.4242.1)
- [图片服务器 imgproxy 入门教程--实现图片实时裁剪/压缩/处理等操作](https://blog.csdn.net/Aria_Miazzy/article/details/103607201)
- [imgproxy documentation](https://docs.imgproxy.net/#/GETTING_STARTED?id=getting-started)
- [imgproxy: Resize your images instantly and securely — Martian Chronicles, Evil Martians’ team blog](https://evilmartians.com/chronicles/introducing-imgproxy)
