import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import { APP_CONFIG } from '@@/config'
import LayoutHeader from './index.astro'

describe('LayoutHeader', () => {
  describe('props', () => {
    it('should render h1 title when currentPath is home', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(LayoutHeader, {
        props: {
          currentPath: '/',
        },
      })

      const document = parseHTML(result)
      const titleElement = document.querySelector('.title')
      const titleTextElement = document.querySelector('.title-text')

      expect(titleElement?.tagName.toLowerCase()).toBe('h1')
      expect(titleTextElement?.tagName.toLowerCase()).toBe('span')
      expect(titleTextElement?.textContent?.trim()).toBe('@kimulaco/blog')
      expect(titleTextElement?.getAttribute('href')).toBeNull()
    })

    it('should render p title with link when currentPath is not home', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(LayoutHeader, {
        props: {
          currentPath: '/about',
        },
      })

      const document = parseHTML(result)
      const titleElement = document.querySelector('.title')
      const titleTextElement = document.querySelector('.title-text')

      expect(titleElement?.tagName.toLowerCase()).toBe('p')
      expect(titleTextElement?.tagName.toLowerCase()).toBe('a')
      expect(titleTextElement?.textContent?.trim()).toBe('@kimulaco/blog')
      expect(titleTextElement?.getAttribute('href')).toBe('/')
    })

    it('should handle undefined currentPath', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(LayoutHeader, {
        props: {},
      })

      const document = parseHTML(result)
      const titleElement = document.querySelector('.title')
      const titleTextElement = document.querySelector('.title-text')

      expect(titleElement?.tagName.toLowerCase()).toBe('p')
      expect(titleTextElement?.tagName.toLowerCase()).toBe('a')
      expect(titleTextElement?.getAttribute('href')).toBe('/')
    })
  })

  it('should render navigation menu with correct links', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(LayoutHeader)

    const document = parseHTML(result)
    const menuItems = document.querySelectorAll('.menu-item a')

    expect(menuItems).toHaveLength(2)

    expect(menuItems[0]?.getAttribute('href')).toBe('/about')
    expect(menuItems[0]?.querySelector('.hidden')?.textContent).toBe('About')

    expect(menuItems[1]?.getAttribute('href')).toBe(APP_CONFIG.URL.FEED)
    expect(menuItems[1]?.querySelector('.hidden')?.textContent).toBe('Feed')
  })
})
