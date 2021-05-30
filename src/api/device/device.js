import request from '@/utils/request'
import download from '@/utils/download'
// 设备导入接口,文件格式规范见老平台
export function importDevice(file) {
  return request({
    url: `/device/imports`,
    method: 'post',
    data: file
  })
}

export function fetchDeviceExport(deviceIds) {
  return download(
    `/device/exports`,
    'deviceFile.xlsx',
    'post',
    deviceIds
  )
}

export function fetchDeviceDelete(deviceIds) {
  return request({
    url: `/device/deleteAll`,
    method: 'post',
    data: deviceIds
  })
}

export function fetchDeviceList(params, groupIds) {
  return request({
    url: '/device/list',
    method: 'post',
    params,
    data: groupIds
  })
}

export function deviceState(params, deviceStatusDto) {
  return request({
    url: '/deviceStatus/list',
    method: 'post',
    params,
    data: deviceStatusDto
  })
}

export function fetchGroupList() {
  return request({
    url: '/group/currentVisible',
    method: 'get'
  })
}

export function switchDebug(id, debug) {
  return request({
    url: `/device/debug/${id}`,
    method: 'get',
    params: {
      debug: debug
    }
  })
}

export function switchLock(id, locked) {
  return request({
    url: `/device/lock/${id}`,
    method: 'get',
    params: {
      lock: locked
    }
  })
}

export function create(data) {
  return request({
    url: '/device/add',
    method: 'post',
    data
  })
}

export function createMonitorMobileDevice(data) {
  return request({
    url: '/device/monitorPhoneDevice',
    method: 'post',
    data
  })
}

export function createRas(data) {
  return request({
    url: '/device/saveRasTemplate',
    method: 'post',
    data
  })
}

export function fetchRasList(data) {
  return request({
    url: '/device/getRasTemplates',
    method: 'get',
    data
  })
}

export function deleteRas(data) {
  return request({
    url: '/device/removeRasTemplate',
    method: 'post',
    data
  })
}

export function fetchDeviceInfo(type, id) {
  return request({
    url: `/device/getDevice/${id}`,
    method: 'get',
    params: {
      type: type
    }
  })
}

export function update(data) {
  return request({
    url: '/device/update',
    method: 'post',
    data
  })
}

export function updateMonitorMobileDevice(data) {
  return request({
    url: '/device/updateMobileDevice',
    method: 'post',
    data
  })
}

export function deleteRcuPort(data, id) {
  return request({
    url: `/device/deleteRcuPorts/${id}`,
    method: 'post',
    data
  })
}

export function alarmData(params, alarmDataDto) {
  return request({
    url: '/deviceAlarm/get',
    method: 'post',
    params,
    data: alarmDataDto
  })
}

export function eventData(params, eventDataDto) {
  return request({
    url: '/deviceEvent/get',
    method: 'post',
    params,
    data: eventDataDto
  })
}

export function chooseData(data) {
  return request({
    url: '/paramConfig/getThreshold',
    method: 'get',
    params: {
      'netType': data
    }
  })
}

export function getportNumber(deviceId, data) {
  return request({
    url: `/uxTestplan/schemaPort/${deviceId}`,
    method: 'get',
    query: {
      'planId': data
    }
  })
}

export function getParamBatch(dataDto) {
  return request({
    url: '/paramConfig/getParamBatch',
    method: 'post',
    data: dataDto
  })
}
export function getGps(dataDto) {
  return request({
    url: '/paramConfig/getGps',
    method: 'post',
    params: dataDto
  })
}
export function getParamTrail(dataDto) {
  return request({
    url: '/paramConfig/getParamTrail',
    method: 'post',
    data: dataDto
  })
}
export function deviceMonitor(dataDto) {
  return request({
    url: '/deviceStatus/deviceMonitor?deviceIds=' + dataDto.deviceIds[0],
    method: 'post',
    params: { isMonitor: dataDto.isMonitor }
  })
}

export function getDevicesByDeviceType(deviceTypeId) {
  return request({
    url: '/device/getDevicesByDeviceTypeId',
    method: 'post',
    data: {
      deviceTypeId: deviceTypeId
    }
  })
}
// 设备状态通报
export function getStatusNotice(params, type) {
  return request({
    url: '/device/statusNotice',
    method: 'post',
    params: params,
    data: type
  })
}
// 设备状态统计
export function getStatistics(data, params) {
  return request({
    url: '/device/getDeviceStatus',
    method: 'post',
    params: params,
    data: data
  })
}

// 设备状态统计下载
export function downloadStatistics(data) {
  data.isExport = true
  return download(
    '/device/getDeviceStatus',
    'download.xlsx',
    'post',
    data
  )
}

// 获取设备退出记录
export function getLogoutInfo(id, params) {
  return request({
    url: `/device/logoutInfo/${id}`,
    method: 'get',
    params: params
  })
}
