<script setup>
  import { useData } from 'vitepress'

  const { theme } = useData()
  const list = theme.value.sidebar['/server/'][0].items // 读取config.sidebar配置
</script>

# 服务器相关

归纳服务器相关的知识。

<ol>
  <li v-for="(item, i) in list" :key="i">
    <a :href="item.link">{{ item.text }}</a>
  </li>
</ol>
