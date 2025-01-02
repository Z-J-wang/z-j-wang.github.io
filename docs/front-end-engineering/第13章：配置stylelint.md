---
author: 王志杰
date: 2024-10-03
keywords: 前端工程化,stylelint,代码检测,css
description: Stylelint 是一个强大、先进的 CSS 代码检查器（linter），可以帮助你规避 CSS 代码中的错误并保持一致的编码风格。
---

# 配置 Stylelint

> [!TIP]
>
> **阅读建议**
>
> 建议结合《第 12 章：配置 ESLint》来阅读本文。stylelint 使用方法和 ESlint 非常相似，大部分知识要点在《第 12 章：配置 ESLint》中已做了详细说明。

ESlint 无法对 CSS 代码进行校验。Prettier 倒是可以检验 CSS 代码，不过其只能做一些简单的代码格式校验修正工作。如果想要像类似 ESlint 校验 JavaScript 代码一样的校验 CSS 代码，可以使用 Stylelint。

> [!INFO]
>
> **Stylelint 简介**
>
> Stylelint 是一个强大、先进的 CSS 代码检查器（linter），可以帮助你规避 CSS 代码中的错误并保持一致的编码风格。
>
> Stylelint 的强大源于：
>
> - 拥有超过 **170 条内置规则** 赖检查最新的 CSS 语法和功能
> - 支持 **插件** 以创建你自己的规则
> - 自动 **修复** 大多数代码格式上的问题
> - 经过 15000 多次的 **充分的单元测试**
> - 支持扩展或创建 **可共享的配置**
> - **非强制约束（unopinionated）**，可根据你自己的需求进行自定义
> - 像 Prettier 一样可以 **美化打印** 效果
> - 拥有一个 **不断增长的社区**，并且被 Google、GitHub 和 WordPress 所使用
>
> 还可以被扩展为：
>
> - 解析 **类似 CSS 的语法**，例如 SCSS、Sass、Less 以及 SugarSS
> - 能够从 HTML、Markdown 和 CSS-in-JS 对象以及模板文本中提取 **内嵌的样式代码**
>
> ——摘抄自《[Home | Stylelint 中文文档 | Stylelint 中文网](https://www.stylelint.cn//)》

## Stylelint 的用法说明

Stylelint 的用法和 ESlint 非常相似，下面用一个简单的例子来认识一下:

1.  安装 Stylelint 以及标准配置插件

```shell
yarn add stylelint stylelint-config-standard --dev
```

2.  创建配置`.stylelintrc.js`文件

```js
module.exports = {
  extends: ['stylelint-config-standard']
}
```

3.  运行指令，让 Stylelint 处理项目中的所有 CSS 文件

```shell
 npx stylelint "**/*.css"
```

## 第一步，编写配置文件

### 配置文件类型

Stylelint 支持多种配置形式：

- 在`package.json`中添加`stylelint`属性来编写
- `.stylelintrc`文件
- `.stylelintrc.js`/`stylelint.config.js`
- `.stylelintrc.json`
- `.stylelintrc.yaml`/`.stylelintrc.yml`

### 常用的配置项

Stylelint 常用的配置属性有`rules`、`extends`、`plugins`

| 属性    | 说明                                                                                                                                                             |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rules   | Stylelint 校验规则声明。默认情况下，Stylelint 不会开启任何规则，需要我们显式声明。                                                                               |
| extends | 通过`extends`属性，可以将一个或者多个已经存在的配置文件扩展（合并）到当前配置文件中。                                                                            |
| plugins | 通过`plugins`属性，可以将一个或者多个插件引入到 Stylelint 中。插件是由社区构建的规则或规则集，可能包含方法、工具集、非标准 CSS 特性(如 csss、less)或具体的用例。 |

> [!INFO]
>
> 更多属性请查阅：[Configuration | Stylelint 中文文档 | Stylelint 中文网](https://www.stylelint.cn//user-guide/configure#customsyntax)

> [!INFO]
>
> `rules`详细说明请查阅：[Rules | Stylelint 中文文档 | Stylelint 中文网](https://www.stylelint.cn//user-guide/rules)

## 第二步：设置忽略规则

与 ESlint 一样，我们可以设置 Stylelint 文件忽略规则来忽略那些我们不想进行校验的文件或者目录。

有两种方式设置文件忽略规则：

1. 在配置文件中添加 `ignoreFiles`。适用于忽略文件数量较少的情况。

```js
module.exports = {
  // 忽略所有的JS文件
  ignoreFiles: ['**/*.js']
}
```

2. 创建忽略匹配模式的专用文件（默认为 `.stylelintignore`）。适用于忽略文件数量较多的情况。

```bash
# 忽略所有的JS文件
**/*.js
```

## 第三步：封装运行指令

stylelint 命令基本构成如下：

```bash
stylelint [options] [file|dir|glob]*
```

即：`eslint`关键字+`options`可选项（可多选）+`file|dir|glob`检测的目标（可多选）

### 常用的 Options

```bash
-c, --config path::String       指定配置文件
--ignore-path path::String      指定忽略文件
--cache                         开启缓存功能，值检测变动的文件
--fix  							开启自动修复功能
```

> [!INFO]
>
> 更多 Options 说明，请查阅：[Command Line Interface (CLI) | Stylelint 中文文档 | Stylelint 中文网](https://www.stylelint.cn//user-guide/cli#options)

## 实践

了解了 Stylelint 的用法后，接下来通过一个工程化需求来回顾一下：

> [!INFO] 具体需求
>
> 在项目中引入 Stylelint，实现对 CSS 的代码校验，并开启【保存代码时自动执行 ESLint】功能。
>
> 校验规则如下：
>
> - 扩展`stylelint-config-standard`
> - 色彩编码要求小写，长度 6 位
> - 禁止空的代码块
> - 禁止使用未知的伪类选择器，但可以使用`::v-deep`
> - 禁止小于 1 的小数有一个前导零
> - 引入`stylelint-order`插件，实现属性排序
> - 不对`dist`、`node_modules`进行验证

### 分析

分析需求后，可以得出以下结论：

- 安转 npm 包`stylelint-config-standard`以及`stylelint-order`；
- 编写`.stylelintrc.js`文件，引入`stylelint-config-standard`和`stylelint-order`；
- 新增`stylelintignore`文件，忽略部分文件；
- 编写项目的`.vscode/settings.json`配置文件，实现【保存代码时自动修正代码】；
- 封装指令，调用配置文件检验代码并修正。

### 实操

### 第一步：安装 stylelint 以及所需的插件

```shell
yarn add stylelint@^13.3.3 stylelint-config-standard@^20.0.0 stylelint-order@^6.0.3 --dev
```

### 第二步：编写.stylelintrc.js

在项目根目录下新增`.stylelintrc.js`，进行如下配置：

```js
/**
 * stylelint 依赖如下：
 * "stylelint": "^13.3.3"
 * "stylelint-config-standard": "^20.0.0"
 * "stylelint-order": "^6.0.3"
 *
 * vue2 中 stylelint 需要v13及以下版本
 * stylelint-config-standard v20.0.0为stylelint v13.3.3 配套版本
 * stylelint-order 用于样式属性排序
 */

module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'color-hex-case': 'lower', // 颜色指定小写
    'block-no-empty': true, // 禁止空块
    'color-hex-length': 'long', // 颜色6位长度
    // 忽略伪类选择器 ::v-deep
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'number-leading-zero': 'always', // 禁止小于 1 的小数有一个前导零
    // 属性的排序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'font-weight',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition'
    ]
  }
}
```

### 第三步：编写.stylelintignore

在项目根目录下新增`.stylelintignore`，进行如下配置：

```bash
# stylelint将不对本文件列举的文件或者目录进行校验
dist
node_modules

# css-sprite生成文件
src/assets/css-sprite
```

### 第四步：封装运行指令

引用`.stylelintrc.js`、`.stylelintignore`配置文件，对 html、vue、js、css、less、sass、scss 文件中的 CSS 代码进行校验，并开启自动修正功能。

```json
  "scripts": {
    "lint:stylelint": "stylelint --config .stylelintrc.js --ignore-path .stylelintignore ./**/*.{html,vue,js,css,less,sass,scss}",
    "lint:stylelint:fix": "yarn lint:stylelint --fix"
  },
```

### 最后：编写 vscode 配置文件

在项目根目录创建`.vscode/settings.json`配置文件，添加如下配置，实现**保存代码时，自动执行 stylelint**：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  },
  "stylelint.enable": true,
  "stylelint.validate": [
    "css",
    "html",
    "javascript",
    "less",
    "postcss",
    "sass",
    "scss",
    "typescript",
    "typescriptreact",
    "vue",
    "vue-html",
    "vue-postcss",
    "xml"
  ]
}
```

> [!INFO]
>
> 案例代码可查看：

## 写在最后

stylelint 是一个强大的 CSS 代码检查工具，通过配置规则，可以规范团队的代码风格，提高代码质量。本章节介绍了如何配置 stylelint，包括安装、配置规则、编写 .stylelintignore、封装运行指令以及编写 vscode 配置文件。

至此，我们通过 ESLint 和 Stylelint，完成了对 JavaScript 、HTML 和 CSS 代码的自动化检查和规范，确保了代码的质量和一致性。编码风格的自动化检测是前端工程化非常重要的一环，可以帮助团队提高代码质量，减少代码冲突，提高开发效率。同时减轻的代码审查的压力。非常推荐大家在实际项目中使用。

## 参考

- [stylelint 官方文档](https://www.stylelint.cn/)
