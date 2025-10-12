import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import LayoutColumn from './index.astro'

describe('LayoutColumn', () => {
  describe('slots', () => {
    it('should render single column layout when only main slot is provided', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(LayoutColumn, {
        slots: {
          main: '<main>Main content</main>',
        },
      })

      const document = parseHTML(result)
      const columnElement = document.querySelector('.column')

      expect(columnElement).toBeTruthy()
      expect(columnElement?.classList.contains('single')).toBe(true)
      expect(columnElement?.classList.contains('multi')).toBe(false)
    })

    it('should render multi column layout when both main and sub slots are provided', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(LayoutColumn, {
        slots: {
          main: '<main>Main content</main>',
          sub: '<aside>Sidebar content</aside>',
        },
      })

      const document = parseHTML(result)
      const columnElement = document.querySelector('.column')

      expect(columnElement).toBeTruthy()
      expect(columnElement?.classList.contains('multi')).toBe(true)
      expect(columnElement?.classList.contains('single')).toBe(false)
    })

    it('should render main content correctly', async () => {
      const mainContent =
        '<main><h1>Main Title</h1><p>Main paragraph</p></main>'

      const container = await AstroContainer.create()
      const result = await container.renderToString(LayoutColumn, {
        slots: {
          main: mainContent,
        },
      })

      const document = parseHTML(result)
      const mainColumnElement = document.querySelector('.main')

      expect(mainColumnElement).toBeTruthy()
      expect(mainColumnElement?.innerHTML.trim()).toBe(mainContent)
      expect(mainColumnElement?.querySelector('main')).toBeTruthy()
      expect(mainColumnElement?.querySelector('main h1')).toBeTruthy()
      expect(mainColumnElement?.querySelector('main p')).toBeTruthy()
    })

    it('should render sub content when provided', async () => {
      const subContent = '<nav>Navigation</nav><aside>Sidebar</aside>'

      const container = await AstroContainer.create()
      const result = await container.renderToString(LayoutColumn, {
        slots: {
          main: '<main>Main</main>',
          sub: subContent,
        },
      })

      const document = parseHTML(result)
      const subColumnElement = document.querySelector('.sub')

      expect(subColumnElement).toBeTruthy()
      expect(subColumnElement?.innerHTML.trim()).toBe(subContent)
      expect(subColumnElement?.querySelector('nav')).toBeTruthy()
      expect(subColumnElement?.querySelector('aside')).toBeTruthy()
    })

    it('should not render sub element when sub slot is not provided', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(LayoutColumn, {
        slots: {
          main: '<p>Main content only</p>',
        },
      })

      const document = parseHTML(result)
      const subElement = document.querySelector('.sub')

      expect(subElement).toBeFalsy()
    })

    it('should handle empty main slot', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(LayoutColumn, {
        slots: {
          main: '',
        },
      })

      const document = parseHTML(result)
      const mainElement = document.querySelector('.main')

      expect(mainElement).toBeTruthy()
      expect(mainElement?.innerHTML.trim()).toBe('')
    })

    it('should handle empty sub slot', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(LayoutColumn, {
        slots: {
          main: '<p>Main</p>',
          sub: '',
        },
      })

      const document = parseHTML(result)
      const subElement = document.querySelector('.sub')

      expect(subElement).toBeTruthy()
      expect(subElement?.innerHTML.trim()).toBe('')
    })
  })
})
