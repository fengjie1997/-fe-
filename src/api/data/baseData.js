import request from '@/utils/request'

/**
 * cell 基站
 */
export function fetchCellTrue() {
  return request({
    url: `/cell/tree`,
    method: 'get'
  })
}

export function fetchCellDetailList(netTypeName, cityName, page, limit) {
  return request({
    url: '/cell/list',
    method: 'get',
    params: {
      'networkType': netTypeName,
      'city': cityName,
      'limit': limit,
      'page': page
    }
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
    params: ids
  })
}
export function exportCellByIds(ids) {
  return request({
    url: '/cell/export',
    method: 'get',
    data: ids
  })
}
export function updatCell(id, data) {
  return request({
    url: `/cell/update/${id}`,
    method: 'post',
    data: data
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

export function findRodaByIds(id, tp, page, limit) {
  return request({
    url: '/road/detail',
    method: 'get',
    params: {
      'areaId': id,
      'roadType': tp,
      'limit': limit,
      'page': page
    }
  })
}
