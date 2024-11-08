# 第 2 章 在 HTML 中使用 JavaScript

## 1. `<script>` 标签

`<script>` 标签是在 HTML 中使用 JavaScript 的主要方法。通过`<script>`标签，我们可以实现两种常用编写 `JavaScript` 的形式：

- 嵌入脚本：直接卸载 HTML 中的脚本。

- 外部脚本：将脚本写在一个 JS 文件中，然后通过 `<script>` 标签导入。

  > 按照惯例，外部脚本文件带有 `.js` 扩展名。但是这个扩展名是可以省略的，因为浏览器并不会去检查这个。这样一来，使用 JSP、PHP 或其他服务器端语言动态生成 JavaScript 也就成为了可能。但是，服务器通常根据扩展名来决定响应的 MIME 类型。如果不使用 `.js` 扩展名，请确保服务器能返回正确的 MIME 类型。

### 1.1 `<script>` 标签的 6 个属性

`<script>` 有 6 个属性，分别如下：

- async: 可选。表示立即下载脚本，但是不妨碍页面中的其他操作。只对外部脚本有效。异步脚本一定会在页面的 load 事件前执行,但可能会在 DOMContentLoaded 事件触发之前或之后执行。
- charset: 可选。用于指定外部脚本的编码。大多数浏览器省略该属性。
- defer: 可选。表示脚本延迟到文档完全被解析和显示后再执行。同样只对外部脚本有效。在现实当中,延迟脚本并不一定会按照顺序执行,也不一定会在 DOMContentLoaded 事件触发前执行,因此最好只包含一个延迟脚本。
- language：可选。用于表示编写脚本所用的脚本语言。大多数浏览器省略该属性。
- src: 可选。表示要带入的外部脚本的路径。
- type: 可选。可以看成是 language 的替代属性。表示编写代码使用的脚本语言的内容类型（也成为 MIME 类型）。如果省略，浏览器默认为 text/javascript。

> **DOMContentLoaded 事件的执行时机**：html 文档加载完毕，并且 html 所引用的内联`js`、以及`外链 js` 的**同步代码**都执行完毕后触发。
>
> **load 事件的执行时机**：当页面 DOM 结构中的 `js`、`css`、`图片`，以及**异步加载**的 `js`、`css` 、`图片`都加载完成之后，才会触发 load 事件。

### 1.2 `<script>` 标签的位置

浏览器加载有个特点，就是遇到 JavaScript 时会暂停其他操作，必须等到当前的 JavaScript 加载完成才会执行其他操作。如果将 JavaScript 放到页面顶部，这就会导致浏览器呈现页面会出现明显的延迟，而延迟期间浏览器一片空白。

所以，为了避免这个问题，应该把全部 JavaScript 放到`<body>` 标签中页面内容的后面。如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>js 在HTML中的位置</title>
  </head>
  <body>
    <div></div>
    <script>
      // ……
    </script>
  </body>
</html>
```

## 1.3 延迟脚本——defer 属性

`<script`标签设置了 `defer`属性后，脚本仍会被立即下载，但是执行被延迟到`</html>`后执行了。也就是说，脚本将不会影响页面的加载、渲染、呈现。

如果页面设置了两个延迟脚本，那它们会按照先后顺序依次延迟执行。此外，延迟脚本会在 `DOMContentLoaded `事件触发前执行。然而，现实中这些顺序可能并没有被遵守。这一点是要注意。因此，如果延迟脚本间有明确的前后依赖关系，可能会因此产生错误。

> defer 属性只适用于外部脚本。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>defer延迟脚本示例</title>
  </head>
  <body>
    <script src="example1.js" defer="defer"></script>
    <script src="example2.js" defer="defer"></script>
  </body>
</html>
```

### 1.4 异步脚本——async 属性

`async`类似于`defer`,都是用于改变处理脚本的的行为。跟 `defer` 一样，设置`async` 属性后，脚本仍被立即下载，但是不同于点在于，异步脚本并不能保证它们之间的执行顺序。

> 尽管延迟脚本执行顺序可能也是错乱的。但是延迟脚本的执行顺序是被明确约束的。只是可能在某些情况下延迟脚本的执行顺序是出错的。而异步脚本则是不做这个约束。所以这一点的区别还是很大的。

异步脚本一定会在页面 `load` 时间前执行，但可能会在`DOMContentLoaded `事件前或者后执行。

> async 属性只适用于外部脚本。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>async异步脚本示例</title>
  </head>
  <body>
    <script src="example1.js" async="async"></script>
    <script src="example2.js" async="async"></script>
  </body>
</html>
```

> 尽管延迟脚本和异步脚本都实现了减少脚本执行对页面加载渲染的影响。但是因为浏览器的支持原因及脚本间执行顺序原因，将脚本放到页面底部仍然是最佳选择。

## 2. 一种不推荐的使用语法

在早期，因为并不是所有的浏览器都支持`<script>` 标签，在不支持`<script>` 标签的浏览器中，卸载 `<script>` 标签中的代码将会被当做文本显示在页面中。所以，出现了下面的写法：

```html
<script>
  <!--
  function sayHi() {}

  // -->
</script>
```

给脚本加上注释后，不支持的浏览器将忽略`<script>`里面的内容，而那些支持的浏览则会正常执行。

虽然，这种使用语法完美解决了这个问题。但由于现在所有的浏览器已经全部支持 `Javascript`。因此没必要在使用这种使用语法了。

## 3. 嵌入脚本与外部脚本

在 HTML 中嵌入脚本和外部脚本都是可以的，但是因为一些原因，一般认为最好的做法是尽可能的使用外部脚本。因为外部脚本有如下优点：

- 可维护性：遍及不同 HTML 页面的 `JavaScript` 会造成维护问题。但是如果将 `JavaScript` 放到一个外部文件中这样就可以只需要维护一个文件就行了。
- 可缓存：浏览器可以缓存 外部 `JavaScript` 文件。这样可以加快页面加载速度。
- 适应未来：通过外部文件导入的 `JavaScript` 无需担心 XHTML 和注释 hack 的不一致。因为 HTML 和 XHTML 包含外部脚本的语法是相同的。

## 4. 文档模式

IE5.5 开始引入文档模式的概念，最初文档模式有两种：混杂模式和标准模式。混杂模式会让 IE 的行为与 IE5 相同。而标准模式则让 IE 更接近标准行为。虽然这两种模式主要影响 CSS 内容的呈现，但在默写情况下也会影响到 JavaScript。而后其他浏览器也纷纷效仿。后来，IE 又提出了准标准模式。这种模式下，浏览器特性又很多是符合标准的。但在处理图片间隙上，与标准有着很大的不同。

不同的浏览器在混杂模式下的行为差异巨大，所以不推荐是用混杂模式。需要注意的是，如果 HTML 文档开头没有声明文档模式，浏览器默认使用混杂模式。

###### 设置标准模式

```html
<!-- HTML 4.01 严格型 -->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<!-- XHTML 1.0 严格型 -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<!-- HTML 5 -->
<!DOCTYPE html>
```

## 5. `<noscript>` 标签

因为早期部分浏览器不支持 `JavaScript`，所以需要一种平稳退化的方法。`<noscript>`标签就是用于解决这个问题的。

`<noscript>`可以包含能够出现在`<body>`的任何 HTML 元素(`<script>`元素除外)。`<noscript>`标签里面的内容会在下列任何一种情况出现：

- 浏览器不支持脚本；
- 浏览器支持脚本，但脚本被禁用；

基于这个特性，就可以实现平稳退化了。如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>noscript</title>
  </head>
  <body>
    <noscript>
      <p>本页需要浏览器支持(开启) JavaScript。</p>
    </noscript>
  </body>
</html>
```

当脚本在浏览器无法生效时，就会在页面上显示："本页需要浏览器支持(开启) JavaScript“。
