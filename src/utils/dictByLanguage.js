import store from '@/store/index.js'
import { getDictByTagName, getDictByTagNameStringToNumber } from '@/utils/dictCache.js'
import i18n from '@/lang'

// 对字典根据当前语言环境进行是否国际化的判断
// 此方法代替getDictByTagName
export function getDictByLanguage(key, bool) {
  if (store.getters.language === 'zh') {
    return getDictByTagName(key, bool)
  } else if (store.getters.language === 'en') {
    const options = getDictByTagName(key, bool)
    for (const i in options) {
      const str = 'dictEn' + '.' + key + '.' + options[i].tip.toString().replace(/\s*/g, '')
      str.replace(/\//g, '')
      str.replace(/-/g, '')
      options[i].label = i18n.t(str)
    }
    return options
  }
}
// 此方法代替getDictByTagNameStringToNumber
export function getDictToNumberByLanguage(key) {
  if (store.getters.language === 'zh') {
    return getDictByTagNameStringToNumber(key)
  } else if (store.getters.language === 'en') {
    const options = getDictByTagNameStringToNumber(key)
    console.log(options)
    for (const i in options) {
      const str = 'dictEn' + '.' + key + '.' + options[i].tip.toString().replace(/\s*/g, '')
      str.replace(/\//g, '')
      str.replace(/-/g, '')
      options[i].label = i18n.t(str)
    }
    return options
  }
}
