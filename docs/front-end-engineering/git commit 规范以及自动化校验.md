# git commit 规范以及自动化校验

### Git commit 规范

#### 格式：

```
<type>(<scope>): <subject>
```

> type（必需）、scope（可选）和 subject（必需）

#### 字段解析

> ##### type
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
>
> ---
>
> ##### scope
>
> `scope` 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
>
> ---
>
> ##### subject
>
> `subject` 是 commit 目的的简短描述，不超过 50 个字符。
