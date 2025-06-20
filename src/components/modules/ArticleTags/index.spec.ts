import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, it, expect } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import type { ArticleTag } from '@/core/domains/article'
import ArticleTags from './index.astro'

describe('ArticleTags', () => {
  describe('props', () => {
    it('should render empty list when no tags provided', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(ArticleTags, {
        props: { tags: [] },
      })
      const document = parseHTML(result)

      const listElement = document.querySelector('ul.list')
      const items = listElement?.querySelectorAll('li.item')

      expect(listElement).toBeTruthy()
      expect(items?.length).toBe(0)
    })

    it('should render single tag', async () => {
      const container = await AstroContainer.create()
      const testTags: ArticleTag[] = [{ id: 'tag1', name: 'テストタグ' }]

      const result = await container.renderToString(ArticleTags, {
        props: { tags: testTags },
      })
      const document = parseHTML(result)

      const listElement = document.querySelector('ul.list')
      const items = document.querySelectorAll('li.item')
      const link = document.querySelector('a.link')

      expect(listElement).toBeTruthy()
      expect(items.length).toBe(1)
      expect(link).toBeTruthy()
      expect(link?.getAttribute('href')).toBe('/tag/tag1')
      expect(link?.textContent?.trim()).toBe('テストタグ')
    })

    it('should render multiple tags', async () => {
      const container = await AstroContainer.create()
      const testTags: ArticleTag[] = [
        { id: 'tag1', name: 'タグ1' },
        { id: 'tag2', name: 'タグ2' },
        { id: 'tag3', name: 'タグ3' },
      ]

      const result = await container.renderToString(ArticleTags, {
        props: { tags: testTags },
      })
      const document = parseHTML(result)

      const listElement = document.querySelector('ul.list')
      const items = listElement?.querySelectorAll('li.item')
      const links = listElement?.querySelectorAll('a.link')

      expect(listElement).toBeTruthy()
      expect(items?.length).toBe(3)
      expect(links?.length).toBe(3)

      // 各タグのリンクと内容を確認
      testTags.forEach((tag, index) => {
        const link = links?.[index]
        expect(link?.getAttribute('href')).toBe(`/tag/${tag.id}`)
        expect(link?.textContent?.trim()).toBe(tag.name)
      })
    })
  })
})
