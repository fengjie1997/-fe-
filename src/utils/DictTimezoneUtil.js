import { getDictByLanguage } from '@/utils/dictByLanguage'
import moment from 'moment-timezone'

const timezoneArr = getDictByLanguage('timeZone')

let tmpTimezoneArr

export function getTimezoneDict() {
  if (tmpTimezoneArr) return tmpTimezoneArr

  // 还好js是单线程的，不需要考虑啥
  if (Array.isArray(timezoneArr)) {
    timezoneArr.forEach(item => {
      const timezoneVal = item.value
      if (timezoneVal !== undefined && timezoneVal !== '') {
        item.label = `(${moment.tz(timezoneVal).format('Z')}) ${item.label}` // +8:00
        // item.offset = moment.tz(timezoneVal).format('Z') // +8:00
      }
    })
  }
  tmpTimezoneArr = timezoneArr
  return timezoneArr
}

