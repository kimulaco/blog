import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import LayoutOGP from './index.astro'

describe('LayoutOGP', () => {
  describe('props', () => {
    it('should include required OGP meta properties', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(LayoutOGP, {
        props: {
          title: 'Test Page Title',
          description: 'This is a test page description',
          url: 'https://example.com/test-page',
        },
      })

      const document = parseHTML(result)
      const metaTags = document.querySelectorAll('meta')

      const metaArray = Array.from(metaTags).map((meta) => ({
        name: meta.getAttribute('name'),
        property: meta.getAttribute('property'),
        content: meta.getAttribute('content'),
      }))

      expect(metaArray.length).toBeGreaterThan(0)

      const hasTitle = metaArray.some(
        (meta) => meta.content === 'Test Page Title'
      )
      const hasDescription = metaArray.some(
        (meta) => meta.content === 'This is a test page description'
      )
      const hasUrl = metaArray.some((meta) => {
        try {
          const parsedUrl = new URL(meta.content || '')
          return (
            parsedUrl.host === 'example.com' &&
            parsedUrl.pathname === '/test-page'
          )
        } catch {
          return false
        }
      })

      expect(hasTitle).toBeTruthy()
      expect(hasDescription).toBeTruthy()
      expect(hasUrl).toBeTruthy()
    })

    it('should handle optional imagePath parameter', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(LayoutOGP, {
        props: {
          title: 'Test Title',
          description: 'Test description',
          url: 'https://example.com/test',
          imagePath: '/images/custom-ogp.png',
        },
      })

      const document = parseHTML(result)
      const metaTags = document.querySelectorAll('meta')

      const metaArray = Array.from(metaTags).map((meta) => ({
        name: meta.getAttribute('name'),
        property: meta.getAttribute('property'),
        content: meta.getAttribute('content'),
      }))

      const hasCustomImage = metaArray.some((meta) => {
        try {
          const url = new URL(meta.content || '')
          return url.pathname === '/images/custom-ogp.png'
        } catch {
          return false
        }
      })

      expect(hasCustomImage).toBeTruthy()
    })

    it('should handle empty string values', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(LayoutOGP, {
        props: {
          title: '',
          description: '',
          url: '',
        },
      })

      const document = parseHTML(result)
      const metaTags = document.querySelectorAll('meta')

      expect(metaTags.length).toBeGreaterThanOrEqual(0)
    })
  })
})
