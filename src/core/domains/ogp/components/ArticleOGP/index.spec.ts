import { describe, it, expect } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ArticleOGP } from './index'

describe('ArticleOGP', () => {
  it('should render title', () => {
    const html = renderToStaticMarkup(
      createElement(ArticleOGP, { title: 'Test Title', iconBase64: 'abc' })
    )
    expect(html).toContain('Test Title')
  })

  it('should render icon image with base64 data', () => {
    const iconBase64 = 'base64imagedata'
    const html = renderToStaticMarkup(
      createElement(ArticleOGP, { title: 'Title', iconBase64 })
    )
    expect(html).toContain(`data:image/png;base64,${iconBase64}`)
  })
})
