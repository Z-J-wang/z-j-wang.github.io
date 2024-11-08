<script setup>
  import { useData } from 'vitepress'

  const { theme } = useData()
  const list = theme.value.sidebar['/web-optimization/'][0].items // 读取config.sidebar配置
</script>

# Web 性能优化专栏

<ol>
  <li v-for="(item, i) in list" :key="i">
    <a :href="item.link">{{ item.text }}</a>
  </li>
</ol>
