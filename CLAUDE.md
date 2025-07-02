# CLAUDE.md

必ず日本語で回答してください。

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands

- `pnpm run dev` - Launch development server (includes build cache setup)
- `pnpm run dev:draft` - Launch dev server with draft articles enabled
- `pnpm run build:dev` - Build for development environment
- `pnpm run build:prod` - Build for production environment
- `pnpm run preview` - Launch preview server after build

### Testing

- `pnpm run test:unit` - Run unit tests with Vitest
- `pnpm run test:unit:coverage` - Run unit tests with coverage report
- `pnpm run test:e2e` - Run end-to-end tests with Playwright (installs deps automatically)

### Linting & Formatting

- `pnpm run lint` - Run all lint checks (ls-lint, prettier, eslint, stylelint, astro check)
- `pnpm run lint:astro` - Run Astro type checking only
- `pnpm run lint:format` - Check Prettier formatting
- `pnpm run lint:script` - Run ESLint
- `pnpm run lint:style` - Run Stylelint

### Cache Management

- `pnpm setup:build-cache` - Generate build cache for articles and data (runs automatically before dev/build)

## Architecture Overview

### Core Structure

This is an Astro-based personal blog with TypeScript, SCSS, and React components. The architecture follows a domain-driven design pattern with clear separation of concerns.

### Key Directories

- `/src/core/domains/` - Domain logic (article, about, breadcrumb, ogp)
- `/src/components/` - Astro components organized by type (layouts, modules, widgets, jsonld)
- `/src/pages/` - Astro pages with file-based routing
- `/config/` - Application and build configuration
- `/scripts/` - Build and utility scripts

### Domain Pattern

Each domain in `/src/core/domains/` follows this structure:

- `index.ts` - Main domain interface with cache/repository switching
- `repository.ts` - External data fetching (microCMS API)
- `cache.ts` - Build-time cache management
- `type.ts` - TypeScript type definitions

### Build Cache System

The application uses a sophisticated build cache system:

- Production builds use cached data (faster builds, no API calls)
- Development mode with drafts bypasses cache for real-time content
- Cache is automatically generated before builds via `setup:build-cache`
- Cache files stored in `/build-cache/`

### Component Architecture

- **Layouts**: Page-level layout components (`LayoutHeader`, `LayoutFooter`, etc.)
- **Modules**: Reusable UI components (`ArticleItem`, `AppCard`, etc.)
- **Widgets**: Larger feature components (`AboutWidget`)
- **JSON-LD**: Structured data components for SEO

### Technology Stack

- **Framework**: Astro with React integration
- **Styling**: SCSS with global styles and component-level styles
- **Testing**: Vitest for unit tests, Playwright for e2e tests
- **CMS**: microCMS for content management
- **Build**: Vite with custom plugins and optimizations

### Environment Configuration

- `BUILD_ENV=development|production` - Controls cache usage and build optimizations
- `DRAFT=true` - Enables draft content in development
- Sentry integration for error tracking in production

### Test Structure

- Unit tests: `src/**/*.{spec,test}.ts` - Test domain logic and utilities
- E2E tests: `test/e2e/**/*.spec.ts` - Test user interactions and page behavior
- Component tests: Each component has corresponding `.spec.ts` file
