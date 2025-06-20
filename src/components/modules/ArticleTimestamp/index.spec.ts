import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, it, expect } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import ArticleTimestamp from './index.astro'

describe('ArticleTimestamp', () => {
  describe('props', () => {
    it('should render with only createdAt', async () => {
      const container = await AstroContainer.create()
      const testCreatedAt = '2024-01-15T10:30:00Z'

      const result = await container.renderToString(ArticleTimestamp, {
        props: { createdAt: testCreatedAt },
      })
      const document = parseHTML(result)

      const timestampElement = document.querySelector('.timestamp')
      const listElement = timestampElement?.querySelector('.list')
      const items = listElement?.querySelectorAll('.item')
      const createdItem = items?.[0]
      const createdName = createdItem?.querySelector('.name')
      const createdValue = createdItem?.querySelector('.value')

      expect(timestampElement).toBeTruthy()
      expect(items?.length).toBe(1)
      expect(createdName?.textContent).toBe('投稿日:')
      expect(createdValue?.textContent).toBe('2024-01-15')
    })

    it('should render with both createdAt and updatedAt', async () => {
      const container = await AstroContainer.create()
      const testCreatedAt = '2024-01-15T10:30:00Z'
      const testUpdatedAt = '2024-01-20T10:45:00Z'

      const result = await container.renderToString(ArticleTimestamp, {
        props: {
          createdAt: testCreatedAt,
          updatedAt: testUpdatedAt,
        },
      })
      const document = parseHTML(result)

      const timestampElement = document.querySelector('.timestamp')
      const listElement = timestampElement?.querySelector('.list')
      const items = listElement?.querySelectorAll('.item')
      const createdItem = items?.[0]
      const updatedItem = items?.[1]
      const createdName = createdItem?.querySelector('.name')
      const createdValue = createdItem?.querySelector('.value')
      const updatedName = updatedItem?.querySelector('.name')
      const updatedValue = updatedItem?.querySelector('.value')

      expect(timestampElement).toBeTruthy()
      expect(items?.length).toBe(2)
      expect(createdName?.textContent).toBe('投稿日:')
      expect(createdValue?.textContent).toBe('2024-01-15')
      expect(updatedName?.textContent).toBe('更新日:')
      expect(updatedValue?.textContent).toBe('2024-01-20')
    })

    it('should not render updatedAt when not provided', async () => {
      const container = await AstroContainer.create()
      const testCreatedAt = '2024-01-15T10:30:00Z'

      const result = await container.renderToString(ArticleTimestamp, {
        props: { createdAt: testCreatedAt },
      })
      const document = parseHTML(result)

      const listElement = document.querySelector('.list')
      const items = listElement?.querySelectorAll('.item')
      const updatedNames = listElement?.querySelectorAll('.name')

      expect(items?.length).toBe(1)

      // 更新日が含まれていないことを確認
      const hasUpdatedAt =
        updatedNames &&
        Array.from(updatedNames).some((name) => name.textContent === '更新日:')
      expect(hasUpdatedAt).toBe(false)
    })
  })
})
