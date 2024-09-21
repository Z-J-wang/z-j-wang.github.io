<script setup>
  import { useData } from 'vitepress'

  const { theme } = useData()
  const list = theme.value.sidebar['/tittle-tattle/'][0].items // 读取config.sidebar配置
</script>

# 杂谈专栏

一些闲聊、一些瞎扯、一些突发奇想、一些乱七八糟。

<ol>
  <li v-for="(item, i) in list" :key="i">
    <a :href="item.link">{{ item.text }}</a>
  </li>
</ol>
