# 基于 Jquery 简单实现贪吃蛇游戏

## 前言

刚开始是学习前端那会，在熟悉 HTML+CSS+JS 后，我开始尝试去做贪吃蛇游戏。没想到在一顿瞎搞后还真搞出来了一个简陋版的贪吃蛇。哈哈！因为这是我刚开始学习前端的时候做的，所以代码有点简陋，甚至可能存在不合理的地方。大家看的时候须得留心。

![在这里插入图片描述](./images/1.gif)

## 实现思路概述

本项目实现思路是非常简单的。即在地图（也就是贪吃蛇可以活动的范围）上，找到一个点做坐标原点，然后将地图划分成一个坐标系。借助坐标系，就可以通过 JS 来控制 HTML 元素标签的移动，来实现贪吃蛇的上下左右的移动。此外，通过判断坐标 XY 值的是否相等实现碰撞判定。

以上就是，贪吃蛇这个游戏的基本实现思路了。

## 要点分析及大致实现思路讲解

接下来就是分析贪吃蛇这个游戏需要实现的要点。

### 思维模式

在讲解要点前，我们首先要确定一个思维模式。即：

> 所有看似很复杂的事物都是由各个较小的事物进行特定排序的组合而成的。

这个思维模式是非常重要的，是我们解决大多数问题的有效方法。就好比搭积木，通过对积木的有效组合（堆叠），我们就可以搭建出各种各样形状出来。所以，要学会将大一个复杂的问题拆解成多个小的问题。如果小的问题还是很复杂，那就再进行拆解。

### 贪吃蛇的拆解

在拆解前，我们先要找出贪吃蛇游戏有什么？

贪吃蛇游戏大致上有：

1. 有一个给贪吃蛇活动的地图
2. 有一条可以活动的贪吃蛇
3. 有食物

上面这次查找就是一次拆解划分。当然啦！这是最初浅的拆解。接下来就是基于这 3 个部分进行拆解

##### 基于地图的拆解

**地图，也就是贪吃蛇活动的区域。**

那这个区域具体是什么呢？因为这个项目是基于 HTML+CSS+Javascript 来实现的。自然而然的，我们就想到在页面中划分一个区域就应该是一个 div 标签了。所以，我们只需要在 HTML 文件添加一个 div 标签就可以完成地图的基础构建了。

但是呢！这只是基础构建。上面我们说到，要将地图划分成一个坐标系。这又要怎么做呢？

**坐标系的创建**

想要创建坐标系就要明白坐标系有什么。

> 坐标系有：原点、X 轴、Y 轴

那 HTML+CSS+Javascript 有这个三个东西吗？

有的！CSS 里面有。

> CSS 默认设置`position`属性的标签的左上角是其子元素标签的参照点。然后借助`top`、`right`、`bottom`和`left`可以对子元素标签进行移动。
>
> 这样，原点（左上角）、X 轴（`left`或`right`）、Y 轴（`top`或`bottom`）就出来了。

但在创建坐标系时我们还需要注意一点，这个坐标系是有边界的。这时就有一个问题出现了，这个边界有多宽。

前面我们说到，要基于坐标系来进行碰撞处理。而碰撞的判断标准就是坐标有没有重合。所以，就要保证边界的宽度一定是要蛇的一节蛇身长宽（注意，一节蛇身是一个正方形）的倍数。实际上就是将 div 划分成由许多个等大的小方格。

##### 对贪吃蛇的拆解

###### 蛇本身的拆解

蛇是由一节节蛇头加蛇身组成的。为了便于实现，我们将蛇头和每节蛇身拆解成一个个正方形，然后将它们首尾相连组成一条贪吃蛇。

###### 蛇的行走

贪吃蛇的行走有一个特点：后一节蛇身跟着前一节蛇身走，第一节蛇身跟着蛇头走。

所以，在实现蛇的行走时需要记录行走前每节蛇身的坐标值，然后依次将前一节的蛇身坐标赋值给后一节的。

###### 上下左右转向的实现

因为贪吃蛇行走的特点，所以控制贪吃蛇的转向只需要控制蛇头的转向就行了。至于蛇头的转向可以通过监听键盘事件来调用相应的转向函数来实现。

##### 食物的拆解

食物本质上也是 div。因为要保证碰撞的生效（也就是蛇能有效吃到食物），所以食物 div 的大小要跟蛇头一样大。

##### 碰撞的拆解

碰撞时贪吃蛇游戏非常重要的一点。贪吃蛇游戏所有的游戏规则都是通过碰撞来实现的。

###### 碰撞的判定

碰撞的判定很简单，只需要判定蛇头的坐标和碰撞体的坐标是否重合进行。为了保证能准确判断坐标是否重合，我们需要保证的蛇的坐标生成规则、食物的生成规则已经墙壁（坐标系边界）的生成规则一致。

###### 碰撞体

碰撞有三种，分别是：食物、墙壁和蛇身

## 源码解析

### 转向的实现

> 控制贪吃蛇的转向是通过监听键盘事件，然后调动相应的`function`来实现的。所以，这部分功能共分 5 部分代码。分别为：左转、右转、上转、下转及键盘事件监听

#### 键盘事件监听

> 键盘事件的监听需要挂载到全局对象`window`上

```js
$(window).keydown(function (event) {
  //为窗口添加键盘事件，
  switch (event.keyCode) {
    case 38:
      {
        //判断单击按键是否为上
        move_top() //为真，则向上移动
      }
      break
    case 40:
      {
        move_bottom()
      }
      break
    case 37:
      {
        move_left()
      }
      break
    case 39:
      {
        move_right()
      }
      break
  }
})
```

#### 左转

> 上一篇文章中我们说到，贪吃蛇的移动只需控制蛇头的移动就行，蛇身都是跟着蛇头的轨迹在移动的。故而，我们需要将蛇头及蛇身的坐标全部获取到，然后根据这些坐标进行赋值操作从而实现蛇的一次移动操作。

##### 首先获取当前蛇头的坐标

> 用于蛇头的移动

```js
var $H_Top = parseInt($snakes.eq(0).css('top'))
var $H_Left = parseInt($snakes.eq(0).css('left'))
```

##### 其次获取蛇全部节点的坐标

```js
for (var i = 0; i < $snakes.length; i++) {
  coordinate_y[i] = $snakes.eq(i).css('top')
  coordinate_x[i] = $snakes.eq(i).css('left')
}
```

##### 接着就是蛇头的转向了

```js
// 因为是左移，所以left减去蛇一个节点的宽度
$snakes.eq(0).css('left', $H_Left - 20 + 'px')
```

##### 最后，蛇身跟着蛇头移动

```js
for (var i = 1; i < $snakes.length; i++) {
  $snakes.eq(i).css('top', coordinate_y[i - 1])
  $snakes.eq(i).css('left', coordinate_x[i - 1])
}
```

##### 全部代码如下

```js
// 左转
function move_left() {
  var $snakes = $('.background>div')
  var $H_Top = parseInt($snakes.eq(0).css('top'))
  var $H_Left = parseInt($snakes.eq(0).css('left'))

  // 获取当前贪吃蛇全部蛇身及蛇头的坐标
  for (var i = 0; i < $snakes.length; i++) {
    coordinate_y[i] = $snakes.eq(i).css('top')
    coordinate_x[i] = $snakes.eq(i).css('left')
  }

  // 贪吃蛇移动一次
  // 首先判断本次移动是否回头
  // 如果不是回头，则进行移动
  if (!($H_Top == parseInt(coordinate_y[1]) && $H_Left - 20 == parseInt(coordinate_x[1]))) {
    $snakes.eq(0).css('left', $H_Left - 20 + 'px')
    for (var i = 1; i < $snakes.length; i++) {
      $snakes.eq(i).css('top', coordinate_y[i - 1])
      $snakes.eq(i).css('left', coordinate_x[i - 1])
    }

    // 移动完成后判断是否发生碰撞
    collide_dead()

    // 吃的判定
    eat()
  } else {
    return false
  }
}
```

因为，所有的转向基本上是一样的。所以剩下的右转、上转、下转不做详细讲解：

#### 右转

```js
// 右转
function move_right() {
  var $snakes = $('.background>div')
  var $H_Top = parseInt($snakes.eq(0).css('top'))
  var $H_Left = parseInt($snakes.eq(0).css('left'))
  for (var i = 0; i < $snakes.length; i++) {
    coordinate_y[i] = $snakes.eq(i).css('top')
    coordinate_x[i] = $snakes.eq(i).css('left')
  }
  if (!($H_Top == parseInt(coordinate_y[1]) && $H_Left + 20 == parseInt(coordinate_x[1]))) {
    $snakes.eq(0).css('left', $H_Left + 20 + 'px')
    for (var i = 1; i < $snakes.length; i++) {
      $snakes.eq(i).css('top', coordinate_y[i - 1])
      $snakes.eq(i).css('left', coordinate_x[i - 1])
    }
    collide_dead()
    eat()
  } else {
    return false
  }
}
```

#### 上转

```js
// 上转
function move_top() {
  var $snakes = $('.background>div')
  var $H_Top = parseInt($snakes.eq(0).css('top'))
  var $H_Left = parseInt($snakes.eq(0).css('left'))
  for (var i = 0; i < $snakes.length; i++) {
    coordinate_y[i] = $snakes.eq(i).css('top')
    coordinate_x[i] = $snakes.eq(i).css('left')
  }
  if (!($H_Top - 20 == parseInt(coordinate_y[1]) && $H_Left == parseInt(coordinate_x[1]))) {
    $snakes.eq(0).css('top', $H_Top - 20 + 'px')
    for (var i = 1; i < $snakes.length; i++) {
      $snakes.eq(i).css('top', coordinate_y[i - 1])
      $snakes.eq(i).css('left', coordinate_x[i - 1])
    }
    collide_dead()
    eat()
  } else {
    return false
  }
}
```

#### 下转

```js
// 下转
function move_bottom() {
  var $snakes = $('.background>div')
  var $H_Top = parseInt($snakes.eq(0).css('top'))
  var $H_Left = parseInt($snakes.eq(0).css('left'))
  for (var i = 0; i < $snakes.length; i++) {
    coordinate_y[i] = $snakes.eq(i).css('top')
    coordinate_x[i] = $snakes.eq(i).css('left')
  }
  if (!($H_Top + 20 == parseInt(coordinate_y[1]) && $H_Left == parseInt(coordinate_x[1]))) {
    $snakes.eq(0).css('top', $H_Top + 20 + 'px')
    for (var i = 1; i < $snakes.length; i++) {
      $snakes.eq(i).css('top', coordinate_y[i - 1])
      $snakes.eq(i).css('left', coordinate_x[i - 1])
    }
    collide_dead()
    eat()
  } else {
    return false
  }
}
```

### 食物的生成

> 食物生成有两点需要注意：
>
> 1. 一定要在地图中
> 2. 不能和贪吃蛇重叠

#### 限制在地图中

> 假设地图的比例是 `50 * 20 x 30 * 20`。
>
> 注意：这里的 20 是坐标系跨度。也就是说，将坐标系划分成了 50 \* 30 等份

食物的坐标是随机的。所以我们可以通过`Math.random()`来生成随机数。`Math.random()`生成的值范围在 0 - 1 之间。

所以，要保证 X 轴坐标在 0 - 50 \* 20 之间 可以这样写：

```js
this.foot_x = Math.floor(Math.random() * 50) * 20
```

同理，Y 轴坐标：

```js
this.foot_y = Math.floor(Math.random() * 30) * 20
```

##### 不要和贪吃蛇重叠

> 这一点相对简单，只需要我们将生成出来的坐标和贪吃蛇节点坐标一一对比就行了。

```js
for (var i = 0; i < $snakes.length; i++) {
  coordinate_y[i] = $snakes.eq(i).css('top')
  coordinate_x[i] = $snakes.eq(i).css('left')
  if (foot_x != parseInt(coordinate_x[i]) && foot_y != parseInt(coordinate_y[i])) {
    //判断新坐标值是否跟蛇身重叠
    status = false //不存在重叠，转化status的值，跳出循环
  }
}
```

完整代码：

```js
// 生成食物
function create_foot() {
  var status = true //新建一个变量用来判断是否生成新的食物
  var $snakes = $('.background>div')
  do {
    this.foot_x = Math.floor(Math.random() * 50) * 20 //随机生成一个坐标值
    this.foot_y = Math.floor(Math.random() * 30) * 20
    for (var i = 0; i < $snakes.length; i++) {
      coordinate_y[i] = $snakes.eq(i).css('top')
      coordinate_x[i] = $snakes.eq(i).css('left')
      if (foot_x != parseInt(coordinate_x[i]) && foot_y != parseInt(coordinate_y[i])) {
        //判断新坐标值是否跟蛇身重叠
        status = false //不存在重叠，转化status的值，跳出循环
      }
    }
  } while (status)
  var $foot = $("<span class='foot'></span>")
  $foot.css('top', foot_y + 'px')
  $foot.css('left', foot_x + 'px')
  $background.append($foot)
}
```

### 吃动作

> 吃动作也就是蛇头碰撞食物。所以，要实现贪吃蛇是否吃到食物就需要判断蛇头的坐标有没有和食物的坐标重复。

```js
// 吃动作
function eat() {
  var $snakes = $('.background>div')
  var $H_Top1 = parseInt($snakes.eq(0).css('top')) //获取蛇头的坐标
  var $H_Left1 = parseInt($snakes.eq(0).css('left'))
  if ($H_Top1 == foot_y && $H_Left1 == foot_x) {
    //判断蛇头的坐标和食物的坐标是否重叠，重叠，添加一节蛇身，新建一个食物，分数加一，刷新分数
    $('.foot').remove()
    Crate_snake_boby()
    create_foot()
    ++$score
    $('.score span').html($score)
  }
}
```

### 添加一节新的蛇身

> 在贪吃蛇吃到一个食物时，就会长一节蛇身。对于这一点有两种解决方法，一种是在蛇头和第一节蛇身处插入；另一种就是在蛇尾插入了。我采用的就是在蛇尾插入的方法。
>
> 蛇尾插入有一点需要解决的是怎么确定新增蛇尾的位置？仔细观察蛇尾的运动，你会发现蛇尾最后两节必定存在 X 轴或者 Y 轴一致。基于这一点，就可以确定新增蛇尾添加的位置了。

```js
// 创建一节蛇身
function Crate_snake_boby() {
  var $newSnake_boby = $("<div class='snake_boby'></div>")
  var $snakes = $('.background>div')
  var Last_boby_x = parseInt($snakes.eq($snakes.length - 1).css('left')) //获取蛇尾的坐标
  var LastButOne_boby_x = parseInt($snakes.eq($snakes.length - 2).css('left')) //获取倒数第二节蛇身的坐标
  var Last_boby_y = parseInt($snakes.eq($snakes.length - 1).css('top'))
  var LastButOne_boby_y = parseInt($snakes.eq($snakes.length - 2).css('top'))
  //判断最后两节蛇身是否处在垂直
  if (Last_boby_x == LastButOne_boby_x) {
    //通过判断最后两节蛇身的y坐标来确定新蛇身的添加方向
    if (Last_boby_y > LastButOne_boby_y) {
      $newSnake_boby.css('left', Last_boby_x)
      $newSnake_boby.css('top', Last_boby_y + 20 + 'px')
    } else if (Last_boby_y < LastButOne_boby_y) {
      $newSnake_boby.css('left', Last_boby_x)
      $newSnake_boby.css('top', Last_boby_y - 20 + 'px')
    }
  } else if (Last_boby_y == LastButOne_boby_y) {
    if (Last_boby_x > LastButOne_boby_x) {
      $newSnake_boby.css('left', Last_boby_x + 20 + 'px')
      $newSnake_boby.css('top', Last_boby_y)
    } else if (Last_boby_x < LastButOne_boby_x) {
      $newSnake_boby.css('left', Last_boby_x - 20 + 'px')
      $newSnake_boby.css('top', Last_boby_y)
    }
  }
  $background.append($newSnake_boby)
}
```

### 死亡碰撞判定

> 贪吃蛇有两种死亡情况。一种就是撞墙，另一种就是吃到自己。基于碰撞判定的原则，即蛇头坐标与物体坐标重合即视为碰撞。那对于死亡的判定就可以转化为对坐标的判断。

```js
// 碰撞死亡判定
function collide_dead() {
  var $snakes = $('.background>div')
  var $H_Top1 = parseInt($snakes.eq(0).css('top')) //获取蛇头坐标
  var $H_Left1 = parseInt($snakes.eq(0).css('left'))
  for (var i = 0; i < $snakes.length; i++) {
    //遍历全部蛇身节点坐标
    coordinate_y[i] = $snakes.eq(i).css('top')
    coordinate_x[i] = $snakes.eq(i).css('left')
  }
  for (var j = 1; j < $snakes.length; j++) {
    //判断蛇头坐标是否跟蛇身任意节点坐标重叠，重叠则认为吃到自己，清空setInterval，显示GameOver
    if ($H_Top1 == parseInt(coordinate_y[j]) && $H_Left1 == parseInt(coordinate_x[j])) {
      clearTimeout(Time)
      $('.GameOver').show()
      return false
    }
    //判断是否超出边界
    if ($H_Top1 > 580 || $H_Top1 < 0 || $H_Left1 > 980 || $H_Left1 < 0) {
      clearTimeout(Time)
      $('.GameOver').show()
      return false
    }
  }
}
```

### 自动行走

> 自动行走是沿着当前前进方向自动行走。如果不添加自动行走功能，那贪吃蛇每走一步就需要玩家按一次转向按键。

#### 实现

1. 获取当前行走的方向

   行走的方向可以在转向的时候做个记录

2. 自动行走的速度

   行走的速度牵涉到游戏难度的设定，可以再游戏开始的时候根据游戏难度来设定。

3. 自动行走的实现

   通过`setInterval()`来实现

```js
var $grade = 100 // 行走的速度，通过游戏难度来设定
var Time = setInterval(Auto_walk, $grade) //使用setInterval()方法，实现蛇的自动行走

// 依照当前前进方向自动行走
function Auto_walk() {
  if (status == 'Right') {
    move_right()
  } else if (status == 'Left') {
    move_left()
  } else if (status == 'Top') {
    move_top()
  } else if (status == 'Bottom') {
    move_bottom()
  }
}
```

## 结语

以上就是实现贪吃蛇游戏的主要代码了。希望对大家有用。下面是整套源码（包括 JS 和 HTML 部分）。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    <link rel="stylesheet" href="css/snake.css" />
  </head>
  <body>
    <div class="background">
      <p class="score">您的成绩：<span>0</span></p>
      <p class="grade">当前难度：<span></span></p>
      <div class="snake start"></div>
    </div>
    <div class="begin">
      <ul>
        <li><input type="button" id="btn_begin" value="开始" /></li>
        <li>
          <select>
            <option value="1" selected="selected">简单</option>
            <option value="2">困难</option>
            <option value="3">地狱</option>
          </select>
        </li>
        <li><input type="button" id="btn_exit" value="退出" /></li>
      </ul>
    </div>
    <div class="GameOver">
      <input type="button" value="重新开始" id="btn_restart" />
    </div>
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/snake.js"></script>
  </body>
</html>
```

```css
* {
  margin: 0px;
  padding: 0px;
  list-style: none;
}
body {
  position: relative;
}
.background {
  position: relative;
  top: 50px;
  z-index: -1;
  margin: 20px auto;
  width: 1000px;
  height: 600px;
  border: solid 2px;
  background-color: #8cc63e;
}
.snake {
  display: inline-block;
  border: solid 1px;
  width: 20px;
  height: 20px;
  background-color: gray;
  position: absolute;
  z-index: 10px;
}
.start {
  top: 300px;
  left: 100px;
}
.snake_boby {
  display: inline-block;
  border: solid 1px;
  width: 20px;
  height: 20px;
  background-color: #7dbb32;
  position: absolute;
  border-radius: 40%;
  z-index: 10px;
}
.foot {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(../img/food.png) no-repeat;
  background-size: 20px;
  position: absolute;
  border-radius: 40%;
  z-index: 10px;
}
.begin,
.GameOver {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  border: solid 1px;
  background: url(../img/贪吃蛇.jpg) no-repeat;
  background-size: 600px;
  width: 600px;
  height: 450px;
}
.begin ul {
  position: absolute;
  top: 200px;
  left: 420px;
}
.begin ul li {
  margin-bottom: 20px;
  /*background: red;*/
}
.begin ul li input {
  width: 150px;
  height: 50px;
  line-height: 30px;
  border: none;
  background-color: #7dbb32;
  cursor: pointer;
  border-radius: 0.3em;
  box-shadow: 0 1px white inset;
  text-align: center;
  text-shadow: 0 1px 1px black;
  color: white;
  font-weight: bold;
  outline: none;
}
.begin ul li input:hover,
.begin ul li select:hover,
.GameOver input:hover {
  background: #a3d35b;
}
.begin ul li input:active,
.begin ul li select:active,
.GameOver input:active {
  box-shadow: 0.05em 0.1em 0.2em rgba(0, 0, 0, 0.6) inset;
}
.begin ul li select {
  width: 150px;
  height: 50px;
  line-height: 30px;
  /*padding-left: 55px;*/
  text-indent: 55px;
  background-color: #7dbb32;
  border-radius: 0.3em;
  box-shadow: 0 1px white inset;
  text-align: center;
  text-shadow: 0 1px 1px black;
  color: white;
  font-weight: bold;
  outline: none;
}

.GameOver {
  display: none;
}
.GameOver input {
  width: 180px;
  height: 60px;
  line-height: 60px;
  border: none;
  /*background-color: #7dbb32;*/
  background: transparent;
  cursor: pointer;
  border-radius: 0.3em;
  box-shadow: 0 1px white inset;
  text-align: center;
  text-shadow: 0 1px 1px black;
  color: white;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  position: absolute;
  top: 220px;
  left: 400px;
}
.score {
  position: absolute;
  font-size: 20px;
  top: -30px;
  left: 0px;
}
.grade {
  position: absolute;
  font-size: 20px;
  top: -30px;
  left: 800px;
}
```

```js
var $background = $('.background') //该全局变量用于获取背景图，因为背景图在游戏中不会发生变化，可在最开始获取就行
var coordinate_x = new Array() //创建一个数组，用于存放蛇的每个身体节点的x坐标值
var coordinate_y = new Array() //创建一个数组，用于存放蛇的每个身体节点的y坐标值
var status = 'Right' //该全局变量用于存放贪吃蛇行走的方向，默认为向右走
var Time //该全局变量用于存放setInterval(Auto_walk,$grade)，用于游戏停止
var $grade //该全局变量用于存在游戏等级的数字变量，主要用于设置行走的快慢
var $score = 0 //建个全局变量用于存放分数

$(document).ready(function () {
  Grade() //初始化等级显示

  $('.start').hide() //页面加载后，在游戏未开始前隐藏蛇头

  $('.begin select').click(function () {
    //给select标签添加单击事件，用于显示等级
    Grade()
  })

  $('#btn_begin').click(function () {
    //为开始游戏按钮添加单击事件
    $('.start').show()
    Crate_start_snake_boby()
    Crate_start_snake_boby()
    create_foot()
    Time = setInterval(Auto_walk, $grade) //使用setInterval()方法，实现蛇的自动行走
    $('.begin').hide()
  })

  $('#btn_exit').click(function () {
    //为退出按钮添加单击事件，实现当前窗口关闭
    window.close()
  })

  $('#btn_restart').click(function () {
    //为重新开始按钮添加单击事件，实现窗口重新加载
    window.location.reload()
  })

  $(window).keydown(function (event) {
    //为窗口添加键盘事件，
    switch (event.keyCode) {
      case 38:
        {
          //判断单击按键是否为上
          move_top() //为真，则向上移动
          if (status != 'Bottom') {
            //判断将要移动的方向是否与现在的移动方向相反，相反则status不变
            status = 'Top'
          }
        }
        break
      case 40:
        {
          move_bottom()
          if (status != 'Top') {
            status = 'Bottom'
          }
        }
        break
      case 37:
        {
          move_left()
          if (status != 'Right') {
            status = 'Left'
          }
        }
        break
      case 39:
        {
          move_right()
          if (status != 'Left') {
            status = 'Right'
          }
        }
        break
    }
  })
})

// 游戏初始化时创建一节蛇身
function Crate_start_snake_boby() {
  var $newSnake_boby = $("<div class='snake_boby'></div>") //创建一个新节点（蛇身）
  var $snakes = $('.background>div') //获取全部的蛇身
  var L_left = parseInt($snakes.eq($snakes.length - 1).css('left')) - 20 + 'px' //查到蛇尾节点，获取x,y坐标值，赋给新建的蛇身节点
  var L_Top = $snakes.eq($snakes.length - 1).css('top')
  $newSnake_boby.css('left', L_left)
  $newSnake_boby.css('top', L_Top)
  $background.append($newSnake_boby) //把新建的蛇身节点添加到背景中
}

// 创建一节蛇身
function Crate_snake_boby() {
  var $newSnake_boby = $("<div class='snake_boby'></div>")
  var $snakes = $('.background>div')
  var Last_boby_x = parseInt($snakes.eq($snakes.length - 1).css('left')) //获取蛇尾的坐标
  var LastButOne_boby_x = parseInt($snakes.eq($snakes.length - 2).css('left')) //获取倒数第二节蛇身的坐标
  var Last_boby_y = parseInt($snakes.eq($snakes.length - 1).css('top'))
  var LastButOne_boby_y = parseInt($snakes.eq($snakes.length - 2).css('top'))
  //判断最后两节蛇身是否处在垂直
  if (Last_boby_x == LastButOne_boby_x) {
    //通过判断最后两节蛇身的y坐标来确定新蛇身的添加方向
    if (Last_boby_y > LastButOne_boby_y) {
      $newSnake_boby.css('left', Last_boby_x)
      $newSnake_boby.css('top', Last_boby_y + 20 + 'px')
    } else if (Last_boby_y < LastButOne_boby_y) {
      $newSnake_boby.css('left', Last_boby_x)
      $newSnake_boby.css('top', Last_boby_y - 20 + 'px')
    }
  } else if (Last_boby_y == LastButOne_boby_y) {
    if (Last_boby_x > LastButOne_boby_x) {
      $newSnake_boby.css('left', Last_boby_x + 20 + 'px')
      $newSnake_boby.css('top', Last_boby_y)
    } else if (Last_boby_x < LastButOne_boby_x) {
      $newSnake_boby.css('left', Last_boby_x - 20 + 'px')
      $newSnake_boby.css('top', Last_boby_y)
    }
  }
  $background.append($newSnake_boby)
}

// 生成食物
function create_foot() {
  var status = true //新建一个变量用来判断是否生成新的食物
  var $snakes = $('.background>div')
  do {
    this.foot_x = Math.floor(Math.random() * 50) * 20 //随机生成一个坐标值
    this.foot_y = Math.floor(Math.random() * 30) * 20
    for (var i = 0; i < $snakes.length; i++) {
      coordinate_y[i] = $snakes.eq(i).css('top')
      coordinate_x[i] = $snakes.eq(i).css('left')
      if (foot_x != parseInt(coordinate_x[i]) && foot_y != parseInt(coordinate_y[i])) {
        //判断新坐标值是否跟蛇身重叠
        status = false //不存在重叠，转化status的值，跳出循环
      }
    }
  } while (status)
  var $foot = $("<span class='foot'></span>")
  $foot.css('top', foot_y + 'px')
  $foot.css('left', foot_x + 'px')
  $background.append($foot)
}

// 吃动作
function eat() {
  var $snakes = $('.background>div')
  var $H_Top1 = parseInt($snakes.eq(0).css('top')) //获取蛇头的坐标
  var $H_Left1 = parseInt($snakes.eq(0).css('left'))
  if ($H_Top1 == foot_y && $H_Left1 == foot_x) {
    //判断蛇头的坐标和食物的坐标是否重叠，重叠，添加一节蛇身，新建一个食物，分数加一，刷新分数
    $('.foot').remove()
    Crate_snake_boby()
    create_foot()
    ++$score
    $('.score span').html($score)
  }
}

// 游戏数据初始化
function Grade() {
  var value = $('.begin select').val() //获取游戏等级
  var $grade_show //该变量用于存放游戏等级的文本内容
  switch (
    parseInt(value) //根据游戏等级设置setInterval的时间
  ) {
    case 1:
      {
        $grade = 500
        $grade_show = '简单'
      }
      break
    case 2:
      {
        $grade = 200
        $grade_show = '困难'
      }
      break
    case 3:
      {
        $grade = 50
        $grade_show = '地狱'
      }
      break
  }
  $('.grade span').html($grade_show)
}

// 右转
function move_right() {
  var $snakes = $('.background>div')
  var $H_Top = parseInt($snakes.eq(0).css('top'))
  var $H_Left = parseInt($snakes.eq(0).css('left'))
  for (var i = 0; i < $snakes.length; i++) {
    coordinate_y[i] = $snakes.eq(i).css('top')
    coordinate_x[i] = $snakes.eq(i).css('left')
  }
  if (!($H_Top == parseInt(coordinate_y[1]) && $H_Left + 20 == parseInt(coordinate_x[1]))) {
    $snakes.eq(0).css('left', $H_Left + 20 + 'px')
    for (var i = 1; i < $snakes.length; i++) {
      $snakes.eq(i).css('top', coordinate_y[i - 1])
      $snakes.eq(i).css('left', coordinate_x[i - 1])
    }
    eat()
    collide_dead()
  } else {
    return false
  }
}

// 左转
function move_left() {
  var $snakes = $('.background>div')
  var $H_Top = parseInt($snakes.eq(0).css('top'))
  var $H_Left = parseInt($snakes.eq(0).css('left'))

  // 获取当前贪吃蛇全部蛇身及蛇头的坐标
  for (var i = 0; i < $snakes.length; i++) {
    coordinate_y[i] = $snakes.eq(i).css('top')
    coordinate_x[i] = $snakes.eq(i).css('left')
  }

  // 贪吃蛇移动一次
  // 首先判断本次移动是否回头
  // 如果不是回头，则进行移动
  if (!($H_Top == parseInt(coordinate_y[1]) && $H_Left - 20 == parseInt(coordinate_x[1]))) {
    $snakes.eq(0).css('left', $H_Left - 20 + 'px')
    for (var i = 1; i < $snakes.length; i++) {
      $snakes.eq(i).css('top', coordinate_y[i - 1])
      $snakes.eq(i).css('left', coordinate_x[i - 1])
    }

    // 移动完成后判断是否发生碰撞
    collide_dead()
    eat()
  } else {
    return false
  }
}

// 上转
function move_top() {
  var $snakes = $('.background>div')
  var $H_Top = parseInt($snakes.eq(0).css('top'))
  var $H_Left = parseInt($snakes.eq(0).css('left'))
  for (var i = 0; i < $snakes.length; i++) {
    coordinate_y[i] = $snakes.eq(i).css('top')
    coordinate_x[i] = $snakes.eq(i).css('left')
  }
  if (!($H_Top - 20 == parseInt(coordinate_y[1]) && $H_Left == parseInt(coordinate_x[1]))) {
    $snakes.eq(0).css('top', $H_Top - 20 + 'px')
    for (var i = 1; i < $snakes.length; i++) {
      $snakes.eq(i).css('top', coordinate_y[i - 1])
      $snakes.eq(i).css('left', coordinate_x[i - 1])
    }
    collide_dead()
    eat()
  } else {
    return false
  }
}

// 下转
function move_bottom() {
  var $snakes = $('.background>div')
  var $H_Top = parseInt($snakes.eq(0).css('top'))
  var $H_Left = parseInt($snakes.eq(0).css('left'))
  for (var i = 0; i < $snakes.length; i++) {
    coordinate_y[i] = $snakes.eq(i).css('top')
    coordinate_x[i] = $snakes.eq(i).css('left')
  }
  if (!($H_Top + 20 == parseInt(coordinate_y[1]) && $H_Left == parseInt(coordinate_x[1]))) {
    $snakes.eq(0).css('top', $H_Top + 20 + 'px')
    for (var i = 1; i < $snakes.length; i++) {
      $snakes.eq(i).css('top', coordinate_y[i - 1])
      $snakes.eq(i).css('left', coordinate_x[i - 1])
    }
    collide_dead()
    eat()
  } else {
    return false
  }
}

// 碰撞死亡判定
function collide_dead() {
  var $snakes = $('.background>div')
  var $H_Top1 = parseInt($snakes.eq(0).css('top')) //获取蛇头坐标
  var $H_Left1 = parseInt($snakes.eq(0).css('left'))
  for (var i = 0; i < $snakes.length; i++) {
    //遍历全部蛇身节点坐标
    coordinate_y[i] = $snakes.eq(i).css('top')
    coordinate_x[i] = $snakes.eq(i).css('left')
  }
  for (var j = 1; j < $snakes.length; j++) {
    //判断蛇头坐标是否跟蛇身任意节点坐标重叠，重叠则认为吃到自己，清空setInterval，显示GameOver
    if ($H_Top1 == parseInt(coordinate_y[j]) && $H_Left1 == parseInt(coordinate_x[j])) {
      clearTimeout(Time)
      $('.GameOver').show()
      return false
    }
    //判断是否超出边界
    if ($H_Top1 > 580 || $H_Top1 < 0 || $H_Left1 > 980 || $H_Left1 < 0) {
      clearTimeout(Time)
      $('.GameOver').show()
      return false
    }
  }
}

// 依照当前前进方向自动行走
function Auto_walk() {
  if (status == 'Right') {
    move_right()
  } else if (status == 'Left') {
    move_left()
  } else if (status == 'Top') {
    move_top()
  } else if (status == 'Bottom') {
    move_bottom()
  }
}
```
