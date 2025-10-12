import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import { APP_CONFIG } from '@@/config/app'
import type { Article } from '@/core/domains/article'
import JsonldBlogPosting from './index.astro'

const mockArticle: Article = {
  id: 'test-article-id',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-02T00:00:00Z',
  publish: true,
  title: 'テスト記事タイトル',
  description: 'テスト記事の説明文です',
  content: 'テスト記事のコンテンツです',
  tag: [
    {
      id: 'tag1',
      name: 'テストタグ',
    },
  ],
  related_posts: [],
}

describe('JsonldBlogPosting', () => {
  describe('props', () => {
    it('should render JSON-LD script with correct BlogPosting schema', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldBlogPosting, {
        props: {
          article: mockArticle,
        },
      })

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )

      expect(scriptElement).toBeTruthy()

      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')
      expect(jsonData['@context']).toBe('http://schema.org')
      expect(jsonData['@type']).toBe('BlogPosting')
    })

    it('should include article information in schema', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldBlogPosting, {
        props: {
          article: mockArticle,
        },
      })

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      expect(jsonData.headline).toBe(
        `${mockArticle.title} | ${APP_CONFIG.META.TITLE}`
      )
      expect(jsonData.description).toBe(mockArticle.description)
      expect(jsonData.datePublished).toBe(mockArticle.created_at)
      expect(jsonData.dateModified).toBe(mockArticle.updated_at)
      expect(jsonData.mainEntityOfPage['@id']).toContain(mockArticle.id)
    })

    it('should include publisher information', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldBlogPosting, {
        props: {
          article: mockArticle,
        },
      })

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      expect(jsonData.publisher).toBeDefined()
      expect(jsonData.publisher['@type']).toBe('Organization')
      expect(jsonData.publisher.logo).toBeDefined()
      expect(jsonData.publisher.logo['@type']).toBe('ImageObject')
    })

    it('should include author information', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldBlogPosting, {
        props: {
          article: mockArticle,
        },
      })

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      expect(jsonData.author).toBeDefined()
      expect(jsonData.author['@type']).toBe('Person')
      expect(jsonData.author.name).toBeDefined()
    })

    it('should handle article without updated_at', async () => {
      const articleWithoutUpdate = { ...mockArticle, updated_at: undefined }

      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldBlogPosting, {
        props: {
          article: articleWithoutUpdate,
        },
      })

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      expect(jsonData.dateModified).toBe('')
    })

    it('should include required schema properties', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldBlogPosting, {
        props: {
          article: mockArticle,
        },
      })

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      expect(jsonData.name).toBeDefined()
      expect(jsonData.headline).toBeDefined()
      expect(jsonData.inLanguage).toBe('jp')
      expect(jsonData.url).toBeDefined()
      expect(jsonData.image).toBeDefined()
      expect(Array.isArray(jsonData.image)).toBe(true)
      expect(jsonData.mainEntityOfPage).toBeDefined()
      expect(jsonData.mainEntityOfPage['@type']).toBe('WebPage')
    })
  })
})
