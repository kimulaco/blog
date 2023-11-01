const PROTOCOL = 'https:'
const HOST = 'kimulaco.com'
const ORIGIN = `${PROTOCOL}//${HOST}`
const FEED_PATH = '/feed/post.xml'

export const APP_CONFIG = {
  PROTOCOL,
  HOST,
  ORIGIN,
  FEED_PATH,
  FEED_URL: `${ORIGIN}${FEED_PATH}`,
} as const
