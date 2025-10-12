import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, it, expect } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import type { Article } from '@/core/domains/article'
import ArticleItem from './index.astro'

describe('ArticleItem', () => {
  const createMockArticle = (overrides: Partial<Article> = {}): Article => ({
    id: 'test-article-1',
    created_at: '2025-01-01T10:30:00Z',
    updated_at: '2025-01-02T15:45:00Z',
    publish: true,
    title: 'テスト記事のタイトル',
    description: 'これはテスト記事の説明文です。',
    tag: [],
    content: 'テスト記事の内容',
    related_posts: [],
    ...overrides,
  })

  describe('props', () => {
    it('should render article without tags', async () => {
      const container = await AstroContainer.create()
      const testArticle = createMockArticle()

      const result = await container.renderToString(ArticleItem, {
        props: { article: testArticle },
      })
      const document = parseHTML(result)

      const itemElement = document.querySelector('section.item')
      const titleElement = itemElement?.querySelector('h3.title')
      const linkElement = itemElement?.querySelector('h3.title a')
      const descriptionElement = itemElement?.querySelector('p.description')
      const timestampElement = itemElement?.querySelector('.timestamp')
      const tagsElement = itemElement?.querySelector('.tags')

      expect(itemElement).toBeTruthy()
      expect(titleElement).toBeTruthy()
      expect(linkElement).toBeTruthy()
      expect(linkElement?.getAttribute('href')).toBe('/article/test-article-1')
      expect(linkElement?.textContent?.trim()).toBe('テスト記事のタイトル')
      expect(descriptionElement).toBeTruthy()
      expect(descriptionElement?.textContent).toBe(
        'これはテスト記事の説明文です。'
      )
      expect(timestampElement).toBeTruthy()
      expect(tagsElement).toBeFalsy()
    })

    it('should render article with tags', async () => {
      const container = await AstroContainer.create()
      const testArticle = createMockArticle({
        tag: [
          { id: 'tag1', name: 'タグ1' },
          { id: 'tag2', name: 'タグ2' },
        ],
      })

      const result = await container.renderToString(ArticleItem, {
        props: { article: testArticle },
      })
      const document = parseHTML(result)

      const itemElement = document.querySelector('section.item')
      const titleElement = itemElement?.querySelector('h3.title')
      const linkElement = itemElement?.querySelector('h3.title a')
      const descriptionElement = itemElement?.querySelector('p.description')
      const timestampElement = itemElement?.querySelector('.timestamp')
      const tagsElement = itemElement?.querySelector('.tags')

      expect(itemElement).toBeTruthy()
      expect(titleElement).toBeTruthy()
      expect(linkElement).toBeTruthy()
      expect(linkElement?.getAttribute('href')).toBe('/article/test-article-1')
      expect(linkElement?.textContent?.trim()).toBe('テスト記事のタイトル')
      expect(descriptionElement).toBeTruthy()
      expect(descriptionElement?.textContent).toBe(
        'これはテスト記事の説明文です。'
      )
      expect(timestampElement).toBeTruthy()
      expect(tagsElement).toBeTruthy()
    })

    it('should render article with only createdAt', async () => {
      const container = await AstroContainer.create()
      const testArticle = createMockArticle({
        updated_at: undefined,
      })

      const result = await container.renderToString(ArticleItem, {
        props: { article: testArticle },
      })
      const document = parseHTML(result)

      const itemElement = document.querySelector('section.item')
      const timestampElement = itemElement?.querySelector('.timestamp')

      expect(itemElement).toBeTruthy()
      expect(timestampElement).toBeTruthy()
    })
  })
})
