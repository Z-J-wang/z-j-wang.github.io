---
author: 王志杰
date: 2024-10-04
keywords: CSS 编码规范
description: CSS 是网页样式描述语言，用于描述网页的样式和布局。编写 CSS 代码时，我们需要遵循一定的规范，以保证代码的可读性、可维护性和一致性。本文将介绍一些常见的 CSS 编码规范，帮助大家编写出高质量的 CSS 代码。
---

# CSS 编码规范

CSS 是网页样式描述语言，用于描述网页的样式和布局。编写 CSS 代码时，我们需要遵循一定的规范，以保证代码的可读性、可维护性和一致性。本文将介绍一些常见的 CSS 编码规范，帮助大家编写出高质量的 CSS 代码。

## 规则

### 1. 用两个空格来代替制表符（tab）

### 2. 群组选择器的每个选择器都独占一行。

```css
p,
span,
div {
  color: #F4F4F4;
}
```

### 3. 每个声明块的左花括号和选择器在同一行且前添加一个空格。右花括号单独一行。

```css
.selector {
  margin: 0;
}
```

### 4. 每条样式规则单独一行

```css
.selector {
  margin: 0;
  padding: 0;
}
```

### 5. 每条样式规则后都要带分号

```css
// aviod
.selector {
  margin: 0
  padding: 0
}

// good
.selector {
  margin: 0;
  padding: 0;
}
```

### 6. 对于以逗号分隔的属性值，每个逗号后面都应该插入一个空格

```css
// good
.selector {
  box-shadow: 3px 3px red, -1em 0 .4em olive;
}
```

### 7. 不要在 `rgb()`、`rgba()`、`hsl()`、`hsla()` 或 `rect()` 值的内部的逗号后面插入空格

> 这样利于从多个属性值（既加逗号也加空格）中区分多个颜色值（只加逗号，不加空格）。

### 8. 如果样式规则的属性值小数小于1，则把小数点前面的省略

```css
.selector {
  padding: .5px;
}
```

### 9. 十六进制值应该全部小写，且不要使用简写

```css
.selector {
  color: #ffffff;			// good
  background-color: #FFF;  // aviod
}
```

### 10. 属性选择器的属性需双引号包裹

```css
input[name="username"] {
  /*  省略   */
}
```

### 11. 样式规则的属性值和冒号间空一格

```css
.selector {
  color: #ffffff;			// good
  background-color:#FFF;  // aviod
}
```

### 12. 避免为 0 值指定单位

> 如果样式规则的属性值为0，则不需要指定单位

```css
.selector {
  padding: 0px;			// aviod
  margin: 0;				// good
}
```

### 13. 样式规则的声明顺序

> 相关的属性声明应当归为一组，并按照下面的顺序排列：
>
> （1）Positioning
>
> （2）Box model
>
> （3）Typographic
>
> （4）Visual

```css
.selector {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  /* Box model */
  display: block;
  float: left;
  width: 200px;
  height: 200px;

  /* Typographic */
  font-size: 16px;
  font-weight: 200;
  line-height: 20px;
  color: red;
  text-align: center;

  /* Visual */
  background-color: #f4f44f;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
	
  /* Misc */
  opacity: 1;
}
```

### 14. 媒体查询（Media query）的位置

将媒体查询放在尽可能相关规则的附近。不要将他们打包放在一个单一样式文件中或者放在文档底部。如果你把他们分开了，将来只会被大家遗忘。

### 15. 带前缀的属性

当使用特定厂商的带有前缀的属性时，通过缩进的方式，让每个属性的值在垂直方向对齐，这样便于多行编辑。

```css
.selector {
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .5);
          box-shadow: 0 1px 2px rgba(0, 0, 0, .5);
}
```

### 16. 单行规则声明

对于只包含一条声明的样式，为了易读性和便于快速编辑，建议将语句放在同一行。对于带有多条声明的样式，还是应当将声明分为多行。

### 17. 独立模块的代码前后保留空行

当写好一个模块的代码后，为了便于阅读，应该在相关代码的前后保留一个空行加以区分。

更好的做法是，在模块代码块前面添加简短的注释。

### 18. 注释

> 注释编写原则：以功能模块为基础，对功能模块做说明划分。

+ 单行注释

  ```css
  /* 单行注释 */
  ```

+ 多行注释

  ```css
  /* 
  	多行注释
  	多行注释
  	多行注释
  */
  ```