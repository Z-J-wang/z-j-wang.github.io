---
author: 王志杰
date: 2024-12-29
keywords: 前端工程化,ESLint,代码检测,JavaScript,Prettier
description: ESLint 是一个根据方案识别并报告 ECMAScript/JavaScript 代码问题的工具，其目的是使代码风格更加一致并避免错误。
---

# 配置 ESLint

> [!TIP] 阅前悉知
>
> 本章节基于 [ESLint v8](https://zh-hans.eslint.org/docs/latest/use/getting-started) 版本进行编写。由于 v9 版本在配置上与 v8 版本有所不同，因此，如果您使用的是 v9 版本，请参考《[文档 - ESLint 中文网](https://eslint.nodejs.cn/docs/latest/)》。

在制定团队 SOP 阶段，我们已经了解了编码规范的重要性以及完成了编码规范的制定。接下来，我们需要将编码规范应用到实际开发中，确保团队成员遵循编码规范。如果通过代码审查来手动检查代码规范，那么工作量会非常大，而且容易出错。好在，我们可以借助自动化工具来帮助我们自动检查代码规范，这些自动化工具有 ESLint、Stylelint、Prettier 等。

本文将较为系统的介绍 ESLint，以及 ESLint 如何结合 Prettier 使用。关于 Stylelint 介绍和使用会在另一篇文章中详细说明，请参考[《第 13 章：配置 Stylelint》](./第13章：配置Stylelint.md)。

## ESLint 概述

> [!IMPORTANT] ESLint 的定义
>
> ESLint 是一个根据方案识别并报告 ECMAScript/JavaScript 代码问题的工具，其目的是使代码风格更加一致并避免错误。
>
> ——摘自《[ESLint 入门](https://zh-hans.eslint.org/docs/latest/use/getting-started)》

ESLint 的使用非常简单，只需三步即可：

1. 安装 ESLint
2. 配置 ESLint 规则
3. 执行 ESLint 运行指令

> [!INFO] 下面是官网中的例子
>
> 1. 在项目中安装 ESLint 包：
>
>    ```shell
>    npm install --save-dev eslint
>    ```
>
> 2. 添加任一[支持的配置文件格式](https://zh-hans.eslint.org/docs/latest/use/configure/configuration-files#配置文件格式)的 `.eslintrc` 文件。
>
>    ```shell
>    # 创建 JavaScript 配置文件
>    touch .eslintrc.js
>    ```
>
> 3. 在 `.eslintrc` 文件中添加配置。阅读[配置 ESLint 文档](https://zh-hans.eslint.org/docs/latest/use/configure/)学习如何添加规则、环境、自定义配置、插件以及其他内容。
>
>    ```js
>    // .eslintrc.js 示例
>    module.exports = {
>      env: {
>        browser: true,
>        es2021: true
>      },
>      extends: 'eslint:recommended',
>      parserOptions: {
>        ecmaVersion: 'latest',
>        sourceType: 'module'
>      }
>    }
>    ```
>
> 4. 使用 ESLint 命令行检查代码：
>
>    ```shell
>    npx eslint project-dir/ file1.js
>    ```

可以看到，在项目中引入 ESLint 是非常简单。

但……！这样就完成 ESLint 在项目中的配置工作了吗？**显然不是**。

上面的操作只是将 ESLint 引入到项目中，并没有真正用起来。前面说到 ESLint 是**用于检测 JavaScript 代码的工具，其目的是使代码风格保持统一**。

所以我们还需要**将团队的编码规范写进 ESLint 中，让其帮助我们检测开发人员编写的代码是否符合团队编码规范**。

此外，有些文件（如`dist/`、`public/`等目录中的文件）并不是开发人员编写的，或者并不想对其进行检测。所以我们也需要**让 ESLint 忽略一些文件的检测**。

还有，`npx eslint project-dir/ file1.js`运行指令太长，难以编写，而且手动编写运行代码极容易出错。因此也需要**将 ESLint 运行指令封装成更加简洁的指令**。

还有，ESLint 只能检测 JavaScript 代码，HTML、CSS 怎么吧？所以也要**实现 HTML、CSS 代码的检测**。

最后，**ESLint 只检测不太行，最好自动帮忙修正错误；只有执行指令才进行检查修正不够及时，要在保存代码的时候就执行**。

接下来，我们将一个个的实现上面这些诉求。

## 第一步，编写配置文件

ESLint 重难点就是配置文件的编写。可以说，编写好配置文件就算完成 ESLint 配置工作的 80%。

首先，我们简单了解一下配置文件的的构成。

> [!TIP]
>
> ESLint 配置文件支持多做文件格式，本文采用的是`.eslintrc.js`。详见：[配置文件 - ESLint - 插件化的 JavaScript 代码检查工具](https://zh-hans.eslint.org/docs/latest/use/configure/configuration-files#)

### 配置文件构成

常见的 ESLint 配置文件属性如下：

| 属性             | 说明                                                                                                                                                                                                                                                                                                                                                                                                           | 案例                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `root`           | **指定当前配置文件所在目录为根目录**。ESLint 在执行时会自动向上（父目录）查找配置文件，直到文件系统的根目录（`/`）、当前用户的主目录（`~/`）或指定 `root: true` 时停止。一般情况下，我们都会在项目文件根目录中放置 ESLint 配置文件，并将`root`设置为`true`。                                                                                                                                                   | `{"root":true}`                                     |
| `env`            | **指定 JavaScript 代码的所用到的全局变量。其接受一个对象，可配置多种运行环境**。JavaScript 生态中有多个运行时、版本、扩展和框架。每个所支持的全局变量都不尽相同。例如，项目代码中用到了 ES6 的写法，我们就需要通过`env`属性来向 ESLint 声明 ES6 的全局变量。所支持的环境可查看：[语言选项 - ESLint - 插件化的 JavaScript 代码检查工具](https://zh-hans.eslint.org/docs/latest/use/configure/language-options#) | `{"env":{"browser": true,"node": true}}`            |
| `ignorePatterns` | **指定 Eslint 在检测时忽略的文件或者目录。其值是个正则数组**。等同于`.eslintignore`文件。                                                                                                                                                                                                                                                                                                                      | `{ignorePatterns:["temp.js","**/vendor/*.js"]}`     |
| `parserOptions`  | **指定 ESLint 支持的 JavaScript 语言解析器。其接受一个对象，可配置多种语言解析器**。ESLint 默认支持 ES5 语法的解析，如果我们想要支持 ES6、JSX 或者 TS 等，需要在`parserOptions`中声明对应的解析器。否则 ESLint 将无法解析相关代码。注意配合`env`属性，`env`声明的是语法中的全局变量，`parserOptions`声明的是支持的语法。                                                                                       | `{"parserOptions":{"ecmaVersion":6}}`               |
| globals          | **自定义全局变量。其接受一个对象**。全局变量为属性名，可操作性为属性值。对于每个全局变量的键，将相应的值设置为 `"writable"` 以允许变量被覆盖，或者 `"readonly"` 以禁止覆盖。                                                                                                                                                                                                                                   | `{"globals":{"var1":"writable","var2":"readonly"}}` |
| `plugins`        | **指定要使用的 ESLint 插件**。属性值可以是一个插件名称，也可以是插件名称组成的数组。详见：[配置插件与解析器 - ESLint - 插件化的 JavaScript 代码检查工具](https://zh-hans.eslint.org/docs/latest/use/configure/plugins)                                                                                                                                                                                         | `{"plugins": ["react"]}`                            |
| `extends`        | **指定扩展配置文件。配置文件使用扩展后，就可以继承另一个配置文件的所有特征（包括规则、插件和语言选项）并修改所有选项**。属性值可以是一个字符串，也可以是字符串数组。字符串的值可来源于四种途径：配置文件的路径、可共享配置的名称、`eslint:recommended`、`eslint:all`                                                                                                                                           | `{ "extends": "eslint:recommended"}`                |
| `rules`          | **自定义规则。在`rules`属性中可以自定义 ESLint 规则来覆盖默认规则、扩展规则以及插件规则**。其值为对象。详见：[配置规则 - ESLint - 插件化的 JavaScript 代码检查工具](https://zh-hans.eslint.org/docs/latest/use/configure/rules#-3)                                                                                                                                                                             | `{"rules": {"quotes": ["error", "double"]}}`        |

### 插件与扩展说明

#### 扩展(extends)

`extends`属性配置的**扩展指的是 ESLint 的配置文件**。ESLint 会读取`extends`属性指定的 ESLint 配置文件，并将其合并到当前的配置文件中。例如下面的 ESLint 配置：

```js
module.exports = {
  extends: ['eslint:recommended', 'plugin:vue/recommended']
}
```

当 ESLint 读取这个配置文件的时候，会去读取`eslint:recommended`关联的**配置文件**以及`plugin:vue/recommended`关联的**配置文件**，然后**将这两个配置文件的配置合并到当前配置文件中**。

#### 插件(plugins)

插件（`plugins`）是一个可以为 ESLint 添加各种扩展功能的 npm 包。它的作用同样也是用来扩展 ESLint。但与`extends`属性不同的是，插件（`plugins`）不仅仅有配置文件，还可以包括：**插件定义规则**、**插件定义配置**、**插件定义环境**、**插件定义处理器**。

> [!TIP]
>
> 在使用插件(plugins)时，单单在`pluguns`中声明还不行，需要在相应的配置属性中显式声明。

如下示例：

```json
{
  // ...
  // 引入插件jquery、@foo/foo、@bar
  "plugins": [
    "jquery", // eslint-plugin-jquery
    "@foo/foo", // @foo/eslint-plugin-foo
    "@bar" // @bar/eslint-plugin
  ],
  // 启用插件@foo/foo中推荐的配置，@bar中推荐配置
  "extends": ["plugin:@foo/foo/recommended", "plugin:@bar/recommended"],
  // 启用插件jquery的a-rule规则，@foo/foo的some-rule规则，@bar的another-rule规则
  "rules": {
    "jquery/a-rule": "error",
    "@foo/foo/some-rule": "error",
    "@bar/another-rule": "error"
  },
  // 启用插件jquery的环境配置，@foo/foo的环境配置，@bar的环境配置
  "env": {
    "jquery/jquery": true,
    "@foo/foo/env-foo": true,
    "@bar/env-bar": true
  }
  // ...
}
```

不太准确的说，**`plugins`只是引入插件，启用插件的功能还需要在对应的配置属性的声明开启**。

### 定制自己的 ESLint 配置

了解 Eslint 配置原理后，我们就可以**根据编码规范定制自己的 ESLint 配置**。

> [!IMPORTANT]
>
> 一般情况下，在确认 ESLint 配置清单时，优先采用在业内较为成熟通用的 ESLint 配置，然后在其基础上根据团队编码规范进行调整。

例如，这样一个 ESLint 配置：

> [!INFO] 配置清单
>
> - 基于 ESLint 内置的推荐规则`eslint:recommended`
> - 使用`eslint-plugin-vue`插件
> - 使用 node 环境变量
> - 只读的全局变量`$`
> - 一些自定义规则

配置文件如下：

```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  // 全局变量。详见https://zh-hans.eslint.org/docs/latest/use/configure/language-options#-6
  globals: {
    $: 'readonly'
  },
  // eslint 规则扩展
  extends: [
    'eslint:recommended', // 启用ESLint内置的推荐规则
    'plugin:vue/essential' // 启用eslint-plugin-vue插件中的essential规则
  ],
  // 配置插件，由插件名称组成的列表。可以省略插件名称中的 eslint-plugin- 前缀。
  plugins: [
    'vue' // 等价于eslint-plugin-vue，用于检测.vue文件种的`<template>`和<script>`以及.js文件种的Vue代码
  ],
  // 自定义规则，详见：https://zh-hans.eslint.org/docs/latest/use/configure/rules
  rules: {
    'vue/name-property-casing': ['error', 'PascalCase'],
    'no-console': 'off',
    'no-debugger': 'off',
    'no-spaced-func': 'error',
    'no-const-assign': 'error',
    'no-alert': 'off',
    'no-useless-escape': 'off',
    'no-control-regex': 'off',
    'space-before-function-paren': ['off', 'always']
  }
}
```

## 第二步，设置文件忽略规则

像`node_moudle`、`dist`等目录下的文件并不需要进行代码校验。因此我们需要设置 ESLint 文件忽略规则，让 ESLint 不要去校验这些文件。

ESLint 有两种方式设置 ESLint 文件忽略规则：

1. 在配置文件中添加 `ignorePatterns`。适用于忽略文件数量较少的情况。

2. 创建忽略匹配模式的专用文件（默认为 `.eslintignore`）。适用于忽略文件数量较多的情况。

下面以`.eslintignore`文件为例：

```bash
node_modules
dist

# 忽略手动引入的第三方组件
src/assets/ueditor

# 忽略静态文件
public
```

> [!INFO]
>
> 更多说明可查看：[忽略文件 - ESLint - 插件化的 JavaScript 代码检查工具](https://zh-hans.eslint.org/docs/latest/use/configure/ignore)

## 第三步，封装运行指令

完成所有配置后，就可以在终端执行 ESLint 命令来运行 ESLint 了。

ESLint 命令基本构成如下：

```bash
eslint [options] [file|dir|glob]*
```

即：`eslint`关键字+`options`可选项（可多选）+`file|dir|glob`检测的目标（可多选）

### 关于 options

ESLint 支持的`options`非常多，功能齐全。我们甚至可以通过`options`来实现配置文件的所有配置。不过我们并不需要编写很繁琐的运行指令，这是因为配置文件已经完成绝大多数的配置工作。

大多数情况下，我们只需要在运行指令中声明所要使用的**配置文件**、**文件忽略规则文件**以及**检测文件的匹配规则**即可。

以下是一些常用的`options`：

```bash
--ext [String]                  指定支持的文件后缀，如：【.js,.ts,.vue,.html】
-c, --config path::String       指定配置文件，默认.eslintrc.*
--ignore-path path::String      指定忽略文件。默认.eslintignore
--cache                         开启缓存功能，值检测变动的文件
--fix  							开启自动修复功能
```

> [!INFO]
>
> 更多 options 说明可查看：[ESLint - 命令行界面](https://zh-hans.eslint.org/docs/latest/user-guide/command-line-interface#options)

### 编写运行指令

接下来基于前面的配置编写 ESLint 运行指令。

> [!INFO]
>
> **要求如下**：
>
> - 使用项目根目录下配置文件`.eslintrc.js`
> - 使用项目根目录下的文件忽略规则文件`.eslintignore`
> - 对后缀为【`.js`，`.ts`，`.vue`，`.html`】的文件进行检测
> - 启用缓存功能
> - 检测项目根目录下符合条件的全部文件

对应的指令如下：

```bash
eslint --config .eslintrc.js --ext .js,.vue,.html,.ts --ignore-path .eslintignore --cache ./
```

上面这条指令有点长，如果每次运行都需要手写这条指令就会很繁琐且容易出错。因此，还需要把这条指令封装进`package.json`的`scripts`中。

```js
{
  "scripts": {
    "lint": "eslint --config .eslintrc.js --ext .js,.vue,.html,.ts --ignore-path .eslintignore --cache ./"
  },
}
```

这样，只需要在终端执行`npm run lint`或`yarn lint`即可。

### 开启修复功能

如果想要 ESLint 在检测代码的时候自动修正不合规的代码。只需要在运行指令中添加 `option` `--fix`。

上面的指令则变为：

```bash
eslint --config .eslintrc.js --ext .js,.vue,.html,.ts --ignore-path .eslintignore --cache --fix ./
```

在 package.json 中可以基于`srcipt:lint`脚本指令这样编写：

```js
{
  "scripts": {
    "lint": "eslint --config .eslintrc.js --ext .js,.vue,.html,.ts --ignore-path .eslintignore --cache ./",
    "lint:fix": "yarn lint --fix"
  },
}
```

如果你的项目没有使用 yarn，则：`npm run lint --fix`

## 配合 Prettier 来使用

> [!TIP]
>
> 关于两者的更加详细的说明建议查看：[ESLint 之与 Prettier 配合使用 - 掘金 (juejin.cn)](https://juejin.cn/post/6924568874700505102)
>
> 这里只做简单的说明。

Prettier 是一个比 ESLint 更加擅长代码格式（如：单行代码长度，tab，引号等）校验的工具。不过相较于 ESLint，Prettier 少了代码质量（未使用变量，三等号，箭头函数的使用）校验的功能。

当然，我们可以将两者结合使用，让 Prettier 来完成代码格式校验，ESLint 来完成代码质量校验。

由于，两者的规则存在一定的冲突。所以两者结合使用首先要解决的是规则冲突问题。

可以安装`eslint-config-prettier`扩展来解决这个问题。

> [!INFO] eslint-config-prettier 说明
>
> `eslint-config-prettier`扩展禁用了所有与格式相关的 ESLint 规则。
>
> 详见：[GitHub - prettier/eslint-config-prettier: Turns off all rules that are unnecessary or might conflict with Prettier.](https://github.com/prettier/eslint-config-prettier)

1. 安装`eslint-config-prettier`扩展

```bash
yarn add --dev eslint-config-prettier
```

2. `.eslintrc.js`文件中添加如下配置：

```json
{
  "extends": [
    "prettier" // eslint-config-prettier 可简写成 prettier
  ]
}
```

冲突解决了还不行。ESLint 无法识别 Prettier 的差异报告，所以我们还需安装[`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier)插件，将 Prettier 作为 ESLint 规则运行，并将差异当做 ESLint 问题报告给 ESLint。

1. 安装`eslint-plugin-prettier`：

```bash
yarn add --dev eslint-plugin-prettier
```

2. 添加配置：

```json
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

上面两者的配置合起来就是：

```json
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

此外，我们可以简写成：

```json
{
  "extends": ["plugin:prettier/recommended"]
}
```

### 制定 Prettier 规则

完成上面的配置后，我们就可以放心使用 Prettier 了。

Prettier 和 ESLint 一样有配置文件：

- 配置文件：`.prettierrc.js`
- 文件忽略规则文件：`.prettierignore`

在使用时我们并不需要手动去执行 Prettier 指令，ESLint 会自动读取 Prettier 的配置文件来运行 Prettier。

`.prettierrc.js`举例：

```js
module.exports = {
  printWidth: 120, // 一行的字符数，如果超过会进行换行，默认为80。注意，该值必须设置为120，否则与eslint规则冲突
  tabWidth: 2, // 一个tab代表几个空格数，默认为2
  useTabs: false, // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  singleQuote: true, // 字符串是否使用单引号，默认为false，使用双引号
  semi: true, // 行尾是否使用分号，默认为true
  arrowParens: 'avoid', // 箭头函数只有一个参数时，是否忽略括号，默认为'always'
  trailingComma: 'none', // 在对象和数组字面量中使用一致的拖尾逗号,默认'es5'
  endOfLine: 'lf' // default: auto
}
```

## 开启【保存代码时自动执行 ESLint】功能

如果觉得每次只能在终端执行指令才能使用 ESLint 代码检测修正还不够方便。那我们可以开启【保存代码时自动执行 ESLint】功能。

> [!TIP]
>
> 【保存代码时自动执行 ESLint】功能需要配合代码编辑器的来实现。目前主流的代码编辑器（如：VSCode）都支持该功能。

### VSCode 配置

首先，安装 VSCode 的 ESLint 扩展插件。

然后在`.vscode/settings.json`配置文件中添加如下配置：

```js
{
  "editor.formatOnSave": true, // 开启编辑器保存自动格式化代码功能
  "eslint.format.enable": true, // 开启eslint扩展插件代码格式化功能
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.VSCode-eslint" // 指定默认编辑器代码格式化工具为dbaeumer.VSCode-eslint
  },
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.VSCode-eslint"
  },
  "[vue]": {
    "editor.defaultFormatter": "dbaeumer.VSCode-eslint"
  }
}
```

> [!INFO] 配置说明
>
> `editor.formatOnSave`和`eslint.format.enable`是最主要的两个配置项，一个是开启 VSCode 的**保存代码时自动格式化代码功能**；一个是开启 ESLint 扩展插件的代码检测和格式化功能。两者配合使用即可实现**在保存代码时自动根据 ESLint 配置进行代码修正**。

可能你会遇到**代码保存时自动修正后的代码，会导致 ESLint 报错**。这是因为 VSCode 设置的【默认代码格式化工具】并不是 ESLint（可能是 prettier），从而导致了修正结果和 ESLint 规范不一致。

因此我们要将【默认代码格式化工具】改为 ESLint。即：

```json
{
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.VSCode-eslint" // 指定默认编辑器代码格式化工具为dbaeumer.VSCode-eslint
  },
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.VSCode-eslint"
  },
  "[vue]": {
    "editor.defaultFormatter": "dbaeumer.VSCode-eslint"
  }
}
```

### 自动格式化工作流程说明

> [!INFO] VSCode 自动格式化工作流程说明
>
> **第一步**，当 VSCode 通过 ESLint 进行代码修正时，会自动去项目中寻找配置文件（如：`.eslintrc.js`）和`.eslintignore`文件。如果没有找到文件，则会采用 ESLint 默认配置。
>
> **第二步**，根据配置文件中的配置来进行代码修正。

因此，必须保证 ESLint 配置文件在项目目录中，最好是在根目录下。否则【保存时自动格式】的代码也会和通过指令执行 ESLint 的结果不一致。

## 写在最后

本章节简单阐述了 ESLint 的作用以及如何配置使用 ESLint。ESLint 不但可以规范代码风格，提高代码质量，而且还可以通过 ESLint 的插件机制，实现代码的自动修正，从而提高开发效率。借助 ESLint，可以把编码规范中的大多数细节交给工具去识别，从而**使得代码审查人员可以把精力集中到业务逻辑、代码质量等自动化工具无法兼顾的编码规范上**。

> [!TIP]
> 如果现目基于 Vue 且初始化前已经明确了要使用 ESLint，则可在初始化时选择启用 ESLint。这样在项目初始化时，会自动生成基础 ESLint 相关的配置文件。后面只需根据项目需求，对 ESLint 配置文件进行修改即可。

## 参考

- [ESLint 入门](https://zh-hans.eslint.org/docs/latest/use/getting-started)
- [ESLint 之与 Prettier 配合使用 - 掘金 (juejin.cn)](https://juejin.cn/post/6924568874700505102)
