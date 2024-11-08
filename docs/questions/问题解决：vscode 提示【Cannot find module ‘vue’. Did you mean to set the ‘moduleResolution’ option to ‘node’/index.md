# 问题解决：vscode 提示【Cannot find module ‘vue’. Did you mean to set the ‘moduleResolution’ option to ‘node’, or to add aliases to the ‘paths’ option?】

通过`create-vue`创建 Vue3 的项目后，vscode 红色波浪线提示【Cannot find module ‘vue’. Did you mean to set the ‘moduleResolution’ option to ‘node’, or to add aliases to the ‘paths’ option?】。

拿这个提示语到网上查找解决方法，帖子博客基本都是这样说的：

> 到 `tsconfig.app.json` 中的 `compilerOptions`里添加提示语中说到的属性`moduleResolution`:
>
> ```json
> {
>   "compilerOptions": {
>     "moduleResolution": "node"
>   }
> }
> ```

然而，上面的方法并不能解决我的问题。后来无意间看到这个帖子提到是**vscode 的版本问题**——vscode 版本（内置 TS 引擎太旧了）。

![在这里插入图片描述](./images/1.png)

抱着试一试的心态，我查看了自己 vscode 的版本为 1.6.x，最新版本为 1.8.x。

于是我下载了最新的 vscode 安装包，更新 vscode 后果然提示语没有了。

牛逼！！！

感谢 issues 所有参与者。

[在没有 "node" 模块解析策略的情况下，无法指定选项 "-resolveJsonModule"。 · Issue #11010 · umijs/umi (github.com)](https://github.com/umijs/umi/issues/11010)
