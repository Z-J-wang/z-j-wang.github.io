# 配置 Git hooks

## Git hooks 简介

Git hooks 是 Git 在执行特定操作时触发的脚本，借助 Git hooks 可以实现代码检查、自动化测试、代码格式化等功能。

GIt hooks 脚本文件存放在 git 仓库根目录的`.git/hooks/`目录下，每个文件对应一个 Git hooks。例如`pre-commit`文件对应 pre-commit hooks。

默认情况下，所有的 Git hooks 脚本文件都带有一个`.sample`后缀，表示该文件是示例文件，不生效。如果需要启用某个 Git hooks，需要将`.sample`后缀去掉。编写 Git hooks 脚本文件时，需要使用 bash 语言。

### 常用的 Git hooks

| Hook 名称                         | 调用时机                                                                                                                                         | 说明                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| **pre-commit**                    | `git commit`执行前（`--no-verify`可绕过）                                                                                                        | 可用于检查代码是否通过测试、是否有未暂存的更改等                   |
| **commit-msg**                    | `git commit`执行前，但在提交信息准备完成后（`--no-verify`可绕过）                                                                                | 验证提交信息是否符合特定格式或内容要求                             |
| **post-commit**                   | `git commit`执行后                                                                                                                               | 可用于通知、部署等操作，但不影响提交结果                           |
| **prepare-commit-msg**            | `git commit`执行后，编辑器打开之前                                                                                                               | 准备或修改提交信息                                                 |
| **pre-rebase**                    | `git rebase`执行前（`--no-verify`可绕过）                                                                                                        | 检查是否满足 rebase 的条件                                         |
| **post-checkout**/**post-switch** | `git checkout`或`git switch`执行后（在某些情况下，如`git clone`之后也会执行；在执行`git pull`时，如果包含`git merge`，则`post-merge`也会被调用） | 更新工作环境等                                                     |
| **post-merge**                    | `git merge`或`git pull`（包含`git fetch`和`git merge`）导致的合并操作完成后                                                                      | 处理合并后的操作                                                   |
| **pre-push**                      | `git push`执行前                                                                                                                                 | 检查远程仓库的权限或状态等                                         |
| **pre-receive**                   | `git-receive-pack`处理`git push`操作前                                                                                                           | 检查推送的分支或标签等                                             |
| **update**                        | 当`git-receive-pack`对`git push`作出反应并更新仓库中的引用时                                                                                     | 执行更新操作（此钩子可能多次被调用，因为一次推送可能更新多个引用） |
| **post-receive**                  | 当`git-receive-pack`更新仓库中的引用后（以及当推送试图更新当前被签出的分支且`receive.denyCurrentBranch`配置被设置为`updateInstead`时）           | 通知、部署等操作                                                   |
| **pre-auto-gc**                   | `git gc --auto`执行前                                                                                                                            | 配置或检查垃圾回收的条件                                           |
| **sendemail-validate**            | `git send-email`发送邮件前                                                                                                                       | 验证邮件发送的配置或内容                                           |

> [!INFO] 完整的 Git hooks 列表：https://git-scm.com/docs/githooks

## 配置 Git hooks

默认情况下，Git hooks 的脚本都需要存放在`.git/hooks/`目录下。但是`.git/`目录的文件属于本地仓库并不会同步到远程仓库。这样就造成一个问题：当其他开发者克隆仓库时，这些 hooks 脚本并不会被克隆下来。

对于这个问题由两个解决方案：

1. 将 hooks 脚本存放在其他目录，然后通过`core.hooksPath`配置项指定 hooks 脚本的存放路径。
2. 使用工具来管理 hooks 脚本，如`Husky`。

### core.hooksPath

通过设置`core.hooksPath`，可以将 Git hooks 的脚本存放在其他目录。这样我们就可以把 hooks 脚本存放在项目的根目录下，这样其他开发者克隆仓库时，这些 hooks 脚本也会被克隆下来。不过，这种方式有个弊端就是需要每个开发者都需要手动设置`core.hooksPath`，并不是特别方便。而`husky`工具则可以完全避免这个问题。

### Husky

Husky 是一个让配置 Git 钩子变得更简单的工具。它允许开发者在项目根目录中编写一个配置文件，然后在安装 Husky 时将该配置文件与 Git Hook 关联起来。这样，开发者就可以在团队中方便地使用 Git Hook，而无需在每个开发者的本地环境中手动配置 Hooks。

#### Husky 原理

Husky 的原理很简单，就是通过在安装 Husky 时，将会在`.husky/`目录下创建一个`.husky/_/`目录，然后将 Husky 的 Git Hook 脚本复制到其中中，并将`core.hooksPath`改为`.husky/_/`。这样，当 Git Hook 被触发时，Husky 的脚本就会被执行。

所以在使用 Husky 时，我们只需要在项目根目录下创建一个`.husky/`目录，然后在其中创建 Git Hook 的脚本即可。

#### Husky 使用说明

1. 安装 Husky

```bash
yarn add husky --dev
```

2. 初始化 Husky

```bash
npx husky init
```

init 命令简化了项目中的 husky 设置。它会在 .husky/ 中创建 pre-commit 脚本，并更新 package.json 中的 prepare 脚本。

> [!INFO] 更多 Husky 知识可查看：https://typicode.github.io/husky/

## 项目实战

了解了 Git hooks 的原理和使用方法后，我们就可以在项目中使用 Git hooks 来实现一些自动化操作。比如前面所说的，为了保证 commit message 可读性，我们给 commit message 制定的一套规范。现在我们就可以借助 Husky 在提交代码时自动检查 commit message 是否符合规范，如果不符合规范，则阻止提交。
