import { microcms } from '@/core/repositories/microcms'
import type { Article, ArticleTag } from './type'
import { isEnableDraft } from '@@/config/build'

const GET_ALL_ARTICLES_PER_PAGE = 20
const GET_ALL_ARTICLES_LOOP_MAX_COUNT = 10
const PUBLISH_QUERY = 'publish[equals]true'

const ARTICLE_ENDPOINT = 'post'
const TAG_ENDPOINT = 'tag'

export type GetArticleListRequest = {
  filters?: string
  ids?: string
}

export const getAllArticles = async (
  params?: GetArticleListRequest
): Promise<Article[]> => {
  let allArticles: Article[] = []
  let articleCount = 0
  let isFinish = false
  let index = 0
  let filters = params?.filters || ''

  if (!isEnableDraft) {
    filters += filters ? `[and]${PUBLISH_QUERY}` : PUBLISH_QUERY
  }

  while (!isFinish) {
    const { contents: articles, totalCount } = await microcms.getList<Article>({
      endpoint: ARTICLE_ENDPOINT,
      queries: {
        limit: GET_ALL_ARTICLES_PER_PAGE,
        offset: articleCount,
        filters,
        ids: params?.ids,
      },
    })

    index++
    articleCount += articles.length
    allArticles = allArticles.concat(articles)

    if (articleCount >= totalCount) {
      isFinish = true
      break
    }

    if (index >= GET_ALL_ARTICLES_LOOP_MAX_COUNT) {
      throw new Error('getAllArticles loop max count')
    }
  }

  return allArticles
}

export const getArticleDetail = async (id: string): Promise<Article> => {
  const content = await microcms.getListDetail<Article>({
    endpoint: ARTICLE_ENDPOINT,
    contentId: id,
    queries: {
      filters: isEnableDraft ? undefined : PUBLISH_QUERY,
      depth: 2,
    },
  })

  if (!isEnableDraft && !content.publish) {
    throw new Error(`article_id:${content.id}, article is not publish`)
  }

  return content
}

export const getUsedAllTags = async (): Promise<ArticleTag[]> => {
  const articles = await getAllArticles()
  const tags: ArticleTag[] = []

  for (const article of articles) {
    for (const articleTag of article.tag) {
      const hasTag = tags.find((tag) => tag.id === articleTag.id)

      if (!hasTag) {
        tags.push(articleTag)
      }
    }
  }

  return tags
}

export const getTagDetail = async (id: string): Promise<ArticleTag> => {
  const content = await microcms.getListDetail<ArticleTag>({
    endpoint: TAG_ENDPOINT,
    contentId: id,
  })

  return content
}
