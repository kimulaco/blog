import { describe, expect, it, vi, beforeEach } from 'vitest'

vi.mock('microcms-js-sdk', () => ({
  createClient: vi.fn(),
}))

vi.mock('@/core/utilities/getenv', () => ({
  getenv: vi.fn(),
}))

describe('microcms client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  describe('client initialization', () => {
    it('should create microcms client with valid environment variables', async () => {
      const { getenv } = await import('@/core/utilities/getenv')
      const { createClient } = await import('microcms-js-sdk')

      vi.mocked(getenv)
        .mockReturnValueOnce('test-service-domain')
        .mockReturnValueOnce('test-api-key')

      await import('./index')

      expect(getenv).toHaveBeenCalledWith('MICROCMS_SERVICE_DOMAIN')
      expect(getenv).toHaveBeenCalledWith('MICROCMS_API_KEY')
      expect(createClient).toHaveBeenCalledWith({
        serviceDomain: 'test-service-domain',
        apiKey: 'test-api-key',
      })
    })

    it('should throw error when MICROCMS_SERVICE_DOMAIN is not defined', async () => {
      const { getenv } = await import('@/core/utilities/getenv')

      vi.mocked(getenv)
        .mockReturnValueOnce('')
        .mockReturnValueOnce('test-api-key')

      await expect(import('./index')).rejects.toThrow(
        'MICROCMS_SERVICE_DOMAIN is not defined'
      )
    })

    it('should throw error when MICROCMS_API_KEY is not defined', async () => {
      const { getenv } = await import('@/core/utilities/getenv')

      vi.mocked(getenv)
        .mockReturnValueOnce('test-service-domain')
        .mockReturnValueOnce('')

      await expect(import('./index')).rejects.toThrow(
        'MICROCMS_API_KEY is not defined'
      )
    })

    it('should throw error when both environment variables are not defined', async () => {
      const { getenv } = await import('@/core/utilities/getenv')

      vi.mocked(getenv).mockReturnValueOnce('').mockReturnValueOnce('')

      await expect(import('./index')).rejects.toThrow(
        'MICROCMS_SERVICE_DOMAIN is not defined'
      )
    })
  })
})
