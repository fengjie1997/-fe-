import request from '@/utils/request'

/**
 * created by CcphAmy
 */

/**
 * 菜单列表获取
 */
export function fetchGroupList() {
  return request({
    url: '/group/currentVisible',
    method: 'get'
  })
}

/**
 * 菜单列表，带TOP节点
 */
export function fetchGroupAndTopList() {
  return request({
    url: '/group/currentVisibleInfo',
    method: 'get'
  })
}

export function fetchDetail(id) {
  return request({
    url: `/group/detail/${id}`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/group/add',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: `/group/update/${id}`,
    method: 'post',
    data
  })
}

export function deleteOne(id) {
  return request({
    url: `/group/delete/${id}`,
    method: 'post'
  })
}
