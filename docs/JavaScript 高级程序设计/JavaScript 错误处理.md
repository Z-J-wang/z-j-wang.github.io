# JavaScript 错误处理

> 错误处理对于今天复杂的 Web 应用程序开发而言至关重要。不能提前预测到可能发生的错误，不能提前采取恢复策略，可能导致较差的用户体验，最终引发用户不满。多数浏览器默认情况下都不会想用户报告错误，因此在开发和调试期间需要启用浏览器的错误报告功能。然而，在投入运行的产品代码中，则不应该再有诸如此类的错误报告。
>
> 摘自——《JavaScript 高级程序设计语言（第 3 版）》

正如上面所说，JavaScript 错误处理的最终目的是——防止 JavaScript 错误的产生影响了用户的体验。

要实现这个目的，可以从一下连个方面出发：

+ 当发生错误时，可以让用户平缓的渡过错误
+ 在代码上尽可能的避免错误的发生



## 让用户平缓的渡过错误

“让用户平缓的渡过错误”，说白了就是当发生错误时，要对错误做出相应的响应。

要做到这一点，我们就需要捕捉错误。有如下两种方法：

### try - catch

> 在可能发生错误的地方时使用 `try-catch`语句

用法如下：

```js
try {
  // 可能发生错误的代码
} catch (error){
  // 发生错误时处理的代码
}
```

借助 `try-catch` 语句，我们就可以捕捉错误信息并及时作出相应的处理了。

### window.onerror 事件

> `window.onerror` 事件可以接收`try-catch`未处理的所有错误。

`window.onerror` 事件默认三个传参数：

+ msg: 错误信息
+ url: 错误所在文件
+ line: 错误所在的代码行

用法如下：

```js
window.onerror = function(msg, url, lin){
  console.log(msg)
}
```

> `window.onerror` 是避免浏览器报告错误的最后一道防线，理想情况下，只要可能就不应该使用它。只要能够适当的使用 `try-catch`语句，就不会有错误提交给浏览器，也就不会触发 error 事件。
>
> 摘自——《JavaScript 高级程序设计语言（第 3 版）》



## 在代码上尽可能的避免错误的发生

除了要做“事后诸葛亮”，我们也要做到“未卜先知”，在编写代码时就要尽可能的避免错误的产生。

在 JavaScript 中发生错误的主要原因如下：

+ 类型转换错误
+ 数据类型错误
+ 通讯错误

### 类型转换错误

这个主要发生在数据类型隐性转换上。如下：

```js
alert(5 == '5'); // true
alert(5 === '5'); // false

function concat(str1, str2, str3){
	let result = str1 + str2;
  if(str3){		// 绝对不要这样子！！！ 如果 str3 时一个数组，同样也为 true
    result += str3;
  }
  
  return result;
}
```

为了避免上面的两种隐性转换的错误出现。有如下建议：

+ 不使用 `==`、`!=`，转而使用`===`、`!==`
+ 不使用隐性转换`true`/`false`来判断值是否为空
+ 不使用隐性转换来判断`true`/`false`

### 数据类型错误

JavaScript 是松散类型的语言，数据类型是可以随时变换的，在使用变量和函数参数前，不会对数据类型的正确性做判断。因为这种“高度自由”，我们很有可能将错误的类型数据传递给函数，导致数据类型错误的产生。如下：

```js
// 不安全的函数，任何非数组值都会导致错误
function reverswSort(values){
	if(values){	// 绝对不要这样！！！
		values.sort();
    value.reverse();
  }
}
```

为了避免这种可能存在的错误，我们最好对函数参数的数据类型进行检测。

```js
// 安全，非数组值将被忽略
function reverswSort(values){
	if(values instanceof Array){	// 绝对不要这样！！！
		values.sort();
    value.reverse();
  }
}
```



### 通讯错误

通讯错误值的是 HTTP 请求的错误。常见的有三种：

+ url 错误
+ 参数错误
+ 回传数据出错
+ 后台服务器出错

一、三点没什么好说的，只要前后端开发人员做好沟通，API 文档写好写全就可以最大程度的避免了。对于传参错误，一般发生在参数的数据类型出错上。所以为了避免参数错误，我们也需要做一些必要的数据类型检测。

关于后台服务器错误，这个是前端无法提前规避的。前端只能在发生这个错误后做出相应友好的处理。常见的 HTTP 请求错误有：

| 状态码 | 状态码英文名称             | 中文描述                                                     |
| :----- | :------------------------- | :----------------------------------------------------------- |
| 400    | Bad Request                | 客户端请求的语法错误，服务器无法理解                         |
| 401    | Unauthorized               | 请求要求用户的身份认证                                       |
| 403    | Forbidden                  | 服务器理解请求客户端的请求，但是拒绝执行此请求               |
| 404    | Not Found                  | 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面 |
| 408    | Request Time-out           | 服务器等待客户端发送的请求时间过长，超时                     |
| 410    | Gone                       | 客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置 |
| 500    | Internal Server Error      | 服务器内部错误，无法完成请求                                 |
| 502    | Bad Gateway                | 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应 |
| 503    | Service Unavailable        | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中 |
| 504    | Gateway Time-out           | 充当网关或代理的服务器，未及时从远端服务器获取请求           |
| 505    | HTTP Version not supported | 服务器不支持请求的HTTP协议的版本，无法完成处理               |

更多 HTTP 状态码可查看：[HTTP状态码](https://www.runoob.com/http/http-status-codes.html)



## 调试——错误信息的输出

前面提到的两个出发点——“让用户平缓的渡过错误”和“在代码上尽可能的避免错误的发生”，一个是着眼于错误发生后一个是着眼于错误发生时的处理。好的代码应该是让代码不要产生错误才对。也就是说，我们需要解决错误的产生。如前面的例子：

```js
function reverswSort(values){
	if(values instanceof Array){	// 绝对不要这样！！！
		values.sort();
    value.reverse();
  }
}
```

这里产生错误的原因是因为开发人员错误参数导致的。尽管这里的代码避免了错误的产生，但是如果不告知该开发者，他以后还是可能用错的。所以，我们还需要将错误了产生原因通知开发人员。也就是输出错误信息。这里推荐两种处理方法：

+ 使用`console.log` 输出控制台
+ 使用 `throw` 抛出错误到控制台。`throw` 会终止代码的运行。

```js
// 使用console.log 输出控制台
function reverswSort(values){
	if(values instanceof Array){	// 绝对不要这样！！！
		values.sort();
    value.reverse();
  }else{
    console.log('reverswSort(): 参数数据类型错误，应传递一个数组！');
  }
}

// 使用 throw 抛出错误到控制台
function reverswSort(values){
	if(values instanceof Array){	// 绝对不要这样！！！
		values.sort();
    value.reverse();
  }else{
    throw new Error('reverswSort(): 参数数据类型错误，应传递一个数组！');
  }
}
```

> 对于大型应用程序来说，自定义的错误通常都使用 assert() 函数抛出。这个函数接受两个参数，一个是求值结果应为 true 的条件，另外一个是条件为 false 是抛出的错误。以下就是一个非常基础的 assert() 函数。
>
> ```js
> function assert(condition, message){
> 	if(!condition){
> 		throw new Error(message);
>   }
> }
> ```
>
> 摘自——《JavaScript 高级程序设计语言（第 3 版）》



以上就是关于 Javascript 错误处理的介绍了。本文主要参考了《JavaScript 高级程序设计语言（第 3 版）》第 17 章 错误处理与调试。算是对该章节的一个粗浅总结吧！



## 参考文献

+ 《JavaScript 高级程序设计语言（第 3 版）》
+ [《HTTP状态码》](https://www.runoob.com/http/http-status-codes.html)