import request from '@/utils/request'

export function deviceStateOne(deviceStatusDto) {
  return request({
    url: '/deviceStatus/list',
    method: 'post',
    data: deviceStatusDto
  })
}

export function getDeviceParam(deviceId) {
  return request({
    url: '/paramConfig/getDeviceParam',
    method: 'post',
    params: deviceId
  })
}

export function deviceMonitor(deviceId) {
  return request({
    url: '/deviceStatus/deviceMonitor',
    method: 'post',
    params: deviceId
  })
}
