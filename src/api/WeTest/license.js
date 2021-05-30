import request from '@/utils/request'

/**
 * 管理员
 * @param query
 */
export function fetchUUIDList(query) {
  if (query.license === '') {
    query.license = undefined
  }
  return request({
    url: `/wetest/license/mange/list`,
    method: 'get',
    params: query
  })
}
export function createLicense(license) {
  return request({
    url: `/wetest/license/mange/create`,
    method: 'post',
    data: license
  })
}
export function switchLock(id, isDisable) {
  return request({
    url: `/wetest/license/mange/disable/${id}`,
    method: 'post',
    params: {
      value: isDisable
    }
  })
}
// 编辑license权限（管理员）
export function updatePerm(id, data) {
  return request({
    url: `/wetest/license/mange/editPerm/${id}`,
    method: 'post',
    data: data
  })
}
export function updateLicense(id, startTime, endTime, customerName, targetFirm, perm) {
  return request({
    url: `/wetest/license/mange/edit/${id}`,
    method: 'post',
    data: {
      targetFirm: targetFirm,
      customerName: customerName,
      perm: perm,
      endDt: endTime,
      startDt: startTime
    }
  })
}
export function expandLicense(id, day) {
  return request({
    url: `/wetest/license/mange/plusTotal/${id}`,
    method: 'post',
    params: {
      value: day
    }
  })
}

/**
 * 用户
 * @param license
 * @param appType
 */
export function selectUUID(license, appType) {
  return request({
    url: `/wetest/license/user/bindList/${license}`,
    method: 'post',
    params: {
      appType: appType
    }
  })
}
export function bindLicense(data) {
  return request({
    url: `/wetest/license/user/bind/${data.uuid}`,
    method: 'post',
    params: {
      appType: data.appType,
      license: data.license
    }
  })
}
export function selectLicense(license, appType) {
  return request({
    url: `/wetest/license/user/info/${license}`,
    method: 'post',
    params: {
      appType: appType
    }
  })
}
// export function fetchUUIDList(license, appType) {
//   return request({
//     url: `/wetest/license/user/bindList/${license}`,
//     method: 'post',
//     params: {
//       appType: appType
//     }
//   })
// }
// 解绑正式license[用户]
export function fetchUserUnbind(uuid, license) {
  return request({
    url: `/wetest/license/user/unbind/${uuid}`,
    method: 'post',
    params: {
      license: license
    }
  })
}
// 解绑正式license(数组) [用户]
export function fetchUserUnbindes(license, uuids) {
  return request({
    url: `/wetest/license/user/unbind/license/${license}`,
    method: 'post',
    data: uuids
  })
}
// 强制减少正式license[管理员]
export function fetchAdminUnbind(id, reduceNum) {
  return request({
    url: `/wetest/license/mange/reduceTotal`,
    method: 'post',
    params: {
      id: id,
      reduceNum: reduceNum
    }
  })
}
// 解绑正式license(数组) [管理员]
export function fetchAdminUnbindes(license, uuids) {
  return request({
    url: `/wetest/license/mange/unbind/license/${license}`,
    method: 'post',
    data: uuids
  })
}
// 解绑正式license[管理员]
export function fetchAdminDeviceUnbind(uuid, license) {
  return request({
    url: `/wetest/license/mange/unbind/${uuid}`,
    method: 'post',
    params: {
      license: license
    }
  })
}
