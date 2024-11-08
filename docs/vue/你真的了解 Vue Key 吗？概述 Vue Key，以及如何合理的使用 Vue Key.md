

## 前言

关于 key 的使用，最常用的场景就是 `v-for`了。每当我们要在页面中添加一个`v-for`，Vue 都会强烈建议我们给生成的列表子项设置`key`。

但是，在实际的使用中，大家很可能对于 `key` 的使用并不正确。我们平常的用法哪里猜错了呢？到底该怎么正确使用`key`?

我们需要从`key`在 Vue 中扮演的角色说起。

## key 的作用

关于`key`的作用，我们 可以很轻易的通过 key 这个单词猜测到其作用就是保证唯一性了。

**`key` 是 Vue 的 DOM 节点的“身份证”**。

那为什么需要保证 DOM 节点的唯一性，需要 key 呢？



## key 出现的理由

在用户使用页面的过程中，不可避免的会对 DOM 进行操作。熟悉页面加载渲染原理的朋友都清楚，对 DOM 的变更是一种极其消耗资源的操作。所以开发过程中，我们都会尽量避免直接对 DOM 进行操作的。在 Vue 中，自然也是考虑了这一点。其通过虚拟DOM以及diff算法等手段，最大限度的减少对DOM的操作。diff 算法需要与 key 搭配才能发挥作用。这就是 key 出现的原因。

> 虚拟DOM 是真实 DOM 的映射。借助虚拟DOM，可以实现真实DOM的延迟更新——等确认了全部需要执行的DOM操作，再一次性全部执行，从而实现减少浏览器渲染重绘的次数。更多虚拟DOM的知识，可以查看《[vue核心之虚拟DOM(vdom)](https://www.jianshu.com/p/af0b398602bc)》

## 鉴别手段——diff 算法

上面讲到，key 就好比 DOM 的“身份证”，但是光有“身份证”可不行，还需要有一套与之对应的鉴别手段。Vue 的鉴别手段就是—— **diff 算法**。

接下来将简略的讲一下 diff 算法，想要更加详细的了解 diff 算法，文末有两篇推荐的文章。



### diff 算法怎么减少 DOM 操作的？

借助 diff 算法，Vue 可以知道页面变动时，哪些 DOM 节点是保持不变的，哪些DOM节点需要删除或新增，哪些节点可以复用的。借助这些信息，Vue 就可以做到以最小的 DOM 变动，实现用户的操作。



### diff 算法怎么实现的？

在正式对DOM更新前，diff 算法会对比更新前后的虚拟DOM节点，只有当虚拟DOM不一样的时候，才会真正的去更新DOM。

这里的判断有两个原则：

+ 首先判断对应位置的虚拟DOM节点是否一样；
+ 如果在对应位置找不到，则判断虚拟DOM节点是否做了**同层级**的位置到的移动。如果是，仍然认为存在相同的虚拟节点，直接复用；如果旧的 DOM 节点树存在而新的 DOM 节点树不存在，则删除多余的 DOM；如果新的 DOM节点树含有旧的 DOM 节点树不存在的节点，则新增这些节点。

通过这两层的判断，极大限度减少了DOM的更新。

判断虚拟DOM节点是否一致的函数如下：

```js
function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}
```

可以看到判断一个虚拟DOM节点是否一致，除了DOM的类型（tag）及其属性等，最重要的一点是key。如果 key 不同，那就表明这两个节点一定是不同的。

所以，良好的使用 key，有助于提高Vue的运行效率。



## key 的正确使用

### 确保 key 值的唯一性

key 是判断虚拟DOM节点是否一样的重要凭证，保证 key 在列表中的唯一性是非常重要的。



### 维持 key 值的稳定性

对于 Key 的唯一性，相信大家在设置 key 时都注意去保证。但，key 值的稳定性，可能都被大家忽略了。

key 值的稳定性体现在两个方面：

+ key 值自身的稳定性
+ key 值与DOM节点的统一



#### key 值自身的稳定性

key 值自身的稳定性主要体现在：在整个生命周期中，key 值是固定的，不会因为再次渲染而导致 key 发生了改变。

例如，为了保证 key 值的唯一性，我们可能会想要使用随机生成来实现。但是，这是很不好的行为。前面我们说到，diff 算法是借助 key 来判断虚拟DOM节点是否可以复用的。如果采用随机生成的key值，就无法保证一个虚拟 DOM 节点在更新前后 key 值是一致的。那 diff 算法就无法对虚拟DOM节点进行复用。这样会造成极大的浪费，diff 算法也就失去了意义。

所以，**key 不要使用随机数**。防止造成，一个虚拟 DOM 节点对应多个key的情况。



#### key 值与DOM节点的统一

key 值与DOM节点保持统一的意思是：在生命周期中，一个 key 值永远对应一个 DOM。

diff 算法判断虚拟DOM节点的复用，除了判断 key 值，也会对 DOM 自身进行判断。只有两者保持统一，才能最好的发挥 diff 算法的优势。

例如：在给 `v-for`生成的列表中，大家可能喜欢将 `index` 作为 key 值。这是非常不好的行为。

因为无论为我们对列表进行什么操作，`index`永远都是 0,1,2,3 这样的排序。而列表的虚拟DOM节点自身可能会出现一样的情况。这样，diff 算法就不能精确的定位到改动的 DOM 从而造成错误复用旧的虚拟DOM节点的情况。这一错误在**使用 `v-for`动态生成子组件的时候尤为明显**。具体案例分析可看：[为什么不要以index作为key？](https://juejin.cn/post/6844904113587634184#heading-9)

所以，**不要将  index 作为 key**。防止造成，一个 key 对应多个虚拟 DOM 节点的情况。



如果你想了解更多关于 diff 算法，推荐阅读《[为什么 Vue 中不要用 index 作为 key？（diff 算法详解）](https://juejin.cn/post/6844904113587634184) 》、《[Vue的diff算法详解和key作用(较详细)](https://blog.csdn.net/qq_39414417/article/details/104763824)》以及源码《[patch.js](https://github.com/vuejs/vue/blob/bd6cea0973247e2a8e1d4a2250614c0bf44f0b26/src/core/vdom/patch.js)》。源码中有三个函数比较关键：[updateChildren](https://github.com/vuejs/vue/blob/bd6cea0973247e2a8e1d4a2250614c0bf44f0b26/src/core/vdom/patch.js#L404-L474) 、[sameVnode](https://github.com/vuejs/vue/blob/bd6cea0973247e2a8e1d4a2250614c0bf44f0b26/src/core/vdom/patch.js#L35-L50) 、[patchVnode](https://github.com/vuejs/vue/blob/bd6cea0973247e2a8e1d4a2250614c0bf44f0b26/src/core/vdom/patch.js#L501-L574)

## 参考文档

+ [为什么 Vue 中不要用 index 作为 key？（diff 算法详解）](https://juejin.cn/post/6844904113587634184) 
+ [Vue的diff算法详解和key作用(较详细)](https://blog.csdn.net/qq_39414417/article/details/104763824)
+ [vue核心之虚拟DOM(vdom)](https://www.jianshu.com/p/af0b398602bc)

