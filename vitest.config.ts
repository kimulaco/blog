/// <reference types="vitest" />
import { getViteConfig } from 'astro/config'
import vue from '@vitejs/plugin-vue'

export default getViteConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.(test|spec).ts'],
    coverage: {
      all: !!process.env.COVERAGE_ALL,
      reportsDirectory: '.coverage',
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/**/*.d.ts', 'src/assets/*', 'src/pages/*'],
    },
  },
})
