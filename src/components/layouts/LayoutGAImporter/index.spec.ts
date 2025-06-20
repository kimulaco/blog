import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import LayoutGAImporter from './index.astro'

describe('LayoutGAImporter', () => {
  it('should render Google Analytics scripts', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(LayoutGAImporter)

    const document = parseHTML(result)
    const scriptElements = document.querySelectorAll('script')

    expect(scriptElements).toHaveLength(2)

    expect(scriptElements[0].getAttribute('type')).toBe('text/partytown')
    expect(scriptElements[0].getAttribute('src')).toContain(
      'https://www.googletagmanager.com/gtag/js'
    )
    expect(scriptElements[1].getAttribute('type')).toBe('text/partytown')
  })
})
