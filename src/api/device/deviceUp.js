import request from '@/utils/request'
import qs from 'qs'

export function firmwareVersions(que) {
  return request({
    url: `/deviceManage/firmwareVersions`,
    method: 'get',
    params: que
  })
}
export function uploadFirmwareFtp(data) {
  return request({
    url: `/deviceManage/uploadFirmware/ftp`,
    method: 'post',
    data
  })
}
export function deleteFirmwareVersions(data) {
  return request({
    url: `/deviceManage/deleteFirmwareVersions`,
    method: 'post',
    data
  })
}
export function deviceUpgrades(data) {
  return request({
    url: `/deviceManage/deviceUpgrades`,
    method: 'post',
    params: data
  })
}
export function devicesId(page, data) {
  return request({
    url: `/deviceManage/devices/`,
    method: 'post',
    data,
    params: page
  })
}
export function firmwareSetToRcu(data) {
  return request({
    url: `/deviceManage/firmwareSetToRcu`,
    method: 'post',
    data
  })
}
export function updateFirmwareVersion(data) {
  return request({
    url: `/deviceManage/updateFirmwareVersion`,
    method: 'post',
    data
  })
}
export function cancelUpgrade(data) {
  return request({
    url: `/deviceManage/cancelUpgrade`,
    method: 'post',
    data
  })
}

export function uploadFirmwareFileTow(data) {
  // var obj = {
  //   ftpFilePath: '',
  //   ftpUrl: '',
  //   ftpUser: '',
  //   ftpPwd: '',
  //   txtId: '',
  //   ...data
  // }
  // console.log(qs.stringify(data))
  return request({
    url: `/deviceManage/uploadFirmware/file`,
    method: 'post',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export var uploadFirmwareFile = process.env.BASE_API + '/deviceManage/uploadFirmware/uploadFile'
