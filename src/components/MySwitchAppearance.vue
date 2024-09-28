<script lang="ts" setup>
import { inject, ref, watchPostEffect } from 'vue'
import { useData } from 'vitepress'
import VPSwitch from 'vitepress/dist/client/theme-default/components/VPSwitch.vue'

const { isDark, theme } = useData()

const toggleAppearance = inject('toggle-appearance', () => {
  isDark.value = !isDark.value
})

const onClick = (event) => {
  let lastClick = event

  // 为不支持此 API 的浏览器提供回退方案：
  if (!document?.startViewTransition) {
    // toggleAppearance(event)
    return
  }

  // 获取点击位置，或者回退到屏幕中间
  const x = lastClick?.clientX ?? innerWidth / 2
  const y = lastClick?.clientY ?? innerHeight / 2
  // 获取到最远角的距离
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  let keyframes = [{ clipPath: `circle(0 at ${x}px ${y}px)` }, { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` }]

  if (!isDark.value) keyframes = keyframes.reverse()

  // 开始一次视图过渡：
  const transition = document.startViewTransition(() => {
    if (isDark.value) {
      toggleAppearance(event)
    } else {
      setTimeout(() => {
        toggleAppearance(event)
      }, 300)
    }
  })

  // 等待伪元素创建完成：
  transition.ready.then(() => {
    // 新视图的根元素动画
    document.documentElement.animate(keyframes, {
      duration: 300,
      pseudoElement: '::view-transition-new(root)'
    })
  })
}

const switchTitle = ref('')

watchPostEffect(() => {
  switchTitle.value = isDark.value
    ? theme.value.lightModeSwitchTitle || 'Switch to light theme'
    : theme.value.darkModeSwitchTitle || 'Switch to dark theme'
})
</script>

<template>
  <div>
    <VPSwitch :title="switchTitle" class="VPSwitchAppearance" :aria-checked="isDark" @click="onClick">
      <span class="vpi-sun sun" />
      <span class="vpi-moon moon" />
    </VPSwitch>
  </div>
</template>

<style scoped>
.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

.dark .sun {
  opacity: 0;
}

.dark .moon {
  opacity: 1;
}

/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
.dark .VPSwitchAppearance :deep(.check) {
  /* rtl:ignore */
  transform: translateX(18px);
}
</style>

<style>
/* stylelint-disable-next-line selector-pseudo-element-no-unknown */
::view-transition-group(root) {
  background-color: #1b1b1f !important;
}
</style>
