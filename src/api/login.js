import request from '@/utils/request'

export function loginAPI(account, password, captchaInfo) {
  const data = {
    account,
    password,
    ...captchaInfo
  }
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function userInfo() {
  return request({
    url: '/user/current',
    method: 'get'
  })
}

export function userPerms() {
  return request({
    url: '/userPerms',
    method: 'get'
  })
}

export function getLoginCaptcha() {
  return request({
    url: '/login/captcha',
    method: 'get'
  })
}
