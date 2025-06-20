import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, it, expect } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import AppHeading from './index.astro'

describe('AppHeading', () => {
  describe('slot', () => {
    it('should render without slot content', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(AppHeading)
      const document = parseHTML(result)

      const headingElement = document.querySelector('h2.heading')
      expect(headingElement).toBeTruthy()
    })

    it('should render with slot content', async () => {
      const container = await AstroContainer.create()
      const testContent = 'テストタイトル'

      const result = await container.renderToString(AppHeading, {
        slots: { default: testContent },
      })
      const document = parseHTML(result)

      const headingElement = document.querySelector('h2.heading')
      expect(headingElement).toBeTruthy()
      expect(headingElement?.textContent?.trim()).toBe(testContent)
    })

    it('should render with HTML slot content', async () => {
      const container = await AstroContainer.create()
      const testContent = '<strong>強調されたタイトル</strong>'

      const result = await container.renderToString(AppHeading, {
        slots: { default: testContent },
      })
      const document = parseHTML(result)

      const headingElement = document.querySelector('h2.heading')
      const strongElement = headingElement?.querySelector('strong')

      expect(headingElement).toBeTruthy()
      expect(strongElement).toBeTruthy()
      expect(strongElement?.textContent).toBe('強調されたタイトル')
    })
  })
})
