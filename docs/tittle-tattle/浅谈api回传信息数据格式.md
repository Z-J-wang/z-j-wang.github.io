﻿# 浅谈 api 回传信息数据格式

## 前言

> API 是前后端数据沟通的重要途径。固定统一的 API 回传数据的格式对开发人员甚至项目组都极其重要，可以有效的减少无意义的沟通和错误。

在用户跟网站交互过程中，前端充当的是“翻译官”的重要角色。前端需要把后端告诉给用户的“信息”，准确的、浅显易懂的转述给用户。前端要想准确、浅显的向用户转述，首先要做的就是“听懂”后端传递的“信息”。那前端要想精准掌握这些“信息”，就必须和后端约定好一套 API 回传数据的格式。后端根据这套格式表诉他的“信息”，前端根据这套格式解读接收到的“信息”。

> 就好比战场上的队友，用一组约定好的暗语进行沟通效率远远高于口头直诉。

**大家都根据这套“回传数据格式”来工作，是确保“前后端通讯”畅通的前提。**

但是单单只有这份共识还不行，如果“回传数据格式”制定的不合理且不细致的话，也会照成沟通的障碍。所以，“回传数据格式”的制定同样非常重要。下面我基于我的理解，粗略概述一下如何制定“回传数据格式”：

## 一个原则：只将用户看得懂的信息展示给用户

后端通过 API 传向前端回传数据，其最终的目的是将这些数据展示给用户。所以，我认为前端应该只将用户看得懂的信息展示给用户。对于那些用户看得懂的数据信息，前端可以不做任何处理，直接展示给用户。而有些信息是用户**看不懂**的，这时就需要前端**将这些看不懂的信息转义后，再呈现给用户**。

无论是用户看得懂的信息还是用户看不懂的信息，后端都会回传给前端。所以，前端必须要对回传的信息进行筛选区分。

我们可以将回传信息分做两类：

> - 用户看得懂的数据
> - 用户看不懂的数据

但这个分类只是逻辑上的区分，还需要将其体现在代码层次上。**API 携带的信息是“用户看得懂的信息”，表明这些数据都用户正常操作的情况下产生的，是用户可预知，不会阻塞用户继续操作的。**因此我们可以将所有携带“用户看得懂的信息”的 API 的 HTTP 状态设为 HTTP 200。这样做的话，前端就只需要判断 HTTP 状态码就可以区别出“用户看得懂的数据”。

> 对于“用户看得懂的数据”，可能有些伙伴觉得，如果回传数据是“数据库出错”，用户也看得懂。那是不是也应该是设为 HTTP 200 呢？这里需要解释一下。我前面对“用户看得懂的数据”有这样的解释：
>
> **这些数据都用户正常操作的情况下产生的，是用户可预知，不会阻塞用户继操作的。**
>
> 因为“数据库出错”并不是用户操作导致的且这个错误已经阻塞了用户下一步操作。所以不能设为 HTTP 200。

对于“用户看不懂的数据”，前端需要做进一步的处理，拆分成“需要告知用户的数据”以及“需要告知开发和运维人员的数据”。

> - 用户看得懂的数据
> - 用户看不懂的数据
>   - 需要告知用户的数据
>   - 需要告知开发和运维的数据

### 需要告知用户的数据

#### 什么是“需要告知用户的数据”

“需要告知用户的数据”可以简单理解为非用户操作造成的错误，但用户又可以自行解决该错误的信息。例如，用户长时间不操作导致登录状态失效等。对于这类回传数据，我认为可以用 HTTP 400 来标志。

#### 如何处理

对于“需要告知用户的数据”显然不能直接显示给用户看，前端需要将其转义成“用户看得懂的数据”。

> 如前面登录状态过期例子。对于这种错误，后端回传的数据可能是“token 失效”这种信息。很显然，用户是看不懂 token 是什么的。所以前端就需要转义成“因您长时间未进行操作，账户已自动登出！请重新登录！”
>
> 这时可能又有伙伴说，如果“因您长时间未进行操作，账户已自动登出！请重新登录！”这句话后端直接回传给前端，那是不是可以归类为“用户看得懂的数据”。确实，如果目的只是告知用户就行了，这样是没问题的。但是如果你还想根据“这个登录过期”做进一步的优化的话（比如，自动跳转登录界面。），可能就要独立开来了。当然了，如果硬要将其归类于“用户看得懂的数据”，还是有方法可以实现自动跳转的。只有一些不方便而已。
>
> 从这里也可以看出，如果后端对回传数据处理的很好的话，“需要告知用户的数据”就可能不用存在了。然而，这必将导致后端的工作量变大。

### 需要告知开发和运维的数据

#### 什么是“需要告知开发和运维的数据”？

“需要告知开发和运维的数据”是系统自己生成的信息，并不是用户主动的操作导致。例如服务器宕机、 HTTP 500 等等。

#### 如何处理？

这种信息的产生基本上都是因为程序错误或者服务器错误导致的。所以，这些信息并不需要具体描述给用户知道，前端可以统一告知用户“服务器出错，请联系客服！”。API 携带的错误信息，则可以打印在控制台。

## 结语

概述一下上面的内容。我将 API 回传信息做了两级的拆分：

> - 用户看得懂的数据 (HTTP 200)
> - 用户看不懂的数据
>   - 需要告知用户的数据 (HTTP 4xx)
>   - 需要告知开发和运维的数据 (HTTP 5xx)

基于这个划分，前端可以设置一个 Response 拦截器来实现（如：axios 的 `interceptors.response`）。拦截器会直接放行 HTTP 200 （用户看得懂的数据） 的响应。对于 HTTP 4xx （需要告知用户的数据）的响应，将会进行拦截，进行统一的操作处理；对于，HTTP 5xx （需要告知开发和运维的数据）的响应，同样进行拦截，在控制台打印 error 信息，并通知用户“服务器出错，请联系客服！”。

每个项目团队都会有自己详细的一套回传数据的格式约定。以上，只是我的一些个人见解。这里只是指出一个大致的思路供大家参考。
