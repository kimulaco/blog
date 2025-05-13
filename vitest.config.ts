/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.(test|spec).ts'],
    coverage: {
      all: !!process.env.COVERAGE_ALL,
      reportsDirectory: '.coverage',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.d.ts', 'src/assets/*', 'src/pages/*'],
    },
  },
})
