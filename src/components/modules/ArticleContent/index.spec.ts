import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, it, expect } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import ArticleContent from './index.astro'

describe('ArticleContent', () => {
  describe('props', () => {
    it('should render with simple text content', async () => {
      const container = await AstroContainer.create()
      const testContent = 'これはテストコンテンツです。'

      const result = await container.renderToString(ArticleContent, {
        props: { content: testContent },
      })
      const document = parseHTML(result)

      const contentElement = document.querySelector('.PostContent')
      expect(contentElement).toBeTruthy()
      expect(contentElement?.textContent?.trim()).toBe(testContent)
    })

    it('should render with markdown content', async () => {
      const container = await AstroContainer.create()
      const testContent = '# テストタイトル\n\nこれは**太字**のテストです。'

      const result = await container.renderToString(ArticleContent, {
        props: { content: testContent },
      })
      const document = parseHTML(result)

      const contentElement = document.querySelector('.PostContent')
      const h1Element = contentElement?.querySelector('h1')
      const strongElement = contentElement?.querySelector('strong')

      expect(contentElement).toBeTruthy()
      expect(h1Element).toBeTruthy()
      expect(h1Element?.textContent).toBe('テストタイトル')
      expect(strongElement).toBeTruthy()
      expect(strongElement?.textContent).toBe('太字')
    })

    it('should render with markdown list', async () => {
      const container = await AstroContainer.create()
      const testContent = '- アイテム1\n- アイテム2\n- アイテム3'

      const result = await container.renderToString(ArticleContent, {
        props: { content: testContent },
      })
      const document = parseHTML(result)

      const contentElement = document.querySelector('.PostContent')
      const ulElement = contentElement?.querySelector('ul')
      const liElements = contentElement?.querySelectorAll('li')

      expect(contentElement).toBeTruthy()
      expect(ulElement).toBeTruthy()
      expect(liElements?.length).toBe(3)
      expect(liElements?.[0]?.textContent?.trim()).toBe('アイテム1')
      expect(liElements?.[1]?.textContent?.trim()).toBe('アイテム2')
      expect(liElements?.[2]?.textContent?.trim()).toBe('アイテム3')
    })

    it('should render with markdown code block', async () => {
      const container = await AstroContainer.create()
      const testContent = '```javascript\nconsole.log("Hello World");\n```'

      const result = await container.renderToString(ArticleContent, {
        props: { content: testContent },
      })
      const document = parseHTML(result)

      const contentElement = document.querySelector('.PostContent')
      const preElement = contentElement?.querySelector('pre')
      const codeElement = contentElement?.querySelector('code')

      expect(contentElement).toBeTruthy()
      expect(preElement).toBeTruthy()
      expect(codeElement).toBeTruthy()
      expect(codeElement?.textContent?.includes('console.log')).toBe(true)
    })
  })
})
