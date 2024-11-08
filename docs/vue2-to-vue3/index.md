## 前言

> 1. 每个 Vue 大版本中都有许多小版本。例如 Vue 2 迭代的了许多小版本，有 2.4.0 、2.2.0 等等。但是我们在阅读时并不需要关心这些小版本。所以，这里统一用 `x`表示小版本号。
>    - Vue 2.x 表示 Vue 2 所有的版本；
>    - Vue 3.x 表示 Vue 3 所有的版本。
> 2. 本专栏为读后笔记，所有的篇幅是基于 Vue 官方文档《[v3 迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html)》，然后对相关的知识点做了补充和列举。

​

## 背景

距 Vue 3.x 上线已经有一段日子了。尽管还是 beta 版，但是身为前端开发人员，时刻学习最前言的开发技术是很有必要的。

关于 Vue 3.x 的介绍及使用文档，Vue 官方已经给出了很详细的介绍说明文档——《[Vue 3 教程](https://v3.cn.vuejs.org/guide/introduction.html)》。该教程全面细致的介绍了 Vue 3.x。因为 Vue 3.x 是 Vue 2.x 的迭代，所以其中也涵盖了大量 Vue 2.x 已有的知识。因此，如果你之前完全没接触过 Vue，同样可以直接学习 Vue 3.x。

但是，也因为如此，对于已经比较熟悉 Vue 2.x 的朋友来说，想要快速的了解 Vue 3.x 相较于 Vue 2.x 的变化，直接阅读《[Vue 3 教程](https://v3.cn.vuejs.org/guide/introduction.html)》并不是很好的选择。因为从中归纳筛选出变化点是比较费时间且极有可能存在遗漏的。好在 Vue 也提供的相应的官方文档——《[v3 迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html)》。《[v3 迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html)》详细列举了 Vue 2.x 和 Vue 3.x 的不同点，同时为我们提供**如何将 Vue 2.x 的代码转为 Vue 3.x **的指南。本系列笔记也是以《[v3 迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html)》为基础、为主所汇总而来，对其中的各个要点进行逐一验证，同时根据我的理解补充对应要点阅读所需的 Vue 2.x 知识点或其它前置知识。

## 阅读建议

因为本系列是基于《[v3 迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html)》而汇总出来的。所以本系列不适合完全对 Vue 2.x 不了解的朋友阅读。此外，建议您结合《[v3 迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html)》来阅读，以《[v3 迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html)》为主，本系列为辅。这样您可以“以自己为主”审视的阅读，从而不被我的观点带偏。

## 目录

- [Vue 3 迁移策略笔记—— 第 1 节：v-for 中的 Ref 数组](https://blog.csdn.net/weixin_44869002/article/details/113173819)

- [Vue 3 迁移策略笔记—— 第 2 节：Async Components 异步组件](https://blog.csdn.net/weixin_44869002/article/details/113174206)

- [Vue 3 迁移策略笔记—— 第 3 节：Attribute Coercion Behavior （属性强制行为）](https://blog.csdn.net/weixin_44869002/article/details/113174285)
- [Vue 3 迁移策略笔记——第 4 节：$attrs 包括 class&style](https://blog.csdn.net/weixin_44869002/article/details/113174490)
- [Vue 3 迁移策略笔记—— 第 5 节：移除 $children](https://blog.csdn.net/weixin_44869002/article/details/113174530)
- [Vue 3 迁移策略笔记—— 第 6 节：自定义指令](https://blog.csdn.net/weixin_44869002/article/details/113174573)
- [Vue 3 迁移策略笔记—— 第 7 节：自定义元素交互](https://blog.csdn.net/weixin_44869002/article/details/113174591)
- [Vue 3 迁移策略笔记—— 第 8 节：Data 选项](https://blog.csdn.net/weixin_44869002/article/details/113174676)
- [Vue 3 迁移策略笔记—— 第 9 节：新增 emits 选项](https://blog.csdn.net/weixin_44869002/article/details/113174738)
- [Vue 3 迁移策略笔记—— 第 10 节：事件 API](https://blog.csdn.net/weixin_44869002/article/details/113174756)
- [Vue 3 迁移策略笔记—— 第 11 节：移除过滤器](https://blog.csdn.net/weixin_44869002/article/details/113174778)
- [Vue 3 迁移策略笔记—— 第 12 节：片段](https://blog.csdn.net/weixin_44869002/article/details/113174804)
- [Vue 3 迁移策略笔记—— 第 13 节：函数式组件](https://blog.csdn.net/weixin_44869002/article/details/113174857)
- [Vue 3 迁移策略笔记—— 第 14 节：全局 API](https://blog.csdn.net/weixin_44869002/article/details/113175703)
- [Vue 3 迁移策略笔记—— 第 15 节：全局 API 的 tree shaking](https://blog.csdn.net/weixin_44869002/article/details/113175726)
- [Vue 3 迁移策略笔记—— 第 16 节：Inline Template 属性](https://blog.csdn.net/weixin_44869002/article/details/113176009)
- [Vue 3 迁移策略笔记—— 第 17 节：Key 属性](https://blog.csdn.net/weixin_44869002/article/details/113176031)
- [Vue 3 迁移策略笔记—— 第 18 节：按键修饰符](https://blog.csdn.net/weixin_44869002/article/details/113176050)
- [Vue 3 迁移策略笔记—— 第 19 节：移除 $listeners](https://blog.csdn.net/weixin_44869002/article/details/113176068)
- [Vue 3 迁移策略笔记—— 第 20 节：Props 的默认值函数不能访问 this](https://blog.csdn.net/weixin_44869002/article/details/113176085)
- [Vue 3 迁移策略笔记—— 第 21 节：渲染函数 API](https://blog.csdn.net/weixin_44869002/article/details/113176112)
- [Vue 3 迁移策略笔记—— 第 22 节：Slots 的统一](https://blog.csdn.net/weixin_44869002/article/details/113176125)
- [Vue 3 迁移策略笔记—— 第 23 节：Transition Class 的变化](https://blog.csdn.net/weixin_44869002/article/details/113176143)
- [Vue 3 迁移策略笔记—— 第 24 节：Transition Group 不再需要设置根元素](https://blog.csdn.net/weixin_44869002/article/details/113176169)
- [Vue 3 迁移策略笔记—— 第 25 节：v-on.native 修饰符被移除](https://blog.csdn.net/weixin_44869002/article/details/113176244)
- [Vue 3 迁移策略笔记—— 第 26 节：在组件上使用 v-model 的变化](https://blog.csdn.net/weixin_44869002/article/details/113176262)
- [Vue 3 迁移策略笔记—— 第 27 节：v-if 和 v-for 的优先级](https://blog.csdn.net/weixin_44869002/article/details/113176324)
- [Vue 3 迁移策略笔记—— 第 28 节：v-bind 合并行为](https://blog.csdn.net/weixin_44869002/article/details/113176344)
- [Vue 3 迁移策略笔记—— 第 29 节：数组的监听](https://blog.csdn.net/weixin_44869002/article/details/113176356)

## 后记

在编写该系列之初，我完全不知道 Vue 3.x 是有官方中文文档的。边读边查，艰难的读完了《[Vue 3 教程](https://v3.vuejs.org/guide/introduction.html)》和《[v3 迁移指南](https://v3.vuejs.org/guide/migration/introduction.html)》英文版。感概道，没有中文文档，实在是太痛苦了。所以萌生了撰写该系列的念头。于是我边写边查边翻译，遇到实在理解不了的就只能揣测，断断续续写了快两个月。在快要完成《[v3 迁移指南](https://v3.vuejs.org/guide/migration/introduction.html)》翻译的时候，我无意发现了这些文档是有中文版的。顿时有种崩溃的感觉。感情做了这么多都是无用功呀！瞬间没了动力。但是看到就差这么几篇，而且还做了不少补充，实在不愿意放弃。所以我只好转移策略，改成读书笔记了。
