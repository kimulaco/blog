const HOST = import.meta.env.APP_HOST ?? process.env.APP_HOST ?? ''

if (!HOST) {
  throw new Error('APP_HOST is not defined')
}

const PROTOCOL = 'https:'
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
    CANONICAL_BASE_URL: 'https://blog.kimulaco.dev',
  },
  META: {
    TITLE: '@kimulaco/blog',
    DESCRIPTION: 'Webエンジニアの学びと趣味のブログ。',
    AUTHOR: 'kimulaco',
  },
} as const
