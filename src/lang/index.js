import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import elementTwLocale from 'element-ui/lib/locale/lang/zh-TW'// element-ui lang

import adminZhLocale from './Admin-zh_CN'
import adminEnLocale from './Admin-en_CN'

import analyzeZhlocale from './Analyze-zh_CN'
import analyzeEnlocale from './Analyze-en_CN'

import commonZhLocale from './Common-zh_CN'
import commonEnLocale from './Common-en_CN'

import DataZhLocale from './Data-zh_CN'
import DataEnLocale from './Data-en_CN'

import DebugZhLocale from './Debug-zh_CN'
import DebugEnLocale from './Debug-en_CN'

import deviceEnLocale from './Device-en_CN'
import deviceZhLocale from './Device-zh_CN'

import ErrorCodeZhLocale from './ErrorCode-zh_CN'
import ErrorCodeEnLocale from './ErrorCode-en_CN'

import permZhLocale from './Perm-zh_CN'
import permEnLocale from './Perm-en_CN'

import ReportZhLocale from './Report-zh_CN'
import ReportEnLocale from './Report-en_CN'

import systemZhLocale from './System-zh_CN'
import systemEnLocale from './System-en_CN'

import TaskPlanZhLocale from './TaskPlan-zh_CN'
import TaskPlanEnLocale from './TaskPlan-en_CN'

import TemplateZhLocale from './Template-zh_CN'
import TemplateEnLocale from './Template-en_CN'

import trajectoryZhLocale from './trajectory-zh_CN'
import trajectoryEnLocale from './trajectory-en_CN'

import twLocale from './tw'

import dictEnlocale from './Dict-en_CN'

import MonitoredZhLocale from './Monitored-zh_CN'

import DeviceZhLocale from './Device-zh_CN'

// weTest
import WeTestZhLocale from './WeTest-zh_CN'
import WeTestEnLocale from './WeTest-en_CN'
Vue.use(VueI18n)

const messages = {
  en: {
    ...adminEnLocale,
    ...analyzeEnlocale,
    ...commonEnLocale,
    ...DataEnLocale,
    ...DebugEnLocale,
    ...deviceEnLocale,
    ...ErrorCodeEnLocale,
    ...permEnLocale,
    ...ReportEnLocale,
    ...systemEnLocale,
    ...TaskPlanEnLocale,
    ...TemplateEnLocale,
    ...dictEnlocale,
    ...elementEnLocale,
    ...WeTestEnLocale,
    ...trajectoryEnLocale
  },
  zh: {
    ...adminZhLocale,
    ...analyzeZhlocale,
    ...commonZhLocale,
    ...DataZhLocale,
    ...DebugZhLocale,
    ...deviceZhLocale,
    ...ErrorCodeZhLocale,
    ...permZhLocale,
    ...ReportZhLocale,
    ...systemZhLocale,
    ...TaskPlanZhLocale,
    ...TemplateZhLocale,
    ...MonitoredZhLocale,
    ...elementZhLocale,
    ...DeviceZhLocale,
    ...trajectoryZhLocale,

    // weTest
    ...WeTestZhLocale
  },
  tw: {
    ...twLocale,
    ...elementTwLocale
  }
}

const getLang = () => {
  let lang = null
  if (localStorage) {
    lang = localStorage.getItem('language')
  } else {
    lang = Cookies.get('language')
  }

  //  获取浏览器语言设置
  if (!lang) {
    const browserLang = navigator.language
    switch (browserLang) {
      case 'zh-CN':
        lang = 'zh'
        break
      case 'zh-TW':
        lang = 'tw'
        break
      default:
        lang = 'en'
    }
  }
  console.log(lang)
  // 设置初始化语言，防止无法正常国际化
  localStorage.setItem('language', lang)
  return lang
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLang(),
  // set locale messages
  messages
})

export default i18n
