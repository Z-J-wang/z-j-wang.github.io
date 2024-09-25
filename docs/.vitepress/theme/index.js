import DefaultTheme from 'vitepress/theme'

import MySwitchAppearance from '../../../src/components/MySwitchAppearance.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MySwitchAppearance', MySwitchAppearance)
  }
}
