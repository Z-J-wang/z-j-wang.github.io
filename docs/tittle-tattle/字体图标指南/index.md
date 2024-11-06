---
author: 王志杰
date: 2024-11-06
keywords: 字体图标, 字体图标工作原理, Font Awesome, 字体图标库, 字体图标教程, 字体图标指南, 字体图标使用方法,字体图标生成器, 字体图标工具, 字体图标资源, 字体图标使用方法
description: 说起字体图标，那就不得不提及 [Font Awesome](http://www.fontawesome.com.cn/) 了。相信大家都用过 Font Awesome 吧！只要我们在项目中引入 Font Awesome，通过给元素标签设置对应的 class，就可以在页面上显示出图片来。是不是很神奇很方便呢！要想了解 Font Awesome 为什么能做到这样的效果，我们就需要去了解**字体图标**是什么以及其工作原理。
---

# 什么是字体图标？

说起字体图标，那就不得不提及 [Font Awesome](http://www.fontawesome.com.cn/) 了。相信大家都用过 Font Awesome 吧！只要我们在项目中引入 Font Awesome，通过给元素标签设置对应的 class，就可以在页面上显示出图片来。是不是很神奇很方便呢！

要想了解 Font Awesome 为什么能做到这样的效果，我们就需要去了解**字体图标**是什么以及其工作原理。

> [!tip]
> 实际上，Font Awesome 就是一个字体图标库。

## 字体图标

在讲字体图标前，我们要先看一下**字体-Font**。

### 字体-Font

说到字体，我们优先想到的场景可能是在编写 word 文档时，通过设定不同的字体来让一个文字拥有不一样的“外观”。如下：

![](.\img\字体图标1.jpg)

改变字体，就可以改变文字的外观。这是大家公认的。

那字体是如何让文字表现出不同的“外观”的呢？这就需要进一步了解字体的工作原理了。

#### 字体的工作原理

如果对《[计算机原理](https://baike.baidu.com/item/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%8E%9F%E7%90%86/1221312?fr=aladdin)》所了解，那你应该知道：**在计算机中，所有的数据都是以[二进制](https://baike.baidu.com/item/%E4%BA%8C%E8%BF%9B%E5%88%B6)代码的形式表示**。所以，**文字在计算机中实际上是一串二进制的编码**。

> [!info] 非常粗浅的概括计算机显示文字的流程：
> 当计算机要显示文字时，就会拿着**文字的编码**到**字体（font）**中查找对应的**字形（glyph）**[^字形（glyph）]，然后在屏幕中输出查找出来的**字形（glyph）**。

通过对计算机文字显示流程的了解，我们可以推测出：字体实际是一个“**编码-字形（glyph）**”映射表。

所以，只要我们为文字编码设计不同的**字形（glyph）**就可以让文字表现出来不同的外观了。

### 字体图标的原理

Font Awesome 官网对自己有这样一段描述：

> [!info] 定义
> Font Awesome 字体为您提供可缩放矢量图标,它可以被定制大小、颜色、阴影以及任何可以用 CSS 的样式。

Font Awesome 通过这段话明确指出了自己本身也是一种字体（font）。

其实**字体图标是一种特殊字体**。

前面我们已经明确了：**字体是一个“编码-字形（glyph）”映射表，字形（glyph）是单个字符的外观形态**。如果我们把**字形（glyph）**设计成想要图标。那么我们就可以像使用文字一样使用图标了。

字体图标的本质：**字体图标是一种特殊的字体，这种字体是一个“编码-图标字形（glyph）”的映射表**。

### 字体图标的优缺点

优点：

- 借助字体图标，我们可以如同操作文字一样操作字体图标。如，颜色的切换、大小的改变。
- 可以将多个图标整合到一个字体文件中，从而减少网页的请求次数。字体图标是“雪碧图”的良好替代品。相较于“雪碧图”，字体图标的使用更加方便、简单、快捷。
- 对字体图标进行放大不会出现失真、缩小不会浪费掉像素点

缺点：

- 由于字体图标本质上就是文字，所以字体图标不能像图片那样有着丰富多彩的颜色，它只能是单色或者渐变色。

- 字体图标不能像图片一样预览，只能在页面上渲染出来后才能看到具体的形状。

## 怎么生成字体图标

图片生成字体图标，只支持 svg 格式的图片。如果原图的格式不是 svg，需要先将图片转为 svg 格式。

### 第一步：其他图片转为 svg 格式图片

将其他格式的图片转为 svg 图片的方法在有网上有许多网站提供这个功能。如

- [https://www.vectorizer.io/uploads/](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.vectorizer.io%2Fuploads%2F)
- https://www.jinaconvert.com/cn/convert-to-svg.php

此外，我们还可以借助 ps 实现格式的转换。

### 第二步：svg 图片生成为字体图标

这里推荐两个网站

- [IcoMoon](https://icomoon.io/)
- [Iconfont-阿里巴巴矢量图标库](https://www.iconfont.cn/)

#### IcoMoon 使用介绍

IcoMoon 是一个外国网站，可能速度有点慢，不过 IcoMoon 有个好处就是不用注册也可以直接使用。

1. 首先，进入 IcoMoon 首页，点击右上角的紫色按钮“IcoMoon App”，进入“项目管理”页面

   ![icomoon1](.\img\icomoon1.jpg)

2. 点击左上角的菜单按钮，选择“New Empty Set”，新建一个新的图标集合

   ![icomoon2](.\img\icomoon2.jpg)

3. 点击新建图标集合(Set)的右上角菜单，选择“Import to Set”，上传你的 svg 图片

   ![icomoon3](.\img\icomoon3.jpg)

4. 点击上传成功的图片进行选中操作，然后点击底部的浮动菜单栏中的“Generate Font”，进入字体图标生成页

   ![icomoon4](.\img\icomoon4.jpg)

5. 在字体图标生成页设置 class 等（也可以直接使用默认的）

6. 点击底部的浮动菜单的“Download”按钮，即可生成字体图标并下载到本地。![icomoon5](.\img\icomoon5.jpg)

#### Iconfont-阿里巴巴矢量图标库

Iconfont 是我们国内的网站，是一个社区网站，在上面有许多优质好看的**非商用免费**图标。要想使用 IconFont，必须要注册一个账号。

步骤如下：

1. 进入 Iconfont 首页，登录注册。点击右上角的“上传”图标进入上传页面

   ![tempsnip](.\img\tempsnip.png)

2. 上传 svg 图片

   ![iconfont2](.\img\iconfont2.png)

3. 鼠标浮动到你上传成功的图片，在弹出的菜单中点击”购物车“图标选项

   ![iconfont3](.\img\iconfont3.png)

4. 打开右侧的”购物车“抽屉弹窗，点击底部的”下载代码“按钮，即可生成字体图标，并下载成功。

   ![iconfont4](.\img\iconfont4.png)

## 字体图标怎么用

现在我们已经拿到了字体图标源码，接下来就是要在项目使用字体图标了。

字体图标的使用只要四步即可：

- 将字体添加到项目中
- 通过 CSS 将字体导入项目,并配置相应的 CSS class，
- 将 CSS 引用到项目中
- 通过 class 在 html 中添加字体图标

其实，在下载好的字体图标文件中已经替我们完成了二步，我们只需将**主要的文件**复制进项目中即可。这里的主要文件主要有两种，字体文件以及 css。下面以 Iconfont 导出的字体图标为例：

![](.\img\Iconfont文件使用说明.png)

我们只需要将`iconfont.css`和`iconfont.ttf`复制到项目即可。

> 注意：尽管我们不需要在项目中添加`Iconfont.json`文件就可以正常使用字体图标了。但是为了便于以后的维护以及查找，建议一同将`iconfont.json`复制到项目中。

接下来，我们只需要在 HTML 中引入`iconfont.css`就可以使用这个字体里面的字体图标了。

### 字体的 CSS 代码的说明

一般的，我们不需要对字体的 CSS 代码做任何改动。或者应该说，最好不要做改动。因为如果改动不对，就会造成字体图标的失效。但是了解里面的配置，以及哪些东西可以改动，也是很有必要的。

下面，我们以`iconfont.css` 为例。看看里面到底长什么样子。

```css
/*
 * 通过 @font-face 指定字体，也就是注册字体
 */
@font-face {
  font-family: 'iconfont'; /* 设置字体名 */

  /* 
   * 字体文件的位置，如果你的字体文件和CSS相对位置发生改变，应该同步修正，format 用于指定字体文件的格式
   * src 可添加多个字体文件，这是为了保证兼容性。CSS 解析是从上往下解析的，如果前面的字体文件不被浏览器
   * 支持，就会往下解析另一个字体文件，直至找到可用的字体文件。
   * 写法如下：
   * src: url('iconfont.eot?#iefix') format('embedded-opentype'),
   *      url('iconfont.woff') format('woff'),
   *      url('iconfont.ttf') format('truetype'),
   *      url('iconfont.svg#defineName') format('svg');
   */
  src: url('iconfont.ttf?t=1627688108463') format('truetype');
}

/*
 * 字体的启用
 * 当标签含有类 iconfont 时，强制使用 iconfont 字体 
 */
.iconfont {
  /*
   * font-family 用于声明使用 iconfont 字体，font-family 的值必须与 @font-face 属性 font-family 的值保持一致。如果对其中一
   * 个改动了另一个也要一并修改。一般的，不建议修改 
   */
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased; /* 字体锯齿优化属性，详见：https://www.jianshu.com/p/6f022c65775f */
  -moz-osx-font-smoothing: grayscale;
}

/*
 * 字体图标的启用
 * content 用于声明，要使用 iconfont 字体中，编码为 \ef67 的字形glyph（字体图标）。iconfont 字体中的字体图标编码可以再 iconfont.json 中查询。
 * 类名可以改变，不过不建议修改。因为它是与 iconfont.json 的值以及 Iconfont 网站中的图标名保持一致的。修改了将会导致一致性遭到破坏，不
 * 便于维护
 */
.icon-aichong02:before {
  content: '\ef67';
}
```

通过上面的 CSS 说明，我们有了大致的理解。同时，我们也可以推断出如何在 HTML 中使用字体图标了

### 字体图标在 HTML 中使用写法解析

```html
<!-- 添加 iconfont 类，表明 当前标签要使用 iconfont 字体 -->
<!-- 添加 icon-aichong02 类，表明当前标签要使用 iconfont 字体的中编号为 \ef67 字形（字体图标）  -->
<span class="iconfont icon-aichong02"></span>
```

### 添加多个字体文件

有些时候，我们可能需要在项目中添加多个字体文件。这时候有两种处理方法：

1. 多套字体分别单独引入

2. 将每套字体的 css 合并到一个文件中

   ```css
   @font-face {
     font-family: 'iconfont'; /* 设置字体名 */
     src: url('iconfont.ttf?t=1627688108463') format('truetype');
   }

   @font-face {
     font-family: 'iconfont'; /* Project id  */
     src: url('iconfont2.ttf?t=1627691132980') format('truetype');
   }

   .iconfont {
     font-family: 'iconfont' !important;
     font-size: 16px;
     font-style: normal;
     -webkit-font-smoothing: antialiased; /* 字体锯齿优化属性，详见：https://www.jianshu.com/p/6f022c65775f */
     -moz-osx-font-smoothing: grayscale;
   }

   .icon-aichong02:before {
     content: '\ef67';
   }

   .icon-date:before {
     content: '\e609';
   }
   ```

> 注意：尽管可以添加多个字体文件，不过不建议这样做。因为字体文件过多，就会增加静态资源的请求次数。应该将所有的字体图标合并生成为一个字体文件。

## 结语

以上就是关于字体图标的解析了。其实关于字体的图标的使用方法，在下载的文件中也有案例展示出来的。例如 Iconfont 的 `demo_index.html` 文件。在浏览器打开后，你就可以看到上面给出了当前字体文件的使用方法。而且还给出了三种使用方法：

- Unicode
- Font class
- Symbol

因为 Font class 方法是目前使用最为广泛的的，且大多数的 UI 组件框架也是使用这种方法，所以本文就只讲了 Font class 方法。如果对那两种比较感兴趣，可以自行了解。

希望这篇文章能帮助你。其中可能存在错误点，见谅。

![](.\img\iconfont5.png)

## 参考

- [字体](https://baike.baidu.com/item/%E5%AD%97%E4%BD%93/5167264?fr=aladdin)
- [计算机原理](https://baike.baidu.com/item/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%8E%9F%E7%90%86/1221312?fr=aladdin)
- [二进制](https://baike.baidu.com/item/%E4%BA%8C%E8%BF%9B%E5%88%B6)
- [Font Awesome](http://www.fontawesome.com.cn/)
- [@font-face](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face)
- [CSS3 @font-face 属性](https://www.jianshu.com/p/c0301e632a01)
- [font-smoothing](https://www.jianshu.com/p/6f022c65775f)

[^字形（glyph）]: 单个字符的外观形态。
