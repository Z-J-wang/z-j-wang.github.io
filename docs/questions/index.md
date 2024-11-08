---
author: 王志杰
date: 2024-11-08
keywords:
description:
---

<script setup>
  import { useData } from 'vitepress'

  const {  theme } = useData()
  const list = theme.value.sidebar['/questions/'][0].items // 读取config.sidebar配置
</script>

# 开发问题收录专栏

记录开发过程中遇到的问题。

<ol>
  <li v-for="(item, i) in list" :key="i">
    <a :href="item.link">{{ item.text }}</a>
  </li>
</ol>
