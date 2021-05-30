import request from '@/utils/request'

export function fetchWeTestDeviceList(params, groupIds) {
  return request({
    url: '/wetest/device/list',
    method: 'post',
    params,
    data: groupIds
  })
}

/**
 * 数据管理获取UUID
 */
export function fetchDeviceList(appType, groupIds) {
  return request({
    url: '/wetest/device/list',
    method: 'post',
    params: {
      appType: appType
    },
    data: groupIds
  })
}
export function fetchGroupList() {
  return request({
    url: '/group/currentVisible',
    method: 'get'
  })
}
export function deviceBind(parameter) {
  return request({
    url: `/wetest/device/add/${parameter.uuid}`,
    method: 'post',
    data: {
      uuid: parameter.uuid,
      appType: parameter.appType,
      groupId: parameter.groupId
    }
  })
}
export function deleteDevice(id, appType) {
  return request({
    url: `/wetest/device/delete/${id}`,
    method: 'post',
    params: {
      appType: appType
    }
  })
}
export function selectHistory(id, appType, query) {
  return request({
    url: `/wetest/plan/list/${id}`,
    method: 'get',
    params: {
      appType: appType,
      name: query.name,
      status: query.status,
      creator: query.creator
    }
  })
}
export function importLicense(params, file) {
  return request({
    url: `/wetest/license/import`,
    method: 'post',
    params: {
      licenseCode: params.license,
      appType: params.appType
    },
    data: file
  })
}
export function importDevice(params, file) {
  return request({
    url: `/wetest/device/import`,
    method: 'post',
    params: {
      groupId: params.groupId,
      appType: params.appType
    },
    data: file
  })
}
