import { APP_CONFIG } from '@@/config/app'
import type { Breadcrumb } from './type'

export const createBreadcrumbList = (
  breadcrumbs: Breadcrumb[]
): Breadcrumb[] => {
  return [
    {
      url: APP_CONFIG.URL.ORIGIN,
      text: 'TOPページ',
    },
    ...breadcrumbs.map((breadcrumb) => {
      return {
        url: /^http(|s):\/\//.test(breadcrumb.url)
          ? breadcrumb.url
          : `${APP_CONFIG.URL.ORIGIN}${breadcrumb.url}`,
        text: breadcrumb.text,
      }
    }),
  ]
}
