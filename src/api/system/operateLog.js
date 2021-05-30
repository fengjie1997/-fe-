import request from '@/utils/request'

/**
 * 基础的CRUD
 * created by CcphAmy
 */
export function fetchList(query) {
  return request({
    url: '/operate/list',
    method: 'get',
    params: query
  })
}

export function truncate() {
  return request({
    url: '/operate/truncate',
    method: 'post'
  })
}
