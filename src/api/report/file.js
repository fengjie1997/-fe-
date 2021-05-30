import request from '@/utils/request'

export function fetchTest() {
  return request({
    url: '/decodeFile/test',
    method: 'get'
  })
}

export function fetchList(data) {
  return request({
    url: '/decodeFile/list',
    method: 'post',
    data
  })
}
/**
 * 获取模板信息
 * @param {*} type
 */
export const fetchTemplate = type => {
  return request({
    url: `/reportTask/template/${type}`,
    method: 'get'
  })
}

// 数据源详情
export const fetchDetails = sourceIds => {
  return request({
    url: `/decodeFile/details`,
    method: 'post',
    data: sourceIds
  })
}
// 提交报表
export const reportTask = data => {
  return request({
    url: `/reportTask/post/task`,
    method: 'post',
    data: data
  })
}
