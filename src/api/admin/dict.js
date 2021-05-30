import request from '@/utils/request'

/**
 * 获取缓存dict数据
 */
export function cacheDict() {
  return request({
    url: '/dict/cacheDict',
    method: 'get'
  })
}

export function clearDict() {
  return request({
    url: '/dict/clearCache',
    method: 'get'
  })
}

/**
 * 基础的CRUD
 * created by CcphAmy
 */
export function fetchList(query) {
  return request({
    url: '/dict/list',
    method: 'post',
    params: query
  })
}

export function fetchDetail(dictId) {
  return request({
    url: `/dict/detail/${dictId}`,
    method: 'get'
  })
}
export function create(data) {
  return request({
    url: '/dict/add',
    method: 'post',
    data
  })
}

export function update(dictId, data) {
  return request({
    url: `/dict/update/${dictId}`,
    method: 'post',
    data
  })
}

export function deleteOne(dictId) {
  return request({
    url: `/dict/delete/${dictId}`,
    method: 'post'
  })
}
