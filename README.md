# [@kimulaco/blog](https://blog.kimulaco.dev/)

[![codecov](https://codecov.io/gh/kimulaco/blog/graph/badge.svg?token=dLhXB5qd1B)](https://codecov.io/gh/kimulaco/blog)

kimulaco's personal blog.

## Used Technology

- Front-end
  - TypeScript
  - SCSS
  - Astro
  - Vitest
  - Playwright
- Infrastructure
  - AWS
    - S3
    - CloudFront
- CMS
  - microCMS
- CI/CD
  - GitHub Actions
- Tools
  - Google Analytics 4
  - Sentry

## Development

```shell
# Install dependencies
pnpm i

# Launch dev server
pnpm run dev

# Run lint tools
pnpm run lint:astro
pnpm run lint:format
pnpm run lint:script
pnpm run lint:style

# Run build
pnpm run build:dev
pnpm run build:prod

# Run unit test
pnpm run test:unit
pnpm run test:e2e

# Launch preview server
pnpm run preview
```

```shell
# Install dev tools
aqua install

# Pin GitHub Action versions
aqua exec -- pinact run
```
