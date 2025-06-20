/// <reference types="vitest" />
import { getViteConfig } from 'astro/config'

export default getViteConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.(test|spec).ts'],
    coverage: {
      all: true,
      reportsDirectory: '.coverage',
      include: ['src/**/*.{ts,astro}'],
      exclude: [
        '**/*.spec.ts',
        '**/*.test.ts',
        'src/**/*.d.ts',
        'src/assets/*',
        'src/components/layouts/LayoutGAImporter/index.astro',
        'src/components/layouts/LayoutNewRelicImporter/index.astro',
        'src/pages/*',
        'src/env.d.ts',
        'test/*',
      ],
    },
  },
})
