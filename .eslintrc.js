/* eslint-env node */
module.exports = {
  root: true,
  env: { node: true },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:prettier/recommended' // 启用eslint-plugin-prettier插件中的recommended规则
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },

  // 配置插件，由插件名称组成的列表。可以省略插件名称中的 eslint-plugin- 前缀。
  plugins: [
    'vue' // 等价于eslint-plugin-vue，用于检测.vue文件种的`<template>`和<script>`以及.js文件中的Vue代码
  ],

  // 自定义规则，详见：https://zh-hans.eslint.org/docs/latest/use/configure/rules
  rules: {
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
