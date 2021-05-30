// import language from '@/components/ImageCropper/utils/language'
import i18n from '@/lang'
const KEY = 'CAHCHEDICT-'

function isEmpty(obj) {
  if (typeof obj === 'undefined' || obj === null || obj === '') {
    return true
  } else {
    return false
  }
}

export function SetLocalStorageDict(data) {
  for (var key in data) {
    // console.log('键:', code)
    // console.log('值:', data[key])
    localStorage.removeItem(KEY + key)
    localStorage.setItem(KEY + key, JSON.stringify(data[key]))
  }
}

export function getCacheDict(code) {
  const lang = localStorage.getItem('language')
  if (lang === 'zh') {
    return JSON.parse(localStorage.getItem(KEY + code))
  } else if (lang === 'en') {
    const dict = JSON.parse(localStorage.getItem(KEY + code))
    for (const i in dict) {
      // wetest字典部分定义存在小括号
      if (!isEmpty(dict[i].tip)) {
        const str = 'dictEn' + '.' + code + '.' + dict[i].tip.toString().replace(/\([^\)]*\)/g, '')
        const name = i18n.t(str)
        if (name === str) {
          // 找不到，检查nameEn是不是为空
          dict[i].name = isEmpty(dict[i].nameEn) ? dict[i].name : dict[i].nameEn
        } else {
          dict[i].name = i18n.t(str)
        }
      }
    }
    return dict
  }
}

/**
 * 获取并替换字典属性名称
 * @param string name
 * @return *[]
 */
export const getDictByTagName = (name, bool) => {
  if (getCacheDict(name) === null) {
    console.log(name)
    return []
  } else {
    const a = JSON.stringify(getCacheDict(name)).replace(/name/g, 'label') // JSON.parse()
    if (!bool) {
      return JSON.parse(a.replace(/code/g, 'value'))
    } else {
      const b = JSON.parse(a.replace(/code/g, 'value'))
      b.forEach(item => {
        item.value = Number(item.value)
      })
      return b
    }
  }
}
/**
 * 根据属性值返回属性名称
 * @param {*} obj
 * @param {*} value
 * @param {*} compare
 */
export function findObjectKey(obj, value, compare = (a, b) => a === b) {
  return Object.keys(obj).find(k => compare(obj[k], value))
}
/**
 * 通过值获取名称
 * @param type
 * @param value
 * @return name
 */
export const getDictNameByValue = (type, val) => {
  if (getCacheDict(type) === null) {
    console.log(type)
    return null
  } else {
    for (const item of getCacheDict(type)) {
      if (item.code === val) {
        return item.name
      }
    }
  }
}
/**
 * 获取并替换字典属性名称并转换为Number
 * @param  name
 * @return obj
 */
export const getDictByTagNameStringToNumber = name => {
  if (getCacheDict(name) === null) {
    console.log(name)
    return []
  } else {
    var a = JSON.stringify(getCacheDict(name)).replace(/name/g, 'label') // JSON.parse()
    var b = JSON.parse(a.replace(/code/g, 'value'))
    var arr = []
    b.forEach(item => {
      item.value = Number(item.value)
      arr.push(item)
    })
    return arr
  }
}
