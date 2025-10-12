import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, it, expect } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import Card from './index.astro'

describe('AppCard', () => {
  describe('slot', () => {
    it('should render without slot content', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(Card)
      const document = parseHTML(result)

      const cardElement = document.querySelector('.card')
      const innerElement = cardElement?.querySelector('.inner') ?? null

      expect(cardElement).toBeTruthy()
      expect(innerElement).toBeTruthy()
    })

    it('should render with slot content', async () => {
      const container = await AstroContainer.create()
      const testContent = '<p>テストコンテンツ</p>'

      const result = await container.renderToString(Card, {
        slots: { default: testContent },
      })
      const document = parseHTML(result)

      const cardElement = document.querySelector('.card')
      const innerElement = cardElement?.querySelector('.inner') ?? null
      const pElement = innerElement?.querySelector('p') ?? null

      expect(cardElement).toBeTruthy()
      expect(innerElement).toBeTruthy()
      expect(pElement).toBeTruthy()
      expect(pElement?.textContent).toBe('テストコンテンツ')
    })
  })

  describe('props', () => {
    describe('class prop', () => {
      it('should render correctly without class prop', async () => {
        const container = await AstroContainer.create()
        const result = await container.renderToString(Card)
        const document = parseHTML(result)

        const cardElement = document.querySelector('.card')
        expect(cardElement).toBeTruthy()
        expect(cardElement?.className.trim()).toBe('card')
      })

      it('should apply custom class prop correctly', async () => {
        const container = await AstroContainer.create()
        const result = await container.renderToString(Card, {
          props: { class: 'custom-class' },
        })
        const document = parseHTML(result)

        const cardElement = document.querySelector('.card')
        expect(cardElement).toBeTruthy()
        expect(cardElement?.classList.contains('card')).toBe(true)
        expect(cardElement?.classList.contains('custom-class')).toBe(true)
      })

      it('should apply multiple custom class props correctly', async () => {
        const container = await AstroContainer.create()
        const result = await container.renderToString(Card, {
          props: { class: 'class1 class2' },
        })
        const document = parseHTML(result)

        const cardElement = document.querySelector('.card')
        expect(cardElement).toBeTruthy()
        expect(cardElement?.classList.contains('card')).toBe(true)
        expect(cardElement?.classList.contains('class1')).toBe(true)
        expect(cardElement?.classList.contains('class2')).toBe(true)
      })

      it('should apply empty class prop correctly', async () => {
        const container = await AstroContainer.create()
        const result = await container.renderToString(Card, {
          props: {
            class: '',
          },
        })
        const document = parseHTML(result)

        const cardElement = document.querySelector('.card')
        expect(cardElement).toBeTruthy()
        expect(cardElement?.className.trim()).toBe('card')
      })
    })
  })
})
