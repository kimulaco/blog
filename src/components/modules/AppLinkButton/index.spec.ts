import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, it, expect } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import AppLinkButton from './index.astro'

describe('AppLinkButton', () => {
  describe('slot', () => {
    it('should render with slot content', async () => {
      const container = await AstroContainer.create()
      const testContent = 'クリックしてください'
      const testHref = '/test-link'

      const result = await container.renderToString(AppLinkButton, {
        props: { href: testHref },
        slots: { default: testContent },
      })
      const document = parseHTML(result)

      const linkElement = document.querySelector('a.button')
      expect(linkElement).toBeTruthy()
      expect(linkElement?.textContent?.trim()).toBe(testContent)
      expect(linkElement?.getAttribute('href')).toBe(testHref)
    })
  })

  describe('props', () => {
    it('should render with href prop', async () => {
      const container = await AstroContainer.create()
      const testHref = '/test-link'

      const result = await container.renderToString(AppLinkButton, {
        props: { href: testHref },
      })
      const document = parseHTML(result)

      const linkElement = document.querySelector('a.button')
      expect(linkElement).toBeTruthy()
      expect(linkElement?.getAttribute('href')).toBe(testHref)
    })

    it('should render with external URL', async () => {
      const container = await AstroContainer.create()
      const testHref = 'https://example.com'
      const testContent = '外部リンク'

      const result = await container.renderToString(AppLinkButton, {
        props: { href: testHref },
        slots: { default: testContent },
      })
      const document = parseHTML(result)

      const linkElement = document.querySelector('a.button')
      expect(linkElement).toBeTruthy()
      expect(linkElement?.getAttribute('href')).toBe(testHref)
      expect(linkElement?.textContent?.trim()).toBe(testContent)
    })
  })
})
