import { microcms } from '../../repositories/microcms'

const ENDPOINT = 'about'

export type GetAboutRequest = {
  about_widget: string
  about: string
  contact: string
}

export const getAbout = async (): Promise<GetAboutRequest> => {
  const content = await microcms.getObject<GetAboutRequest>({
    endpoint: ENDPOINT,
  })

  return content
}
