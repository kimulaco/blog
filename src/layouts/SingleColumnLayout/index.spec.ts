import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import SingleColumnLayout from './index.astro'

describe('SingleColumnLayout', () => {
  describe('props', () => {
    it('should render complete HTML document structure', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(SingleColumnLayout, {
        props: {
          title: 'Test Page Title',
          description: 'Test page description',
          currentPath: '/test-page',
        },
      })

      const document = parseHTML(result)
      const htmlElement = document.querySelector('html')
      const headElement = document.querySelector('head')

      expect(htmlElement).toBeTruthy()
      expect(htmlElement?.getAttribute('lang')).toBe('ja')
      expect(headElement).toBeTruthy()
      expect(
        headElement?.querySelector('link[rel="icon"][href="/favicon.ico"]')
      ).toBeTruthy()
      expect(
        headElement?.querySelector(
          'link[rel="sitemap"][href="/sitemap-index.xml"]'
        )
      ).toBeTruthy()
    })

    it('should render title in head', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(SingleColumnLayout, {
        props: {
          title: 'Custom Page Title',
          description: 'Test description',
          currentPath: '/test',
        },
      })

      const document = parseHTML(result)
      const headElement = document.querySelector('head')
      const titleElement = headElement?.querySelector('title')

      expect(headElement).toBeTruthy()
      expect(titleElement?.textContent).toBe('Custom Page Title')
    })

    it('should set canonical URL correctly', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(SingleColumnLayout, {
        props: {
          title: 'Test Title',
          description: 'Test description',
          currentPath: '/test-path',
        },
      })

      const document = parseHTML(result)
      const headElement = document.querySelector('head')
      const canonicalLink = headElement?.querySelector('link[rel="canonical"]')

      expect(headElement).toBeTruthy()
      expect(canonicalLink?.getAttribute('href')).toContain('/test-path')
    })

    it('should render single-column layout structure', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(SingleColumnLayout, {
        props: {
          title: 'Test Title',
          description: 'Test description',
          currentPath: '/test',
        },
      })

      const document = parseHTML(result)

      expect(document.querySelector('main')).toBeTruthy()
      expect(document.querySelector('aside')).toBeFalsy()
    })

    it('should render slot content correctly', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(SingleColumnLayout, {
        props: {
          title: 'Test Title',
          description: 'Test description',
          currentPath: '/test',
        },
        slots: {
          default: '<h1>Main Content</h1>',
        },
      })

      const document = parseHTML(result)
      const mainContent = document.querySelector('main h1')

      expect(mainContent?.textContent).toBe('Main Content')
    })

    it('should handle optional ogpImagePath prop', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(SingleColumnLayout, {
        props: {
          title: 'Test Title',
          description: 'Test description',
          currentPath: '/test',
          ogpImagePath: '/images/custom-ogp.png',
        },
      })

      const document = parseHTML(result)
      const headElement = document.querySelector('head')
      const metaTags = headElement?.querySelectorAll('meta')

      const hasCustomImage = Array.from(metaTags || []).some((meta) =>
        meta.getAttribute('content')?.includes('/images/custom-ogp.png')
      )

      expect(hasCustomImage).toBeTruthy()
    })

    it('should render without ogpImagePath prop', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(SingleColumnLayout, {
        props: {
          title: 'Test Title',
          description: 'Test description',
          currentPath: '/test',
        },
      })

      expect(result).toBeTruthy()
      expect(result.length).toBeGreaterThan(0)
    })
  })
})
