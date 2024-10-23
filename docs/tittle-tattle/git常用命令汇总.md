---
author: 王志杰
date: 2024-10-23
keywords: git,git 常用命令汇总
description: git 常用命令汇总
---

# git 常用命令汇总

> **阅前悉知**
>
> 本文仅是个人在使用 git 的一些技巧及常用指令笔记！

## 远程分支相关指令

### 获取远程分支

1. 同步远程分支
   ```bash
   git fetch
   ```
2. 获取远程已存在的分支信息

   ```bash
   git branch -a
   ```

3. 获取远程分支

   ```bash
   git checkout -b 本地分支名 origin/远程分支名
   ```

> 小技巧：一步到位，拉取远程仓库分支并建立本地分支
>
> ```bash
> git fetch origin 远程分支名:远程分支名
> ```

### 清理远程不存在的分支

1. 专门用于清理指定远程仓库（在这个例子中是 origin）的本地跟踪分支，这些分支在远程仓库中已不存在。
   ```bash
   git remote prune origin
   ```
2. 在执行 fetch 操作时，同时清理那些已经从远程仓库删除的引用。
   ```bash
   git fetch --prune
   ```

**总结**

`git fetch -p`:

- 在获取远程仓库最新数据的同时，清理不再存在的远程跟踪分支。
- 适用于所有配置的远程仓库。

`git remote prune origin`:

- 专门用于清理指定远程仓库（如 origin）的不再存在的远程跟踪分支。
- 不会更新远程仓库的数据，只负责清理。

### 创建分支

1. 创建本地分支
   ```bash
   git branch branchName
   ```
2. 将本地分支同步到远程
   ```bash
   git push origin branchName
   ```

### 删除分支

1. 删除本地分支
   ```bash
    git branch -d branchName
   ```
2. 删除远程分支
   ```bash
   git push origin --delete branchName
   ```

### 将本地回滚推到远程分支，改变远程分支代码，使其保持和本地一致

```bash
git push -f
```

## git log 的用法相关指令

1. 用`--oneline` 选项来查看历史记录的简洁的版本:
   ```bash
   git log --oneline
   ```
2. 用 `--graph` 选项，查看历史中什么时候出现了分支、合并,开启了拓扑图选项:
   ```bash
   git log --graph
   ```
3. 用 `--reverse` 参数来逆向显示所有日志:
   ```bash
   git log --reverse
   ```
4. 用 `--author` 选项来查看具体某个用户的提交信息：
   ```bash
   git log --author=Linus --oneline -5
   ```
5. 用 `--since`、`--before`、`--until`、`--after` 设定具体要查看的日期：
   ```bash
   git log --oneline --before={3.weeks.ago} --after={2010-04-18} --no-merges
   ```
6. 用 `--stat` 查看修改文件及添加/删除的行的摘要：
   ```bash
   git log --stat
   ```
7. 用 `--patch` 查看修改文件及添加/删除的行的详细信息：
   ```bash
   git log --patch
   ```

### 查看历史操作记录

**除此之外**，我们还可以查看仓库的所有历史操作记录。

```
git reflog
```

不同于 `git log`, `git reflog` 可以查看到当前仓库的**所有分支的所有操作记录**。

> 注意：
>
> 所有操作记录，不局限于 `commit` 操作。其涵盖了 `commit`、合并、撤销、分支重命名等等。**换句话说，你对仓库的所有操作通过`git reflog`都可以查到。而且都可以根据其`id`进 o 行撤回操作。**

## 远程仓库相关指令

### 查看仓库地址

```bash
git remote -v
```

### 切换远程仓库地址

方法一：修改远程仓库地址

```powershell
git remote set-url origin <url 新的远程仓库地址>
```

方式二：先删除远程仓库地址，然后再添加

1.  删除现有远程仓库

    ```powershell
    git remote rm origin
    ```

2.  添加新远程仓库
    ```powershell
    git remote add origin url
    ```

### 为本地仓库设置多个远程仓库地址

有时候我们需要将本地仓库的的内容同步到多个远程仓库。这是我们只需要为本地添加多个远程仓库就可以实现了。
操作如下：

1. 添加多个远程仓库
   例如，有两个 github 和 gitee 两个远程仓库。默认 github 为主。
   添加 github 地址：
   ```powershell
   git remote add origin github-url
   ```
   添加 gitee 地址：
   ```powershell
   git remote add gitee gitee-url
   ```
   因为默认 gitHub 为主，所以将 github 添加为 origin。
   这样我们就将两个远程仓库地址添加到了本地存储库了。
   可以用 `git remote -v` 查看
2. 向不同的远程仓库提交代码
   当我们需要将代码提交的远程仓库时至于要在 `git push ` 后加上远程仓库名就行了。
   将代码提交到 gitee
   ```powershell
   git push gitee
   ```
   将代码提交到 github
   ```powershell
   git push origin
   ```

## Tag (标签)相关指令

1. 新增本地 Tag
   ```powershell
   git tag -a v1.0 -m "第一个里程碑的突破"
   ```
2. 查看指定 Tag
   ```powershell
   git show v1.0
   ```
3. 推送指定 Tag 到远程
   ```powershell
   git push origin v1.0
   ```
4. 推送全部 Tag
   ```powershell
   git push origin --tags
   ```
5. 删除本地 Tag
   ```powershell
   git tag -d v1.0
   ```
6. 将删除操作推送到远程
   ```powershell
   git push origin :refs/tags/v1.0
   ```

## 保存和恢复工作进度(stash)相关指令

> 本部分摘抄自[《Git 保存和恢复工作进度(stash)》](https://www.jianshu.com/p/1e65e938f93c)

> 前提：必须是处于 git 下的文件，未 add 到 git 的文件无法使用。

- 保存当前工作进度，将工作区和暂存区恢复到修改之前。

  ```powershell
  git stash save message
  ```

  `message`为此次进度保存的说明。

- 显示保存的工作进度列表，编号越小代表保存进度的时间越近

  ```powershell
  git stash list
  ```

- 恢复工作进度到工作区(只能恢复一次)

  ```powershell
  git stash pop stash@{num}
  ```

  `stash@{num}`是可选项，不带此项则默认恢复最近的一次进度，相当于`git stash pop stash@{0}`

- 恢复工作进度到工作区且该工作进度(可重复恢复)

  ```powershell
  git stash apply stash@{num}
  ```

- 删除一条保存的工作进度

  ```powershell
  git stash drop stash@{num}
  ```

- 删除所有保存的工作进度

  ```powershell
  git stash clear
  ```

## git config 配置相关指令

查看全部配置：

```bash
git config --list
```

查看当前用户全局配置：

```bash
git config --global --list
```

查看当前仓库配置：

```bash
git config --local --list
```

查看系统配置

```bash
git config --system --list
```

> 注：
> 三种配置优先级为：**当前仓库配置>当前用户全局配置>系统配置**。
> 当三者存在冲突时，**优先级高的覆盖优先级低的**

## 常遇到的使用

### 场景：生成 ssh 密钥

1. 设置 git 的 user name 和 email

   ```bash
   git config --global user.name "test"
   ```

   ```bash
   git config --global user.email "test@gmail.com"
   ```

2. 生成 SSH 密钥

   ```bash
   $ ssh-keygen -t rsa -C “test@gmail.com”
   ```

### 场景：将指定 commit 合并到当前分支

```bash
git cherry-pick commit_id
```

### 场景：撤销到指定 commit，并将撤销的内容存入缓存

```bash
git reset --soft <commit_id>
```

与 `git reset <commit_id>` 的区别：

`git reset <commit_id>` 的撤回并不会将撤销内容存入缓存

与 `git commit --amend` 的区别：

`git commit --amend` 撤销操作只能撤销最新一次 `commit`, 上一次 `commit message` 还存在（处于编辑状态）；而 `git reset --soft <commit_id>` 并不局限于最新一次 `commit`, 它会把指定 `commit` 后修改的所有内容全部存入缓存。且不会保存`commit message`。

> `git reset --soft` 快捷指令
>
> 撤销最新一次：`git reset --soft head~1`
>
> 撤销最新两次：`git reset --soft head~2`
>
> 撤销最新 n 次：`git reset --soft head~n`

### 场景：重新编辑最新一次 commit

```bash
git commit --amend
```

我们有时提交了某次 commit 后发现 `commit` 的 `message` 写错了需要修改，或者代码上的需要打补丁。常用的做法是重新创建一个新的 commit 来修正。不过有了 `git commit --amend` 后，就不用这样了。`git commit --amend` 会让最新一次 `commit` 回退到缓存的阶段并进入 `commit` 编辑界面。所以，我们可以对代码以及 `commit message` 进行重新编辑。`commit` 后也不会产生新的 `commit` 记录。

### 场景：撤销具体某次的 commit

```bash
git revert <commit-id>
```

`git revert` 不同于 `git reset`。

`git revert` 是提取指定 commit 的所修改的反内容，以一个新 commit 的形式覆盖。所以 `git revert`的撤销操作会被记录下来。

> `git reset` 是直接撤销指定 commit 的后的全部 commit。

### 场景：如何上传空文件夹

由于 git 默认忽略空文件夹，如果需要将一个空文件夹推送到远程仓库可以如下操作：

1. 在空文件夹中添加`.gitkeep`文件。`.gitkeep`内容为空即可。
2. 通过`git add  [空文件夹路径]/.gitkeep` 命令将`.gitkeep`添加到暂存区
3. 执行`git commit -m '[commit 说明]'`
4. 执行`git push`

### 场景：如何只上传文件夹，而不上上传文件夹里面的文件

有的时候会有这样一种需求：

> 需要上传一个目录到远程存储库，而不要上传该目录下面的文件。

对于这种情况，可能很多人立即想到在 `.gitignore` 设置忽略该目录底下的全部文件就可以。但是呢！这样就造成，该目录子被 git 识别为空目录。而 git 默认是不上传空目录的。从而导致该目录不会被上传。这时该怎么解决呢？

**解决方法**

在空目录里在添加一个 `.gitignore` 来专门进行该目录的 git 忽略规则。

> 这里补充一点：`.gitignore` 的作用域为所处目录本身及目录的全部子目录。

`.gitignore` 内容如下：

```bash
# Ignore everything in this directory
*
# Except this file
!.gitignore
```

这里设定了两条规则

1. 忽略作用域内的全部文件
2. 排除 `.gitignore` 文件
   > 注意， `.gitignore` 后面的规则会覆盖前面的规则

### 场景：分支当前重命名

```bash
 git branch -m new_name
```

`git branch -m` 指令会重命名当前分支的名字。如果在创建分支时不小心写错单词了，可以该指令直接修改。

### 场景：查看某个 commit 在哪个分支中

```bash
git branch --contains <commit_id>
```

如果你想查看某个`commit` 被多少个分支合并了，该指令就可以帮助到你。

## 常遇到的问题

### 问题解决：解决中文乱码

```bash
git config core.quotepath false
```

### 问题解决：本地仓库添加多个远程仓库后，push 报错：Note about fast-forwards

解决方法：设置允许不同项目的合并

```shell
git pull origin master --allow-unrelated-histories
```

### 问题解决：大小写问题（强制大小写敏感）

git 默认大小写不敏感。这要就导致有时我们修改了文件名，但是 git 并没有记录。
为此，我们可以设置 git 大小写敏感：

1. 开启 git 全局大小写敏感：

   ```bash
   git config --global core.ignorecase false
   ```

2. 关闭 git 大小写敏感：

   ```bash
   git config --global core.ignorecase true
   ```

   参考：[git 大小写问题 踩坑笔记](https://blog.csdn.net/u013707249/article/details/79135639)

### 问题解决：因为远程库添加了文件，导致.gitignore 无法生效

1. 清除本地库的缓存

   ```bash
   git rm -r --cached .
   ```

2. 将本地代码重新加入

   ```bash
   git add .
   ```

3. 并让 .gitignore 文件夹生效，读取我配置的过滤规则

   ```bash
   git commit -m “update .gitignore”
   ```

参考：https://blog.csdn.net/q664243624/article/details/78343400

---
