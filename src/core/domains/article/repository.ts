import { microcms } from '../../repositories/microcms'
import type { Article } from './type'

const GET_ALL_ARTICLES_PER_PAGE = 20
const GET_ALL_ARTICLES_LOOP_MAX_COUNT = 10

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

  while (!isFinish) {
    const { contents: articles, totalCount } = await microcms.getList<Article>({
      endpoint: 'post',
      queries: {
        limit: GET_ALL_ARTICLES_PER_PAGE,
        offset: articleCount,
        filters: params?.filters,
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
