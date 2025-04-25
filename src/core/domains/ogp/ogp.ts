import { APP_CONFIG } from '@@/config/app'

export type OGPMeta = {
  property?: string
  name?: string
  content: string
}

export type OGPProps = {
  title: string
  description: string
  url: string
  imagePath?: string
}

const DEFAULT_IMAGE_PATH = '/img/ogp.png'

export const createOGPMeta = (props: OGPProps): OGPMeta[] => {
  const origin = APP_CONFIG.URL.ORIGIN
  const image = `${origin}${props.imagePath || DEFAULT_IMAGE_PATH}`

  return [
    { name: 'description', content: props.description },
    { property: 'og:title', content: props.title },
    { property: 'og:site_name', content: props.title },
    { property: 'og:description', content: props.description },
    { property: 'og:url', content: props.url },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: image },
    { property: 'fb:app_id', content: APP_CONFIG.INTEGRATION.FACEBOOK_APP_ID },
    { name: 'twitter:title', content: props.title },
    { name: 'twitter:description', content: props.description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:creator', content: APP_CONFIG.INTEGRATION.X_USER_ID },
    { name: 'twitter:card', content: 'summary_large_image' },
  ]
}
