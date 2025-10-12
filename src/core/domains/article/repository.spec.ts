import { describe, expect, it, vi, beforeEach } from 'vitest'
import type { Article, ArticleTag } from './type'

const mockBuildConfig = vi.hoisted(() => ({ isEnableDraft: false }))

vi.mock('@@/config/build', () => mockBuildConfig)

vi.mock('@/core/repositories/microcms', () => ({
  microcms: {
    getList: vi.fn(),
    getListDetail: vi.fn(),
  },
}))

vi.mock('@/core/utilities/logger', () => ({
  logger: {
    buildInfo: vi.fn(),
  },
}))

describe('article repository', () => {
  const mockArticleTag: ArticleTag = {
    id: 'tag1',
    name: 'Test Tag',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  }

  const mockArticle: Article = {
    id: '1',
    title: 'Test Article',
    content: 'Test content',
    description: 'Test description',
    tag: [mockArticleTag],
    publish: true,
    created_at: '2023-01-01T00:00:00.000Z',
    updated_at: '2023-01-01T00:00:00.000Z',
    related_posts: [],
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockBuildConfig.isEnableDraft = false
  })

  describe('fetchAllArticles', () => {
    it('should fetch all articles with pagination', async () => {
      const { fetchAllArticles } = await import('./repository')
      const { microcms } = await import('@/core/repositories/microcms')

      vi.mocked(microcms.getList).mockResolvedValue({
        contents: [mockArticle],
        totalCount: 1,
        offset: 0,
        limit: 20,
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any

      const result = await fetchAllArticles()

      expect(microcms.getList).toHaveBeenCalledWith({
        endpoint: 'post',
        queries: {
          limit: 20,
          offset: 0,
          filters: 'publish[equals]true',
          depth: 2,
        },
      })
      expect(result).toEqual([mockArticle])
    })

    it('should fetch articles with tag filter', async () => {
      const { fetchAllArticles } = await import('./repository')
      const { microcms } = await import('@/core/repositories/microcms')

      vi.mocked(microcms.getList).mockResolvedValue({
        contents: [mockArticle],
        totalCount: 1,
        offset: 0,
        limit: 20,
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any

      await fetchAllArticles({ tagId: 'test-tag' })

      expect(microcms.getList).toHaveBeenCalledWith({
        endpoint: 'post',
        queries: {
          limit: 20,
          offset: 0,
          filters: 'tag[contains]test-tag[and]publish[equals]true',
          depth: 2,
        },
      })
    })

    it('should fetch articles with draft enabled', async () => {
      mockBuildConfig.isEnableDraft = true
      vi.resetModules()

      const { fetchAllArticles } = await import('./repository')
      const { microcms } = await import('@/core/repositories/microcms')

      vi.mocked(microcms.getList).mockResolvedValue({
        contents: [mockArticle],
        totalCount: 1,
        offset: 0,
        limit: 20,
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any

      await fetchAllArticles()

      expect(microcms.getList).toHaveBeenCalledWith({
        endpoint: 'post',
        queries: {
          limit: 20,
          offset: 0,
          filters: '',
          depth: 2,
        },
      })
    })

    it('should handle pagination with multiple pages', async () => {
      const { fetchAllArticles } = await import('./repository')
      const { microcms } = await import('@/core/repositories/microcms')

      vi.mocked(microcms.getList)
        .mockResolvedValueOnce({
          contents: [mockArticle],
          totalCount: 2,
          offset: 0,
          limit: 20,
        } as any)
        .mockResolvedValueOnce({
          contents: [{ ...mockArticle, id: '2' }],
          totalCount: 2,
          offset: 1,
          limit: 20,
        } as any) // eslint-disable-line @typescript-eslint/no-explicit-any

      const result = await fetchAllArticles()

      expect(microcms.getList).toHaveBeenCalledTimes(2)
      expect(result).toHaveLength(2)
    })

    it('should throw error when reaching max loop count', async () => {
      const { fetchAllArticles } = await import('./repository')
      const { microcms } = await import('@/core/repositories/microcms')

      vi.mocked(microcms.getList).mockResolvedValue({
        contents: [mockArticle],
        totalCount: 1000,
        offset: 0,
        limit: 20,
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any

      await expect(fetchAllArticles()).rejects.toThrow(
        'getAllArticles loop max count'
      )
    })
  })

  describe('fetchArticleDetail', () => {
    it('should fetch article detail with publish filter', async () => {
      const { fetchArticleDetail } = await import('./repository')
      const { microcms } = await import('@/core/repositories/microcms')

      vi.mocked(microcms.getListDetail).mockResolvedValue(mockArticle as any)

      const result = await fetchArticleDetail('1')

      expect(microcms.getListDetail).toHaveBeenCalledWith({
        endpoint: 'post',
        contentId: '1',
        queries: {
          filters: 'publish[equals]true',
          depth: 2,
        },
      })
      expect(result).toEqual(mockArticle)
    })

    it('should fetch article detail with draft enabled', async () => {
      mockBuildConfig.isEnableDraft = true
      vi.resetModules()

      const { fetchArticleDetail } = await import('./repository')
      const { microcms } = await import('@/core/repositories/microcms')

      vi.mocked(microcms.getListDetail).mockResolvedValue(mockArticle as any)

      await fetchArticleDetail('1')

      expect(microcms.getListDetail).toHaveBeenCalledWith({
        endpoint: 'post',
        contentId: '1',
        queries: {
          filters: undefined,
          depth: 2,
        },
      })
    })

    it('should throw error for unpublished article when draft is disabled', async () => {
      mockBuildConfig.isEnableDraft = false
      vi.resetModules()

      const { fetchArticleDetail } = await import('./repository')
      const { microcms } = await import('@/core/repositories/microcms')

      const unpublishedArticle = { ...mockArticle, publish: false }
      vi.mocked(microcms.getListDetail).mockResolvedValue(
        unpublishedArticle as any
      )

      await expect(fetchArticleDetail('1')).rejects.toThrow(
        'article_id:1, article is not publish'
      )
    })
  })

  describe('fetchUsedAllTags', () => {
    it('should fetch all unique tags from articles', async () => {
      const { fetchUsedAllTags } = await import('./repository')
      const { microcms } = await import('@/core/repositories/microcms')

      const tag2: ArticleTag = { ...mockArticleTag, id: 'tag2', name: 'Tag 2' }
      const article1 = { ...mockArticle, tag: [mockArticleTag, tag2] }
      const article2 = { ...mockArticle, id: '2', tag: [mockArticleTag] }

      vi.mocked(microcms.getList).mockResolvedValue({
        contents: [article1, article2],
        totalCount: 2,
        offset: 0,
        limit: 20,
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any

      const result = await fetchUsedAllTags()

      expect(result).toHaveLength(2)
      expect(result).toContainEqual(mockArticleTag)
      expect(result).toContainEqual(tag2)
    })
  })

  describe('fetchTagDetail', () => {
    it('should fetch tag detail', async () => {
      const { fetchTagDetail } = await import('./repository')
      const { microcms } = await import('@/core/repositories/microcms')

      vi.mocked(microcms.getListDetail).mockResolvedValue(mockArticleTag as any)

      const result = await fetchTagDetail('tag1')

      expect(microcms.getListDetail).toHaveBeenCalledWith({
        endpoint: 'tag',
        contentId: 'tag1',
      })
      expect(result).toEqual(mockArticleTag)
    })
  })
})
