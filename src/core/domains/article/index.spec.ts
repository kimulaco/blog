import { describe, expect, it, vi, beforeEach } from 'vitest'
import type { Article, ArticleTag } from './type'

const mockBuildConfig = vi.hoisted(() => ({ isEnableDraft: false }))

vi.mock('@@/config/build', () => mockBuildConfig)

vi.mock('./cache', () => ({
  articleCache: {
    save: vi.fn(),
    getCacheFilePath: vi.fn(() => '/cache/articles.json'),
  },
  getCachedAllArticles: vi.fn(),
  getCachedArticleDetail: vi.fn(),
  getCachedAllArticleTags: vi.fn(),
  getCachedArticleTagDetail: vi.fn(),
}))

vi.mock('./repository', () => ({
  fetchAllArticles: vi.fn(),
  fetchArticleDetail: vi.fn(),
  fetchUsedAllTags: vi.fn(),
  fetchTagDetail: vi.fn(),
}))

describe('article domain', () => {
  const mockArticle: Article = {
    id: '1',
    created_at: '2023-01-01T00:00:00.000Z',
    updated_at: '2023-01-02T00:00:00.000Z',
    publish: true,
    title: 'Test Article',
    description: 'Test Description',
    tag: [{ id: 'tag1', name: 'Test Tag' }],
    content: '# Test Content',
    related_posts: [],
  }

  const mockArticleTag: ArticleTag = {
    id: 'tag1',
    name: 'Test Tag',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockBuildConfig.isEnableDraft = false
  })

  describe('cache vs repository switching', () => {
    it('should call cached functions when cache is enabled', async () => {
      mockBuildConfig.isEnableDraft = false

      vi.resetModules()

      const {
        getAllArticles,
        getArticleDetail,
        getAllArticleTags,
        getArticleTagDetail,
      } = await import('./index')
      const {
        getCachedAllArticles,
        getCachedArticleDetail,
        getCachedAllArticleTags,
        getCachedArticleTagDetail,
      } = await import('./cache')

      const mockArticles = [mockArticle]
      const mockTags = [mockArticleTag]

      vi.mocked(getCachedAllArticles).mockResolvedValue(mockArticles)
      vi.mocked(getCachedArticleDetail).mockResolvedValue(mockArticle)
      vi.mocked(getCachedAllArticleTags).mockResolvedValue(mockTags)
      vi.mocked(getCachedArticleTagDetail).mockResolvedValue(mockArticleTag)

      const articlesResult = await getAllArticles()
      const articleResult = await getArticleDetail('1')
      const tagsResult = await getAllArticleTags()
      const tagResult = await getArticleTagDetail('tag1')

      expect(getCachedAllArticles).toHaveBeenCalled()
      expect(getCachedArticleDetail).toHaveBeenCalledWith('1')
      expect(getCachedAllArticleTags).toHaveBeenCalled()
      expect(getCachedArticleTagDetail).toHaveBeenCalledWith('tag1')

      expect(articlesResult).toEqual(mockArticles)
      expect(articleResult).toEqual(mockArticle)
      expect(tagsResult).toEqual(mockTags)
      expect(tagResult).toEqual(mockArticleTag)
    })

    it('should call repository functions when cache is disabled', async () => {
      mockBuildConfig.isEnableDraft = true

      vi.resetModules()

      const {
        getAllArticles,
        getArticleDetail,
        getAllArticleTags,
        getArticleTagDetail,
      } = await import('./index')
      const {
        fetchAllArticles,
        fetchArticleDetail,
        fetchUsedAllTags,
        fetchTagDetail,
      } = await import('./repository')

      const mockArticles = [mockArticle]
      const mockTags = [mockArticleTag]

      vi.mocked(fetchAllArticles).mockResolvedValue(mockArticles)
      vi.mocked(fetchArticleDetail).mockResolvedValue(mockArticle)
      vi.mocked(fetchUsedAllTags).mockResolvedValue(mockTags)
      vi.mocked(fetchTagDetail).mockResolvedValue(mockArticleTag)

      const articlesResult = await getAllArticles()
      const articleResult = await getArticleDetail('1')
      const tagsResult = await getAllArticleTags()
      const tagResult = await getArticleTagDetail('tag1')

      expect(fetchAllArticles).toHaveBeenCalled()
      expect(fetchArticleDetail).toHaveBeenCalledWith('1')
      expect(fetchUsedAllTags).toHaveBeenCalled()
      expect(fetchTagDetail).toHaveBeenCalledWith('tag1')

      expect(articlesResult).toEqual(mockArticles)
      expect(articleResult).toEqual(mockArticle)
      expect(tagsResult).toEqual(mockTags)
      expect(tagResult).toEqual(mockArticleTag)
    })

    it('should pass parameters correctly to functions', async () => {
      mockBuildConfig.isEnableDraft = false
      vi.resetModules()

      const { getAllArticles } = await import('./index')
      const { getCachedAllArticles } = await import('./cache')

      const mockArticles = [mockArticle]
      vi.mocked(getCachedAllArticles).mockResolvedValue(mockArticles)

      await getAllArticles({ tagId: 'test-tag' })

      expect(getCachedAllArticles).toHaveBeenCalledWith({ tagId: 'test-tag' })
    })
  })

  describe('generateArticleCache', () => {
    it('should fetch articles and tags, save to cache, and return cache file path', async () => {
      const { generateArticleCache } = await import('./index')
      const { fetchAllArticles, fetchUsedAllTags } = await import(
        './repository'
      )
      const { articleCache } = await import('./cache')

      const mockArticles = [mockArticle]
      const mockTags = [mockArticleTag]

      vi.mocked(fetchAllArticles).mockResolvedValue(mockArticles)
      vi.mocked(fetchUsedAllTags).mockResolvedValue(mockTags)

      const result = await generateArticleCache()

      expect(fetchAllArticles).toHaveBeenCalledWith()
      expect(fetchUsedAllTags).toHaveBeenCalledWith()
      expect(articleCache.save).toHaveBeenCalledWith({
        articles: mockArticles,
        articleTags: mockTags,
      })
      expect(result).toEqual({
        cacheFilePath: '/cache/articles.json',
      })
    })
  })
})
