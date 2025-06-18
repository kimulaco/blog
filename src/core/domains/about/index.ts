import { isEnableDraft } from '@@/config/build'
import { fetchAbout } from './repository'
import { aboutCache, getCachedAbout } from './cache'
import type { GetAboutRequest } from './type'

export * from './type'

const isEnableBuildCache = !isEnableDraft

export const getAbout = async (): Promise<GetAboutRequest> => {
  if (isEnableBuildCache) {
    return getCachedAbout()
  }
  return fetchAbout()
}

export const generateAboutCache = async (): Promise<void> => {
  const about = await fetchAbout()
  await aboutCache.save({
    about,
  })
}
