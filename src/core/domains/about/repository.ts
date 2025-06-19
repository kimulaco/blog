import { microcms } from '@/core/repositories/microcms'
import type { GetAboutRequest } from './type'

const ENDPOINT = 'about'

export const fetchAbout = async (): Promise<GetAboutRequest> => {
  const content = await microcms.getObject<GetAboutRequest>({
    endpoint: ENDPOINT,
  })

  return content
}
