const PRODUCTION = 'production'
const DEVELOPMENT = 'development'

const getEnv = (envName: string, defaultValue?: string) => {
  try {
    return import.meta.env[envName]
  } catch {
    // no throw
  }

  try {
    return process.env[envName]
  } catch {
    // no throw
  }

  return defaultValue
}

const BUILD_ENV = getEnv('BUILD_ENV', DEVELOPMENT)
const DRAFT = getEnv('DRAFT')

export const isEnableDraft = !!DRAFT

export const BUILD_CONFIG = {
  PRODUCTION,
  DEVELOPMENT,
  BUILD_ENV,
  isProd: BUILD_ENV === PRODUCTION,
  isDev: BUILD_ENV === DEVELOPMENT,
  TIMEZONE: 'Asia/Tokyo',
}
