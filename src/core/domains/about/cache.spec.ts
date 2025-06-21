import { describe, expect, it, vi, beforeEach } from 'vitest'
import type { About } from './type'
import { getCachedAbout, aboutCache } from './cache'

vi.mock('@/core/buildCache', () => ({
  useBuildCache: vi.fn(() => ({
    get: vi.fn(),
    save: vi.fn(),
    getCacheFilePath: vi.fn(),
  })),
}))

describe('about cache', () => {
  const mockAbout: About = {
    about_widget: 'Test widget description\nSecond line',
    about: 'Test about content',
    contact: 'Test contact info',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getCachedAbout', () => {
    it('should return about data when cache exists', async () => {
      vi.mocked(aboutCache.get).mockResolvedValue({
        about: mockAbout,
      })

      const result = await getCachedAbout()

      expect(result).toEqual(mockAbout)
    })

    it('should return default empty about when no cache exists', async () => {
      vi.mocked(aboutCache.get).mockResolvedValue(null)

      const result = await getCachedAbout()

      expect(result).toEqual({
        about_widget: '',
        about: '',
        contact: '',
      })
    })

    it('should return default empty about when cache exists but about is undefined', async () => {
      vi.mocked(aboutCache.get).mockResolvedValue({})

      const result = await getCachedAbout()

      expect(result).toEqual({
        about_widget: '',
        about: '',
        contact: '',
      })
    })
  })
})
