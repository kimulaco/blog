import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import type { Breadcrumb } from '@/core/domains/breadcrumb'
import JsonldBreadcrumbList from './index.astro'

type ItemListElement = {
  '@type': string
  position: number
  item: {
    '@id': string
    name: string
  }
}

const mockBreadcrumbs: Breadcrumb[] = [
  {
    url: 'https://example.com',
    text: 'ホーム',
  },
  {
    url: 'https://example.com/category',
    text: 'カテゴリ',
  },
  {
    url: 'https://example.com/category/article',
    text: '記事タイトル',
  },
]

describe('JsonldBreadcrumbList', () => {
  describe('props', () => {
    it('should render JSON-LD script with correct BreadcrumbList schema', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldBreadcrumbList, {
        props: {
          breadcrumbs: mockBreadcrumbs,
        },
      })

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )

      expect(scriptElement).toBeTruthy()

      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')
      expect(jsonData['@context']).toBe('http://schema.org')
      expect(jsonData['@type']).toBe('BreadcrumbList')
    })

    it('should include all breadcrumb items in correct order', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldBreadcrumbList, {
        props: {
          breadcrumbs: mockBreadcrumbs,
        },
      })

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      expect(jsonData.itemListElement).toBeDefined()
      expect(Array.isArray(jsonData.itemListElement)).toBe(true)
      expect(jsonData.itemListElement).toHaveLength(mockBreadcrumbs.length)
    })

    it('should set correct position for each breadcrumb item', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldBreadcrumbList, {
        props: {
          breadcrumbs: mockBreadcrumbs,
        },
      })

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      jsonData.itemListElement.forEach(
        (item: ItemListElement, index: number) => {
          expect(item.position).toBe(index + 1)
          expect(item['@type']).toBe('ListItem')
        }
      )
    })

    it('should include correct item information for each breadcrumb', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldBreadcrumbList, {
        props: {
          breadcrumbs: mockBreadcrumbs,
        },
      })

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      jsonData.itemListElement.forEach(
        (item: ItemListElement, index: number) => {
          expect(item.item).toBeDefined()
          expect(item.item['@id']).toBe(mockBreadcrumbs[index].url)
          expect(item.item.name).toBe(mockBreadcrumbs[index].text)
        }
      )
    })

    it('should handle single breadcrumb item', async () => {
      const singleBreadcrumb = [mockBreadcrumbs[0]]

      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldBreadcrumbList, {
        props: {
          breadcrumbs: singleBreadcrumb,
        },
      })

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      expect(jsonData.itemListElement).toHaveLength(1)
      expect(jsonData.itemListElement[0].position).toBe(1)
      expect(jsonData.itemListElement[0].item['@id']).toBe(
        singleBreadcrumb[0].url
      )
      expect(jsonData.itemListElement[0].item.name).toBe(
        singleBreadcrumb[0].text
      )
    })

    it('should handle empty breadcrumbs array', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldBreadcrumbList, {
        props: {
          breadcrumbs: [],
        },
      })

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      expect(jsonData.itemListElement).toHaveLength(0)
      expect(Array.isArray(jsonData.itemListElement)).toBe(true)
    })

    it('should maintain breadcrumb order and structure', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldBreadcrumbList, {
        props: {
          breadcrumbs: mockBreadcrumbs,
        },
      })

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      for (let i = 0; i < mockBreadcrumbs.length; i++) {
        const item = jsonData.itemListElement[i]
        expect(item.position).toBe(i + 1)
        expect(item.item['@id']).toBe(mockBreadcrumbs[i].url)
        expect(item.item.name).toBe(mockBreadcrumbs[i].text)
      }
    })
  })
})
