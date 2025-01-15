---
author: 王志杰
date: 2025-01-14
keywords: CI/CD
description: 配置 CI/CD
---

# 配置 CI/CD

CI/CD 是工程化中非常重要的一环，它能够帮助我们在代码提交后自动进行构建、测试、部署等操作，从而提高开发效率，减少人工干预，降低出错率。本文将介绍如何配置 CI/CD，包括 CI/CD 的概念、CI/CD 的作用、CI/CD 的配置方法等。

## 为什么需要 CI/CD？

在前面的章节中，我们完成了 eslint、styleLint 和单元测试脚本的配置。这些脚本可以帮助我们在开发过程中发现代码中的问题，提高代码质量。但是，这些脚本需要我们手动执行，这可能会带来一些问题。例如，我们可能会忘记执行这些脚本，或者执行脚本的顺序不正确。为了解决这个问题，我们可以使用 CI/CD 工具来自动执行这些脚本。

当然，这仅仅是 CI/CD 最基础的工作之一。

## 什么是 CI/CD？

以下是来自文心一言的关于 CI/CD 的解释：

> [!info] CI/CD 的解释
>
> CI/CD 是持续集成（Continuous Integration）和持续部署/持续交付（Continuous Deployment/Continuous Delivery）的缩写，它们是现代软件开发实践中广泛采用的方法论，旨在提高软件开发的效率、质量和速度。
>
> ### 持续集成（Continuous Integration, CI）
>
> 持续集成是一种软件开发实践，它要求开发团队在每次代码提交后，自动地构建和测试项目。这个过程通常包括以下几个步骤：
>
> 1. **自动化构建**：每次代码提交后，系统自动拉取最新的代码，并执行构建过程（如编译、打包等）。
> 2. **自动化测试**：构建完成后，自动运行单元测试、集成测试等，确保新代码没有破坏现有功能。
> 3. **反馈**：测试结果会迅速反馈给开发团队，以便及时发现问题并修复。
>
> 持续集成的目标是尽早发现并修复问题，减少集成过程中的冲突和错误，提高代码质量。
>
> ### 持续部署/持续交付（Continuous Deployment/Continuous Delivery, CD）
>
> 持续部署和持续交付是持续集成之后的步骤，它们之间的主要区别在于自动化程度和目标的不同。
>
> - **持续部署（Continuous Deployment, CD）**：在持续集成的基础上，进一步自动化地将通过所有测试的构建版本部署到生产环境。这意味着每次代码提交并成功通过测试后，都会自动更新到生产环境。这种方式要求团队有高度的自动化水平和严格的测试流程，以确保每次部署都是安全可靠的。
>
> - **持续交付（Continuous Delivery, CD）**：与持续部署类似，但持续交付并不要求自动部署到生产环境。它强调的是保持软件随时可部署到生产环境的状态，但具体部署的时机可以由团队根据业务需求、风险评估等因素来决定。持续交付通常包括一个自动化的发布流程，但部署的触发是手动的。

概括来讲，CI/CD 是一个自动化脚本执行的过程。这个过程依托于 DevOps 平台(如 Jenkins、GitHub Actions、GitLab CI/CD 等)。**DevOps 平台会监听代码仓库的变动，当有诸如 push、merge、release 等操作时，DevOps 平台会自动执行配置好的脚本，从而实现自动化构建、测试、部署等操作。**

> [!INFO] DevOps 平台
> DevOps 平台是一种集成了多种工具和服务的环境，旨在促进软件开发、测试、部署和运维团队之间的协作和沟通。它通过自动化流程来加快产品的迭代速度，提高产品质量和用户满意度。DevOps 平台的核心组件包括代码编辑和版本控制工具、自动化构建工具、持续集成和持续部署工具、容器编排工具、持续监控工具和服务配置管理工具等

## 如何使用 CI/CD？

在现目中引入 CI/CD 最主要的工作有三个：一、确认 DevOps 平台。二、 编写自动化脚本；三、配置 DevOps 平台。

DevOps 平台的选择有很多，如 Jenkins、GitHub Actions、GitLab CI/CD 等。这些平台各有优缺点，具体选择哪个平台需要根据团队的需求和实际情况来决定即可。

### 编写自动化脚本

确定好 DevOps 平台后，接下来就是编写自动化脚本。

不同的 DevOps 平台支持的脚本语言各不相同，需要遵循选用的 DevOps 平台脚本语言来编写脚本。例如，GitHub Actions 支持的脚本语言是 YAML，而 Jenkins 支持的脚本语言是 Groovy。

> [!INFO] 各个 DevOps 平台支持的脚本语言
>
> - GitHub Actions：https://docs.github.com/zh/actions
> - Jenkins：https://www.jenkins.io/doc/book/pipeline/
> - GitLab CI/CD：https://docs.gitlab.com/ee/ci/
> - Gitee CI/CD：https://gitee.com/help/categories/69

自动化脚本内容类似一个任务清单。其中阐明了任务执行的条件、内容等。主要包含以下内容：

- **触发条件**：配置脚本在什么情况下执行，如 push、merge、release 等。
- **环境配置**：配置脚本运行的环境，如系统、 Node.js 版本、依赖包等。
- **代码拉取**：从代码仓库拉取最新的代码。
- **执行指令**：执行构建、测试、部署等指令。

下面是一个简单的 GitHub Actions 脚本示例：

```yaml
# 脚本名称
name: CI

# 触发条件，当有代码 push 到 main 分支时，执行脚本
on:
  push:
    branches:
      - main

# 脚本内容
jobs:
  # 脚本运行环境为最新版的 Ubuntu
  build:
    runs-on: ubuntu-latest

    # 脚本执行步骤
    steps:
      # 步骤一：步骤名-Checkout code，操作内容-从代码仓库拉取最新代码
      - name: Checkout code
        uses: actions/checkout@v2

      # 步骤二：步骤名-Set up Node.js，操作内容-配置 Node.js 环境,版本为 14
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 14

      # 步骤三：步骤名-Install dependencies，操作内容-安装依赖包
      - name: Install dependencies
        run: npm install

      # 步骤四：步骤名-Run tests，操作内容-执行测试指令
      - name: Run tests
        run: npm run test

      # 步骤五：步骤名-Build，操作内容-执行构建指令
      - name: Build
        run: npm run build
```

### 配置 DevOps 平台

编写好自动化脚本后，需要将脚本配置到 DevOps 平台中。以 GitHub Actions 为例。我们需要在项目根目录下创建一个 `.github/workflows` 文件夹，并在该文件夹下创建一个 YAML 文件，将编写好的脚本内容复制到该文件中。然后将其推送到远程代码仓库中，GitHub Actions 就会自动监听代码仓库的变动，执行相应的脚本。

```bash
# 项目根目录
.
├── .github
│   └── workflows
│       └── ci.yml
├── package.json
└── ...
```

## 写在最后

如今，借助成熟的 DevOps 平台，我们可以轻松实现 CI/CD。但 CI/CD 并不是一蹴而就的，需要根据项目组的 SOP（Standard Operating Procedure，标准作业程序）来逐步完善。完善的 SOP 是 CI/CD 的前提。

以下是前端项目常用的 CI/CD 应用场景：

- Git Commit 的规范性校验
- 代码 push 后自动进行代码风格校验
- 代码 merge 前自动执行单元测试
- git release 后自动构建打包
- 一键部署项目代码到服务器

## 参考

- [万字长文详解 DevOps 及 DevOps 工具链！-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/2322080)
