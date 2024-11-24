---
author: 王志杰
date: 2024-11-18
keywords: git, git 实践指南, git 常用命令
description: 合理使用 git 是程序员的基本功。良好的 git 使用习惯是程序员很重要的一项“加分项”。本文旨在帮助大家快速掌握 git 的使用，并养成良好的 git 使用习惯
outline: 2
---

# git 实践指南

> [!INFO] 写在最前面
> 合理使用 git 是程序员的基本功。良好的 git 使用习惯是程序员很重要的一项“加分项”。然而，很多刚接触开发的新人并不重视 git 使用技能的掌握。究其原因，一方面是刚接触开发时，大都是独自摸索阶段，没有团队合作的需要，git 的必要性和优势无法体现。所以 git 的存在就变得可有可无。另一方面，git 并不是编码必备技能，所以很多开发人员并不重视 git 的学习。
>
> **基于此因撰写本文，旨在帮助大家快速掌握 git 的使用，并养成良好的 git 使用习惯**。

> [!IMPORTANT] 关于学习 git 指令的必要性
> 市面上已经存在很多不错且很好用的交互式 git 插件了，是否有必要学习 git 指令呢？
>
> **我认为是很有必要的**。理由如下：
>
> **其一**，git 很简单，git 常用的指令不多，熟悉这些指令花不了多少时间。在日常开发中，很多时候，我们并不需要使用 git 交互式插件，直接使用 git 指令反而更快捷、更方便。就我而言，git 插件更多的是在处理较为复杂的操作时使用，如编辑冲突文件、提交文件内容的选定等。
>
> **其二**，我认为 git 指令是 git 的基础，掌握了 git 指令，才能更好地使用 git 插件。git 插件更多的是辅助你使用 git 指令，而不是替代你使用 git 指令。
>
> **其三**，git 指令是 git 的核心，掌握了 git 指令，才能更好地理解 git 的原理和机制。
>
> **综上**，我认为学习 git 指令是非常必要的。同时也鼓励大家多去使用 git 指令。

## 一个重点

> [!IMPORTANT] Commit message 应清晰明了！！！

我认为 commit message 是 git 中最重要的部分之一。一个好的 commit message 可以帮助他人理解你的代码修改，也可以帮助你在未来查找和修复问题。

commit message 同时也体现了一个程序员的编程素养高低。commit message 写的好的人，肯定是有一定的代码规划能力以及团队协作意识。这样的人编码水平大概率不会差，而且具有较高的可塑性和培养基础。commit message 写的好的人，在团队协作中，更容易得到他人的认可和信任。如果一个程序员的 commit message 写的不好，要么是代码规划能力差，要么是团队协作意识差，要么是代码素养低。这样的程序员，大概率还是处在疲于应对日常开发工作的阶段。

那么，如何写好的 commit message 呢？有两点建议：

1. 规划好 commit 颗粒度，避免一次性提价太多代码。当一次 commit 的代码量较大时，必然会导致 commit message 的描述不清，从而影响他人理解你的代码修改。建议拆分成多个 commit，每个 commit 只包含一个功能或修复一个 bug。这样可以提高代码的可读性和可维护性，也可以方便他人理解你的代码修改。
2. 制定良好的 commit message 规范。commit message 规范可以帮助我们更好、更容易地编写 message，也可以方便他人理解你的 commit。

例如：

```bash
feat: add new feature
fix: fix bug
docs: update documentation
style: fix code style
refactor: refactor code
test: add or update tests
chore: update dependencies
```

> [!TIP]
> 我基于 《[Angular 提交信息规范](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#commit)》，并结合网上的建议，总结了一份 commit message 规范。欢迎大家参考使用：《[commit message 规范](./第4章：git篇-commit规范.md)》。

## 两个建议

### 建议一：不要在主分支上直接修改代码

主分支（main 或 master）是用于存放稳定版本的代码，不应该直接在上面修改代码。如果你需要修改代码，应该先创建一个新分支，然后在新的分支上进行修改。修改完成后，将新的分支合并到主分支。

### 建议二：合理使用 git rebase 和 git merge

`git rebase` 和 `git merge` 是两个常用的 git 操作，它们都可以将一个分支的提交应用到另一个分支上。但是它们的使用场景和效果是不同的。

`git merge` 会将两个分支的提交合并在一起，而 `git rebase` 会将当前分支的提交应用到目标分支的最新提交上。使用 merge 可以保留衍生分支的提交历史，而 rebase 会改变提交历史，可能会引入不必要的冲突和问题。

关于合并有如下建议：

> [!TIP] 基础分支和衍生分支的概念：
> 衍生分支是相对于基础分支而言的。在创建新分支时，通常会基于一个已有的分支（如主分支或开发分支）创建新的分支，这个已有的分支就是基础分支，新创建的分支则是衍生分支。
>
> 基础分支通常是主分支（main 或 master）或开发分支（develop）。衍生分支是用于开发新功能或修复 bug 的分支，通常以 feature、hotfix 等命名。

#### 将基础分支合并到衍生分支时：使用 git rebase 而不是 git merge

将基础分支合并到衍生分支时，使用 `git rebase` 而不是 `git merge` 可以保持项目的提交历史更加清晰和简洁。rebase 会将当前分支的提交应用到目标分支的最新提交上，而 merge 会将两个分支的提交合并在一起。使用 rebase 可以避免不必要的合并提交，使提交历史更加线性。

```bash
# 切换到衍生分支
git checkout feature-branch

# 将基础分支的提交应用到衍生分支上
git rebase base-branch
```

#### 将衍生分支合并到基础分支时，使用 git merge 而不是 git rebase

将衍生分支合并到基础分支时，使用 `git merge` 而不是 `git rebase`。merge 会将两个分支的提交合并在一起，而 rebase 会将当前分支的提交应用到目标分支的最新提交上。使用 merge 可以保留衍生分支的提交历史，而 rebase 会改变提交历史，可能会引入不必要的冲突和问题。

```bash
# 切换到基础分支
git checkout base-branch

# 将衍生分支的提交合并到基础分支上
git merge feature-branch
```

## 三个及时

### 及时 commit

当你完成一个功能或者修复一个 bug 后，应该及时 commit，而不是等到所有功能都完成后再一次性 commit。这样可以确保每次 commit 都是一个小改动，方便后续的代码管理和问题追踪。

### 及时 push

当你完成一个功能或者修复一个 bug 后，应该及时 push，而不是等到所有功能都完成后再一次性 push。这样可以确保你的代码能够及时被其他开发者使用，避免代码冲突和问题。再者，及时 push 也有助于你保持本地仓库和远程仓库的一致性。从而避免本地仓库因为物理问题（如磁盘损坏）而丢失代码。

> [!IMPORTANT] 重点
> 最起码保证，在结束一天的工作时，push 代码到远程仓库。

### 及时合并

当你完成一个功能或者修复一个 bug 后，应该及时将你的代码合并到主分支或者开发分支。这样可以确保你的代码能够及时被其他开发者使用，避免代码冲突和问题。此外，如果团队要求代码合并前现需要进行代码审核，那么及时合并也有助于你提前进行代码审核，避免一次性审核过多代码从而导致审核质量的下降。

## 四个“请先”

### push 前请先 pull

在 push 代码之前，请先 pull 远程仓库的代码，以确保你的代码是最新的。这样可以避免代码冲突和问题，同时也可以确保你的代码能够及时被其他开发者使用。

### 合并分支前，请先更新分支代码

在合并分支之前，应该先把目标分支的代码合并到当前分支，然后再进行合并。这样可以确保当前分支的代码是最新的，避免合并过程中出现冲突和问题。如果存在冲突，也可以及时发在在本机分支解决冲突。

### 合并前，请先解决冲突

在合并分支之前，应该先解决当前分支和目标分支之间的冲突。如果存在冲突，应该及时解决冲突，然后再进行合并。这样可以避免合并过程中出现冲突和问题，同时也可以确保合并后的代码是正确的。

### 合并后，请及时删除临时分支

在合并分支之后，应该及时删除临时分支。这样可以避免临时分支占用不必要的磁盘空间，同时也可以避免误操作导致的问题。

## 认识 git 配置

### 三个层级的配置说明

git 配置文件分为系统级别、用户级别和仓库级别，优先级从高到低。

- 系统级别：对所有用户和所有项目都有效。**一般不建议对其进行修改**。
- 用户级别：对当前用户和所有项目都有效。
- 仓库级别：只对当前项目有效。**如需更改 git 配置，优先考虑仓库级别**。

### 查看 git 配置

如需查看配置，优先使用 `git config --list` 命令来查看，而不是打开配置文件查看：

```bash
git config --list
```

此命令会**列出所有级别的配置**，包括系统级别、用户级别和仓库级别。优先级高的配置会显示在后面。

还可以通过增加不同的参数来查看不同级别的配置：

```bash
# 查看系统级别配置
git config --system --list

# 查看用户级别配置
git config --global --list

# 查看仓库级别配置
git config --local --list
```

如果，你只想查看某个配置项的值，可以使用 `git config <key>` / `git config --get <key>` 命令：

```bash
git config user.name
```

或者使用 `git config --get-all <key>` 命令，查看全部层级的配置：

```bash
git config --get-all user.name
```

### 修改 git 配置

如需修改配置，优先使用 `git config <key> <value>` 命令来修改，而不是直接编辑配置文件：

```bash
git config user.name "your name"
```

### 撤销某项的 git 配置

如需撤销某项配置，可以使用 `git config --unset <key>` 命令：

```bash
git config --unset user.name
```

## git log 查看提交日志

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

## git reflog 查看历史操作记录

`git reflog` 命令用于查看 git 的历史操作记录，包括分支切换、合并、重置等操作。

搭配 `git reset`，可以撤销一些误操作，比如误删分支、误提交、错误回滚等。

> [!TIP] 注意区分 git log 和 git reflog
>
> `git log` 只会显示提交历史，而 `git reflog` 会显示所有的 git 操作历史，包括 `git reset`、`git checkout`、`git merge` 等。

## 了解 git fetch 和 git pull 的区别

`git fetch` 和 `git pull` 都是用于从远程仓库获取更新的命令，但是它们有一些区别。

`git fetch` 命令只会从远程仓库获取更新，但是不会将这些更新合并到你的本地分支。你需要使用 `git merge` 命令来将这些更新合并到你的本地分支。例如：

```bash
git fetch origin
git merge origin/master
```

`git pull` 命令会从远程仓库获取更新，并将这些更新合并到你的本地分支。这相当于执行了 `git fetch` 和 `git merge` 命令。例如：

```bash
git pull origin master
```

## 回退某个 commit

如果你发现某个 commit 中的代码有问题，你可以使用 `git revert` 命令来撤销这个 commit, 而不是 `get reset`。例如：

```bash
git revert <commit-hash>
```

这将会创建一个新的 commit，这个 commit 的内容与你要撤销的 commit 相反。这样就可以避免直接修改历史，同时也可以保留所有的提交记录。

## 合并指定 commit

如果你只想合并某个 commit，你可以使用 `git cherry-pick` 命令。例如：

```bash
git cherry-pick <commit-hash>
```

这将会将指定的 commit 合并到当前分支。这样就可以避免合并整个分支，同时也可以保留所有的提交记录。

## 合理设置 core.autocrlf，保证换行符的一致性

在 Windows 系统中，换行符是 CRLF（Carriage Return Line Feed），而在 Unix/Linux 系统中，换行符是 LF（Line Feed）。因此，在跨平台开发时，需要保证换行符的一致性。git 提供了 `core.autocrlf` 配置选项来解决这个问题。

```bash
# 在 Windows 系统中，设置为 true，表示在提交时将 CRLF 转换为 LF，在检出时将 LF 转换为 CRLF
git config --global core.autocrlf true

# 在 Unix/Linux 系统中，设置为 input，表示在提交时将 CRLF 转换为 LF，在检出时不进行转换
git config --global core.autocrlf input
```

> [!TIP] 注意
> 如果你的项目中使用了 ESLint 等工具，来检测换行符，你需要根据实际情况来设置 `core.autocrlf`。例如，项目中使用了 ESLint，并且 ESLint 的配置文件中指定了换行符为 LF，那么无论在 Windows 系统还是 Unix/Linux 系统中，你都应该将 `core.autocrlf` 设置为 input。

## 设置 core.quotepath，解决文件路径中文乱码问题

如果你在 git 中遇到中文乱码的问题，你可以尝试设置 `core.quotepath` 为 false。例如：

```bash
git config --global core.quotepath false
```

这将会在 git 中显示中文路径，而不是乱码。

## 使用 ssh 密钥，避免每次 push 都需要输入用户名和密码

如果你使用 HTTPS URL 来 clone 仓库，那么每次 push 都需要输入用户名和密码。为了避免每次 push 都需要输入用户名和密码，你可以使用 SSH URL 来 clone 仓库，并设置 SSH 密钥。

首先，你需要生成 SSH 密钥。
详见：[生成新的 SSH 密钥并将其添加到 ssh-agent - GitHub Enterprise Server 3.15 Docs](https://docs.github.com/zh/enterprise-server@3.15/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key)

## 使用 .gitignore 文件，避免将不必要的文件提交到仓库

.gitignore 文件用于指定哪些文件或目录不应该被提交到仓库。例如，你可以将 node_modules 目录添加到 .gitignore 文件中，这样 git 就不会跟踪这个目录下的文件。

```bash
## 忽略 node_modules 目录
node_modules/
```

## 使用 git stash 保存当前工作进度

如果你正在开发一个功能，但是突然需要切换到另一个分支进行修复，你可以使用 git stash 命令来保存当前的工作进度。这样你就可以切换到其他分支进行修复，然后再使用 git stash pop 命令来恢复之前的工作进度。

```bash
# 保存当前工作进度
git stash

# 恢复之前的工作进度
git stash pop
```

## 使用 .gitkeep 文件，将空目录提交到仓库

因为 git 默认忽略空目录，所以如果你有一个空目录，并且你希望 git 能够跟踪这个目录，你可以在这个目录中添加一个 .gitkeep 文件。这样 git 就会跟踪这个目录，而不会忽略它。

```bash
# 在空目录中创建 .gitkeep 文件
touch .gitkeep
```

## git clone 指定分支

如果你只想 clone 某个分支，你可以使用 `git clone` 命令的 `-b` 选项来指定分支。例如：

```bash
git clone -b <branch-name> <repository-url>
```

这将会只 clone 指定的分支，而不会 clone 整个仓库。

## git clone 指定 tag

如果你只想 clone 某个 tag，你可以使用 `git clone` 命令的 `-b` 选项来指定 tag。例如：

```bash
git clone -b <tag-name> <repository-url>
```

这将会只 clone 指定的 tag，而不会 clone 整个仓库。

## 清除 git 缓存

如果你想要清除 git 缓存，你可以使用 `git gc` 命令。例如：

```bash
git gc
```

这将会清除 git 缓存，释放一些磁盘空间。

## 清理远程不存在的分支

当我们把远程仓库中的分支删除后，本地仓库中仍然存在这些分支的引用。`git pull`或`git fetch`指令并不会帮我们把这些分支清理掉，需要手动清理。有以下两种方法：

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

## git commit --amend 修改最近一次提交

如果你想要修改最近一次提交，你可以使用 `git commit --amend` 命令。例如：

```bash
git commit --amend
```

这将会打开一个编辑器，让你修改提交信息，或者新增提交内容。修改完成后，保存并关闭编辑器，git 就会修改最近一次提交。

如果你只想将当前正在更改的内容补充到最新一次提交而不去修改提交信息，则可以使用 `git commit --amend --no-edit` 命令来修改最近一次提交。

> [!TIP]
> 如果你已经把最新的 commit push 到远程仓库。`git commit --amend`操作会导致冲突。

## 设置 git 终端编辑器

在解决冲突或者重新修改编辑器等操作时，git 会进入终端编辑器，默认是 vim，如果你不熟悉 vim，那么可以设置 git 自己喜欢的编辑器。

如果你想要设置 git 编辑器，你可以使用 `git config` 命令。例如：

```bash
git config --global core.editor "vim"
```

这将会将 git 编辑器设置为 vim。你可以将 "vim" 替换为你喜欢的编辑器，如 "nano" 或 "emacs"。

> [!INFO] vim 编辑器的常用指令
>
> - `i`：进入插入模式，可以开始编辑文本。
> - `Esc`：退出插入模式，回到命令模式。
> - `:wq`：保存并退出。
> - `:q!`：不保存退出。
> - `:w`：保存。
> - `:q`：退出。
> - `:wq!`：强制保存并退出。
> - `:q!`：强制退出。
> - `:w!`：强制保存。
> - `:e!`：强制重新加载文件。
> - `:help`：查看帮助文档。

## 开启大小写敏感

是否开启大小敏感，众说纷纭。但在我实际体验下来，**开启大小敏感可以避免很多不必要的麻烦**。

首先，只有 Windows 系统才不区别大小写，而 Linux 和 Mac 系统都是区分大小写的。所以，开启大小敏感，可以避免多人合作时因为操作系统的不同中，而产生大小写不敏感导致文件丢失的问题。其次，项目最终都会部署到服务器上，而服务器一般都是 Linux 系统，所以开启大小敏感，可以避免在服务器上，因为大小写不敏感，导致文件丢失的问题。

通过以下命令开启大小敏感：

```bash
git config core.ignorecase false
```
