import { createClient } from 'microcms-js-sdk'
import { getenv } from '@/core/utilities/getenv'

const MICROCMS_SERVICE_DOMAIN = getenv('MICROCMS_SERVICE_DOMAIN')
const MICROCMS_API_KEY = getenv('MICROCMS_API_KEY')

if (!MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is not defined')
}
if (!MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is not defined')
}

export const microcms = createClient({
  serviceDomain: MICROCMS_SERVICE_DOMAIN,
  apiKey: MICROCMS_API_KEY,
})
