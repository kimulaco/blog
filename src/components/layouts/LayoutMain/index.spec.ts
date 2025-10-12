import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import LayoutMain from './index.astro'

describe('LayoutMain', () => {
  describe('slots', () => {
    it('should render slot content correctly', async () => {
      const testContent = '<h1>Test Heading</h1><p>Test paragraph</p>'

      const container = await AstroContainer.create()
      const result = await container.renderToString(LayoutMain, {
        slots: {
          default: testContent,
        },
      })

      const document = parseHTML(result)
      const innerElement = document.querySelector('.inner')

      expect(innerElement?.innerHTML.trim()).toBe(testContent)
    })

    it('should handle empty slot content', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(LayoutMain, {
        slots: {
          default: '',
        },
      })

      const document = parseHTML(result)
      const innerElement = document.querySelector('.inner')

      expect(innerElement).toBeTruthy()
      expect(innerElement?.innerHTML.trim()).toBe('')
    })

    it('should render with complex nested content', async () => {
      const complexContent = `
        <article>
          <h1>Article Title</h1>
          <section>
            <p>Article content</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </section>
        </article>
      `

      const container = await AstroContainer.create()
      const result = await container.renderToString(LayoutMain, {
        slots: {
          default: complexContent,
        },
      })

      const document = parseHTML(result)
      const innerElement = document.querySelector('.inner')

      expect(innerElement?.querySelector('article')).toBeTruthy()
      expect(innerElement?.querySelector('h1')).toBeTruthy()
      expect(innerElement?.querySelector('section')).toBeTruthy()
      expect(innerElement?.querySelectorAll('li')).toHaveLength(2)
    })
  })
})
