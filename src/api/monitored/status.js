import request from '@/utils/request'

/**
 * created by CcphAmy
 */

export function fetchDeviceStatusList(params) {
  return request({
    url: '/deviceStatus/list',
    method: 'get',
    params: params
  })
}

export function updateDisconnect(id, type) {
  return request({
    url: '/deviceStatus/disconnect',
    method: 'post',
    data: {
      id: id,
      type: type
    }
  })
}

export function updateReboot(id, type) {
  return request({
    url: '/deviceStatus/reboot',
    method: 'post',
    data: {
      id: id,
      type: type
    }
  })
}

export function updatePlan(id, type) {
  return request({
    url: '/deviceStatus/updatePlan',
    method: 'post',
    data: {
      id: id,
      type: type
    }
  })
}

export function updatePlay(id, type) {
  return request({
    url: '/deviceStatus/play',
    method: 'post',
    data: {
      id: id,
      type: type
    }
  })
}

export function updatePause(id, type) {
  return request({
    url: '/deviceStatus/pause',
    method: 'post',
    data: {
      id: id,
      type: type
    }
  })
}

export function updateStop(id, type) {
  return request({
    url: '/deviceStatus/stop',
    method: 'post',
    data: {
      id: id,
      type: type
    }
  })
}
