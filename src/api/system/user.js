import request from '@/utils/request'

/**
 * 基础的CRUD
 * created by CcphAmy
 */
export function fetchList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function switchTimeZone(account, timezone) {
  return request({
    url: `/user/timezone`,
    method: 'post',
    params: {
      timezone: timezone,
      account: account
    }
  })
}

export function fetchDetail(id) {
  return request({
    url: `/user/detail/${id}`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: `/user/update/${id}`,
    method: 'post',
    data
  })
}

export function deleteOne(id) {
  return request({
    url: `/user/delete/${id}`,
    method: 'post'
  })
}

export function freeze(id) {
  return request({
    url: `/user/freeze/${id}`,
    method: 'post'
  })
}

export function unfreeze(id) {
  return request({
    url: `/user/unfreeze/${id}`,
    method: 'post'
  })
}

export function updateRole(id, roleId) {
  return request({
    url: `user/updateRole/${id}`,
    method: 'post',
    data: {
      roleId: roleId
    }
  })
}

export function updatePassword(id, password) {
  return request({
    url: `user/updatePassword/${id}`,
    method: 'post',
    data: {
      password: password
    }
  })
}
// 右上角的修改密码
export function updateUserPassword(originPassword, password) {
  return request({
    url: `/user/updatePassword`,
    method: 'post',
    data: {
      originPassword: originPassword,
      password: password
    }
  })
}
