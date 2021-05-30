import { loginAPI, logout, userInfo, userPerms, getLoginCaptcha } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { JSEncrypt } from 'jsencrypt'
const user = {
  state: {
    user: '',
    status: '',
    code: '',
    account: '',
    token: getToken(),
    name: '',
    role: '',
    isAdmin: false,
    timezone: 'Asia/Shanghai',
    setting: {
      articlePlatform: []
    },
    menuPerms: [],
    buttonPerms: [],
    loginCaptcha: {
      key: '',
      image: ''
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_TIMEZONE: (state, timezone) => {
      state.timezone = timezone
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_IS_ADMIN: (state, isAdmin) => {
      state.isAdmin = isAdmin
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_BUTTONPERMS: (state, perms) => {
      state.buttonPerms = perms
    },
    SET_MENUPERMS: (state, perms) => {
      state.menuPerms = perms
    },
    SET_LOGIN_CAPTCHA: (state, payload) => {
      state.loginCaptcha = payload.loginCaptcha
    }
  },
  actions: {
    // 用户名登录
    Login({ commit }, userInfo) {
      const account = userInfo.account.trim()
      const encrypt = new JSEncrypt()
      encrypt.setPublicKey(process.env.LOGIN_RSA)
      const password = encrypt.encrypt(userInfo.password)
      const captchaInfo = {
        captcha: userInfo.captcha,
        captchaKey: userInfo.captchaKey
      }
      return new Promise((resolve, reject) => {
        loginAPI(account, password, captchaInfo).then(response => {
          const data = response.data
          if (data.code === 1) {
            commit('SET_TOKEN', data.data.token)
            setToken(data.data.token)
            resolve()
          } else {
            throw new Error(data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取权限信息
    GetPermInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        userPerms().then(response => {
          const data = response.data
          if (data.code === 1) {
            commit('SET_MENUPERMS', data.data.menus)
            commit('SET_BUTTONPERMS', data.data.buttons)
            resolve(response)
          } else {
            reject(data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        userInfo().then(response => {
          const data = response.data
          if (data.code === 1) {
            commit('SET_NAME', data.data.name)
            commit('SET_ROLE', data.data.role)
            commit('SET_ACCOUNT', data.data.account)
            commit('SET_IS_ADMIN', data.data.isAdmin === true)
            commit('SET_TIMEZONE', data.data.timezone)
            resolve(response)
          } else {
            reject(data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    updateTimeZone({ commit }, timezone) {
      commit('SET_TIMEZONE', timezone)
    },
    getLoginCaptcha(conText, payload) {
      const data = {
        loginCaptcha: { key: '', image: '' }
      }
      getLoginCaptcha().then(res => {
        if (res.status === 200 && res.data.code === 1) {
          data.loginCaptcha = {
            key: res.data.data.captchaKey,
            image: res.data.data.captchaImage
          }
        }
      }).finally(() => {
        conText.commit('SET_LOGIN_CAPTCHA', data)
      })
    }
  }
}

export default user
