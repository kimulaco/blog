import rss, { type RSSFeedItem } from '@astrojs/rss'
import { APP_CONFIG } from '@@/config'
import { getAllArticles } from '@/core/domains/article'

export const GET = async () => {
  const articles = await getAllArticles()

  return rss({
    title: APP_CONFIG.META.TITLE,
    description: APP_CONFIG.META.DESCRIPTION,
    site: APP_CONFIG.URL.ORIGIN,
    trailingSlash: false,
    items: articles.map((article): RSSFeedItem => {
      return {
        title: article.title,
        description: article.description,
        link: `/article/${article.id}`,
        pubDate: new Date(article.created_at),
      }
    }),
  })
}
