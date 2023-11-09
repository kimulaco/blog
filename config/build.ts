const PRODUCTION = 'production'
const DEVELOPMENT = 'development'

const BUILD_ENV = import.meta.env.BUILD_ENV ?? DEVELOPMENT

export const BUILD_CONFIG = {
  PRODUCTION,
  DEVELOPMENT,
  BUILD_ENV,
  isProd: BUILD_ENV === PRODUCTION,
  isDev: BUILD_ENV === DEVELOPMENT,
}
