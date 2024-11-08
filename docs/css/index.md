---
author: 王志杰
date: 2024-11-08
keywords:
description:
---

<script setup>
  import { useData } from 'vitepress'

  const {  theme } = useData()
  const list = theme.value.sidebar['/css/'][0].items // 读取config.sidebar配置
</script>

# CSS 专栏

CSS 知识点汇总

<ol>
  <li v-for="(item, i) in list" :key="i">
    <a :href="item.link">{{ item.text }}</a>
  </li>
</ol>
