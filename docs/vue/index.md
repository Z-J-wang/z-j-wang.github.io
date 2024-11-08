<script setup>
  import { useData } from 'vitepress'

  const { theme } = useData()
  const list = theme.value.sidebar['/vue/'][0].items // 读取config.sidebar配置
</script>

# 杂谈专栏

Vue 相关文章。

<ol>
  <li v-for="(item, i) in list" :key="i">
    <a :href="item.link">{{ item.text }}</a>
  </li>
</ol>
