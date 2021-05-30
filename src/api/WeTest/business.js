import request from '@/utils/request'

export function fetchWeTestDeviceList(params, groupIds) {
  return request({
    url: '/wetest/device/list',
    method: 'post',
    params,
    data: groupIds
  })
}
export function fetchList(query) {
  const data = query.type
  return request({
    url: '/wetest/business/list',
    method: 'post',
    data: data,
    params: query
  })
}

export function createBusiness(data) {
  return request({
    url: '/wetest/business/add',
    method: 'post',
    data
  })
}

export function deleteBusiness(id) {
  return request({
    url: `/wetest/business/delete/${id}`,
    method: 'post'
  })
}

export function updateBusiness(id, data) {
  return request({
    url: `/wetest/business/update/${id}`,
    method: 'post',
    data
  })
}

