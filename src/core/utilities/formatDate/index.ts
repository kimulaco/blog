import { parseISO, format, isValid } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { BUILD_CONFIG } from '@@/config/build'

export const formatDate = (value: string): string => {
  const date = toZonedTime(parseISO(value), BUILD_CONFIG.TIMEZONE)

  if (isValid(date)) {
    return format(date, 'yyyy-MM-dd')
  }

  return ''
}
