import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, it, expect } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import PageTitle from './index.astro'

describe('PageTitle', () => {
  describe('slots', () => {
    it('should render without slot content', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(PageTitle)
      const document = parseHTML(result)

      const titleElement = document.querySelector('h1.title')
      expect(titleElement).toBeTruthy()
    })

    it('should render with slot content', async () => {
      const container = await AstroContainer.create()
      const testContent = 'ページタイトル'

      const result = await container.renderToString(PageTitle, {
        slots: { default: testContent },
      })
      const document = parseHTML(result)

      const titleElement = document.querySelector('h1.title')
      expect(titleElement).toBeTruthy()
      expect(titleElement?.textContent?.trim()).toBe(testContent)
    })

    it('should render with HTML slot content', async () => {
      const container = await AstroContainer.create()
      const testContent = '<span>スパンで囲まれたタイトル</span>'

      const result = await container.renderToString(PageTitle, {
        slots: { default: testContent },
      })
      const document = parseHTML(result)

      const titleElement = document.querySelector('h1.title')
      const spanElement = titleElement?.querySelector('span')

      expect(titleElement).toBeTruthy()
      expect(spanElement).toBeTruthy()
      expect(spanElement?.textContent).toBe('スパンで囲まれたタイトル')
    })
  })
})
