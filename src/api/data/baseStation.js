import request from '@/utils/request'

// station city tree
export const fetchStationTree = () => {
  return request({
    url: `/cell/tree`,
    method: 'get'
  })
}
// station list
export const fetchStationList = (data, query) => {
  return request({
    url: '/cell/list',
    method: 'post',
    params: query,
    data
  })
}
export var cellUploadUrl = process.env.BASE_API + '/cell/import'
export const fetchStationMapList = (data, query) => {
  return request({
    url: '/cell/renderList',
    method: 'post',
    params: query,
    data
  })
}
export function deleteCellByIds(ids) {
  return request({
    url: '/cell/delete',
    method: 'post',
    data: ids
  })
}

export function deleteAreaByIds(ids) {
  return request({
    url: '/area/delete',
    method: 'post',
    data: ids
  })
}

export function exportAreaByIds(ids) {
  return request({
    url: '/area/export',
    method: 'post',
    data: ids
  })
}
export function exportCellByIds(ids) {
  return request({
    url: '/cell/export',
    method: 'post',
    data: ids
  })
}

export function UpdataCellByIds(id, data) {
  return request({
    url: `/cell/update/${id}`,
    method: 'post',
    data
  })
}

export function fetchAreaAdministration(id) {
  return request({
    url: `/area/tree/${id}`,
    method: 'get'
  })
}

export function fetchAreaAdministrationById(ID) {
  return request({
    url: `/area/detail/${ID}`,
    method: 'get'
  })
}

export function fetchroadtype(id) {
  return request({
    url: `/road/tree/${id}`,
    method: 'get'
  })
}

export function findRodaByIds(id, le, tp, page, limit) {
  return request({
    url: '/road/detail',
    method: 'get',
    params: {
      'areaId': id,
      'roadLevel': le,
      'roadType': tp,
      'limit': limit,
      'page': page
    }
  })
}

export const deleteByCitys = (data) => {
  return request({
    url: '/cell/deleteByCitys',
    method: 'post',
    data: data
  })
}
