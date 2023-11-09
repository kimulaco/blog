export const BUILD_ENV_PRODUCTION = 'production'
export const BUILD_ENV_DEVELOPMENT = 'development'

export const BUILD_ENV = import.meta.env.BUILD_ENV ?? BUILD_ENV_DEVELOPMENT

export const isProdBuild = BUILD_ENV === BUILD_ENV_PRODUCTION
export const isDevBuild = BUILD_ENV === BUILD_ENV_DEVELOPMENT
