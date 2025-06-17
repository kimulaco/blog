import { useBuildCache } from '@/core/buildCache'
import type { About } from './type'

export type AboutCache = {
  about?: About
}

const CACHE_KEY = 'about'

export const aboutCache = useBuildCache<AboutCache>(CACHE_KEY)

export const getCachedAbout = async (): Promise<About> => {
  const cache = await aboutCache.get()
  const about = cache?.about || {
    about_widget: '',
    about: '',
    contact: '',
  }
  return about
}
