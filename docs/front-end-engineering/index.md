<script setup>
  import { useData } from 'vitepress'

  const { theme } = useData()
  const list = theme.value.sidebar['/front-end-engineering/'][0].items // 读取config.sidebar配置
</script>

# 前端工程化专栏 （完善中）

本专栏主要介绍前端工程化相关的内容，包括但不限于模块化、组件化、自动化构建、代码规范、性能优化等。

> 注意：本专栏中的内容仅供参考，具体实现方式可能因项目而异。

<ol>
  <li v-for="(item, i) in list" :key="i">
    <a :href="item.link">{{ item.text }}</a>
  </li>
</ol>
