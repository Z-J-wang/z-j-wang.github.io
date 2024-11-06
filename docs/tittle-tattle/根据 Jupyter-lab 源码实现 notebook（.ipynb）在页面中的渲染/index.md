---
author: 王志杰
date: 2024-10-12
keywords: JupyterLab, notebook, 渲染, render-juypter-notebook-vue
description: 根据 Jupyter-lab 源码实现 notebook（.ipynb）在页面中的渲染
---

# 根据 Jupyter-lab 源码实现 notebook（.ipynb）在页面中的渲染

## 前言

最近因为工作项目的需要，要在项目中**尽可能的还原 notebook 渲染效果**。由于网上没找到相关的指导文章，所以只能生啃 JupyterLab 源码，独自摸索实现。经过一段时间“跌跌撞撞”的摸索尝试，总算勉强实现了。

因此编写此文章做一下分享，给需要的朋友提供一下思路。同时也算一个记录，以便以后需要可以快速重拾。

> 具体实现代码可查看：[render-juypter-notebook-vue/src/utils/notebook at master · Z-J-wang/render-juypter-notebook-vue (github.com)](https://github.com/Z-J-wang/render-juypter-notebook-vue/tree/master/src/utils/notebook)
>
> 实际效果查看：[render-juypter-notebook-vue](https://z-j-wang.github.io/render-juypter-notebook-vue/)

## 实现思路

我大体的实现思路如下——摘取 JupyterLab 中 notebook 渲染的相关代码，进行二次开发实现 notebook 的渲染。

此外本文所有源码调试和运行效果都是基于 JupyterLab 所提供的[examples/notebook 案例](https://github.com/jupyterlab/jupyterlab/tree/master/examples/notebook)。在控制台切换到案例目录下，执行`python main.py`即可运行该案例。

以下是案例的 notebook 文件(test.ipynb)内容：

```json
{
  "cells": [
    {
      "cell_type": "code",
      "execution_count": 1,
      "metadata": {
        "tags": []
      },
      "outputs": [
        {
          "name": "stdout",
          "output_type": "stream",
          "text": ["hello world\n", "0\n", "1\n", "2\n"]
        },
        {
          "name": "stderr",
          "output_type": "stream",
          "text": ["output to stderr\n"]
        },
        {
          "name": "stdout",
          "output_type": "stream",
          "text": ["some more stdout text\n"]
        }
      ],
      "source": [
        "import sys\n",
        "sys.stdout.write('hello world\\n')\n",
        "sys.stdout.flush()\n",
        "for i in range(3):\n",
        "    sys.stdout.write('%s\\n' % i)\n",
        "    sys.stdout.flush()\n",
        "sys.stderr.write('output to stderr\\n')\n",
        "sys.stderr.flush()\n",
        "sys.stdout.write('some more stdout text\\n')\n",
        "sys.stdout.flush()"
      ]
    },
    {
      "cell_type": "markdown",
      "metadata": {
        "tags": []
      },
      "source": [
        "# Markdown Cell\n",
        "\n",
        "$ e^{ \\pm i\\theta } = \\cos \\theta \\pm i\\sin \\theta + \\beta $\n",
        "\n",
        "*It* **really** is!"
      ]
    },
    {
      "cell_type": "code",
      "execution_count": 2,
      "metadata": {
        "tags": []
      },
      "outputs": [
        {
          "ename": "SyntaxError",
          "evalue": "invalid syntax (<ipython-input-2-6c5185427360>, line 1)",
          "output_type": "error",
          "traceback": [
            "\u001b[0;36m  File \u001b[0;32m\"<ipython-input-2-6c5185427360>\"\u001b[0;36m, line \u001b[0;32m1\u001b[0m\n\u001b[0;31m    this is a syntax error\u001b[0m\n\u001b[0m                   ^\u001b[0m\n\u001b[0;31mSyntaxError\u001b[0m\u001b[0;31m:\u001b[0m invalid syntax\n"
          ]
        }
      ],
      "source": ["this is a syntax error"]
    },
    {
      "cell_type": "code",
      "execution_count": null,
      "metadata": {
        "tags": []
      },
      "outputs": [],
      "source": ["print('test')"]
    },
    {
      "cell_type": "code",
      "execution_count": 4,
      "metadata": {
        "tags": []
      },
      "outputs": [
        {
          "data": {
            "text/latex": [
              "The mass-energy equivalence is described by the famous equation\n",
              " \n",
              "$$E=mc^2$$\n",
              " \n",
              "discovered in 1905 by Albert Einstein. \n",
              "In natural units ($c$ = 1), the formula expresses the identity\n",
              " \n",
              "\\begin{equation}\n",
              "E=m\n",
              "\\end{equation}"
            ],
            "text/plain": ["<IPython.core.display.Latex object>"]
          },
          "execution_count": 4,
          "metadata": {},
          "output_type": "execute_result"
        }
      ],
      "source": [
        "from IPython.display import Latex\n",
        "Latex('''The mass-energy equivalence is described by the famous equation\n",
        " \n",
        "$$E=mc^2$$\n",
        " \n",
        "discovered in 1905 by Albert Einstein. \n",
        "In natural units ($c$ = 1), the formula expresses the identity\n",
        " \n",
        "\\\\begin{equation}\n",
        "E=m\n",
        "\\\\end{equation}''')"
      ]
    },
    {
      "cell_type": "code",
      "execution_count": null,
      "metadata": {
        "collapsed": true,
        "jupyter": {
          "outputs_hidden": true
        }
      },
      "outputs": [],
      "source": []
    }
  ],
  "metadata": {
    "anaconda-cloud": {},
    "kernelspec": {
      "display_name": "Python 3 (ipykernel)",
      "language": "python",
      "name": "python3"
    },
    "language_info": {
      "codemirror_mode": {
        "name": "ipython",
        "version": 3
      },
      "file_extension": ".py",
      "mimetype": "text/x-python",
      "name": "python",
      "nbconvert_exporter": "python",
      "pygments_lexer": "ipython3",
      "version": "3.11.0"
    }
  },
  "nbformat": 4,
  "nbformat_minor": 4
}
```

## 关于 JupyterLab 对 notebook 的说明

JupyterLab 是一个 notebook Web 编辑器。其基本工作流程是：

1. 用户编辑内容;
2. JupyterLab 将内容转义成.ipynb 文件格式（即，notebook 文件）；
3. 将.ipynb 文件转义成 JSON 字符串；
4. 对 JSON 字符串进行渲染；

**概括来说，第一第二步属于 JupyterLab 的编辑功能；第三步第四步属于 JupyterLab 呈现功能。**这里我们是为了实现 notebook 在项目中的呈现，所以只需研究渲染这两步即可，其中重要的内容都在第四步——**对 JSON 字符串进行渲染**。

JupyterLab 会将 notebook 内容分为一个个 Cell 进行存储。Cell 中主要由 source（即用户输入数据）和 outputs（source 运行结果）两部分构成；outputs 是个数组，里面存放的是多个 output。此外，**source 和 output 分成不同类别，不同类别对应不同的渲染函数**。

具体如下:

![notebook_cell](./%E6%A0%B9%E6%8D%AE%20Jupyter-lab%20%E6%BA%90%E7%A0%81%E5%AE%9E%E7%8E%B0%20notebook%EF%BC%88.ipynb%EF%BC%89%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%AD%E7%9A%84%E6%B8%B2%E6%9F%93.assets/notebook_cell.png)

因此，要我们需要找到 JupyterLab 渲染 source 和 output 的代码。

在 JupyterLab 中找到这部分的相关源码并不容易，这里就不讲怎么去查找，直接说结论。

## 预处理源码分析

首先，JupyterLab 渲染 cell 时会先将 cell 的数据做进一步的封装处理。

处理的代码如下：

```tsx
fromJSON(value: nbformat.INotebookContent): void {
    this.sharedModel.transact(() => {
        const useId = value.nbformat === 4 && value.nbformat_minor >= 5;
        const ycells = value.cells.map(cell => {
            if (!useId) {
                delete cell.id;
            }
            return sharedModels.createCell(cell);
        });
        this.sharedModel.insertCells(this.sharedModel.cells.length, ycells);
        this.sharedModel.deleteCellRange(0, this.sharedModel.cells.length);
    });
	……
}
```

> 源码地址：[jupyterlab/model.ts at @jupyterlab/notebook@4.0.0-alpha.15 · jupyterlab/jupyterlab (github.com)](https://github.com/jupyterlab/jupyterlab/blob/@jupyterlab/notebook@4.0.0-alpha.15/packages/notebook/src/model.ts#L255)

可以看到，通过调用`sharedModels`的`createCell`方法封装 cell。

createCell 源码：

```tsx
/**
 * Create a new cell that can be inserted in an existing shared model.
 */
export const createCell = (
  cell: (
    | Partial<nbformat.IRawCell>
    | Partial<nbformat.ICodeCell>
    | Partial<nbformat.IMarkdownCell>
    | Partial<nbformat.IBaseCell>
  ) & { cell_type: 'markdown' | 'code' | 'raw' | string },
  factory = BoundCellFactory
): YCodeCell | YMarkdownCell | YRawCell => {
  switch (cell.cell_type) {
    case 'markdown': {
      const mCell = cell as Partial<nbformat.IMarkdownCell>
      const ycell = factory.createMarkdownCell(mCell.id)
      if (mCell.source != null) {
        ycell.setSource(typeof mCell.source === 'string' ? mCell.source : mCell.source.join('\n'))
      }
      if (mCell.metadata != null) {
        ycell.setMetadata(mCell.metadata)
      }
      if (mCell.attachments != null) {
        ycell.setAttachments(mCell.attachments)
      }
      return ycell
    }
    case 'code': {
      const cCell = cell as Partial<nbformat.ICodeCell>
      const ycell = factory.createCodeCell(cCell.id)
      if (cCell.source != null) {
        ycell.setSource(typeof cCell.source === 'string' ? cCell.source : cCell.source.join('\n'))
      }
      if (cCell.metadata != null) {
        ycell.setMetadata(cCell.metadata)
      }
      if (cCell.execution_count != null) {
        ycell.execution_count = cCell.execution_count
      }
      if (cCell.outputs) {
        ycell.setOutputs(cCell.outputs)
      }
      return ycell
    }
    default: {
      // raw
      const rCell = cell as Partial<nbformat.IRawCell>
      const ycell = factory.createRawCell(rCell.id)
      if (rCell.source != null) {
        ycell.setSource(typeof rCell.source === 'string' ? rCell.source : rCell.source.join('\n'))
      }
      if (rCell.metadata != null) {
        ycell.setMetadata(rCell.metadata)
      }
      if (rCell.attachments) {
        ycell.setAttachments(rCell.attachments)
      }
      return ycell
    }
  }
}
```

> 源码链接：[jupyterlab/ymodels.ts at 1215b4515972ad41806a6262e3aa67911a7a0ec7 · jupyterlab/jupyterlab (github.com)](https://github.com/jupyterlab/jupyterlab/blob/1215b4515972ad41806a6262e3aa67911a7a0ec7/packages/shared-models/src/ymodels.ts#L639)

对于`'markdown' | 'code' | 'raw'`这三种类型的 Cell，定义了不同的处理方法。尽管处理的代码不同，但是它们之间的主要逻辑都是一致。因为它们最终都会`return`一个`ycell`对象。其中，markdown 类型的 Cell 调用`factory.createMarkdownCell`生成`ycell`对象；code 类型的 Cell 调用`factory.createCodeCell`生成`ycell`对象；raw 类型的 Cell 调用`factory.createRawCell`生成`ycell`对象。

需要注意的是，**`ycell`对象并不包含渲染结果，它只是方便后面渲染时的处理**。这一点可以**通过方法的传参看出**。例如`const ycell = factory.createCodeCell(cCell.id);`。其参数只是 ID，真正的内容字段`source`和`outputs`属性并没有被使用。

不过，这里也对`source`属性做了处理：

```tsx
if (cCell.source != null) {
  ycell.setSource(typeof cCell.source === 'string' ? cCell.source : cCell.source.join('\n'))
}
```

即，将 source 属性值转为字符串，赋值给`ycell`对象。

> 注意：
>
> 这里对 source 属性的处理我们要记住。因为在我们自己的项目中实现时**只会引用渲染相关的代码**。所以我们要自己复现渲染前的操作，包括这里封装操作部分处理。

现在我们再回去观察`outputs`属性的处理，发现只有 code Cell 部分对`outputs`进行处理了。这是因为在 JupyterLab 中，只有 code 被执行后有输出结果。

> 注意：
>
> 这一点也要记住，在后面复现渲染前操作时会用到。

`outputs`处理代码如下：

```tsx
if (cCell.outputs) {
  ycell.setOutputs(cCell.outputs)
}
```

这只是简单的将`outputs`属性添加到`ycell`对象中。显然，对`outputs`的进一步处理并不在这里。又或者，根本不需要对`outputs`进行额外的处理？

下面是 test.ipynb 中的产出的`ycell`对象列表，可对照处理后发生了什么变化：

```json
[
  {
    "id": "5c5df7c4-b6bc-4a3c-b447-b23233f63d56",
    "cell_type": "code",
    "source": "import sys\nsys.stdout.write('hello world\\n')\nsys.stdout.flush()\nfor i in range(3):\n    sys.stdout.write('%s\\n' % i)\n    sys.stdout.flush()\nsys.stderr.write('output to stderr\\n')\nsys.stderr.flush()\nsys.stdout.write('some more stdout text\\n')\nsys.stdout.flush()",
    "metadata": {
      "tags": [],
      "trusted": false
    },
    "outputs": [
      {
        "name": "stdout",
        "output_type": "stream",
        "text": "hello world\n0\n1\n2\n"
      },
      {
        "name": "stderr",
        "output_type": "stream",
        "text": "output to stderr\n"
      },
      {
        "name": "stdout",
        "output_type": "stream",
        "text": "some more stdout text\n"
      }
    ],
    "execution_count": 1
  },
  {
    "id": "a04b1f23-3d3e-437b-aad3-37cbed4122a8",
    "cell_type": "markdown",
    "source": "# Markdown Cell\n\n$ e^{ \\pm i\\theta } = \\cos \\theta \\pm i\\sin \\theta + \\beta $\n\n*It* **really** is!",
    "metadata": {
      "tags": []
    }
  },
  {
    "id": "ad03beff-4ee1-4f82-ad1c-dca3a61705fb",
    "cell_type": "code",
    "source": "this is a syntax error",
    "metadata": {
      "tags": [],
      "trusted": false
    },
    "outputs": [
      {
        "ename": "SyntaxError",
        "evalue": "invalid syntax (<ipython-input-2-6c5185427360>, line 1)",
        "output_type": "error",
        "traceback": [
          "\u001b[0;36m  File \u001b[0;32m\"<ipython-input-2-6c5185427360>\"\u001b[0;36m, line \u001b[0;32m1\u001b[0m\n\u001b[0;31m    this is a syntax error\u001b[0m\n\u001b[0m                   ^\u001b[0m\n\u001b[0;31mSyntaxError\u001b[0m\u001b[0;31m:\u001b[0m invalid syntax\n"
        ]
      }
    ],
    "execution_count": 2
  },
  {
    "id": "6f299251-98ab-475c-b608-bcd378c2c48f",
    "cell_type": "code",
    "source": "print('test')",
    "metadata": {
      "tags": [],
      "trusted": false
    },
    "outputs": [],
    "execution_count": null
  },
  {
    "id": "e658bf6d-ade7-456a-9674-2de2668ac000",
    "cell_type": "code",
    "source": "from IPython.display import Latex\nLatex('''The mass-energy equivalence is described by the famous equation\n \n$$E=mc^2$$\n \ndiscovered in 1905 by Albert Einstein. \nIn natural units ($c$ = 1), the formula expresses the identity\n \n\\\\begin{equation}\nE=m\n\\\\end{equation}''')",
    "metadata": {
      "tags": [],
      "trusted": false
    },
    "outputs": [
      {
        "data": {
          "text/latex": "The mass-energy equivalence is described by the famous equation\n \n$$E=mc^2$$\n \ndiscovered in 1905 by Albert Einstein. \nIn natural units ($c$ = 1), the formula expresses the identity\n \n\\begin{equation}\nE=m\n\\end{equation}",
          "text/plain": "<IPython.core.display.Latex object>"
        },
        "execution_count": 4,
        "metadata": {},
        "output_type": "execute_result"
      }
    ],
    "execution_count": 4
  },
  {
    "id": "bd5879d8-661c-4986-8cf2-f4ed27e5cc49",
    "cell_type": "code",
    "source": "",
    "metadata": {
      "collapsed": true,
      "jupyter": {
        "outputs_hidden": true
      },
      "trusted": false
    },
    "outputs": [],
    "execution_count": null
  }
]
```

## 渲染源码分析

前面提到 Cell 分为两部分：**source 和 outputs。source 是用户输入的数据，Jupyter 渲染后并设置``contenteditable="true"`属性，使其可以进行编辑；outputs 是 source 执行的结果，不可以编辑。**

我们在项目中所要的是对 Notebook 的呈现。因此，JupyterLab 对 source 的处理，并不需要全部实现；而 JupyterLab 渲染 outputs 的代码，因为完全符合我们的预期，暂时认为可以照搬。

现在目的很清楚了，有两点：

1. 找到 source 渲染代码，提取可用代码；
2. 找到 outputs 渲染代码，直接迁移；

### 定位渲染源码

虽然前面找到了 JupyterLab 对 notebook 源数据处理的方法——`createCell`。但很可惜，只有对 Cell 解析封装操作没有任何渲染操作。当我想着通过调试`createCell`代码以找到真正的渲染代码时，悲催的发现 JupyterLab 是通过**事件订阅侦听形式**来调用渲染代码的。线性的 debugger 并不能帮我找到渲染代码。

好在通过查看 JupyterLab 依赖包，看到找到了 cells 依赖包——[@jupyterlab/cells](https://github.com/jupyterlab/jupyterlab/tree/1215b4515972ad41806a6262e3aa67911a7a0ec7/packages/cells)。@jupyterlab/cells 很可能与 Cell 渲染有关，对其进行断点调试很快进定位到了与渲染有关的代码。

#### cells 依赖包说明

> # @jupyterlab/cells
>
> A JupyterLab package which provides an implementation of a Jupyter notebook cell. These cells are used in both the [notebook](https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/packages/notebook) and the [code console](https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/packages/console). The result of cell execution is shown in an output area, which is implemented in [@jupyterlab/outputarea](https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/packages/outputarea). Markdown and raw cells can have attachments, which is implemented in [@jupyterlab/attachments](https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/packages/attachments).

上面是@jupyterlab/cells 的 README.md。翻译过来就是：

> 一个用于实现 Jupyter notebook cell 的 JupyterLab 包。这些 Cell 在[notebook](https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/packages/notebook)和[code console](https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/packages/console)中都有使用。Cell 执行的结果显示在输出区域中，该区域在@jupyterlab/outputarea 中实现。Markdown 和原始单元格可以有附件，这在@jupyterlab/attachments 中实现。

@jupyterlab/cells 包中[widget.ts](https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/packages/cells/src/widget.ts)是 Cell 渲染的入口。其定义了三种类型 cell 的渲染类：[CodeCell](https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/packages/cells/src/widget.ts#L945)、[MarkdownCell](https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/packages/cells/src/widget.ts#L1762)、[RawCell](https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/packages/cells/src/widget.ts#L2221)以及三者的父类[Cell](https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/packages/cells/src/widget.ts#L2221)。

#### source 渲染代码的分析

尽管 JupyterLab 对三种类型的 Cell 定义了各自的渲染类，但实际上渲染 source 是三者父类中的[initializeDOM](https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/packages/cells/src/widget.ts#L547)方法。` initializeDOM()`中有这样一段代码：

```tsx
const input = (this._input = new InputArea({
  model,
  contentFactory
}))
```

其返回的结果如下图：

![image-20221216163857639](./%E6%A0%B9%E6%8D%AE%20Jupyter-lab%20%E6%BA%90%E7%A0%81%E5%AE%9E%E7%8E%B0%20notebook%EF%BC%88.ipynb%EF%BC%89%E5%9C%A8%E9%A1%B5%E9%9D%A2%E4%B8%AD%E7%9A%84%E6%B8%B2%E6%9F%93.assets/image-20221216163857639.png)

下面是 text.ipynb 的第一个 Cell 的`input`对象中的`node`属性的`outerHTML`值：

```html
<div class="lm-Widget jp-InputArea">
  <div class="lm-Widget jp-InputPrompt jp-InputArea-prompt"></div>
  <div class="lm-Widget jp-CodeMirrorEditor jp-Editor jp-InputArea-editor" data-type="inline">
    <div class="cm-editor ͼ1 ͼ2 ͼo ͼ1f">
      <div aria-live="polite" style="position: absolute; top: -10000px"></div>
      <div tabindex="-1" class="cm-scroller">
        <div
          spellcheck="false"
          autocorrect="off"
          autocapitalize="off"
          translate="no"
          contenteditable="true"
          class="cm-content cm-lineWrapping"
          style="tab-size: 4"
          role="textbox"
          aria-multiline="true"
        >
          <div class="cm-line">import sys</div>
          <div class="cm-line">sys.stdout.write('hello world\n')</div>
          <div class="cm-line">sys.stdout.flush()</div>
          <div class="cm-line">for i in range(3):</div>
          <div class="cm-line">sys.stdout.write('%s\n' % i)</div>
          <div class="cm-line">sys.stdout.flush()</div>
          <div class="cm-line">sys.stderr.write('output to stderr\n')</div>
          <div class="cm-line">sys.stderr.flush()</div>
          <div class="cm-line">sys.stdout.write('some more stdout text\n')</div>
          <div class="cm-line">sys.stdout.flush()</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

可以看到，

```json
"source": [
    "import sys\n",
    "sys.stdout.write('hello world\\n')\n",
    "sys.stdout.flush()\n",
    "for i in range(3):\n",
    "    sys.stdout.write('%s\\n' % i)\n",
    "    sys.stdout.flush()\n",
    "sys.stderr.write('output to stderr\\n')\n",
    "sys.stderr.flush()\n",
    "sys.stdout.write('some more stdout text\\n')\n",
    "sys.stdout.flush()"
]
```

成功渲染出来的。

因此可以断定`InputArea`类就是渲染 source 的代码。查看其[构造函数](https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/packages/cells/src/inputarea.ts#L47)，发现其调用了`CodeEditorWrapper`类来渲染 Cell：

```tsx
constructor(options: InputArea.IOptions) {
    super();
    this.addClass(INPUT_AREA_CLASS);
    const model = (this.model = options.model);
    const contentFactory = (this.contentFactory =
                            options.contentFactory || InputArea.defaultContentFactory);

    // Prompt
    const prompt = (this._prompt = contentFactory.createInputPrompt());
    prompt.addClass(INPUT_AREA_PROMPT_CLASS);

    // Editor
    const editorOptions = {
        model,
        factory: contentFactory.editorFactory
    };
    const editor = (this._editor = new CodeEditorWrapper(editorOptions));
    editor.addClass(INPUT_AREA_EDITOR_CLASS);

    const layout = (this.layout = new PanelLayout());
    layout.addWidget(prompt);
    layout.addWidget(editor);
}
```

继续深入调试查找，最终发现是通过`@jupyterlab/codemirror`包实现渲染的，最终渲染的代码如下：

```ts
const view = new EditorView({
  state: EditorState.create({
    doc,
    extensions
  }),
  parent: host
})
```

> 源码地址：https://github.com/jupyterlab/jupyterlab/blob/1215b4515972ad41806a6262e3aa67911a7a0ec7/packages/codemirror/src/editor.ts#L1148

##### 借助第三方插件 CodeMirror 渲染 source

如果经常涉猎页面 web 代码编辑器，看到`EditorView`可能会恍然大悟：”这不就是[CodeMirror](https://codemirror.net/)的代码吗？“。

没错，JupyterLab 就是通过第三方插件[CodeMirror](https://codemirror.net/)实现在线编辑和呈现的。

所以，**我们只需要在自己项目中引入 CodeMirror 来渲染 source 即可。**

> 当然，如果想要尽可能的还原 JupyterLab 的渲染呈现，还需要剥离出 JupyterLab 的样式。
>
> 这个后面再说。

##### source 中的 Markdown 渲染

尽管 CodeMirror 支持 Markdown，但其只是对 Markdown 源码的呈现。为了实现更好的 Markdown 呈现效果，需要使用额外的呈现手段。

回看`MarkdownCell`类，发现有一个[\_updateRenderedInput](https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/packages/cells/src/widget.ts#L2149)方法，其中有这样一行代码：`return this._renderer.renderModel(mimeModel);`

完整代码如下：

```tsx
/**
  * Update the rendered input.
  */
private _updateRenderedInput(): Promise<void> {
    const model = this.model;
    const text =
    (model && model.sharedModel.getSource()) || DEFAULT_MARKDOWN_TEXT;
    // Do not re-render if the text has not changed.
    if (text !== this._prevText) {
        const mimeModel = new MimeModel({ data: { 'text/markdown': text } });
        this._prevText = text;
        return this._renderer.renderModel(mimeModel);
    }
    return Promise.resolve();
}
```

对其进行调试，发现其调用了[@jupyterlab/outputarea](https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/packages/outputarea)渲染 Markdown 的代码。

显然，**在 Markdown Cell 发生变更时，JupyterLab 采用了 outputs Markdown 的渲染逻辑来渲染 Markdown Cell。**

#### outputs 渲染代码分析

最后，就是 outputs 的渲染代码了。@jupyterlab/cells 的 README.md 已经明确告知：**Cell 的结果显示在输出区域中，该区域在@jupyterlab/outputarea 中实现。**所以我们要去[@jupyterlab/outputarea](https://github.com/jupyterlab/jupyterlab/tree/master/packages/outputarea)寻找 outputs 渲染代码。

不过先不要急着去直接去查阅代码。先看看在[CodeCell](https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/packages/cells/src/widget.ts#L945)是怎么调用@jupyterlab/outputarea 的。关键代码如下：

```ts
const output = (this._output = new OutputArea({
  model: this.model.outputs,
  rendermime,
  contentFactory: contentFactory,
  maxNumberOutputs: this.maxNumberOutputs,
  translator: this.translator
}))
```

> 源码地址：https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/packages/cells/src/widget.ts#L970

显然是通过调用 OutputArea 类的实例化对象来实现的。随着不断的深入调试查找，发现真正的 output 渲染代码并不在@jupyterlab/outputarea 中。而是调用` output.renderModel`方法实现的渲染的。`output`对象通过`this.rendermime`对象的`createRenderer`方法创建。`this.rendermime`来自于`options.rendermime`，`options.rendermime`就是上面代码中的`rendermime`变量。

> `createRenderer`相关代码：
>
> ```tsx
>   /**
>    * Render a mimetype
>    */
>   protected createRenderedMimetype(model: IOutputModel): Widget | null {
>     const mimeType = this.rendermime.preferredMimeType(
>       model.data,
>       model.trusted ? 'any' : 'ensure'
>     );
>
>     if (!mimeType) {
>       return null;
>     }
>     let output = this.rendermime.createRenderer(mimeType);
>     const isolated = OutputArea.isIsolated(mimeType, model.metadata);
>     if (isolated === true) {
>       output = new Private.IsolatedRenderer(output);
>     }
>     Private.currentPreferredMimetype.set(output, mimeType);
>     output.renderModel(model).catch(error => {
>       // Manually append error message to output
>       const pre = document.createElement('pre');
>       const trans = this._translator.load('jupyterlab');
>       pre.textContent = trans.__('Javascript Error: %1', error.message);
>       output.node.appendChild(pre);
>
>       // Remove mime-type-specific CSS classes
>       output.node.className = 'lm-Widget jp-RenderedText';
>       output.node.setAttribute(
>         'data-mime-type',
>         'application/vnd.jupyter.stderr'
>       );
>     });
>     return output;
>   }
> ```
>
> 源码路径：[jupyterlab/widget.ts at master · jupyterlab/jupyterlab (github.com)](https://github.com/jupyterlab/jupyterlab/blob/master/packages/outputarea/src/widget.ts#L555)

**很显然，@jupyterlab/outputarea 仅仅是一个 output 封装的工具包。**

这一点我们通过@jupyterlab/outputarea 的 README.md 也可以得知：

> # @jupyterlab/outputarea
>
> A JupyterLab package which provides an implementation of the Jupyter notebook output area. Execution results from both the [notebook](https://github.com/jupyterlab/jupyterlab/blob/master/packages/notebook) and the [code console](https://github.com/jupyterlab/jupyterlab/blob/master/packages/console) are placed in the output area.
>
> Output areas are able to render results of several different mime types, which are implemented in the [rendermime](https://github.com/jupyterlab/jupyterlab/blob/master/packages/rendermime) package. This list of mime types may be extended via the simplified mime-extension interface defined in [@jupyterlab/rendermime-interfaces](https://github.com/jupyterlab/jupyterlab/blob/master/packages/rendermime-interfaces).
>
> 摘自——《[jupyterlab/packages/outputarea at master · jupyterlab/jupyterlab (github.com)](https://github.com/jupyterlab/jupyterlab/tree/master/packages/outputarea#readme)》

注意第二段第一句话，翻译过来就是：**输出区域能够呈现几种不同 mime 类型的结果，这些类型在 rendermime 包中实现。**

原来真正渲染 output 的代码在[@jupyterlab/rendermime](https://github.com/jupyterlab/jupyterlab/tree/master/packages/rendermime)。那这个`rendermime`变量肯定就是@jupyterlab/rendermime 包中 output 渲染类的实例了。

可是，是在什么地方实例化并传递`rendermime`变量呢？其实是在 JupyterLab 创建的时候。查看 JupyterLab 提供的**notebook**案例可以看到：

```tsx
// 省略多余代码
import { standardRendererFactories as initialFactories, RenderMimeRegistry } from '@jupyterlab/rendermime'
// 省略多余代码
const rendermime = new RenderMimeRegistry({
  initialFactories: initialFactories,
  latexTypesetter: new MathJaxTypesetter({
    url: PageConfig.getOption('mathjaxUrl'),
    config: PageConfig.getOption('mathjaxConfig')
  })
})
// 省略多余代码
const wFactory = new NotebookWidgetFactory({
  name: 'Notebook',
  modelName: 'notebook',
  fileTypes: ['notebook'],
  defaultFor: ['notebook'],
  preferKernel: true,
  canStartKernel: true,
  rendermime,
  contentFactory,
  mimeTypeService: editorServices.mimeTypeService
})
// 省略多余代码
```

> 源码地址：[jupyterlab/index.ts at bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c · jupyterlab/jupyterlab (github.com)](https://github.com/jupyterlab/jupyterlab/blob/bd3c5c3a14f2b9de09e0f027601ad1c3b4e6524c/examples/notebook/src/index.ts)

##### 解析 createRenderer 创建的`output`对象

前面提到:**通过调用了`this.rendermime`对象的`createRenderer`方法返回一个`output`对象，然后调用` output.renderModel`方法实现的渲染的。**

现在进入到[@jupyterlab/rendermime](https://github.com/jupyterlab/jupyterlab/tree/master/packages/rendermime)看看`createRenderer`是如何创建`output`对象的，以及`output`对象里面有什么。

```tsx
  /**
   * Create a renderer for a mime type.
   *
   * @param mimeType - The mime type of interest.
   *
   * @returns A new renderer for the given mime type.
   *
   * @throws An error if no factory exists for the mime type.
   */
  createRenderer(mimeType: string): IRenderMime.IRenderer {
    // Throw an error if no factory exists for the mime type.
    if (!(mimeType in this._factories)) {
      throw new Error(`No factory for mime type: '${mimeType}'`);
    }

    // Invoke the best factory for the given mime type.
    return this._factories[mimeType].createRenderer({
      mimeType,
      resolver: this.resolver,
      sanitizer: this.sanitizer,
      linkHandler: this.linkHandler,
      latexTypesetter: this.latexTypesetter,
      markdownParser: this.markdownParser,
      translator: this.translator
    });
  }
```

> 源码路径：https://github.com/jupyterlab/jupyterlab/blob/b6b6d3f82d9abdc207135b4b4dabf421f61181ac/packages/rendermime/src/registry.ts#L132

通过源码可以知道，`createRenderer`通过参数`mimeType`获取`this._factories`中对应的`factory`，然后调用`factory`的`createRenderer`来创建`output`对象。`this._factories`在构造函数中创建，其值来自于`options.initialFactories`。`options.initialFactories`同`options.rendermime`一样，在 jupyterlab 创建时引入的，来自于`@jupyterlab/rendermime`。

`RenderMimeRegistry`类的构造函数：

```tsx
  constructor(options: RenderMimeRegistry.IOptions = {}) {
    // Parse the options.
    this.translator = options.translator ?? nullTranslator;
    this.resolver = options.resolver ?? null;
    this.linkHandler = options.linkHandler ?? null;
    this.latexTypesetter = options.latexTypesetter ?? null;
    this.markdownParser = options.markdownParser ?? null;
    this.sanitizer = options.sanitizer ?? new Sanitizer();

    // Add the initial factories.
    if (options.initialFactories) {
      for (const factory of options.initialFactories) {
        this.addFactory(factory);
      }
    }
  }
```

> 源码地址：https://github.com/jupyterlab/jupyterlab/blob/b6b6d3f82d9abdc207135b4b4dabf421f61181ac/packages/rendermime/src/registry.ts#L40

`initialFactories` 被引入时的代码：

```tsx
import { standardRendererFactories as initialFactories, RenderMimeRegistry } from '@jupyterlab/rendermime'
```

`initialFactories`原本名字为`standardRendererFactories`。因此，去`@jupyterlab/rendermime`查找，发现`standardRendererFactories`在[jupyterlab/packages/rendermime/src/factories.ts](jupyterlab/packages/rendermime/src/factories.ts)中定义：

```tsx
export const standardRendererFactories: ReadonlyArray<IRenderMime.IRendererFactory> = [
  htmlRendererFactory,
  markdownRendererFactory,
  latexRendererFactory,
  svgRendererFactory,
  imageRendererFactory,
  javaScriptRendererFactory,
  textRendererFactory
]
```

每个 factory 的`createRenderer`来自[jupyterlab/packages/rendermime/src/widgets.ts](https://github.com/jupyterlab/jupyterlab/blob/b6b6d3f82d9abdc207135b4b4dabf421f61181ac/packages/rendermime/src/widgets.ts)对应的渲染函数，对应的渲染函数又调用[jupyterlab/packages/rendermime/src/renderers.ts](jupyterlab/packages/rendermime/src/renderers.ts)对应的函数。而`renderers.ts`就是最终的 output 渲染代码。

### 总结

经过一系列的分析查找，基本理清的 JupyterLab 是如何渲染 notebook 的。下面来回顾一下：

我们从 notebook 的数据结构出发，明确了 notebook 主要由 source 和 outputs 两部分组成。

`@jupyterlab/cells`是 notebook 的渲染入口。`@jupyterlab/cells`通过调用二次封装的 Codemirror 插件来渲染 Code Cell 和 Raw Cell 的 source。而 Markdown Cell 的 source 则调用 ouput 中的 Markdown 渲染函数实现。

因为只有 Code Cell 有 outputs，所以 Code Cell 渲染时触发 outputs 渲染。`@jupyterlab/cells`渲染 outputs 的函数来自于 JupyterLab 最初创建时实例化的`rendermime`对象。`rendermime`则来自于`@jupyterlab/rendermime`。`@jupyterlab/rendermime`根据不同的`output.mimeType`，设置了 7 个 Factory（`htmlRendererFactory`、`markdownRendererFactory`、`latexRendererFactory`、`svgRendererFactory`、`imageRendererFactory`、`javaScriptRendererFactory`、`textRendererFactory`）来渲染 output。这 7 个 Factory 又依赖于[jupyterlab/packages/rendermime/src/renderers.ts](jupyterlab/packages/rendermime/src/renderers.ts)所提供的渲染函数（`renderHTML`、`renderImage`、`renderLatex`、`renderMarkdown`、`renderSVG`、`renderText`）将 output 渲染成 html。

因此，在项目中实现 notebook 渲染的要点 2 点：

1. 使用 Codemirror 插件实现 Code Cell 和 Raw Cell 的 source 的渲染。
2. 根据[jupyterlab/packages/rendermime/src/renderers.ts](jupyterlab/packages/rendermime/src/renderers.ts)源码，二次开发实现 output 和 Markdown Cell 的 source 的渲染。

## 实现 notebook 的渲染

> 注意：由于我所开发的项目没有使用 Typescript，所以实现代码都为 JavaScript。而且引入的源码也要是 JavaScript 版本。
>
> JavaScript 版本源码需要自行寻找。

经过上面的分析，我们确定了以 Codemirror 插件以及[renderers.ts](jupyterlab/packages/rendermime/src/renderers.ts)源码为基础来实现 notebook 的渲染思路。然而，两者只是渲染的工具，光有工具确没有使用的人可不行。由于 JupyterLab 这部分的异常复杂且涵盖多余的功能，所以无法直接使用。因此，我们需要创造一个"**调度系统**"来调用这些工具，以及组装渲染后的结果。

### 编写 notebook 渲染类——“**调度系统**”

这里我把“**调度系统**”定义为 Notebook 渲染类。简单概括，Notebook 渲染类具有如下功能：

1. 遍历 cells，根据不同的`cell_type`调用不同渲染工具
2. 组装渲染结果，形成一个 DOM

Notebook 基本架构如下：

```js
class Notebook {
  #cells // 私有变量：notebook cell列表
  #fragment //  私有变量：notebook 渲染结果片段，是个div元素

  /**
   * cells 渲染
   * 此处是 notebook 渲染的总入口。将遍历cells并根据cell_type调用不同source渲染方法
   * 并将渲染结果存储在this.#fragment中
   * @returns {DOM} 返回一个DOM
   */
  render() {}

  /**
   * 渲染Code Cell
   * @param {Object} cell
   */
  #renderCodeCell(cell) {}

  /**
   * 渲染Markdown Cell
   * @param {Object} cell
   */
  #renderMarkdownCell(cell) {}

  /**
   * 渲染Raw Cell
   * @param {Object} cell
   */
  #renderRawCell(cell) {}
}
```

#### notebook 渲染入口——render()

`render`方法是 notebook 渲染的入口，负责遍历 cells 并根据不同的`cell_type`调用不同的渲染函数。`cell_type`一共有三个值：`code`、`markdown`和`raw`，根据不同的类别调用不同渲染方法：`#renderCodeCell`、`#renderMarkdownCell`、`#renderRawCell`。

```js
render() {
  for (let cell of this.#cells) {
    let node = null
    let { cell_type, source } = cell
    cell.source = typeof source === 'string' ? source : source.join('')
    switch (cell_type) {
      case 'markdown':
        node = this.#renderMarkdownCell(cell)
        break
      case 'code':
        node = this.#renderCodeCell(cell)
        break
      case 'raw':
        node = this.#renderRawCell(cell)
        break
    }
    this.#fragment.appendChild(node)
  }
  return this.#fragment
}
```

#### Code Cell 渲染代码的实现

Code Cell 需要渲染两部分：

1. 依赖 Codemirror 插件来渲染 sources
2. 依赖[renderers.ts](https://github.com/jupyterlab/jupyterlab/blob/b6b6d3f82d9abdc207135b4b4dabf421f61181ac/packages/rendermime/src/renderers.ts)来渲染 output

##### 封装 Codemirror——createCodemirror()来渲染 sources

```js
/**
 * 调用 codemirror 插件渲染code，并调用 jupyterlab 的 codemirror 主题样式做渲染
 * codemirror 插件： https://codemirror.net/
 */
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { python } from '@codemirror/lang-python'
import { sql } from '@codemirror/lang-sql'
import { Theme } from './codemirror.theme' // 引入JupyterLab定义的codemirror样式

// Codemirror 扩展配置
const extensionsConfig = [
  EditorState.readOnly.of(true),
  EditorView.editable.of(false),
  Theme.getTheme('jupyter'), // 主题引入

  /* 引入所需的编程语言 START */
  python(),
  sql()
  /* 引入所需的编程语言 END */
]

/**
 * 调用codemirror插件渲染code
 *
 * @param {string} codeString 需要渲染的code字符串
 * @param {Element} parent 父元素，渲染成功后得元素将作为其的子元素
 * @returns {Element} 渲染完成后的父元素
 */
export function createCodemirror(codeString, parent) {
  if (codeString instanceof Array) codeString = codeString.join('')
  if (typeof codeString !== 'string') throw 'Function createCodemirror: 参数 codeString 必须是字符串！'
  if (!parent) console.warn('Function createCodemirror: 参数 parent 不能为空')
  if (!('appendChild' in document.body)) {
    console.warn('Function createCodemirror: 参数 parent 类型错误，需为HTML元素')
    codeString = document.body
  }

  return new EditorView({
    state: EditorState.create({ doc: codeString || '', extensions: extensionsConfig }),
    parent: parent || document.body
  })
}
```

为了和 JupyterLab 渲染结果保持统一，还需要引入 JupyterLab 的 Codemirror 样式覆盖默认样式。

> 源码地址：https://github.com/jupyterlab/jupyterlab/blob/master/packages/codemirror/src/editortheme.ts

##### 实现 ouput 渲染

通过前面的源码分析可以知道，JupyterLab 是通过封装 7 个 Factory 来调用[renderers.ts](https://github.com/jupyterlab/jupyterlab/blob/b6b6d3f82d9abdc207135b4b4dabf421f61181ac/packages/rendermime/src/renderers.ts)中的方法实现 ouput 渲染的。因此，我们要模拟 7 个 Factory 来实现调用 renderers.ts。

代码如下：

```js
async #renderCommonCell({ type, options }) {
  // 对未设置的配置项，设置为全局默认配置对应的属性值
  options.trusted = options.trusted || this.#trusted
  options.sanitizer = options.sanitizer || this.#sanitizer
  options.shouldTypeset = options.shouldTypeset || this.#shouldTypeset
  options.latexTypesetter = options.latexTypesetter || this.#latexTypesetter
  options.markdownParser = options.markdownParser || this.#markdownParser

  switch (type) {
    case 'text/html':
      await renderHTML(options)
      break
    case 'text/markdown':
      await renderMarkdown(options)
      break
    case 'text/plain':
    case 'application/vnd.jupyter.stdout':
    case 'application/vnd.jupyter.stderr':
      await renderText(options)
      break
    case 'text/latex':
      await renderLatex(options)
      break
    case 'image/bmp':
    case 'image/png':
    case 'image/jpeg':
    case 'image/gif':
    case 'image/webp':
      await renderImage(options)
      break
    case 'image/svg+xml':
      await renderSVG(options)
      break
    case 'text/javascript':
    case 'application/javascript':
      // 禁止输出 JavaScript
      options.source = 'JavaScript output is disabled in JupyterLab'
      await renderText(options)
      break
    default:
      break
  }
}
```

接下来就是调用`#renderCommonCell`。

由于，JupyterLab 将 output 分为四类。分别是：表示纯文本的`stream`；表示错误信息的`error`；表示富文本的`display_data`和`display_data`。

不同类别的数据构成各不一样，需要编写独立的处理方法，将这些不同的 ouput 数据构成转化成统一的数据构成来调用`#renderCommonCell`:

```js
async #renderOutputCell(outputs, parentNode) {
  if (!outputs || !outputs.length) return
  const OutputAreaNode = document.createElement('div')
  OutputAreaNode.className = 'lm-Widget jp-OutputArea jp-Cell-outputArea q-mt-sm'
  parentNode.appendChild(OutputAreaNode)
  for (let output of outputs) {
    let sources = []
    switch (output.output_type) {
      case 'stream': // 文本流输出
        sources = output.text
        for (const source of sources) {
          let node = document.createElement('div')
          await this.#renderCommonCell({
            type: 'application/vnd.jupyter.' + output.name,
            options: { host: node, source: source },
          })

          OutputAreaNode.appendChild(node)
        }
        break
      case 'display_data':
      case 'execute_result': {
        // 富文本输出
        const { data: outputData, execution_count: executionCount } = output
        const keys = Object.keys(outputData)
        const key = keys[0]
        let source = outputData[key]
        if (!source) return
        let node = document.createElement('div')
        source = typeof source === 'string' ? source : source.join('\n')
        await this.#renderCommonCell({
          type: key,
          options: { host: node, source: source },
        })

        OutputAreaNode.appendChild(node)
        break
      }
      case 'error': // 错误信息输出
        sources = output.traceback
        for (const source of sources) {
          let node = document.createElement('div')
          await this.#renderCommonCell({
            type: 'application/vnd.jupyter.stderr',
            options: { host: node, source: source },
          })
          OutputAreaNode.appendChild(node)
        }
        break
    }
  }
}
```

这样就基本实现的 ouput 的渲染。

##### 编写#createContainerNode 方法来美化渲染结果

如果直接将上面的渲染结果呈现在页面上，会发现效果特别差。所以还需要编写一个方法来套用 JupyterLab 的样式。大致做法如下：

- 首先，需要抽离 JupyterLab 的样式文件，并在项目中引入。

- 接着就是编写方法`#createContainerNode`来模拟 JupyterLab 渲染结果的页面结构。

- 最后就是在每个渲染结果输出前调用`#createContainerNode`方法即可。

```js
#createContainerNode(type, contentNode, executionCount) {
  let node = document.createElement('div')
  let areaNode = document.createElement('div')
  let promptNode = document.createElement('div')
  if (executionCount || executionCount === null) {
    promptNode.innerText = `[${executionCount === null ? ' ' : executionCount}]`
  }
  // prompt class设置。prompt 样式分为input和output两种
  ;['inputMarkdown', 'inputCode'].includes(type)
    ? (promptNode.className = 'lm-Widget p-Widget jp-InputPrompt jp-InputArea-prompt')
    : (promptNode.className = 'lm-Widget p-Widget jp-OutputPrompt jp-OutputArea-prompt')
  switch (type) {
    case 'inputMarkdown': {
      node.className = 'lm-Widget p-Widget jp-Cell jp-MarkdownCell jp-mod-rendered jp-Notebook-cell'
      areaNode.className = 'lm-Widget p-Widget jp-InputArea jp-Cell-inputArea'
      contentNode.className = 'lm-Widget p-Widget jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput'
      contentNode.setAttribute('data-mime-type', 'text/markdown')
      break
    }
    case 'inputCode': {
      node.className = 'lm-Widget p-Widget jp-Cell jp-CodeCell jp-mod-noOutputs jp-Notebook-cell'
      areaNode.className = 'lm-Widget p-Widget jp-InputArea jp-Cell-inputArea'
      contentNode.className = 'lm-Widget p-Widget jp-CodeMirrorEditor jp-Editor jp-InputArea-editor'
      break
    }
    case 'application/vnd.jupyter.stdout': {
      node.className = 'lm-Widget lm-Panel jp-OutputArea-child'
      areaNode.className = 'lm-Widget p-Widget lm-Panel p-Panel jp-OutputArea-child'
      contentNode.className = 'lm-Widget p-Widget jp-RenderedText jp-OutputArea-output'
      contentNode.setAttribute('data-mime-type', 'application/vnd.jupyter.stdout')
      break
    }
    case 'application/vnd.jupyter.stderr': {
      node.className = 'lm-Widget lm-Panel jp-OutputArea-child'
      areaNode.className = 'lm-Widget p-Widget lm-Panel p-Panel jp-OutputArea-child'
      contentNode.className = 'lm-Widget p-Widget jp-RenderedText jp-OutputArea-output'
      contentNode.setAttribute('data-mime-type', 'application/vnd.jupyter.stderr')
      break
    }
    default: {
      const typeClassMap = new Map([
        ['image/bmp', 'jp-RenderedImage'],
        ['image/png', 'jp-RenderedImage'],
        ['image/jpeg', 'jp-RenderedImage'],
        ['image/gif', 'jp-RenderedImage'],
        ['image/webp', 'jp-RenderedImage'],
        ['text/latex', 'jp-RenderedLatex'],
        ['image/svg+xml', 'jp-RenderedSVG'],
        ['text/markdown', 'jp-RenderedHTMLCommon jp-RenderedHTML'],
      ])

      node.className = 'lm-Widget p-Widget lm-Panel p-Panel jp-OutputArea-child jp-OutputArea-executeResult'
      areaNode.className = 'lm-Widget p-Widget lm-Panel p-Panel jp-OutputArea-child'
      contentNode.className = `lm-Widget p-Widget ${
        typeClassMap.get(type) || 'jp-RenderedHTMLCommon'
      } jp-OutputArea-output`
      contentNode.setAttribute('data-mime-type', type)
      break
    }
  }
  areaNode.appendChild(promptNode)
  areaNode.appendChild(contentNode)
  node.appendChild(areaNode)

  return node
}
```

##### 整合代码

最后的最后，整合上面的方法，就是`createCodeCell`的全部代码了。

```js
async #renderCodeCell(cell) {
  let { source, outputs, execution_count: executionCount } = cell
  let contentNode = document.createElement('div')
  contentNode.classList = ['lm-Widget', 'p-Widget', 'jp-Cell', 'jp-CodeCell', 'jp-Notebook-cell']
  createCodemirror(source, contentNode) // input代码块渲染
  this.#node = this.#createContainerNode('inputCode', contentNode, executionCount)
  await this.#renderOutputCell(outputs, contentNode.parentNode.parentNode)
}
```

#### 关于 Markdown Cell 和 Raw Cell

Markdown Cell 和 Raw Cell 的实现代码和 Code Cell 类似，自行实现即可。

## 写在最后

至此，本地项目实现 Notebook 渲染的基本思路全部讲完了。实现代码比较粗糙，请多担待。

具体实现代码可查看：[render-juypter-notebook-vue/src/utils/notebook at master · Z-J-wang/render-juypter-notebook-vue (github.com)](https://github.com/Z-J-wang/render-juypter-notebook-vue/tree/master/src/utils/notebook)
