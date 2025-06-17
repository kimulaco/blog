import { useBuildCache } from '@/core/buildCache'
import type { Article, ArticleTag, GetArticleListParams } from './type'

export type ArticleCache = {
  articles?: Article[]
  articleTags?: ArticleTag[]
}

const ARTICLE_CACHE_KEY = 'article'

export const articleCache = useBuildCache<ArticleCache>(ARTICLE_CACHE_KEY)

export const getCachedAllArticles = async (
  params?: GetArticleListParams
): Promise<Article[]> => {
  const cache = await articleCache.get()
  let articles = cache?.articles || []

  if (params?.tagId) {
    articles = articles.filter((article) =>
      article.tag.some((tag) => tag.id === params.tagId)
    )
  }

  return articles
}

export const getCachedArticleDetail = async (id: string): Promise<Article> => {
  const cache = await articleCache.get()
  const article = cache?.articles?.find((article) => article.id === id)
  if (!article) {
    throw new Error(`article not found. id: ${id}`)
  }
  return article
}

export const getCachedAllArticleTags = async (): Promise<ArticleTag[]> => {
  const cache = await articleCache.get()
  return cache?.articleTags || []
}

export const getCachedArticleTagDetail = async (
  id: string
): Promise<ArticleTag> => {
  const cache = await articleCache.get()
  const tag = cache?.articleTags?.find((t) => t.id === id)
  if (!tag) {
    throw new Error(`tag not found. id: ${id}`)
  }
  return tag
}
