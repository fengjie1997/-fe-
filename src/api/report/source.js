import request from '@/utils/request'

export function fetchGroupList() {
  return request({
    url: '/group/currentVisible',
    method: 'get'
  })
}

export function fetchDeviceList(groupIds) {
  return request({
    url: '/device/getGroupDevices',
    method: 'post',
    data: groupIds
  })
}
