# TS 杂记

## tsc 命令的文件通配符

- “\*” 匹配零个或者多个字符，但不包含目录分隔符。
- “?” 匹配一个或者多个字符，但包含目录分隔符。
- “\*\*/” 匹配任意目录及其子目录。

## tsc 命令选项

| 选项                    | 说明                                                                                   | 用法                                    |
| ----------------------- | -------------------------------------------------------------------------------------- | --------------------------------------- |
| `--watch` `-w`          | `--watch` 可以让 ts 编译器持续追踪编译文件，当文件变动时自动进行热编译。即进入观察模。 | `tsc index.ts -w`                       |
| `--preserveWatchOutput` | 保留观察模式下每次编译的输出信息                                                       | `tsc index.ts --preserveWatchOutput -w` |
| `--locale`              | 设置 tsc 输出的语言，简体中文可选值为`zh-CN`。注意，只对单次执行命令有效。             | `tsc --help --locale zh-CN`             |
| `--strict`              | 开启 js 严格模式                                                                       | `tsc --strict index.ts`                 |
| `--init`                | 初始化 TypeScript 项目并创建 tsconfig.json 文件。                                      | `tsc --init`                            |
| `--listFiles`           | 打印在编译过程中读取的所有文件。                                                       | `tsc --listFiles index.ts`              |
|                         |                                                                                        |                                         |

## tsconfig.json 配置文件继承

tsconfig.json 文件可以通过`extends`选项来设置继承的配置文件。

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "strict": true
  }
}
```
