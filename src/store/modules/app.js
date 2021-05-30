import Cookies from 'js-cookie'

const getLang = function() {
  let lang = null
  if (localStorage) {
    lang = localStorage.getItem('language')
  } else {
    lang = Cookies.get('language')
  }

  if (lang) return lang

  //  获取浏览器语言设置
  const browserLang = navigator.language
  switch (browserLang) {
    case 'zh-CN':
      return 'zh'
    case 'zh-TW':
      return 'tw'
    default:
      return 'en'
  }
}

const setLang = function(lang) {
  if (localStorage) {
    localStorage.setItem('language', lang)
  } else {
    Cookies.setItem('language', lang)
  }
}

const app = {
  state: {
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    language: getLang(),
    size: Cookies.get('size') || 'mini',
    apiUrl: process.env.BASE_API,
    businessErrorNotity: true
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      console.log(state.sidebar)
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      setLang(language)
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    },
    /**
     * 设置api
     */
    SET_API_URL: (state, url) => {
      state.apiUrl = url
    },
    SET_BUSINESS_ERROR_NOTITY: (state, isNotity) => {
      state.businessErrorNotity = isNotity
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    },
    /**
     * api
     */
    setApiUrl({ commit }, url) {
      commit('SET_API_URL', url)
    },
    setBusinessErrorNotity({ commit }, isNotity) {
      commit('SET_BUSINESS_ERROR_NOTITY', isNotity)
    }
  }
}

export default app
