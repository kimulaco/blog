import type { Article, ArticleTag, GetArticleListParams } from './type'
import { isEnableDraft } from '@@/config/build'
import {
  articleCache,
  getCachedAllArticles,
  getCachedArticleDetail,
  getCachedAllArticleTags,
  getCachedArticleTagDetail,
} from './cache'
import {
  fetchAllArticles,
  fetchArticleDetail,
  fetchUsedAllTags,
  fetchTagDetail,
} from './repository'

export * from './type'

const isEnableBuildCache = !isEnableDraft

export const getAllArticles = async (
  params?: GetArticleListParams
): Promise<Article[]> => {
  if (isEnableBuildCache) {
    return getCachedAllArticles(params)
  }
  return fetchAllArticles(params)
}

export const getArticleDetail = async (id: string): Promise<Article> => {
  if (isEnableBuildCache) {
    return getCachedArticleDetail(id)
  }
  return fetchArticleDetail(id)
}

export const getAllArticleTags = async (): Promise<ArticleTag[]> => {
  if (isEnableBuildCache) {
    return getCachedAllArticleTags()
  }
  return fetchUsedAllTags()
}

export const getArticleTagDetail = async (id: string): Promise<ArticleTag> => {
  if (isEnableBuildCache) {
    return getCachedArticleTagDetail(id)
  }
  return fetchTagDetail(id)
}

export const generateArticleCache = async (): Promise<void> => {
  const articles = await fetchAllArticles()
  const articleTags = await fetchUsedAllTags()
  await articleCache.save({
    articles,
    articleTags,
  })
}
