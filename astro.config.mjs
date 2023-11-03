import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  integrations: [vue()],
  vite: {
    plugins: [svgLoader()],
  },
})
