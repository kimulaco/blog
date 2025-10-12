/// <reference types="vitest" />
import { getViteConfig } from 'astro/config'

export default getViteConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['src/**/*.(test|spec).ts'],
    coverage: {
      all: true,
      reportsDirectory: '.coverage',
      include: ['src/**/*.{ts,astro}'],
      exclude: [
        '**/*.spec.ts',
        '**/*.test.ts',
        '**/type.ts',
        'src/**/*.d.ts',
        'src/assets/*',
        'src/pages/*',
        'src/env.d.ts',
        'test/*',
      ],
    },
  },
})
