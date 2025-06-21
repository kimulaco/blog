import { describe, expect, it, vi, beforeEach } from 'vitest'
import type { GetAboutRequest } from './type'

const mockBuildConfig = vi.hoisted(() => ({ isEnableDraft: false }))

vi.mock('@@/config/build', () => mockBuildConfig)

vi.mock('./cache', () => ({
  aboutCache: {
    save: vi.fn(),
    getCacheFilePath: vi.fn(() => '/cache/about.json'),
  },
  getCachedAbout: vi.fn(),
}))

vi.mock('./repository', () => ({
  fetchAbout: vi.fn(),
}))

describe('about domain', () => {
  const mockAbout: GetAboutRequest = {
    about_widget: 'Test widget description\nSecond line',
    about: 'Test about content',
    contact: 'Test contact info',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockBuildConfig.isEnableDraft = false
  })

  describe('getAbout', () => {
    it('should return cached about when cache is enabled', async () => {
      mockBuildConfig.isEnableDraft = false
      vi.resetModules()

      const { getAbout } = await import('./index')
      const { getCachedAbout } = await import('./cache')

      vi.mocked(getCachedAbout).mockResolvedValue(mockAbout)

      const result = await getAbout()

      expect(getCachedAbout).toHaveBeenCalled()
      expect(result).toEqual(mockAbout)
    })

    it('should return repository about when cache is disabled', async () => {
      mockBuildConfig.isEnableDraft = true
      vi.resetModules()

      const { getAbout } = await import('./index')
      const { fetchAbout } = await import('./repository')

      vi.mocked(fetchAbout).mockResolvedValue(mockAbout)

      const result = await getAbout()

      expect(fetchAbout).toHaveBeenCalled()
      expect(result).toEqual(mockAbout)
    })
  })

  describe('generateAboutCache', () => {
    it('should fetch about data, save to cache, and return cache file path', async () => {
      const { generateAboutCache } = await import('./index')
      const { fetchAbout } = await import('./repository')
      const { aboutCache } = await import('./cache')

      vi.mocked(fetchAbout).mockResolvedValue(mockAbout)

      const result = await generateAboutCache()

      expect(fetchAbout).toHaveBeenCalled()
      expect(aboutCache.save).toHaveBeenCalledWith({
        about: mockAbout,
      })
      expect(result).toEqual({
        cacheFilePath: '/cache/about.json',
      })
    })
  })
})
