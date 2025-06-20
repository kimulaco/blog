import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import JsonldWebSite from './index.astro'

describe('JsonldWebSite', () => {
  describe('props', () => {
    it('should render JSON-LD script with correct WebSite schema', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldWebSite)

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )

      expect(scriptElement).toBeTruthy()

      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')
      expect(jsonData['@context']).toBe('http://schema.org')
      expect(jsonData['@type']).toBe('WebSite')
    })

    it('should include basic website information', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldWebSite)

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      expect(jsonData.url).toBeDefined()
      expect(jsonData.name).toBeDefined()
      expect(typeof jsonData.url).toBe('string')
      expect(typeof jsonData.name).toBe('string')
    })

    it('should include publisher information with correct structure', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldWebSite)

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      expect(jsonData.publisher).toBeDefined()
      expect(jsonData.publisher['@type']).toBe('Organization')
      expect(jsonData.publisher.name).toBeDefined()
      expect(jsonData.publisher.logo).toBeDefined()
      expect(jsonData.publisher.logo['@type']).toBe('ImageObject')
      expect(jsonData.publisher.logo.url).toBeDefined()
      expect(jsonData.publisher.logo.width).toBe(512)
      expect(jsonData.publisher.logo.height).toBe(512)
    })

    it('should include author information with correct structure', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldWebSite)

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      expect(jsonData.author).toBeDefined()
      expect(jsonData.author['@type']).toBe('Person')
      expect(jsonData.author.name).toBeDefined()
      expect(typeof jsonData.author.name).toBe('string')
    })

    it('should include image information with correct structure', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldWebSite)

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      expect(jsonData.image).toBeDefined()
      expect(jsonData.image['@type']).toBe('ImageObject')
      expect(jsonData.image.url).toBeDefined()
      expect(jsonData.image.width).toBe(1200)
      expect(jsonData.image.height).toBe(630)
      expect(typeof jsonData.image.url).toBe('string')
    })

    it('should have valid JSON structure', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldWebSite)

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )

      expect(() => {
        JSON.parse(scriptElement?.innerHTML || '{}')
      }).not.toThrow()
    })

    it('should include all required schema.org properties', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldWebSite)

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      const requiredProperties = [
        '@context',
        '@type',
        'url',
        'name',
        'publisher',
        'author',
        'image',
      ]
      requiredProperties.forEach((property) => {
        expect(jsonData[property]).toBeDefined()
      })
    })

    it('should use correct image dimensions for OGP image', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldWebSite)

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      expect(jsonData.image.width).toBe(1200)
      expect(jsonData.image.height).toBe(630)
    })

    it('should use correct logo dimensions', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(JsonldWebSite)

      const document = parseHTML(result)
      const scriptElement = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonData = JSON.parse(scriptElement?.innerHTML || '{}')

      expect(jsonData.publisher.logo.width).toBe(512)
      expect(jsonData.publisher.logo.height).toBe(512)
    })
  })
})
