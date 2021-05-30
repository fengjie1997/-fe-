import store from './store'

/**
 * 调试工具
 */
class Debug {
  sourcrApiUrl = 'api'

  constructor(sourceApiUrl) {
    this.sourcrApiUrl = sourceApiUrl
  }

  modifyApiUrl(url) {
    store.dispatch('setApiUrl', url)
  }

  restoreApiUrl() {
    store.dispatch('setApiUrl', this.sourcrApiUrl)
  }
}

export default Debug
