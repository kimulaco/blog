import { describe, expect, it, vi, beforeEach } from 'vitest'
import type { Article, ArticleTag, GetArticleListParams } from './type'
import {
  getCachedAllArticles,
  getCachedArticleDetail,
  getCachedAllArticleTags,
  getCachedArticleTagDetail,
  articleCache,
} from './cache'

// Mock the buildCache
vi.mock('@/core/buildCache', () => ({
  useBuildCache: vi.fn(() => ({
    get: vi.fn(),
    save: vi.fn(),
    getCacheFilePath: vi.fn(),
  })),
}))

describe('article cache', () => {
  const mockArticles: Article[] = [
    {
      id: '1',
      created_at: '2023-01-01T00:00:00.000Z',
      updated_at: '2023-01-02T00:00:00.000Z',
      publish: true,
      title: 'Test Article 1',
      description: 'Test Description 1',
      tag: [
        { id: 'tag1', name: 'JavaScript' },
        { id: 'tag2', name: 'React' },
      ],
      content: '# Test Content 1',
      related_posts: [],
    },
    {
      id: '2',
      created_at: '2023-01-03T00:00:00.000Z',
      publish: true,
      title: 'Test Article 2',
      description: 'Test Description 2',
      tag: [{ id: 'tag2', name: 'React' }],
      content: '# Test Content 2',
      related_posts: [],
    },
  ]

  const mockTags: ArticleTag[] = [
    { id: 'tag1', name: 'JavaScript' },
    { id: 'tag2', name: 'React' },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getCachedAllArticles', () => {
    it('should return all articles when no params provided', async () => {
      vi.mocked(articleCache.get).mockResolvedValue({
        articles: mockArticles,
        articleTags: mockTags,
      })

      const result = await getCachedAllArticles()

      expect(result).toEqual(mockArticles)
    })

    it('should return empty array when no cache exists', async () => {
      vi.mocked(articleCache.get).mockResolvedValue(null)

      const result = await getCachedAllArticles()

      expect(result).toEqual([])
    })

    it('should filter articles by tagId when params provided', async () => {
      vi.mocked(articleCache.get).mockResolvedValue({
        articles: mockArticles,
        articleTags: mockTags,
      })

      const params: GetArticleListParams = { tagId: 'tag1' }
      const result = await getCachedAllArticles(params)

      expect(result).toEqual([mockArticles[0]])
    })

    it('should return empty array when no articles match tagId', async () => {
      vi.mocked(articleCache.get).mockResolvedValue({
        articles: mockArticles,
        articleTags: mockTags,
      })

      const params: GetArticleListParams = { tagId: 'nonexistent' }
      const result = await getCachedAllArticles(params)

      expect(result).toEqual([])
    })
  })

  describe('getCachedArticleDetail', () => {
    it('should return article when found', async () => {
      vi.mocked(articleCache.get).mockResolvedValue({
        articles: mockArticles,
        articleTags: mockTags,
      })

      const result = await getCachedArticleDetail('1')

      expect(result).toEqual(mockArticles[0])
    })

    it('should throw error when article not found', async () => {
      vi.mocked(articleCache.get).mockResolvedValue({
        articles: mockArticles,
        articleTags: mockTags,
      })

      await expect(getCachedArticleDetail('nonexistent')).rejects.toThrow(
        'article not found. id: nonexistent'
      )
    })

    it('should throw error when no cache exists', async () => {
      vi.mocked(articleCache.get).mockResolvedValue(null)

      await expect(getCachedArticleDetail('1')).rejects.toThrow(
        'article not found. id: 1'
      )
    })
  })

  describe('getCachedAllArticleTags', () => {
    it('should return all tags when cache exists', async () => {
      vi.mocked(articleCache.get).mockResolvedValue({
        articles: mockArticles,
        articleTags: mockTags,
      })

      const result = await getCachedAllArticleTags()

      expect(result).toEqual(mockTags)
    })

    it('should return empty array when no cache exists', async () => {
      vi.mocked(articleCache.get).mockResolvedValue(null)

      const result = await getCachedAllArticleTags()

      expect(result).toEqual([])
    })
  })

  describe('getCachedArticleTagDetail', () => {
    it('should return tag when found', async () => {
      vi.mocked(articleCache.get).mockResolvedValue({
        articles: mockArticles,
        articleTags: mockTags,
      })

      const result = await getCachedArticleTagDetail('tag1')

      expect(result).toEqual(mockTags[0])
    })

    it('should throw error when tag not found', async () => {
      vi.mocked(articleCache.get).mockResolvedValue({
        articles: mockArticles,
        articleTags: mockTags,
      })

      await expect(getCachedArticleTagDetail('nonexistent')).rejects.toThrow(
        'tag not found. id: nonexistent'
      )
    })

    it('should throw error when no cache exists', async () => {
      vi.mocked(articleCache.get).mockResolvedValue(null)

      await expect(getCachedArticleTagDetail('tag1')).rejects.toThrow(
        'tag not found. id: tag1'
      )
    })
  })
})
