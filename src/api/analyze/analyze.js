import request from '@/utils/request'

export function fetchEventList() {
  return request({
    url: '/analyze/event',
    method: 'get'
  })
}

export function fetchParamList() {
  return request({
    url: '/analyze/param',
    method: 'get'
  })
}
