import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'
import svgLoader from 'vite-svg-loader'
import { APP_CONFIG } from './config'

export default defineConfig({
  site: APP_CONFIG.URL.ORIGIN,
  integrations: [
    vue(),
    sitemap(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
  vite: {
    plugins: [svgLoader()],
  },
})
