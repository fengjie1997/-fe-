import request from '@/utils/request'

export function analyzeParamTree() {
  return request({
    url: '/analyze/param/dtaParam',
    method: 'get'
  })
}

export function currentVisible() {
  return request({
    url: '/group/currentVisible',
    method: 'get'
  })
}
export const areatree = () => {
  return request({
    url: 'area/tree',
    method: 'get'
  })
}
export const deviceNameType = (type) => {
  return request({
    url: `/device/deviceName`,
    method: 'post',
    data: type
  })
}
export const getKey = (type) => {
  return request({
    url: `/analyze/gridParamStat`,
    method: 'post',
    data: type
  })
}
export const infoDatsaKey = (type) => {
  return request({
    url: `/analyze/infoData`,
    method: 'get',
    params: type
  })
}
export const gridParamPageData = (type) => {
  return request({
    url: `/analyze/gridParamPageData`,
    method: 'get',
    params: type
  })
}
