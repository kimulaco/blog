import { describe, expect, it } from 'vitest'
import { createBreadcrumbList, type Breadcrumb } from './index'

describe('createBreadcrumbList', () => {
  it('should return only TOP page when no breadcrumbs provided', () => {
    const result = createBreadcrumbList([])

    expect(result).toEqual([
      {
        url: 'https://blog.kimulaco.dev',
        text: 'TOPページ',
      },
    ])
  })

  it('should add TOP page to relative URL breadcrumbs', () => {
    const breadcrumbs: Breadcrumb[] = [
      { url: '/about', text: 'About' },
      { url: '/article/123', text: 'Test Article' },
    ]

    const result = createBreadcrumbList(breadcrumbs)

    expect(result).toEqual([
      {
        url: 'https://blog.kimulaco.dev',
        text: 'TOPページ',
      },
      {
        url: 'https://blog.kimulaco.dev/about',
        text: 'About',
      },
      {
        url: 'https://blog.kimulaco.dev/article/123',
        text: 'Test Article',
      },
    ])
  })

  it('should preserve absolute HTTP URLs', () => {
    const breadcrumbs: Breadcrumb[] = [
      { url: 'http://example.com/page', text: 'External Page' },
      { url: '/local/page', text: 'Local Page' },
    ]

    const result = createBreadcrumbList(breadcrumbs)

    expect(result).toEqual([
      {
        url: 'https://blog.kimulaco.dev',
        text: 'TOPページ',
      },
      {
        url: 'http://example.com/page',
        text: 'External Page',
      },
      {
        url: 'https://blog.kimulaco.dev/local/page',
        text: 'Local Page',
      },
    ])
  })

  it('should handle single breadcrumb', () => {
    const breadcrumbs: Breadcrumb[] = [{ url: '/single', text: 'Single Page' }]

    const result = createBreadcrumbList(breadcrumbs)

    expect(result).toEqual([
      {
        url: 'https://blog.kimulaco.dev',
        text: 'TOPページ',
      },
      {
        url: 'https://blog.kimulaco.dev/single',
        text: 'Single Page',
      },
    ])
  })
})
