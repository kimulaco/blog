import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import { parseHTML } from '@@/test/utilities'
import LayoutNewRelicImporter from './index.astro'

describe('LayoutNewRelicImporter', () => {
  it('should render New Relic script', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(LayoutNewRelicImporter)

    const document = parseHTML(result)
    const scriptElements = document.querySelectorAll(
      'script[type="text/javascript"]'
    )
    expect(scriptElements).toHaveLength(1)

    expect(scriptElements[0].getAttribute('type')).toBe('text/javascript')
  })
})
