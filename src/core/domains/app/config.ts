const PROTOCOL = 'https:'
const HOST = 'blog.kimulaco.dev'
const ORIGIN = `${PROTOCOL}//${HOST}`
const FEED_PATH = '/feed/article.xml'

export const APP_CONFIG = {
  PATH: {
    FEED: FEED_PATH,
  },
  URL: {
    PROTOCOL,
    HOST,
    ORIGIN,
    FEED: `${ORIGIN}${FEED_PATH}`,
    CANONICAL: 'https://kimulaco.com',
  },
  META: {
    TITLE: '@kimulaco/blog',
    DESCRIPTION: 'Webエンジニアの学びと趣味のブログ。',
  },
} as const
