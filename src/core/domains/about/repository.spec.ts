import { describe, expect, it, vi, beforeEach } from 'vitest'
import type { GetAboutRequest } from './type'

vi.mock('@/core/repositories/microcms', () => ({
  microcms: {
    getObject: vi.fn(),
  },
}))

describe('about repository', () => {
  const mockAbout: GetAboutRequest = {
    about_widget: 'Test widget description\nSecond line',
    about: 'Test about content',
    contact: 'Test contact info',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchAbout', () => {
    it('should fetch about data from microcms', async () => {
      const { fetchAbout } = await import('./repository')
      const { microcms } = await import('@/core/repositories/microcms')

      vi.mocked(microcms.getObject).mockResolvedValue(mockAbout as any)

      const result = await fetchAbout()

      expect(microcms.getObject).toHaveBeenCalledWith({
        endpoint: 'about',
      })
      expect(result).toEqual(mockAbout)
    })

    it('should handle microcms errors', async () => {
      const { fetchAbout } = await import('./repository')
      const { microcms } = await import('@/core/repositories/microcms')

      const error = new Error('microCMS API error')
      vi.mocked(microcms.getObject).mockRejectedValue(error)

      await expect(fetchAbout()).rejects.toThrow('microCMS API error')
    })
  })
})
