import axios from 'axios'
import { Message, Notification } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import i18n from '@/lang'
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    config.baseURL = store.getters.apiUrl
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,
  response => {
    // 这边要对业务 0 1 进行处理一下
    if (store.getters.businessErrorNotity) {
      const res = response.data
      if (res.code === 0) {
        const key = 'errorCode' + '.' + res.errorCode.toString()
        if (i18n.t(key) === key) {
          console.log('此处错误未国际化')
          Notification.error({
            title: i18n.t('common.error'),
            message: res.message,
            type: 'error',
            duration: 2000
          })
        } else {
          Notification.error({
            title: i18n.t('common.error'),
            message: i18n.t(key), // res.message,
            type: 'error',
            duration: 2000
          })
        }
      }
    }
    return response
  },
  error => {
    if (axios.isCancel(error)) return Promise.resolve({ canceled: true })
    // code ECONNABORTED
    console.log(error)
    const state = error.response.status
    try {
      switch (state) {
        case 401:
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
          break
        case 403:
          this.$notify({
            title: this.$t('common.error'),
            message: 'No Permisson',
            type: 'error',
            duration: 2000
          })
          break
        case 500:
          break
      }
    } catch (error) {
      console.log('err' + error) // for debug
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
