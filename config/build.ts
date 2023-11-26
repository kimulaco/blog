const PRODUCTION = 'production'
const DEVELOPMENT = 'development'

const BUILD_ENV =
  import.meta?.env?.BUILD_ENV || process?.env?.BUILD_ENV || DEVELOPMENT
const DRAFT = import.meta?.env?.DRAFT || process?.env?.DRAFT

export const isEnableDraft = !!DRAFT

export const BUILD_CONFIG = {
  PRODUCTION,
  DEVELOPMENT,
  BUILD_ENV,
  isProd: BUILD_ENV === PRODUCTION,
  isDev: BUILD_ENV === DEVELOPMENT,
  TIMEZONE: 'Asia/Tokyo',
}
