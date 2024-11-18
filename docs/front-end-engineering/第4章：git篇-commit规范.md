# git commit 规范

## 必要性

在团队协作中，git 代码提交规范非常重要，它有助于团队成员理解每次提交的目的，提高代码质量，方便代码审查，代码回溯等。

## 说明

本规划基于 《[Angular 提交信息规范](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#commit)》，并结合网上的建议做了一些修改。主要是简化了 Subject 部分，不要求`<BLANK LINE>`、`<body`和`<footer>`。

## 格式

```
<type>(<scope>): <subject>
```

> [!TIP]
>
> `type`和`subject`是必填，`scope`选填。

## 字段解析

> [!info] type
>
> commit 类型，用于指明本次 commit 中代码的目的，只允许使用下面几种标识。
>
> - feat：新增功能（feature）
> - fix：修补 bug
> - docs：文档（documentation）
> - style： 格式（不影响代码运行的变动）
> - refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
> - perf：改进性能的代码更改
> - test：增加测试用例
> - chore：构建过程或辅助工具的变动
> - delete：删除功能或者文件
> - modify：修改功能
> - build：改变构建流程，新增依赖库、工具等
> - ci：自动化流程配置更改
> - revert：代码回滚

> [!info] scope
>
> `scope` 用于说明 commit 影响的范围，比如数据层、控制层、视图层、页面、模块、函数等等，视项目不同而不同。颗粒度尽量小且精确。

> [!info] subject
>
> `subject` 是 commit 目的的简短描述：
>
> - 不超过 50 个字符；
> - 使用祈使句式；
> - 结尾不加句号；
> - 英文描述语的第一个字母小写；
