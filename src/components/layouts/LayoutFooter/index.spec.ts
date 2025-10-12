import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import { APP_CONFIG } from '@@/config'
import LayoutFooter from './index.astro'

describe('LayoutFooter', () => {
  it('should render navigation menu with correct links', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(LayoutFooter)

    const document = parseHTML(result)
    const menuItems = document.querySelectorAll('.menu-item a')

    expect(menuItems).toHaveLength(3)

    expect(menuItems[0]?.getAttribute('href')).toBe('/about')
    expect(menuItems[0]?.textContent).toBe('About')

    expect(menuItems[1]?.getAttribute('href')).toBe('/about#contact')
    expect(menuItems[1]?.textContent).toBe('Contact')

    expect(menuItems[2]?.getAttribute('href')).toBe(APP_CONFIG.URL.FEED)
    expect(menuItems[2]?.textContent).toBe('Feed')
  })

  it('should render copyright notice', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(LayoutFooter)

    const document = parseHTML(result)
    const copyrightElement = document.querySelector('.copyright')

    expect(copyrightElement).toBeTruthy()
    expect(copyrightElement?.textContent).toBe('&copy; 2025 kimulaco.')
  })
})
