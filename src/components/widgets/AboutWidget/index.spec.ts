import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import AboutWidget from './index.astro'

describe('AboutWidget', () => {
  describe('props', () => {
    it('should render with required description prop', async () => {
      const descriptionText = 'テストコンテンツ'
      const container = await AstroContainer.create()
      const result = await container.renderToString(AboutWidget, {
        props: {
          description: descriptionText,
        },
      })

      const document = parseHTML(result)
      expect(document.querySelector('.content p')?.textContent).toBe(
        descriptionText
      )
    })

    it('should render with custom class', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(AboutWidget, {
        props: {
          class: 'custom-class',
          description: 'Test description',
        },
      })

      const document = parseHTML(result)
      const appCard = document.querySelector('.card')
      expect(appCard?.classList.contains('custom-class')).toBe(true)
    })

    it('should split description by line breaks and render multiple paragraphs', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(AboutWidget, {
        props: {
          description: 'First line\nSecond line\r\nThird line',
        },
      })

      const document = parseHTML(result)
      const paragraphs = document.querySelectorAll('.content p')

      expect(paragraphs.length).toBeGreaterThan(3)

      const textContents = Array.from(paragraphs)
        .map((p) => p.textContent?.trim())
        .filter((text) => text && text.length > 0)
      expect(textContents).toEqual(['First line', 'Second line', 'Third line'])
    })

    it('should filter out empty lines from description', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(AboutWidget, {
        props: {
          description: 'First line\n\nSecond line\r\n\r\nThird line',
        },
      })

      const document = parseHTML(result)
      const paragraphs = document.querySelectorAll('.content p')

      expect(paragraphs.length).toBeGreaterThan(3)

      const textContents = Array.from(paragraphs)
        .map((p) => p.textContent?.trim())
        .filter((text) => text && text.length > 0)
      expect(textContents).toEqual(['First line', 'Second line', 'Third line'])
    })

    it('should render profile image with correct attributes', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(AboutWidget, {
        props: {
          description: 'Test description',
        },
      })

      const document = parseHTML(result)
      const profileImg = document.querySelector('.icon-img')
      expect(profileImg?.getAttribute('src')).toBe('/img/profile.png')
      expect(profileImg?.getAttribute('alt')).toBe('')
      expect(profileImg?.getAttribute('width')).toBe('50')
      expect(profileImg?.getAttribute('height')).toBe('50')
      expect(profileImg?.getAttribute('loading')).toBe('lazy')
    })

    it('should render social media links with correct attributes', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(AboutWidget, {
        props: {
          description: 'Test description',
        },
      })

      const document = parseHTML(result)
      const links = document.querySelectorAll('.link-anchor')
      expect(links).toHaveLength(2)

      const xLink = links[0]
      expect(xLink?.getAttribute('href')).toBe('https://x.com/kimulaco')
      expect(xLink?.getAttribute('target')).toBe('_blank')
      expect(xLink?.getAttribute('rel')).toBe('noopener noreferrer')
      expect(xLink?.querySelector('.link-text')?.textContent).toBe('X')

      const githubLink = links[1]
      expect(githubLink?.getAttribute('href')).toBe(
        'https://github.com/kimulaco'
      )
      expect(githubLink?.getAttribute('target')).toBe('_blank')
      expect(githubLink?.getAttribute('rel')).toBe('noopener noreferrer')
      expect(githubLink?.querySelector('.link-text')?.textContent).toBe(
        'GitHub'
      )
    })
  })
})
