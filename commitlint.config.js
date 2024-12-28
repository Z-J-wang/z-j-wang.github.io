// commitlint 配置项说明：https://commitlint.js.org/reference/configuration.html
export default {
  extends: ['@commitlint/config-conventional'],

  /**
   * 自定义 commitlint 规则。详见：https://commitlint.js.org/reference/rules.html
   *
   * type-enum 限定的提交类型。
   *
   * feat：新增功能（feature）
   * fix：修补 bug
   * docs：文档（documentation）
   * style： 格式（不影响代码运行的变动）
   * refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
   * perf：改进性能的代码更改
   * test：增加测试用例
   * chore：构建过程或辅助工具的变动
   * delete：删除功能或者文件
   * modify：修改功能
   * build：改变构建流程，新增依赖库、工具等
   * ci：自动化流程配置更改
   * revert：代码回滚
   */
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'delete', 'modify', 'build', 'ci', 'revert']
    ]
  }
}
