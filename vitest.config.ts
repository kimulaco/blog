/// <reference types="vitest" />
import { getViteConfig } from 'astro/config'

process.env.APP_HOST ??= 'localhost'
process.env.GOOGLE_ADS_CLIENT ??= 'ca-pub-test-1234567890'
process.env.MICROCMS_SERVICE_DOMAIN ??= 'test-domain'
process.env.MICROCMS_API_KEY ??= 'test-api-key'

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
