import { parseISO, format, isValid } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { BUILD_CONFIG } from '@@/config/build'

export const formatDate = (value: string): string => {
  const date = utcToZonedTime(parseISO(value), BUILD_CONFIG.TIMEZONE)

  if (isValid(date)) {
    return format(date, 'yyyy-MM-dd')
  }

  return ''
}
