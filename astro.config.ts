import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'
import sentry from '@sentry/astro'
import svgLoader from 'vite-svg-loader'
import { APP_CONFIG, BUILD_CONFIG } from './config'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.resolve(__dirname, 'src')

const SENTRY_DSN = process.env.SENTRY_DSN ?? ''
const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN ?? ''
const SENTRY_PROJECT_NAME = process.env.SENTRY_PROJECT_NAME ?? ''

export default defineConfig({
  site: APP_CONFIG.URL.ORIGIN,
  trailingSlash: 'never',
  integrations: [
    react(),
    sitemap(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    sentry({
      dsn: SENTRY_DSN,
      environment: BUILD_CONFIG.BUILD_ENV,
      sourceMapsUploadOptions: {
        project: SENTRY_PROJECT_NAME,
        authToken: SENTRY_AUTH_TOKEN,
      },
    }),
  ],
  vite: {
    plugins: [svgLoader()],
    css: {
      preprocessorOptions: {
        scss: {
          importers: [
            {
              findFileUrl(url) {
                if (!url.startsWith('@/')) return null
                return new URL('file://' + path.resolve(srcDir, url.slice(2)))
              },
            },
          ],
        },
      },
    },
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
})
