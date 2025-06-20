import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, it, expect } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import GoogleAds from './index.astro'

describe('GoogleAds', () => {
  describe('props', () => {
    it('should render with required props', async () => {
      const container = await AstroContainer.create()
      const testProps = {
        adSlot: '1234567890',
        width: 300,
        height: 250,
      }

      const result = await container.renderToString(GoogleAds, {
        props: testProps,
      })
      const document = parseHTML(result)

      const containerElement = document.querySelector('.container')
      const insElement = containerElement?.querySelector('ins.adsbygoogle')
      const scriptElement = containerElement?.querySelector('script')

      expect(containerElement).toBeTruthy()
      expect(insElement).toBeTruthy()
      expect(insElement?.getAttribute('data-ad-slot')).toBe('1234567890')
      expect(insElement?.getAttribute('style')).toContain('width:300px')
      expect(insElement?.getAttribute('style')).toContain('height:250px')
      expect(scriptElement).toBeTruthy()
    })

    it('should render with different dimensions', async () => {
      const container = await AstroContainer.create()
      const testProps = {
        adSlot: '9876543210',
        width: 728,
        height: 90,
      }

      const result = await container.renderToString(GoogleAds, {
        props: testProps,
      })
      const document = parseHTML(result)

      const containerElement = document.querySelector('.container')
      const insElement = containerElement?.querySelector('ins.adsbygoogle')

      expect(insElement).toBeTruthy()
      expect(insElement?.getAttribute('data-ad-slot')).toBe('9876543210')
      expect(insElement?.getAttribute('style')).toContain('width:728px')
      expect(insElement?.getAttribute('style')).toContain('height:90px')
    })

    it('should render with data-ad-client attribute', async () => {
      const container = await AstroContainer.create()
      const testProps = {
        adSlot: '1111111111',
        width: 320,
        height: 50,
      }

      const result = await container.renderToString(GoogleAds, {
        props: testProps,
      })
      const document = parseHTML(result)

      const containerElement = document.querySelector('.container')
      const insElement = containerElement?.querySelector('ins.adsbygoogle')

      expect(insElement).toBeTruthy()
      expect(insElement?.hasAttribute('data-ad-client')).toBe(true)
      const adClient = insElement?.getAttribute('data-ad-client')
      expect(adClient).toBeTruthy()
    })

    it('should contain adsbygoogle script', async () => {
      const container = await AstroContainer.create()
      const testProps = {
        adSlot: '2222222222',
        width: 160,
        height: 600,
      }

      const result = await container.renderToString(GoogleAds, {
        props: testProps,
      })
      const document = parseHTML(result)

      const containerElement = document.querySelector('.container')
      const scriptElement = containerElement?.querySelector('script')

      expect(scriptElement).toBeTruthy()
      expect(scriptElement?.textContent).toContain('adsbygoogle')
      expect(scriptElement?.textContent).toContain('push')
    })
  })
})
