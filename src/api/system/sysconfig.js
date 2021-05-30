import request from '@/utils/request'

export function fileConfig(query) {
  return request({
    url: '/systemConfig/fileCheck/listFileValidConf',
    method: 'post',
    data: query
  })
}

export function fileConfigStorage(query) {
  return request({
    url: '/systemConfig/setModuleConf',
    method: 'get',
    params: query
  })
}

export function fileConfigOperation(query) {
  return request({
    url: '/systemConfig/fileCheck/getDataFilteringConfig',
    method: 'get',
    params: query
  })
}
export function alarmList(query) {
  return request({
    url: '/systemConfig/alarmCode/list',
    method: 'get',
    params: query
  })
}
export function detailsConfigData(itemId) {
  return request({
    url: `/systemConfig/fileCheck/getFilterAlgorithmConfig/${itemId}`,
    method: 'get'
  })
}

export function fileOperationtype() {
  return request({
    url: '/systemConfig/fileCheck/listFilterClass',
    method: 'get'
  })
}

export function switchEnable(id, query) {
  return request({
    url: `/systemConfig/fileCheck/setConfAbnormalDataFilterItemEnable/${id}`,
    method: 'get',
    params: query
  })
}

export function dataConfig() {
  return request({
    url: '/systemConfig/dataKeep/dataList',
    method: 'get'
  })
}

export function dataUpdate(query) {
  return request({
    url: '/systemConfig/dataKeep/update',
    method: 'post',
    data: query
  })
}
export function ifShow(id, req) {
  return request({
    url: `/systemConfig/alarmCode/display/${id}`,
    method: 'post',
    params: req
  })
}
export function ifEm(id, query) {
  return request({
    url: `/systemConfig/alarmCode/sendEmail/${id}`,
    method: 'post',
    params: query
  })
}
export function ifSMS(id, query) {
  return request({
    url: `/systemConfig/alarmCode/sendSMS/${id}`,
    method: 'post',
    params: query
  })
}

export function saveDescribe(itemId, query) {
  return request({
    url: `/systemConfig/fileCheck/saveFileAlgorithmDesc/${itemId}`,
    method: 'post',
    params: query
  })
}

export function saveOpen(query) {
  return request({
    url: `/systemConfig/fileCheck/saveFilterAlgorithmConfig`,
    method: 'post',
    data: query
  })
}
export function dataSegmentationList() {
  return request({
    url: `/systemConfig/parameterThreshold/getTreeList`,
    method: 'post'
  })
}

export function getDataOne(code) {
  return request({
    url: `/systemConfig/parameterThreshold/get/${code}`,
    method: 'post'
  })
}

export function getDataTow(code, req) {
  return request({
    url: `/systemConfig/parameterThreshold/getParamConfigList/${code}`,
    method: 'post',
    params: req
  })
}

export function reportAndMonitor(id, query) {
  return request({
    url: `/systemConfig/parameterThreshold/setMonitorEnable/${id}`,
    method: 'get',
    params: query
  })
}

export function reportAndMonitorT(id, query) {
  return request({
    url: `/systemConfig/parameterThreshold/setReportEnable/${id}`,
    method: 'get',
    params: query
  })
}

export function saveParamConfig(req) {
  return request({
    url: `/systemConfig/parameterThreshold/saveParamConfig`,
    method: 'post',
    data: req
  })
}
