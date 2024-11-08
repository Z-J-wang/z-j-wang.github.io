## 前言

本文为《CSS 新世界》的读书笔记。推荐去读原著。

《CSS 新世界》微信读书 APP 链接：[CSS 新世界-张鑫旭-微信读书 (qq.com)](https://weread.qq.com/web/bookDetail/13c32c90726fa07d13c0072)

## 1. 尺寸属性值：fit-content

### 描述

`fit-content` 不是一个属性，它是 css 尺寸系列属性的一个新属性值。可用在 [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width)、[`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/height)、[`min-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width)、 [`min-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/min-height)、 [`max-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width) 、[`max-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/max-height)等 CSS 属性中。**`fit-content` 属性可以让浏览器根据内容所需的长度来设置容器的尺寸。**

### 使用场景举例

#### 案例：一段文字，字数少的时候居中显示，字数多的时候左对齐显示。

```css
.cw-content {
  width: fit-content;
  margin: auot;
}
```

## 2. margin-inline-end

> The **`margin-inline-end`** [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) property defines the logical inline end margin of an element, which maps to a physical margin depending on the element's writing mode, directionality, and text orientation. In other words, it corresponds to the [`margin-top`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top), [`margin-right`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right), [`margin-bottom`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom) or [`margin-left`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left) property depending on the values defined for [`writing-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode), [`direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/direction), and [`text-orientation`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation).
>
> 摘自——[margin-inline-end - CSS: Cascading Style Sheets | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline-end)

## 3. hyphens

### 描述

hyphens 是专为英文场景设计的一个属性，这个属性可以让英文单词断开换行的时候带上连字符（也就是短横线）

```css
hyphens: none | manual | auto;
```

### 限制

- 需要在英语环境中，也就是需要祖先元素设置 lang="en"属性。
- 由于中文语句中随时可以换行，因此在中文场景下，轮不到 hyphens 属性起作用。就算真的遇到长串的连续字母和数字，也不一定是英文单词，多半是 URL 网址或者特殊字符串，而在网址换行位置添加短横线是不可以的，因为增加一个短横线会导致原本正确的网址变成错误的网址。
- 只有在 Android 操作系统下和 macOS 下的 Chrome 浏览器中才有效果，在用户量较大的 Windows 操作系统中无效。

## 4. color 148 个颜色关键字

查看链接：[CSS Level1 - Level4 全部颜色关键字 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/3/9-1.php)

## 5. currentColor 关键字

### 描述

表示当前元素（或伪元素）所使用的 color 属性的值。用于非`color`属性，调用`color`属性值。currentColor 关键字主要还是用在背景颜色和背景渐变颜色中。

```css
/* IE9+浏览器均支持 */
.button {
  background-color: currentColor;
}
```

## 6. outline-offset

### 描述

outline-offset 属性用于改变 outline 属性设置的轮廓的偏移位置。

## 7. opacity 属性的叠加计算规则

opacity 属性没有继承性，因此父、子元素同时设置半透明时，半透明效果是叠加的。例如：

```css
.father {
  opacity: 0.5;
}
.son {
  opacity: 0.5;
}
```

叠加值为 0.5×0.5=0.25

## 8. box-shadow 用法举例

### 用法一：内阴影，模拟边框

在 border 边框被占用，或者不方便使用 border 属性的情况下，我们可以借助 box-shadow 内阴影来模拟边框效果。

```css
<button
  class='normal'
  > 正常</button
  > <button
  class='primary'
  > 主要</button
  > <button
  class='warning'
  > 警示</button
  > button {
  height: 40px;
  border: 0;
  border-radius: 4px;
}
.normal {
  background-color: #fff;
  /* 模拟边框 */
  box-shadow: inset 1px 0 #a2a9b6, inset -1px 0 #a2a9b6, inset 0 1px #a2a9b6, inset 0 -1px #a2a9b6;
}
.primary {
  color: #fff;
  background-color: #2a80eb;
}
.warning {
  color: #fff;
  background-color: #eb4646;
}
```

[box-shadow 内阴影模拟按钮边框 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/4/3-1.php)

### 用法二：内阴影，颜色覆盖

box-shadow 内阴影有一个实用特性，那就是**生成的阴影会位于文字内容的下面，背景颜色的上面**。于是我们可以使用 box-shadow 属性在元素上面再覆盖一层颜色，这种做法在不少场景下非常有用。例如，按钮在被按下的时候其背景色要深一点，这用来给用户提供操作反馈。

```css
button:active {
  box-shadow: inset 0 0 0 999px rgba(0, 0, 0, 0.1);
}
```

### 用法三：扩展半径，单侧阴影

扩展半径还支持负值，可以用来实现单侧阴影效果。理论上，实现单侧阴影效果只要设置一侧阴影的偏移大小为 0 即可，但是，如果模糊半径设置得较大，就会看到有部分阴影显示在左右两侧了，并不是单侧阴影效果。例如：

```css
header {
  width: 150px;
  padding: 10px;
  background-color: white;
  box-shadow: 0 7px 5px -5px rgba(0, 0, 0, 0.5);
}
```

### 用法三：多阴影特性，多边框和渐变边框的实现

box-shadow 属性支持无限多个阴影效果不断累加，因此理论上 box-shadow 属性可以实现任意图形效果，我们只需要设置 1px×1px 的元素，然后不断投影。当然，我们在实际开发中不会这么使用，因为没必要，性能也很糟糕。

使用 box-shadow 属性模拟多边框效果，该属性也支持圆角效果。

```css
.multi-border {
  height: 100px;
  border-radius: 10px;
  background-color: deepskyblue;
  box-shadow: 0 0 0 4px #fff, 0 0 0 8px deeppink, 0 0 0 12px yellow, 0 0 0 16px purple;
}
```

多边框的过渡颜色足够细腻，还可以使用 box-shadow 属性实现由内往外但并不是径向渐变的渐变效果。

```css
.gradient-border {
  height: 100px;
  border-radius: 10px;
  background-color: deepskyblue;
  box-shadow: 0 0 0 1px #07b9fb, 0 0 0 2px #17aef4, 0 0 0 3px #27a4ee, 0 0 0 4px #3799e7, 0 0 0 5px #478ee0, 0 0 0 6px
      #5784d9, 0 0 0 7px #6779d3, 0 0 0 8px #776ecc, 0 0 0 9px #8764c5, 0 0 0 10px #9759be, 0 0 0 11px #a74eb8, 0 0 0
      12px #b744b1, 0 0 0 13px #c739aa, 0 0 0 14px #d72ea3, 0 0 0 15px #e7249d, 0 0 0 16px #f71996;
}
```

[多阴影特性与图形绘制 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/4/3-3.php)

### 用法四：3D 投影效果

给按钮设置一个 3D 投影效果，按下按钮的时候按钮的位置发生偏移，同时投影高度降低，这可以实现非常有立体感的按钮效果。

```css
.shadow-3d-button {
  width: 100px;
  height: 36px;
  border: 1px solid #a0b3d6;
  background-color: #f0f3f9;
  box-shadow: 1px 1px #afc4ea, 2px 2px #afc4ea, 3px 3px #afc4ea;
}
.shadow-3d-button:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px #afc4ea, 2px 2px #afc4ea;
}
```

[多阴影特性与图形绘制 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/4/3-3.php)

## 9. transform 属性的若干细节特性

1. 盒模型尺寸不会变化。页面中的元素无论应用什么 transform 属性值，该元素盒模型的尺寸和位置都不会有任何变化。页面中的元素无论应用什么 transform 属性值，该元素盒模型的尺寸和位置都不会有任何变化。
2. 内联元素（不包括替换元素）是无法应用 transform 变换的，且不支持所有变换特性。
3. 在应用旋转或者斜切变换的时候，元素边缘会表现出明显的锯齿，文字会明显虚化。
4. 一次性应用多个不同的变换函数，即使变换内容一样，如果顺序不同，最终的效果也会不一样。
5. clip/clip-path 前置剪裁。一个元素应用 transform 变换之后，同时再应用 clip 或者 clip-path 等属性，此时很多人会误认为剪裁的是应用变换之后的图形，实际上不是的，剪裁的还是变换之前的图形，也就是先剪裁再变换。
6. 动画性能优秀。CSS 高性能动画三要素指的是绝对定位、opacity 属性和 transform 属性。因此，同样的动画效果，优先使用 transform 属性实现。
7. 创建层叠上下文。如果元素的 transform 属性值不是 none，则会创建一个新的层叠上下文。新的层叠上下文会覆盖同层级的元素。
8. 父元素设置了 transform 变换，会导致 `position:fixed;`失效。
9. transform 属性值不为 none 的元素作为绝对定位元素的包含块。过去绝对定位元素的包含块是第一个 position 属性值不为 static 的祖先元素，现在 transform 属性值不为 none 的元素也可以作为绝对定位元素的包含块。

## 10. transform-origin 属性对 transform 的影响

所有 transform 变换本质上都是坐标点位置的**矩阵变换**，transform-origin 属性变化后，所有点的坐标都会发生变化，这导致最终的矩阵变换计算结果也发生变化。

## 11. calc()函数

calc()函数支持加减乘除 4 种运算，任何可以使用`<length>`、`<frequency>`、`<angle>`、`<time>`、`<percentage>`、`<number>`或者`<integer>`数据类型的地方都可以使用 calc()函数。

> 使用注意事项：
>
> 1. 不能使用当前 CSS 属性不支持的数据类型
> 2. 运算符前后带单位或者带百分号的值只能进行加减运算，不能进行乘除运算
> 3. 除法运算斜杠右侧必须是不为 0 的数值类型
> 4. 加号和减号左右两边一定要有空格

## 12. 渐变

- linear-gradient()线性渐变
- radial-gradient()径向渐变：指的是从一个中心点向四周扩散的渐变效果
- conic-gradient()锥形渐变

### 渐变断点

1. 至少有 2 个颜色值
2. 断点语法中的颜色值和位置值的前后顺序是有要求的，位置值必须在颜色值的后面
3. 没有指定具体断点位置的时候，各个渐变颜色所形成的色块大小是自动等分的。
4. 渐变的断点位置可以是负数，也可以大于 100%。
5. 渐变断点还支持一次性设置两个位置值，表示范围。

### radial-gradient()径向渐变

#### 设置渐变半径的大小

```css
radial-gradient(50px 50%, white, deepskyblue);
```

50px 为水平半径；50% 为垂直半径；

#### 设置渐变中心点的位置

设置渐变中心为左上角,渐变半径为 100px：

```css
radial-gradient(100px at 0 0, white, deepskyblue);
radial-gradient(100px at left top, white, deepskyblue);
```

设置渐变的中心点在距离右边缘和下边缘 100px 的位置，渐变半径为 100px：

```css
radial-gradient(100px at right 100px bottom 100px, white, deepskyblue);
```

#### 设置渐变终止点的位置

| 关键字            | 描述                                                                                                                 |
| :---------------- | :------------------------------------------------------------------------------------------------------------------- |
| `closest-side`    | 渐变结束的边缘形状与容器距离渐变中心点最近的一边相切（圆形）或者至少与距离渐变中心点最近的垂直和水平边相切（椭圆）。 |
| `closest-corner`  | 渐变结束的边缘形状与容器距离渐变中心点最近的一个角相交。                                                             |
| `farthest-side`   | 与 closest-side 相反，边缘形状与容器距离渐变中心点最远的一边相切（或最远的垂直和水平边）。                           |
| `farthest-corner` | 渐变结束的边缘形状与容器距离渐变中心点最远的一个角相交。                                                             |

```css
radial-gradient(farthest-corner circle at right 100px bottom 100px, white, deepskyblue);
```

> circle 表示渐变的形状为圆；与之对应的还有一个关键字 ellipse，它表示椭圆。由于径向渐变的默认形状就是椭圆，因此，没有任何一个场景必须要使用 ellipse 关键字。

### 重复渐变

线性渐变、径向渐变和锥形渐变都有对应的重复渐变函数，就是在各自的函数名前面添加`repeating-前缀`，示意如下：

```css
repeating-linear-gradient(transparent, deepskyblue 40px);
repeating-radial-gradient(transparent, deepskyblue 40px);
repeating-conic-gradient(transparent, deepskyblue 40deg);
```

## 13. 3D 变换

### perspective 属性

perspective 的中文意思是透视、视角。指定了观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果。

### perspective-origin 属性

表示我们的眼睛相对 3D 变换元素的位置。如：

```css
perspective-origin: top left;
perspective-origin: right 20px bottom 40%;
perspective-origin: 50% 50%;
perspective-origin: -200% 200%;
perspective-origin: 20cm 100ch;
```

> 注意：这里的位置不包括远近。远近是通过`perspective`属性设置的。

### transform-style 属性

transform-style[1]支持两个关键字属性值，分别是 preserve-3d 和 flat：

```css
transform-style: preserve-3d;
transform-style: flat;
```

- preserve-3d 表示应用 3D 变换的元素位于三维空间中，preserve-3d 属性值的渲染表现更符合真实世界的 3D 表现。
- flat 是默认值，表示应用 3D 变换的元素位于舞台或元素的平面中，其渲染表现类似“二向箔”，把三维空间压缩在舞台元素的二维空间中。

> 注意：transform-style 属性需要用在 3D 变换元素的父元素上，也就是舞台元素上才有效果。

### backface-visibility 属性

指定当元素背面朝向观察者时是否可见。

## 14. transition 过渡

### transition-delay 属性

transition-delay 属性可以设置负数。当 transition-delay 属性值为负值的时候，会省略部分动画进程。

### transition-property 属性

用来设置应用过渡效果的 CSS 属性，其初始值是 all，表示默认所有 CSS 属性都应用过渡效果。可同时列举多个属性。如：

```css
transition-property: color, background-color, opacity, transform;
```

### visibility 过渡效果

由于`display:none;`不支持过渡效果，所以要实现显示隐藏的过渡效果我们可以使用`visibility`属性。

> visibility 属性的过渡效果是显示的时候立即显示，隐藏的时候遵循 transition-duration 设置的时间延时隐藏。

### transition-timing-function 属性

transition-timing-function 属性通过设置过渡时间函数来影响过渡效果的过渡速率。ransition-timing-function 属性和 animation-timing-function 支持的属性值类型一致，总共分为三大类：

- 线性运动类型：使用 linear 表示。
- 三次贝塞尔时间函数类型：ease、ease-in、ease-out、ease-in-out 等关键字和 cubic-bezier()函数。
- 步进时间函数类型：step-start、step-start 等关键字和 steps()函数。

一般情况下，使用三次贝塞尔时间函数类型的关键字即可，其余两种类型更是很少使用。

#### 三次贝塞尔时间函数类型

三次贝塞尔时间函数类型写作`<cubic-bezier-timing-function>`，其正式语法如下：

```css
<cubic-bezier-timing-function> = ease | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>)
```

##### cubic-bezier()函数

贝塞尔曲线种类很多，包括线性贝塞尔曲线、二次方贝塞尔曲线、三次方贝塞尔曲线、四次方贝塞尔曲线、五次方贝塞尔曲线等。cubic-bezier()函数是三次方贝塞尔曲线函数。所有三次方贝塞尔曲线都是由起点、终点和两个控制点组成，在 SVG 或者 Canvas 中，三次方贝塞尔曲线的所有控制点都是不固定的。但是在 CSS 的 cubic-bezier()函数中，起点和终点的坐标是固定的，分别是(0, 0)和(1, 1)，因此，cubic-bezier()函数支持的参数值只有 4 个，代表了两个控制点的坐标，语法如下：

```css
cubic-bezier(x1, y1, x2, y2)
```

其中坐标(x1, y1)表示控制点 1 的坐标，坐标(x2, y2)表示控制点 2 的坐标。

![image-20220927105343429](CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20220927105343429.png)

其他一些非 CSS 标准，但也属于常用缓动类型的贝塞尔曲线值：

```css
:root {
  --ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  --ease-in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
  --ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  --ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  --ease-in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.335);
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
  --ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-circ: cubic-bezier(0.075, 0.82, 0.165, 1);
  --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);
  --ease-in-out-expo: cubic-bezier(l, 0, 0, 1);
  --ease-in-out-circ: cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
```

## 15. CSS 动画

animation 属性支持同时应用多个动画规则，例如实现元素淡出和右侧划入同时进行的动画效果。正确做法是分隔设置，而不是设置在一个动画规则中，也就是不推荐使用下面的 CSS 代码：

```css
.element {
  animation: fadeInSlideInRight 0.2s;
}
@keyframes fadeInSlideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX (0%);
  }
}
```

而是推荐将代码分隔成多个独立的动画规则，CSS 代码如下：

```css
.element {
  animation: fadeIn 0.2s, slideInRight 0.2s;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}
```

这样做的好处在于我们自定义的动画规则可以在其他场合重复利用。

### @keyframes 规则的语法和特性

@keyframes 规则的语法如下：

```css
@keyframes <keyframes-name> {
  <keyframe-block-list>
}
```

其中`<keyframe-block-list>`指的是定义的关键帧列表，每个关键帧由关键帧选择器和对应的 CSS 样式组成。关键帧选择器用来指定当前关键帧在整个动画过程中的位置，其支持 from、to 这两个关键字和百分比值。

@keyframes 规则的特性：

- @keyframes 规则中的 CSS 优先级最高
- !important 无效
- 如果关键帧重复定义，则不同的 CSS 样式是累加的，而相同的 CSS 样式是后面的样式覆盖前面的样式

### animation-delay 动画延时

animation-delay 可以让动画延时播放。需要注意的是，如果动画是无限循环的，设置的延时不会跟着循环。如：

```css
.loading {
  animation: spin 1s infinite;
  animation-delay: 300ms;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

此时.loading 元素会在延时 300ms 后不断旋转，而不是在延时 300ms 后旋转一圈，再在延时 300ms 后旋转一圈，不断循环。

想要实现每次动画循环都有延时效果，常用的方法是在自定义动画关键帧处进行设置。

```css
.loading {
  animation: spin 1s infinite;
}
@keyframes spin {
  0%,
  30% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

### reverse 和 alternate 关键字的区别和应用

animation-direction 属性可以用来控制动画的方向，其本质上是通过控制@keyframes 规则中定义的动画关键帧执行的方向来实现的。其中，reverse 和 alternate 这两个关键字都有“相反”的意思，不同之处在于，reverse 关键字是让每一轮动画执行的方向相反，而 alternate 关键字是让下一轮动画的执行方向和上一轮动画的执行方向相反。从效果表现来看，alternate 关键字的动画效果表现为来回交替播放。

### 动画播放次数可以是小数

animation-iteration-count 的属性值可以设置成小数。

### animation-fill-mode 属性

animation-fill-mode 属性的字面意思是“动画填充模式”，主要用来定义动画在执行时间之外应用的值。

animation-fill-mode 属性的语法如下：

```css
animation-fill-mode: none; /* 默认值 */
animation-fill-mode: forwards;
animation-fill-mode: backwards;
animation-fill-mode: both;
```

- none 是默认值，表示动画开始之前和动画结束之后不会对元素应用@keyframes 规则中定义的任何样式。

- forwards 是“前进”的意思，表示动画结束后（什么时候结束由 animation-iteration- count 属性决定），元素将应用当前动画结束时的属性值。

- backwards 是“后退”的意思，表示在动画开始之前，元素将应用当前动画第一轮播放的第一帧的属性值。
- both 可以让元素的动画在延时等待时保持第一帧的样式，在动画结束后保持最后一帧的样式，适用于绝大多数的开发场景。

### 暂停和播放 CSS 动画

使用 animation-play-state 属性可以控制 CSS 动画的播放和暂停，语法如下：

```css
/* 播放 */
animation-play-state: running;
/* 暂停 */
animation-play-state: paused;
```

## 16. 分栏

相比其他布局方法，分栏布局最大的优点是不会改变元素原本的 display 计算值。例如，在默认状态下，`<li>`元素会出现项目符号，如圆点或数字序号。此时，如果对`<li>`元素使用弹性布局或网格布局，则项目符号就会消失，因为`display:flex`或`display:grid`会重置`<li>`元素内置的`display:list-item`声明。

### column-width 属性

column-width 表示每一栏/列的最佳宽度，注意，是“最佳宽度”，实际渲染宽度多半和指定的宽度是有出入的

### column-count 属性

column-count 表示理想的分栏数目，最终的分栏数目可能不受 column-count 属性值的控制。

> 在分栏布局中，最终分栏的数量是由 column-count 与 column-width 属性共同决定。column-width 属性值会换算成 column-count 属性值，然后比较两者的大小，哪个值小就使用哪一个

### column-gap 属性

column-gap 属性表示每一栏之间的空白间隙的大小，可以是长度值，也可以是百分比值。

## 17. flex 布局

### 一些特性

1. flex 子项块状化。flex 子项都是块级水平元素，因此，在 flex 子项元素中使用 vertial-align 属性一定是没有任何效果的。flex 子项的块状化特性对匿名内联元素同样适用，所谓匿名内联元素指的就是没有嵌套标签的裸露的文本元素。

2. flex 子项浮动失效。

3. flex 子项的 margin 值不会合并。

4. flex 子项的 margin 值不会合并。

5. flex 子项是格式化的尺寸。flex 子项的尺寸是一种格式化的尺寸，也就是经过精确计算的、应用某个计算值后的尺寸。可以使用`margin:auto`进行剩余空间的智能分配。

6. flex 子项如果被设置为绝对定位，则会脱离弹性布局。

7. flex 子项的尺寸默认表现为收缩，如果要设置建议的尺寸，可以给 flex 子项使用 flex-basis 属性，或者使用缩写的 flex 属性。

### flex-flow 属性

flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的缩写，表示弹性布局的流动特性。

flex-flow 属性的语法如下：

```stylus
flex-flow: <'flex-direction'> || <'flex-wrap'>
```

当多属性值同时使用的时候，使用空格分隔，且不区分前后顺序。

### CSS 全新的对齐特性综述

几个特定单词的含义：

- justify 表示水平方向的样式设置；
- align 表示垂直方向的样式设置；
- items 表示全体元素的样式设置；
- content 表示整体布局的样式设置；
- self 表示元素自身的样式设置，其一定是应用在子元素上的。

因此，justify-content 属性就表示整体布局的水平对齐设置，align-items 就表示全体元素的垂直对齐样式设置。

### align-content 属性与 align-content 属性

`align-content`属性和`align-items`属性的区别在于 align-items 属性设置的是每一个 flex 子项的垂直对齐方式，而 align-content 属性将所有 flex 子项作为一个整体进行垂直对齐设置。

### flex 属性

flex 属性的语法如下：

```stylus
flex: auto;
flex: none;
flex: <'flex-grow'> <'flex-shrink'>? || <'flex-basis'>
```

### 理解 flex-grow 属性、flex-shrink 属性和 flex-basis 属性

> 为了让这 3 个属性更容易被理解，我们不妨把弹性布局中的尺寸分配看成分配家产。
>
> 故事是这样的，有一个姓范的人家生了 5 个孩子，分别叫作范张、范鑫、范旭、范帅和范哥。要是只有一个孩子，那这个孩子就继承 100%的家产，但是现在有 5 个孩子，家长范某需要提早定好家产分配规则。而 flex 属性的作用就如同制定分配家产的规则。
>
> - flex-basis 属性用来分配基础数量的家产。
> - flex-grow 属性用来家产仍有富余的时候该如何分配。
> - flex-shrink 属性用来家产不足的时候该如何分配。

#### flex-grow 属性

flex-grow 属性指定了容器剩余空间多余时候的分配规则，默认值是 0，表示多余空间不分配.

具体规则如下:

- 所有剩余空间总量是 1。
- 如果只有 1 个 flex 子项设置了 flex-grow 属性值，则有两种分配情况。
  - 如果 flex-grow 属性值小于 1，则 flex 子项扩展的空间就是总剩余空间和这个比例的计算值。
  - 如果 flex-grow 属性值大于 1，则 flex 子项独享所有剩余空间。
- 如果有多个子项 flex 设置了 flex-grow 属性值，则有两种分配情况。
  - 如果 flex-grow 属性值的总和小于 1，则每个 flex 子项扩展的空间就是总剩余空间和当前 flex 子项设置的 flex-grow 比例的计算值。
  - 如果 flex-grow 属性值的总和大于 1，则所有剩余空间被利用，分配比例就是各个 flex 子项的 flex-grow 属性值的比例。例如，所有 flex 子项都设置 flex-grow:1，则表示剩余空间等分；如果设置的 flex-grow 比例是 1:2:1，则中间的 flex 子项占据一半的剩余空间，剩下另外一半的剩余空间由前后两个 flex 子项等分。

#### flex-shrink 属性

flex-shrink 属性指定了容器剩余空间不足时候的分配规则，默认值是 1，表示空间不足要分配

具体规则如下:

- 如果只有 1 个 flex 子项设置了 flex-shrink 属性值，则有两种分配情况。
  - 如果 flex-shrink 属性值小于 1，则收缩不完全，会有一部分内容溢出 flex 容器。
  - 如果 flex-shrink 属性值大于等于 1，则收缩完全，元素正好填满 flex 容器。
- 如果多个 flex 子项设置了 flex-shrink 属性，则有两种分配情况。
  - 如果 flex-shrink 属性值的总和小于 1，则收缩不完全，每个元素收缩尺寸和“完全收缩的尺寸”的比例就是该元素的 flex-shrink 属性的值。
  - 如果 flex-shrink 属性值的总和大于 1，则收缩完全，每个元素收缩尺寸的比例和 flex-shrink 属性值的比例一样。

#### flex-basis 属性

flex-basis 属性则是指定的分配基础尺寸，默认值是 auto。

> 在弹性布局中，一个 flex 子项的最终尺寸是基础尺寸（或内容尺寸）、弹性增长或收缩、最大最小尺寸共同作用的结果。
>
> 最终尺寸计算的优先级是：
>
> 最大最小尺寸限制 > 弹性增长或收缩 > 基础尺寸
>
> - 基础尺寸由 flex-basis 属性或 width 属性，以及 box-sizing 盒模型共同决定；
> - 内容尺寸指最大内容宽度，当没有设置基础尺寸时会顶替基础尺寸的角色；
> - 弹性增长指的是 flex-grow 属性，弹性收缩指的是 flex-shrink 属性；
> - 最大尺寸主要受 max-width 属性限制；最小尺寸则比较复杂，受最小内容宽度、width 属性和 min-width 属性共同影响。

##### 理解 flex-basis 属性、width 属性和基础尺寸之间的关系

弹性布局中的尺寸表现几乎都是围绕基础尺寸展开的。其中 flex-basis 属性和 width 属性都可以用来设置 flex 子项的基础尺寸，对基础尺寸的影响关系如下:

1. 如果 flex-basis 属性和 width 属性同时设置了具体的数值，width 属性值会被忽略，优先使用 flex-basis 的属性值作为基础尺寸
2. 如果 flex-basis 的属性值是初始值 auto，则会使用 width 属性设置的长度值作为基础尺寸。
3. 如果 flex-basis 和 width 的属性值都是 auto，则会使用 flex 子项的最大内容宽度作为基础尺寸，此时称为“内容尺寸”。

##### 深入理解最小尺寸

这里出现的“最小尺寸”表示最终尺寸的最小值，这个“最小尺寸”是最小内容宽度、width 属性和 min-width 属性共同作用的结果。

具体规则如下，如果 flex-shrink 属性不为 0，则：

- 如果 min-width 属性值不是 auto，则元素的最小尺寸就是 min-width 的属性值，此时 width 属性无法影响最小尺寸，哪怕 width 的属性值大于 min-width 的属性值；
- 比较 width 属性的计算值和最小内容宽度的大小，较小的值就是元素的最小尺寸；
- 如果 width 的属性值和 min-width 的属性值均为 auto，则元素的最小尺寸就是最小内容宽度；
- 如果 flex 子项设置了`overflow:hidden`，且最小尺寸是由最小内容宽度决定的，则最小尺寸无效。

##### 小结

- flex-basis 属性默认作用在 content box 上，IE11 浏览器会忽略 box-sizing 属性。
- flex-basis 属性优先级比 width 属性高，同时设置的时候，width 属性无法影响基础尺寸，但是会影响最小尺寸（IE11 除外）。
- 最小尺寸与 flex-basis 属性无关，而与最小内容宽度、width 属性和 min-width 属性有关。
- 、flex-basis 属性使用得当可以实现类似 min-width 属性或 max-width 属性的效果，min-width 属性可以在不影响基础尺寸的前提下设置最小尺寸，从而解决弹性布局中打点无效的问题。

#### 适合使用 flex:none 的场景

> flex:none 的尺寸同样不会弹性增大（flex-grow:0），但是也不会弹性收缩（flex-shrink:0），我们可以理解为元素的尺寸没有弹性变化，考虑到此时 flex-basis 属性值是 auto，即基础尺寸由内容决定，因此设置 flex:none 的元素最终尺寸通常表现为最大内容宽度。

当 flex 子项的宽度就是内容的宽度，且内容永远不会换行时，则适合使用`flex:none;`

#### 适合使用 flex:1 的场景

> 元素尺寸可以弹性增大，也可以弹性减小，在容器尺寸不足时会优先最小化内容尺寸。

当希望元素充分利用剩余空间，同时不会侵占其他元素应有的宽度的时候，适合使用 flex:1，这样的场景在弹性布局中非常多。例如所有等分列表或等比例列表都适合使用 flex:1。

#### 适合使用 flex:auto 的场景

> 元素尺寸可以弹性增大，也可以弹性减小，容器尺寸不足时会优先最大化内容尺寸。

当希望元素充分利用剩余空间，但是元素各自的尺寸又需要按照各自内容进行分配的时候，就适合使用`flex:auto`。`flex:auto`多用于内容固定和内容可控的布局场景，例如导航数量不固定且每个导航文字数量也不固定的导航效果就适合使用`flex:auto`来实现。

![image-20221011110434967](CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221011110434967.png)

## 18. grid 布局

### grid-template-columns 和 grid-template-rows 属性

`grid-template-columns`和`grid-template-rows`属性主要用来指定网格的数量和尺寸等信息。如下：

```css
.container {
  grid-template-columns: 80px auto 100px;
  grid-template-rows: 25% 100px auto 60px;
}
```

- `grid-template-columns`属性含 3 个值，表示网格分为 3 列，从左往右每列的尺寸分别是 80px、auto（自动）和 100px。
- `grid-template-rows`属性含 4 个值，表示网格分为了 4 行，从上往下每行的高度分别是 25%、100px、auto（自动）和 60px。

### 网格线的命名

`grid-template-columns`属性和`grid-template-rows`属性有一个特别的功能，就是可以给网格线命名，语法如下：

```stylus
grid-template-columns: <line-name> <track-size> ...;
```

- `<track-size>`表示划分出来的小区的尺寸，可以是长度值、百分比值、`fr`单位（网格剩余空间比例单位）和尺寸关键字等多种类型的属性值。
- `<line-name>`表示划分的街道的名称，命名规则和 CSS 动画的命名规则一样。

> 网格线的命名使用场景不多。

### 聊聊`<track-size>`

`<track-size>`数据类型，共支持 9 种数据类型，分别如下：

- 长度值

- 百分比值

- 关键字：`min-content`。网格布局中的同一行 grid 子项的高度和同一列 grid 子项的宽度都是一致的，因此 min-content 指的并不是某一个格子的最小内容尺寸，而是一排或者一列格子中所有最小内容尺寸中最大的那个最小内容尺寸值。

- 关键字：`max-content`

- 关键字：`auto`。如果该网格轨道为最大时，该属性等同于 `<max-content>` ，为最小时，则等同于 `<min-content>` 。

  > 注意：网格轨道大小为 `auto` (且只有为 `auto` ) 时，才可以被属性[`align-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-content) 和 [`justify-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) 拉伸。

- `<flex>`数据类型。用单位 `fr` 来定义网格轨道大小的弹性系数。每个定义了 `<flex>` 的网格轨道会按比例分配剩余的可用空间。

- 函数：`minmax()`

- 函数`repeat()`

- 函数：`fit-content()`

#### 了解网格布局专用单位 fr

`fr`是单词 fraction 的缩写，表示分数。

网格布局往往有多列或者多行，其中有些列有固定的宽度，有些列的宽度就由页面自动分配，而`fr`就表示这些自动分配列的尺寸划分比例。

> 与关键字`auto`的区别：
>
> auto 关键字也可以自动分配列的尺寸，但是 auto 关键字的尺寸划分是随着内容变化的，内容多则尺寸大，内容少则尺寸小，而 fr 就是纯粹按比例计算，与内容多少无关。

##### fr 单位值的计算规则

- 如果所有`fr`值之和大于 1，则按`fr`值的比例划分可自动分配尺寸。
- 如果所有`fr`值之和小于 1，最终的尺寸是可自动分配尺寸和`fr`值的乘法计算值。

#### minmax()函数

minmax()函数支持两个参数值：

```stylus
minmax(min, max)
```

表示尺寸范围限制在 min ～ max 范围内。

minmax()函数的正式语法如下：

```xml
minmax( [ <length> | <percentage> | min-content | max-content | auto ] , [ <length> | <percentage> | <flex> | min-content | max-content | auto ] )
```

> 注意：`<flex>`数据类型（如以 fr 为单位的值）只能作为第二个参数出现

#### fit-content()函数

fit-content()函数的作用用一句话解释就是：让尺寸适应于内容，但不超过设定的尺寸。底层计算公式如下：

```stylus
fit-content(limit) = max(minimum, min(limit, max-content))
```

常用于希望 grid 子项的宽度随着内容变化，但是又不希望宽度太大的场景。

#### repeat()函数的详细介绍

现在，假设有一个布局是 12 列的，代码如下：

```css
.container {
  grid-template-columns: 40px auto 60px 40px auto 60px 40px auto 60px 40px auto 60px;
}
```

可以看到是`40px auto 60px`重复了 4 次。

上面的写法不易查看与理解。但是有了`repeat()`函数就不需要这样写了。下面是`repeat()`函数的写法：

```css
.container {
  grid-template-columns: repeat(4, 40px auto 60px);
}
```

由此可见，repeat()函数的作用很简单，就是当网格尺寸可以重复的时候简化属性值的书写，正式语法如下：

```stylus
repeat( [ <positive-integer> | auto-fill | auto-fit ] , <track-list> )
```

其中，`<track-list>`是不包括`repeat()`函数在内的所有`grid-template-columns`支持的属性值。

##### 关键参数 auto-fill、auto-fit

`auto-fill`和`auto-fit`相当于一个变量，表示一个不确定的重复次数，究竟重复多少次，是由 grid 容器和每一个 grid 子项的尺寸计算得到的。

- auto-fit 关键字在宽度足够的条件下充分利用空间;
- auto-fill 关键字在宽度足够的条件下预留了空白;

### grid-template-areas 属性

`grid-template-areas`属性用来指定网格区域的划分。

grid-template-areas 属性的语法如下：

```css
.container {
  grid-template-areas:
    '<grid-area-name> | . | none | ...'
    '...';
}
```

- `<grid-area-name>`表示对应网格区域的名称
- `.`表示空的网格单元格
- `none`表示没有定义网格区域。

我们通过一个案例熟悉一下 grid-template-areas 属性的使用方法和作用。张老板承包了一块土地，希望开展农作物种植和水产养殖业务，那么就需要对这块土地进行区域划分，决定哪片区域搞种植，哪片区域搞养殖。于是张老板就把这片土地划分成了 3×4 共 12 个小格子，最上面 3 个格子种葡萄，最下面 3 个格子种西瓜，中间 6 个格子，左边 2 个养龙虾，右边 4 个养鱼。土地区域划分如图 6-93 所示。

![image-20221013091524726](CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221013091524726.png)

对应的 CSS 代码如下：

```css
.container {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    '葡萄 葡萄 葡萄'
    '龙虾 养鱼 养鱼'
    '龙虾 养鱼 养鱼'
    '西瓜 西瓜 西瓜';
}
```

共 12 个格子，4 片区域，因此，grid 子项只需要 4 个元素即可，HTML 示意如下：

```html
<div class="container">
  <item class="putao"></item>
  <item class="longxia"></item>
  <item class="yangyu"></item>
  <item class="xigua"></item>
</div>
```

此时只要使用 grid-area 属性指定 grid 子项隶属于哪个区域就可以了（支持中文区域名称）：

```css
.putao {
  grid-area: 葡萄;
}
.longxia {
  grid-area: 龙虾;
}
.yangyu {
  grid-area: 养鱼;
}
.xigua {
  grid-area: 西瓜;
}
```

> 案例 dome: https://demo.cssworld.cn/new/6/3-3.php

### 了解 grid-auto-columns 和 grid-auto-rows 属性

`grid-auto-columns`和`grid-auto-rows`属性的作用是指定任何自动生成的网格（也称为隐式网格）的尺寸大小。

> 隐式网格”是非正常网格，其**在 grid 子项多于设置的单元格数量，或 grid 子项的位置出现在设定的网格范围之外**时出现，而在规定容器内显示的网格称为“显式网格”。

### grid-auto-flow 属性

`grid-auto-flow`属性用来定义子项目元素的自动流动状态，`grid-auto-flow`属性在网格布局中的地位非常类似于弹性布局中的`flex-direction`属性。

grid-auto-flow 属性语法如下：

```stylus
grid-auto-flow: [ row | column ] || dense
```

- row 是默认值，表示没有指定位置的网格在水平（行）方向上自然排列。
- row 是默认值，表示没有指定位置的网格在水平（行）方向上自然排列。
- dense 表示网格的自然排列启用“密集”打包算法，也就是说，如果稍后出现的网格比较小，则尝试看看其前面有没有合适的地方放置该网格，使网格尽可能排列紧凑。

### gap（grid-gap）属性

`gap`属性用于设置间隙。可用于分栏布局、弹性布局、网格布局。

`gap`属性语法如下：

```css
.container {
  gap: <row-gap> <column-gap>;
}
```

### 整体对齐属性 justify-content 和 align-content

要想`justify-content`属性和`align-content`属性起作用，就需要让 grid 子项的总尺寸小于 grid 容器的尺寸。要么给 gird 子项设置较小的具体的尺寸值，要么让 gird 子项的尺寸是 auto，同时保证内容尺寸较小。

### 区间范围设置属性 grid-column-start/grid-column-end 和 grid-row-start/ grid-row-end

列范围设置属性`grid-column-start`/`grid-column-end`和行范围设置属性`grid-row-start`/`grid-row-end`是应用在 grid 子项上的，通过指定 grid 子项行和列的起止位置来表明当前 grid 子项所占据的范围。

属性的语法如下：

```stylus
.item {
    grid-column-start: <integer> | <name> | <integer> <name> | span <number> | span <name> | auto;
    grid-column-end: <integer> | <name> | <integer> <name>| span <number> | span <name> | auto;
    grid-row-start: <integer> | <name> | <integer> <name>| span <number> | span <name> | auto;
    grid-row-end: <integer> | <name> | <integer> <name>| span <number> | span <name> | auto;
}
```

### 缩写属性 grid-area 外加区域范围设置

`grid-area`是一个缩写属性，它是`grid-row-start`、`grid-column-start`、`grid-row-end`和`grid-column-end`这 4 个 CSS 属性的缩写。此外，还可以直接使用`grid-template-areas`设置的名称作为属性值，从而非常便捷地实现区域范围设置。

语法如下：

```stylus
grid-area: <area-name> | <row-start> / <column-start> / <row-end> / <column-end>
```

## 19. CSS Shapes 布局

使用 CSS Shapes 布局可以实现不规则的图文环绕效果，它需要和 float 属性配合使用。

### shape-outside 属性

`shape-outside`属性设置环绕形式。其值分为四类：

- none 表示默认值。
- `<shape-box>`表示图形盒子。分别是`margin-box`、`border-box`、`padding-box`和`content-box`。
- `<basic-shape>`表示基本图形函数。
- `<image>`表示图像类。

### shape-margin 属性

`shape-margin`属性很好理解，其作用就是控制文字环绕图形时文字与元素边界的距离。

> `shape-margin`的有效数值范围是有限制的，即从 0 到浮动元素的边界，当 shape-margin 的属性值超过浮动元素边界的时候，布局效果如同普通浮动布局效果，没有不规则的图形环绕效果。

### shape-image-threshold 属性

`shape-image-threshold`指图像环绕时候的半透明阈值，默认是 0.0，也就是图像透明度为 0 的区域边界才能被文字环绕。同理，如果属性值是 0.5，则表示透明度小于 0.5 的区域都可以被文字环绕。

## 20. @media 规则

`@media`规则是用来匹配不同设备的。

`@media`规则总共有四部分：

- 媒体查询修饰符
  - not
  - only
- 媒体类型
  - screen——屏幕
  - print——打印机
  - all——全部
- 媒体类型
  - not：表示否定某个媒体特性条件
  - and：表示条件同时满足
  - or: 表示满足条件之一即可
- 媒体特性：媒体特性指的是对媒体特性的描述信息，包括浏览器、用户设备和使用环境等特性。

举例：

```css
/* 如果设备更新频率慢，或者不支持鼠标行为 */
@media (update: slow) or (hover: none) {
}

/* 宽度在320px～480px，同时分辨率是150dpi的设备 */
@media only screen and (min-width: 320px) and (max-width: 480px) and (resolution: 150dpi) {
  body {
    line-height: 1.4;
  }
}
```

### 一些特性

#### prefers-color-scheme

`prefers-color-scheme`媒体特性可以用来检测当前网页是否处于深色模式（或称黑暗模式）中，其支持的参数值如下：

- `no-preference`表示系统没有告知用户使用的颜色方案。
- `light`表示系统倾向于使用浅色模式。
- `dark`表示系统倾向于使用深色模式。

```css
/* 深色模式 */
@media (prefers-color-scheme: dark) {
  body {
    background: #333;
    color: white;
  }
}
/* 浅色模式 */
@media (prefers-color-scheme: light) {
  body {
    background: white;
    color: #333;
  }
}
```

#### any-hover

`any-hover`媒体特性可用于测试是否有任意可用的输入装置可以悬停（就是 hover 行为）在元素上。例如，鼠标这个输入装置就可以控制鼠标指针的位置，以及悬停在元素上。

- `none`表示没有输入装置可以实现悬停效果，或者没有可以实现指向的输入装置。
- `hover`表示一个或多个输入装置可以触发元素的悬停交互效果。

#### hover

`hover`媒体特性的语法和作用与`any-hover`是一样的，两者的主要区别在于，any-hover 检测任意输入装置，而 hover 只检测主要的输入装置。

#### pointer 和 any-pointer

`pointer`和`any-pointer`媒体特性主要用于识别当前环境，判断是否可以非常方便地进行点击操作。

`any-pointer`支持 3 个属性值，含义分别如下:

- `none`表示没有可用的点击设备。
- `coarse`表示至少有一个设备的点击不是很精确。例如，使用手指操作手机就属于点击不精确。
- `fine`表示有点击很精准的设备。例如，用鼠标操作的计算机浏览器。

pointer 也支持 3 个属性值，含义分别如下:

- `none`表示主输入装置点击不可用。
- `coarse`表示主输入装置点击不精确。
- `fine`表示主输入装置点击很精准。

## 21. touch-action 属性

touch-action 属性是移动端中与手势触摸密切相关的 CSS 属性。

touch-action 属性支持的属性值有：

```css
touch-action: auto;
touch-action: manipulation;
touch-action: none;
touch-action: pan-x;
touch-action: pan-y;
touch-action: pan-left;
touch-action: pan-right;
touch-action: pan-up;
touch-action: pan-down;
touch-action: pinch-zoom;
```

- `auto`是默认值，表示手势操作完全由浏览器决定（如`<meta>`元素的 viewport 属性通过设置`user-scalable=no/yes`来确定是否允许缩放）。
- `manipulation`表示浏览器只允许进行滚动和持续缩放操作，类似双击缩放这种非标准操作就不可以。此属性值可以用来解决点击后延时 300ms 的问题。iOS 9.3 就已经支持该值。
- `none`表示不进行任何手势相关的行为，例如，你想用手指滚动网页就不行，双击放大或缩小页面也不可以，所有这些行为都要自定义。另外，从这个属性值开始，一直到最后一个属性值 pinch-zoom，都是 iOS 13 才开始支持的。
- `pan-x`表示支持手指头水平移来移去的操作。
- `pan-y`表示支持手指头垂直移来移去的操作。
- `pan-left`表示支持手指头往左移动，移动开始后往右可以恢复的操作。
- `pan-right`表示支持手指头往右移动，移动开始后往左可以恢复的操作。
- `pan-up`表示支持手指头往上移动，移动开始后往下可以恢复的操作。
- `pan-down`表示支持手指头往下移动，移动开始后往上可以恢复的操作。
- `pinch-zoom`表示支持手指头缩放页面的操作。

## 22. image-set()函数

image-set()函数可以根据不同设备的屏幕密度或者分辨率来显示不同的背景图（background- image）或者遮罩图片（mask-image）等。例如：

```css
.image-set {
  width: 128px;
  height: 96px;
  background: url(fallback.jpg);
  background: image-set(url(w128px.jpg) 1x, url(w256px.jpg) 2x, url(w512px.jpg) 3x);
  background-size: cover;
}
```

## 23. CSS 变量的语法、特性和细节

CSS 变量的语法由两部分组成，一部分是 CSS 变量的声明，另一部分是 CSS 变量的使用。其中，CSS 变量的声明由 CSS 自定义属性及其对应的值组成，而 CSS 变量的使用则通过变量函数 var()调用 CSS 自定义属性实现。例如：

```css
:root {
  --primary-color: deepskyblue;
}
button {
  background-color: var(--primary-color);
}
```

### var()函数的语法和特性

`var()`函数的完整语法为：

```stylus
var( <custom-property-name> [, <declaration-value> ]? )
```

其中，`<custom-property-name>`指的就是自定义属性名；`<declaration-value>`指的是声明值，可以理解为备选值或缺省值，当前面的自定义属性一定无效时，就会使用`<declaration- value>`定义的值。

- 如果第一个参数值是不合法的，则 var()函数解析为当前 CSS 属性的初始值或继承值（如果有继承性），也就是按照 unset 全局关键字的规则渲染。（注意，只是渲染规则类似，并不等同于直接设置 unset 关键字。）

- var()函数的空格尾随特性

  ```css
  html {
    font-size: 14px;
  }
  body {
    --size: 20;
    font-size: 16px;
    font-size: var(--size) px;
  }
  ```

  此处`font-size:var(--size)px`等同于`font-size:20 px`，注意，20 后面有一个空格，这属于不合法的 font-size 属性值。

### CSS 自定义属性值的细节

- CSS 自定义属性值可以是任意值或表达式

- CSS 自定义属性值可以相互传递

  ```css
  body {
    --green: #4caf50;
    --successColor: var(--green);
  }
  ```

- CSS 自定义属性不能自身赋值

  ```css
  :root {
    --primary-color: deepskyblue;
  }
  .some-class {
    --primary-color: var(--primary-color, #2a80eb);
    /* --primary-color会被认为是非法的，color的颜色为当前上下文的颜色 */
    color: var(--primary-color);
  }
  ```

- CSS 自定义属性不支持用在媒体查询中

  ```css
  :root {
    --maxWidth: 640px;
  }
  /* 不合法，语法无效 */
  @media (max-width: var(--maxWidth)) {
  }
  ```

### 在 HTML 标签中设置 CSS 自定义属性

在 HTML 标签中设置 CSS 自定义属性的方法和在 HTML 标签中设置普通的 CSS 属性的方法是一样的，直接将要设置的属性写在 style 属性中即可，例如：

```html
<div style="--color: deepskyblue;">
  <img src="1.jpg" style="border: 10px solid var(--color);" />
</div>
```

### 在 JavaScript 中设置和获取 CSS 自定义属性

在 JavaScript 中，使用`setProperty()`方法设置 CSS 自定义属性:

```js
box.style.setProperty('--color', 'deepskyblue')
```

在 JavaScript 中，CSS 自定义属性的获取需要使用`getPropertyValue()`方法：

```js
// 获取 --color CSS变量值
var cssVarColor = getComputedStyle(box).getPropertyValue('--color')
// 输出cssVarColor值，结果是deepskyblue
console.log(cssVarColor)
```

### 使用 content 属性显示 CSS 自定义属性值的技巧

有时候需要让 CSS 变量中的自定义属性值能够同时作为字符内容在页面中呈现。我们很快就会想到使用::before 和::after 伪元素配合 content 属性来实现，但是，把 CSS 自定义属性值作为 content 属性值是没有任何效果的。例如：

```css
/* 无效 */
.bar::before {
  content: var(--percent);
}
```

那该如何实现呢？这里分享一个实用的技巧，那就是借助 CSS 计数器呈现 CSS 自定义属性值，示意代码如下：

```css
/* 有效 */
.bar::before {
  counter-reset: progress var(--percent);
  content: counter(progress);
}
```

虽然 content 属性本身不支持 CSS 自定义属性值，但是 counter-reset 属性后面的计数器初始值是支持的，于是我们可以来一招“移花接木”，从而让 CSS 自定义属性值作为字符在页面中显示。

## 24. 文字阴影属性 text-shadow

`text-shadow`是文字阴影，`box-shadow`是盒阴影，两者语法类似，但仍有两点区别。

1. `text-shadow`不支持 inset 关键字，也就是`text-shadow`只有外阴影，没有内阴影。
2. `text-shadow`不支持阴影扩展，也就是`text-shadow`最多支持 3 个数值，分别表示**水平偏移**、**垂直偏移**和**模糊大小**。

## 25. 文字描边属性 text-stroke

`text-stroke`属性是`text-stroke-width`和`text-stroke-color`这两个 CSS 属性的缩写，分别表示文字描边的宽度和文字描边的颜色。如下：

```css
.stroke {
  -webkit-text-stroke: 2px red;
}
```

> 注意：目前所有浏览器只支持-webkit-私有前缀的语法。

## 26. 文字颜色填充属性 text-fill-color

使用`text-fill-color`属性可以对文字进行颜色填充，还可以覆盖`color`属性设置的颜色，注意，只是覆盖 color 的渲染表现，实际上元素的颜色计算值还是由 color 属性决定的。

```css
-webkit-text-fill-color: transparent;
-webkit-text-fill-color: deepskyblue;
-webkit-text-fill-color: #228bff;
-webkit-text-fill-color: rgba(100, 200, 0, 0.6);
```

> 注意：目前所有浏览器只支持-webkit-私有前缀的语法。

## 27. 学会使用 text-emphasis 属性进行强调装饰

text-emphasis 家族总共有如下 4 个 CSS 属性：

- `text-emphasis-color`
- `text-emphasis-style`
- `text-emphasis-position`
- `text-emphasis`

其中，`text-emphasis`是`text-emphasis-color`和`text-emphasis-style`这两个 CSS 属性的缩写。

### text-emphasis-style

text-emphasis-style 语法主要有下面 3 类：

```stylus
text-emphasis-style: none
text-emphasis-style: [ filled | open ] || [ dot | circle | double-circle | triangle |
sesame ]
text-emphasis-style: <string>
```

其中，`text-emphasis-style:none`是默认声明，表示没有任何强调装饰。`text-emphasis- style:<string>`表示使用任意单个字符作为强调装饰符。例如：

```css
宝贝，<span class='emphasis' > 爱你</span > ，<span class='emphasis' > 比心</span > ！ .emphasis {
  -webkit-text-emphasis-style: '❤';
  text-emphasis-style: '❤';
}
```

![image-20221021094305641](CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221021094305641.png)

### text-emphasis-position

text-emphasis-position 属性用来指定强调装饰符的位置，默认位置是在文字的上方。

语法如下：

```stylus
text-emphasis-position: [ over | under ] && [ right | left ]
```

如下：

```css
text-emphasis-position: over left;
text-emphasis-position: under right;
text-emphasis-position: under left;

text-emphasis-position: left over;
text-emphasis-position: right under;
text-emphasis-position: left under;
```

![image-20221021094548095](CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221021094548095.png)

## 文字方向控制

### text-orientation 属性

`text- orientation`属性可以设置竖向排版时中文和英文字符的方向。

语法如下：

```stylus
text-orientation: mixed | upright | sideways
```

- `mixed`是默认值，表示中文和英文的文字显示方向是不一致的，中文字符是正立的，而英文字符则顺时针旋转 90 度后显示
- `upright`表示中文和英文的文字显示方向都是默认的正立显示，没有旋转
- `sideways`表示中文和英文的文字显示方向都是顺时针旋转 90 度

> [text-orientation 与垂直排版文字方向控制 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/9/2-1.php)

### text-combine-upright 属性

text-combine-upright 属性可以让 2 ～ 4 个字符横向合并显示。

```css
<p class='upright' > <span > CSS</span > 新世界</p > .upright {
  writing-mode: vertical-rl;
}
.upright span {
  -ms-text-combine-horizontal: all;
  -webkit-text-combine: horizontal;
  text-combine-upright: all;
}
```

![image-20221021112843932](CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221021112843932.png)

text-combine-upright 属性的语法如下：

```stylus
 text-combine-upright: none | all | digits<integer>?
```

- `none`是默认值，表示字符不会参与横向合并；
- `all`表示所有类型的字符都会参与横向合并，不过一个标签内最多只能合并 4 个字符；
- `digits <integer>?`表示仅数字字符参与横向合并。没有任何浏览器支持该值。

### unicode-bidi 属性

`unicode-bidi`属性总是和`direction`属性配合使用，用来设置字符水平流向的细节。

`unicode-bidi`属性比较实用的是: `unicode-bidi:plaintext;`。使用 plaintext 属性值可以在不改变当前文档的水平流向的前提下，让所有字符按照默认的从左往右的流向排列。

![image-20221021113411311](CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221021113411311.png)

## 28. ch 单位

ch 与 em、rem 和 ex 一样，是 CSS 中为数不多和字符相关的相对单位。与单位 em 和 rem 相关的字符是“m”，与 ex 相关的字符是“x”，和 ch 相关的字符则是“0”，没错，就是阿拉伯数字 0。1ch 表示 1 个“0”字符的宽度，所以“000000”所占据的宽度就是 6ch。

## 29. 使用 tab-size 属性控制代码缩进的大小

使用`tab-size`属性可以控制 Tab 键输入的空格（U+0009）的长度大小。

`tab-size`属性的语法如下：

```css
tab-size: <integer> | <length>;
```

- `<integer>`为整数值。表示 Tab 键输入的空格的宽度等于几个 Space 键输入的空格（U+0020）的宽度。
- `<length>`为长度值。表示每个 Tab 键输入的空格的宽度值。

唯一应用场景：

> 在技术文档中，一定会使用大量的`<pre>`元素来展示程序代码，因为`<pre>`元素中 white-space 的属性值是 pre，空格不会发生合并，Tab 键输入的空格缩进或者 Space 键输入的空格缩进都可以准确显示出来，方便代码阅读。但是有一个问题，那就是在所有浏览器中，每个 Tab 键输入的空格的宽度等同于 8 个 Space 键输入的空格的宽度，而在编辑器中却不是这样的。在编辑器中，每个 Tab 键输入的空格的宽度等同于 4 个 Space 键输入的空格的宽度，这就会导致在`<pre>`元素中使用 Tab 键缩进的代码产生过度缩进的效果。
>
> 使用 tab-size 属性即可调整：
>
> ```css
> pre {
>   -moz-tab-size: 4;
>   tab-size: 4;
> }
> ```

## 30. 字体特征和变体

字体特征和变体指 OpenType 字体中包含的不同字形或字符样式。其中的 OpenType 字体是 Adobe 和微软联合开发的一种字体，字体文件的原始后缀可能是.otf、.otc、.ttf 或.ttc。OpenType 目前是国际标准组织（International Organization for Standardization，ISO）的公开标准，于 2007 年 3 月以 ISO/IEC 14496-22 发布。而“不同字形或字符样式”指的是连字（将 fi 或 ffl 等字符组合在一起的特殊字形）、字距（调整特定字母形式对之间的间距）、分数、数字样式和其他一些字符。

### font-variant-caps 属性

font-variant-caps 属性的语法如下：

```stylus
font-variant-caps: normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps
```

- small-caps 表示小型大写字母，对应的 OpenType 特征值是"smcp"（可以作为 font-feature-settings 的属性值）。
- all-small-caps 表示无论是大写字母还是小写字母，全部都变成小型大写字母
- all-petite-caps 表示无论是大写字母还是小写字母，全部都变成特小型大写字母
- titling-caps 表示使目标字符显示为标题大写字母，对应的 OpenType 特征值是"titl"。标题大写字母是专门为标题设计的大写字母的变体，通过减小笔画宽度避免全大写的标题的表现过于强烈。

### font-variant-numeric 属性

font-variant-numeric 属性主要用来设置数字的变体效果。

font-variant-numeric 属性的语法如下：

```stylus
font-variant-numeric: normal;
font-variant-numeric: [ lining-nums | oldstyle-nums ] || [ proportional-nums |
tabular-nums ] || [ diagonal-fractions | stacked-fractions ] || ordinal || slashed-zero;
```

- ordinal 表示强制使用序数标记特殊的标志符号。例如无须使用`<sup>`标签就可以让字符“1st，2nd，3rd，4th，5th”表现为图 9-37 所示的上标效果。ordinal 对应的 OpenType 特征值是"ordn"，操作系统中常规的英文字体并没有包含此特征，使用专门设计过的字体才可以实现数字序列化的效果。

  ![image-20221024094519080](CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221024094519080.png)

- proportional-nums 和 tabular-nums 用来控制数字的尺寸。其中，proportional- nums 表示每个数字占据的宽度并不一致，宽度大小由字形大小决定；tabular-nums 表示每个数字占据的宽度都是一样的，数字就好像被约束在宽度一致的表格中。

- diagonal-fractions 和 stacked-fractions 用来控制分数的样式。其中，diagonal-fractions 表示让分子和分母尺寸变小并将两者用斜线隔开；stacked-fractions 表示让分子和分母尺寸变小并将两者使用水平线隔开。

  ![image-20221024094851974](CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221024094851974.png)

### font-variant-alternates 属性

font-variant-alternates 属性主要用来让字体发生变化，包括样式和风格的变化，以及字符集和字符的变化，从而让字体变得花哨，或者变成装饰字符、注释字符等。

font-variant-alternates 属性值以函数为主，具体代码如下：

```stylus
font-variant-alternates: normal;
font-variant-alternates: stylistic() || historical-forms || styleset(#) ||
character-variant(#) || swash() || ornaments() || annotation();
```

- swash()函数表示启用花式字形，例如夸张的衬线、端点、尾部、笔锋等

  ![image-20221024095154630](CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221024095154630.png)

- ornaments()函数启用装饰字形

  ![image-20221024095231521](CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221024095231521.png)

## 31. image-rendering 属性

image-rendering 属性用来设置图像的缩放算法，主要针对 PNG 和 JPG 这类位图。image-rendering 属性可以设置在`<img>`元素上，也可以设置在`<img>`元素的祖先元素上。在现代浏览器中，image-rendering 属性还可以设置 background 图像和 canvas 画布图像的缩放算法。image-rendering 属性只有在图像发生缩放的时候才会有效果。

语法如下：

```stylus
image-rendering: auto | crisp-edges | pixelated
```

- auto 表示浏览器自动选择使用何种图像缩放算法，通常表现为平滑缩放。
- crisp-edges 表示不使用平滑缩放算法，因此，缩放的图像会有较高的对比度和较锐利的边缘，也不会有模糊的感觉。常用的算法包括邻近算法和其他像素艺术算法，如 2×SaI 和 hqx 系列算法。
- pixelated 表示当放大图像时，必须使用邻近算法，使图像看起来由大像素块组成；当缩小图像时，使用与 auto 关键字属性值相同的算法。

## 32. 实现图像半透明叠加的 cross-fade()函数

cross-fade()函数可以让两张图像半透明混合。语法如下：

```stylus
cross-fade(url(green.png) 75%, url(red.png) 75%);
cross-fade(url(red.png) 20%, url(yellow.png) 30%, url(blue.png) 50%);
```

举例：

```css
<div class='cross-fade-image' > </div > .cross-fade-image {
  width: 300px;
  height: 300px;
  background: no-repeat center / contain;
  background-image: -webkit-cross-fade(url(1.jpg), url(2.jpg), 50%);
  background-image: cross-fade(url(1.jpg), url(2.jpg), 50%);
}
```

![image-20221025095719088](CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221025095719088.png)

## 33. filter 属性

### 滤镜函数列表

| 滤镜                                             | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :----------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blur(px)                                         | 对图像应用模糊效果。较大的值将产生更多的模糊。如果为指定值，则使用 0。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| brightness(%)                                    | 调整图像的亮度。0％ 将使图像完全变黑。默认值是 100％，代表原始图像。值超过 100％ 将提供更明亮的结果。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| contrast(%)                                      | 调整图像的对比度。0％ 将使图像完全变黑。默认值是 100％，代表原始图像。超过 100％ 的值将提供更具对比度的结果。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| drop-shadow(h-shadow v-shadow blur spread color) | 对图像应用阴影效果。可能的值：h-shadow - 必需。指定水平阴影的像素值。负值会将阴影放置在图像的左侧。v-shadow - 必需。指定垂直阴影的像素值。负值会将阴影放置在图像上方。blur -可选。这是第三个值，单位必须用像素。为阴影添加模糊效果。值越大创建的模糊就越多（阴影会变得更大更亮）。不允许负值。如果未规定值，会使用 0（阴影的边缘很锐利）。spread - 可选。这是第四个值，单位必须用像素。正值将导致阴影扩展并增大，负值将导致阴影缩小。如果未规定值，会使用 0（阴影与元素的大小相同）。**注释：**Chrome、Safari 和 Opera，也许还有其他浏览器，不支持第 4 个长度；如果添加，则不会呈现。color - 可选。为阴影添加颜色。如果未规定，则颜色取决于浏览器（通常为黑色）。这个例子创建了红色的阴影，水平和垂直方向均为 8px，带有 10px 的模糊效果：filter: drop-shadow(8px 8px 10px red);**提示：**这个滤镜类似 box-shadow 属性。 |
| grayscale(%)                                     | 将图像转换为灰阶。0% (0) 是默认值，代表原始图像。100％ 将使图像完全变灰（用于黑白图像）。**注释：**不允许负值。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| hue-rotate(deg)                                  | 在图像上应用色相旋转。该值定义色环的度数。默认值为 0deg，代表原始图像。**注释：**最大值是 360deg。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| invert(%)                                        | 反转图像中的样本。0% (0) 是默认值，代表原始图像。100％将使图像完全反转。**注释：**不允许负值。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| opacity(%)                                       | 设置图像的不透明度级别。opacity-level 描述了透明度级别，其中：0% 为完全透明。100% (1) 是默认值，代表原始图像（不透明）。**注释：**不允许负值。**提示：**这个滤镜类似 opacity 属性。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| saturate(%)                                      | 设置图像的饱和度。0% (0) will make the image completely un-saturated.100% is default and represents the original image.Values over 100% provides super-saturated results.**注释：**不允许负值。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| sepia(%)                                         | 将图像转换为棕褐色。0% (0) 是默认值，代表原始图像。100％ 将使图像完全变为棕褐色。**注释：**不允许负值。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

#### 模糊滤镜函数 blur()

blur()函数支持任意长度值，但是不支持百分比值。blur()函数的参数值表示高斯函数的标准偏差值，可以理解为屏幕上互相融合的像素数量。因此，blur()函数的参数值越大，图像的模糊效果越明显。

##### 边缘泛白问题

由于图像的边缘区域的像素点数量不足，因此，图像边缘的模糊效果是半透明的，存在泛白现象。适当放大图片，可以解决。

更多案例：[filter:blur()径向模糊和局部模糊效果 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/11/1-1.php)

#### 亮度滤镜函数 brightness()

brightness()函数的参数值支持数值和百分比值，范围是 0 到无穷大。参数值 0 或 0%表示纯黑色，参数值 1 或 100%表示正常的亮度，0 ～ 1 或 0%～ 100%的亮度是线性变化的。随着参数值逐渐大于 1 或大于 100%，元素的亮度也会逐渐提升。brightness()函数的参数值可以为空，此时等同于使用参数值 1。

##### 实现黑白着色效果

除了常规的明暗调整，brightness()函数还可以用来实现黑白着色效果。例如对于黑色图标，设置足够大的亮度值就可以让图标变成白色。

> 注意：使用 brightness()函数改变图标颜色的方法只适用于黑白两色之间切换。

查看实例：[filter:brightness()实现按钮图标变色 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/11/1-2.php)

#### 投影滤镜函数 drop-shadow()

使用 drop-shadow()函数可以给元素设置符合真实世界阴影规则的投影效果。drop-shadow()函数语法如下：

```stylus
filter: drop-shadow(x偏移, y偏移, 模糊大小, 色值);
```

##### 与 box-shadow() 的区别

- drop-shadow()函数不支持扩展

- drop-shadow()函数没有内投影效果

- drop-shadow()函数不支持使用逗号语法重叠多个投影

- 实例对比：[filter:drop-shadow()和 box-shadow 虚线框阴影效果 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/11/1-3.php)

- CSS 绘制的小三角应用 drop-shadow()函数也能有投影效果。

  ![image-20221025143345954](CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221025143345954.png)

#### 灰度滤镜函数 grayscale()

使用 grayscale()函数可以实现元素的去色效果，让所有彩色值变成灰度值。

**grayscale()函数比较经典的应用是在特殊的节日让网页变灰**，这个效果只需一行 CSS 代码即可实现：

```css
body {
  filter: grayscale(1);
}
```

#### 色调旋转滤镜函数 hue-rotate()

hue-rotate()函数可以调整元素的色调，但饱和度和亮度保持不变。hue-rotate()函数的参数值支持角度值，例如 90deg 或 0.5turn 等，角度值的范围没有限制，每 360 度就是一个循环。

由于 hue-rotate()函数不会改变任意灰度色值（包括黑色和白色），因此，可以利用该函数非常方便地复制出包含众多色彩的小组件，如按钮元素。

![image-20221025143934115](CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221025143934115.png)

案例：[filter:hue-rotate()与文字彩虹渐变流动效果 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/11/1-4.php)

## 34. backdrop-filter 属性

backdrop-filter 属性和 filter 属性的语法几乎是一模一样的。两者的区别在于**backdrop-filter 属性是让当前元素所在区域后面的内容应用滤镜效果，要想看到滤镜效果，需要当前元素本身是半透明或者完全透明的；而 filter 属性是让当前元素自身应用滤镜效果。**

![image-20221025144931450](CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221025144931450.png)

backdrop-filter 属性最实用的能力就是实现毛玻璃效果。案例：[backdrop-filter 与下拉毛玻璃效果 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/11/2-3.php)

## 35. CSS 混合模式

CSS 有下面 3 个混合模式相关属性：

- background-blend-mode 属性用于混合元素背景图案、渐变和颜色；
- mix-blend-mode 属性用于元素与元素之间的混合；
- isolation 属性用在祖先元素上，限制 mix-blend-mode 属性设置的混合模式的应用范围。

[mix-blend-mode 各个混合模式值效果 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/11/3-1.php)

## 36. CSS 遮罩

CSS 遮罩属性非常实用，它可以让一个元素按照某张图像的轮廓显示。

### mask-image 属性

用于设置使用遮罩效果的图像。所谓遮罩效果，就是只会显示遮罩图像非透明区域(默认情况下)的内容。

语法如下：

```stylus
mask-image: none | <image> | <mask-source>
```

- none 是默认值，表示默认无遮罩图片。
- `<image>`表示图像数据类型，包括 CSS 渐变图像、url()函数、image-set()函数、cross-fade()函数和 element()函数等。
- `<mask-source>`表示遮罩元素类型，主要指 SVG 遮罩元素。

案例：

```html
<img src="8.jpg" class="mask-image" /> .mask-image { mask: no-repeat center / contain; mask-image: url(bird.png); }
```

![image-20221027162102451](CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221027162102451.png)

[mask-image png 图片遮罩效果 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/12/1-1.php)

### mask-mode 属性

mask-mode 属性的默认值是 match-source，作用是根据资源的类型自动采用合适的遮罩模式。例如，如果遮罩效果使用的是 SVG 中的`<mask>`元素，则此时的 mask-mode 属性的计算值是 luminance，表示基于亮度判断是否要进行遮罩。如果是其他场景，则计算值是 alpha，表示基于透明度判断是否要进行遮罩。

mask-mode 支持下面 3 个属性值：

```stylus
mask-mode: match-source;
mask-mode: luminance;
mask-mode: alpha;
```

### mask-repeat 属性

mask-repeat 属性的默认值是 repeat，作用类似于 background-repeat 属性。

支持一下值：

```css
mask-repeat: repeat-x;
mask-repeat: repeat-y;
mask-repeat: repeat;
mask-repeat: no-repeat;
mask-repeat: space;
mask-repeat: round;
```

每个属性值的含义如下:

- repeat-x 表示水平方向平铺。
- repeat-y 表示垂直方向平铺。
- repeat 是默认值，表示水平和垂直方向均平铺。
- no-repeat 表示不平铺，会看到只有一个遮罩图形位于左上角。
- space 与 background 属性中的 space 的含义是类似的，表示遮罩图片尽可能地平铺，同时不进行任何剪裁。
- round 表示遮罩图片尽可能靠在一起，没有任何间隙，同时不进行任何剪裁。这意味着图片可能会产生缩放效果。

### mask-position 属性

mask-position 和 background-position 支持的属性值和属性值的表现基本上都是一样的。

### mask-clip 属性

mask-clip 属性用来设置遮罩效果显示的盒子区域。mask-clip 属性支持的属性值如下：

```css
mask-clip: border-box;
mask-clip: padding-box;
mask-clip: content-box;

mask-clip: no-clip;

mask-clip: fill-box;
mask-clip: stroke-box;
mask-clip: view-box;
```

mask-clip 的几个属性值中比较有实用价值的是 border-box、padding-box 和 content-box 这 3 个关键字的属性值。

### mask-size 属性

mask-size 属性的性质和 background-size 属性类似，支持的关键字属性值也类似，作用是控制遮罩图片尺寸。mask-size 属性的默认值是 auto，它支持 contain 和 cover 两个关键字属性值。

### mask-composite 属性

mask-composite 属性表示同时使用多张图片进行遮罩时的合成方式，它支持如下属性值：

```css
mask-composite: add;
mask-composite: subtract;
mask-composite: intersect;
mask-composite: exclude;
```

- add 表示遮罩累加，是默认值。
- subtract 表示遮罩相减，也就是遮罩图片重合的区域不显示。这就意味着，遮罩图片越多，遮罩区域越小。
- intersect 表示遮罩相交，也就是遮罩图片重合的区域才显示遮罩。
- exclude 表示遮罩排除，也就是遮罩图片重合的区域被当作透明的。

### -webkit-mask-box-image 和 mask-border 属性

-webkit-mask-box-image 和 mask-border 属性实现的都是边框遮罩效果。两者区别如下：

- 语法细节不同。例如，-webkit-mask-box-image 的属性值使用空格分隔，不会用到斜杠，而 mask-border 属性是多个 CSS 属性的缩写，会使用斜杠进行属性值的区分。
- -webkit-mask-box-image 是非标准 CSS 属性，mask-border 是标准 CSS 属性。
- -webkit-mask-box-image 属性在 webkit 内核浏览器中兼容性极佳，因此，在移动端项目可以放心大胆使用；而 mask-border 属性在我书写这段内容的时候还没有被任何浏览器支持，暂无实用价值。

查看案例：[-webkit-mask-box-image 尺寸任意渐变提示框效果 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/12/1-12.php)

### CSS 遮罩的一些经典应用示例

1. CSS 遮罩的一些经典应用示例：[mask 遮罩 PNG 小图标变色效果 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/12/1-10.php)

## 37. CSS 剪裁属性 clip-path

clip-path 属性可以用来对任意元素的**可视区域**进行剪裁。

clip-path 属性支持多种不同类型的属性值，示意如下：

```stylus
/* 关键字属性值 */
clip-path: none;

/* <clip-source> 值类型 */
clip-path: url(resources.svg#someId);

/* <geometry-box> 值类型 */
clip-path: margin-box;
clip-path: border-box;
clip-path: padding-box;
clip-path: content-box;
clip-path: fill-box;
clip-path: stroke-box;
clip-path: view-box;

/* <basic-shape> 值类型 */
clip-path: inset(100px 50px);
clip-path: circle(50px at 0 100px);
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
clip-path: path('M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3
A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z');
```

clip-path 属性很多，但兼容性比较好的暂时只有`<basic-shape>` 值类型，也就是基本形状函数绘制函数。

### inset()函数

使用 inset()函数可以剪裁出矩形和圆角矩形形状，

> 它是和 clip 属性中的 rect()函数关系最近的一个函数：
>
> - rect()函数的 4 个值只对应 2 个方位，分别是元素的上、左、上、左。
> - inset()函数的 4 个值对应 4 个方位，分别是元素的上、左、下、右。

inset()函数支持百分比值。

```stylus
clip-path: inset(10% 20% 30% 40%);
```

inset()函数还支持圆角的设置，语法如下（注意 round 的位置和顺序）：

```stylus
inset(<length-percentage>{1,4} round <'border-radius'>);
```

```css
/* 偏移大小15%，圆角大小10% 50% 10% 50%*/
clip-path: inset(15% round 10% 50% 10% 50%);
```

### circle()函数

circle()函数可以用来剪裁圆形形状，其语法如下：

```stylus
circle( [ <shape-radius> ]? [ at <position> ]? )
```

```css
/* 以右下角为圆心进行圆形剪裁 */
img {
  clip-path: circle(180px at right bottom);
}
```

### ellipse()函数

ellipse()函数可以用来剪裁椭圆形状，语法如下：

```stylus
ellipse( [ <shape-radius>{2} ]? [ at <position> ]? )
```

```css
img {
  clip-path: ellipse(30% 50% at 75% 50%);
}
```

### polygon()函数

polygon()函数通过设定一个个坐标值，最后连起来形成一个图形。

语法如下：

```stylus
polygon( <fill-rule>? , [ x, y ]## )
```

`<fill-rule>`数据类型表示填充规则，值可以是 nonzero 或 evenodd。

[Clippy — CSS clip-path 生成器 (html.cn)](https://www.html.cn/tool/css-clip-path/)

## 38. CSS 实现倒影效果

通过`-webkit-box-reflect`属性，CSS 可以实现倒影效果。

语法如下：

```stylus
-webkit-box-reflect: [ above | below | right | left ]? <length>? <image>?
```

这一语法分为方位、偏移大小和遮罩图像这 3 部分:

- 方位：可以是 above、below、left 和 right 这 4 个值中的任意一个，分别表示在上、下、左、右进行倒影。
- 偏移大小：表示倒影和原始元素的偏移距离，可以是数值，也可以是百分比值。如果是百分比值，则百分比大小是相对于元素自身尺寸计算的，与 transform 属性中 translate()函数的百分比计算规则是一致的。
- 遮罩图像：可以实现对元素倒影的遮罩控制，支持 url()函数图像、渐变图像等。

```css
-webkit-box-reflect: below;
-webkit-box-reflect: right;
-webkit-box-reflect: right 10px;
-webkit-box-reflect: below 0 linear-gradient(transparent, white);
-webkit-box-reflect: below 0 url(shuai2.png);
```

[-webkit-box-reflect 倒影属性值效果 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/12/3-1.php)

## 39. 使用 offset 属性实现元素的不规则运动

借助 offset 属性实现元素的不规则运动。offset 属性的确挺好用的，但是 offset 属性有一个缺点，那就是 Safari 浏览器并不提供对它的支持。

[offset-path 元素不规则 path 路径运动 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/12/4-1.php)

### offset-anchor 属性

offset-anchor 属性用来确定偏移运动的锚点，也就是确定元素中沿着轨迹运动的点。

```stylus
offset-anchor: auto | <position>
```

```css
offset-anchor: top;
offset-anchor: 25% 75%;
offset-anchor: 0 0;
offset-anchor: 1cm 2cm;
offset-anchor: 10ch 8em;
offset-anchor: bottom 10px right 20px;
offset-anchor: right 3em bottom 10px;
```

### offset-distance 属性

offset-distance 属性表示偏移的距离大小，也就是元素沿着路径移动的距离，支持百分比值和长度值。

```css
/* 默认值 */
offset-distance: 0;
/* 偏移50%距离 */
offset-distance: 50%;
/* 固定的长度值 */
offset-distance: 50px;
```

### offset-path 属性

offset-path 属性指的是运动的路径，支持多种路径类型。

```stylus
offset-path: none;
offset-path: ray( [ <angle> && <size> && contain? ] );
offset-path: <path()>;
offset-path: <url>;
offset-path: [ <basic-shape> || <geometry-box> ];
```

目前能用的基本只有`path()`

### offset-position 属性

offset-position 属性的作用是定义路径的起始点。

```stylus
offset-position: auto | <position>
```

### offset-rotate 属性

offset-rotate 属性用来定义元素沿着 offset-path 路径运动时的方向和角度。

```stylus
offset-rotate: [ auto | reverse ] || <angle>
```

### 兼容性

![image-20221101170455375](./CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221101170455375.png)

## 40. 滚动行为相关

### scroll-behavior 属性与页面平滑滚动

scroll-behavior 是一个交互效果渐进增强的 CSS 属性。

scroll-behavior 属性的语法：

```css
scroll-behavior: auto;
scroll-behavior: smooth;
```

#### 使用场景

> 凡是需要滚动的地方都加一句`scroll-behavior:smooth`。

不用管用不用得到，也不用管浏览器兼容性如何，你都可以加上这一句代码。浏览器如果支持它自然是锦上添花，浏览器如果不支持也还是原来的状态。

#### 兼容性

![image-20221101170815821](./CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221101170815821.png)

### 使用 overscroll-behavior 属性实现当滚动嵌套时终止滚动

overscroll-behavior 属性可以设置 DOM 元素滚动到边缘时的行为。

```stylus
overscroll-behavior: [ contain | none | auto ]{1,2}
```

- auto：默认值，表现为我们默认看到的滚动行为，即滚动条滚动到边缘后继续滚动外部的可滚动容器。
- contain：默认的滚动溢出行为只会表现在当前元素的内部（例如“反弹”效果或刷新），不会对相邻的滚动区域进行滚动。例如浮层滚动（带弹性效果）时，底层元素不会滚动。
- none：相邻的滚动区域不会发生滚动，并且会阻止默认的滚动溢出行为。

案例：[CSS overscroll-behavior 滚动阻止 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/13/1-2.php)

#### 兼容性

![image-20221101171147276](./CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221101171147276.png)

overscroll-behavior 本身属于体验增强的 CSS 属性，因此可以在实际项目中大胆使用，如果浏览器支持自然体验更好，浏览器如果不支持也就是保持现在这个样子而已。

### overflow-anchor 属性实现滚动锚定

> 滚动锚定是什么?
>
> 当前视口上面的内容突然出现的时候，浏览器会自动改变滚动高度，让视口区域内容固定，就像滚动效果被锚定一样。

语法：

```stylus
overflow-anchor: auto | none
```

其中 overflow-anchor:auto 是初始声明，表示浏览器自己决定滚动锚定的行为，通常表现为执行滚动锚定。overflow-anchor:none 则表示禁止滚动锚定的行为。

案例：[overflow-anchor 值效果对比 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/13/1-3.php)

#### 兼容性

![image-20221101171707915](./CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221101171707915.png)

### CSS Scroll Snap

CSS Scroll Snap 是 CSS 中一个独立的模块，可以让网页容器滚动停止的时候，自动平滑定位到指定元素的指定位置。具体效果：[CSS Scroll Snap 基本效果示意 » CSS 新世界 demo 演示 (cssworld.cn)](https://demo.cssworld.cn/new/13/1-4.php)

#### scroll-snap-type 属性

scroll-snap-type 属性的作用是确定定位方式是水平滚动定位，还是垂直滚动定位。它支持的属性值有以下几个：

- none：默认值，表示滚动时忽略捕捉点，也就是我们平时使用的滚动。
- x：捕捉水平定位点。
- y：捕捉垂直平定位点。
- block：捕捉和块状元素排列一个滚动方向的定位点，默认文档流下指的就是垂直轴。
- inline：捕捉和内联元素排列一个滚动方向的定位点，默认文档流下指的就是水平轴。
- both：横轴、纵轴都捕捉。
- mandatory：表示“强制”，为可选参数。强制定位，也就是如果存在有效的定位点位置，则滚动容器必须在滚动结束时进行定位。
- proximity：表示“大约”，为可选参数。可能会定位，类似这种表意模糊的词是最难理解的，这个值的作用表现为让浏览器自己判断要不要定位。

#### scroll-snap-align 属性

scroll-snap-align 属性是作用在滚动容器子元素上的，表示捕获点是上边缘、下边缘或中间位置。它支持的属性值有以下几个：

- none：默认值，不定义位置。
- start：起始位置对齐，如垂直滚动、子元素和容器同上边缘对齐。
- end：结束位置对齐，如垂直滚动、子元素和容器同下边缘对齐。
- center：居中对齐，子元素中心和滚动容器中心一致。

#### 兼容性

![image-20221102092028194](./CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221102092028194.png)

## 41. pointer-events:none

pointer-events:none 声明可以让元素无视点击、鼠标悬停和拖拽等行为。

> 不建议，`pointer-events:none；`用于禁用按钮。原因如下：
>
> 1. 不能阻止键盘行为
> 2. 影响无障碍访问

## 42. resize 属性设置拉伸效果

通过 resize 属性可以让元素拥诸如`<textarea>`的拉伸效果。

> 注意：resize 属性并不是设置了就有效果，而是有一些限制条件，包括如下条件：
>
> - 不支持内联元素
> - 如果是块级元素，需要 overflow 属性的计算值不是 visible

resize 属性的语法如下：

```stylus
resize: none | both | horizontal | vertical | block | inline;
```

- none: 禁用拉伸
- both: 既可以水平方向拉伸，也可以垂直方向拉伸
- horizontal：仅可以水平方向拉伸
- vertical：仅可以垂直方向拉伸
- block：其表示沿着块级元素的排列方向拉伸，默认是垂直方向，也可能是水平方向，这取决于 writing-mode 的值。
- inline：和 block 属性值类似，只是 inline 表示内联元素的排列方向。默认是水平方向，如果使用 writing-mode 属性改成垂直排版，则 inline 的拉伸方向就会变成垂直方向。

### resize 属性生效的原理

设置了 resize 属性的元素通过拉伸改变元素的尺寸是通过设置元素的 width 属性值和 height 属性值实现的。

因此，如果希望元素拉伸的尺寸不是无限的，可以通过设置 min-width、min-height、max-width 和 max-height 这些 CSS 属性值进行限制。

### 兼容性

![image-20221102100106030](./CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221102100106030.png)

现代浏览器都支持 resize 属性，由于 resize 属性生成的拖拽区域太小，在移动端体验并不好，因此 iOS 的 Safari 浏览器并未对其提供支持。

## 43. 使用 cater-color 属性改变插入光标的颜色

使用 caret-color 属性可以改变输入框插入光标的颜色，同时又不改变输入框里内容的颜色。

例如：

```css
input {
  color: #333;
  caret-color: red;
}
```

![image-20221103111650618](./CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221103111650618.png)

### 兼容性

![image-20221103113054544](./CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221103113054544.png)

## 44. user-select 属性控制用户选中行为

语法如下：

```stylus
user-select: auto | text | none | contain | all
```

text 表示文字和图片可以被选中;all 表示整体被选中。

## 45. 使用::selection 改变文字被选中后的颜色

使用::selection 伪元素可以改变文字被选中后的颜色和背景色。

### 兼容性

![image-20221103114458940](./CSS%20%E6%96%B0%E5%B1%9E%E6%80%A7%E5%AD%A6%E4%B9%A0.assets/image-20221103114458940.png)

## 46. 打印行为相关

### 通过媒体查询语句隐藏部分信息

```css
@media print {
  header,
  footer {
    display: none;
  }
}
```

### color-adjust 属性

是否允许浏览器自己调节颜色以便有更好的阅读体验。

color-adjust 属性的语法如下：

```css
color-adjust: economy;
color-adjust: exact;
```

- economy 是默认值，表现为浏览器（或其他客户端）对元素进行样式上的调整，调整的规则由浏览器自己决定，以便达到更好的输出效果。
- exact 是告诉浏览器，我设置的这些颜色和背景等元素都是有必要的、精确匹配的，你不要自作聪明帮我做调整。

### break-before 和 break-after 属性

break-before 属性的作用是让当前元素作为一栏或一页的起始元素，break-after 的作用是让当前元素作为一栏或一页的末尾元素。

### orphans/widows 属性与内容行数的限制

orphans 和 widows 属性用来限制在分栏、分页和分区中内容的最小行数，其中 orphans 属性用来限制底部行数，widows 属性用来限制顶部行数。
