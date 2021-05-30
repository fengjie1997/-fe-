import request from '@/utils/request'

export function getDtaEventInfo() {
  return request({
    url: '/analyze/event/dtaEvent',
    method: 'get'
  })
}
/**
 * 获取事件key
 * @param data
 */
export const fetchEventKeys = data => {
  return request({
    url: `/analyze/eventStat`,
    method: 'post',
    data: data
  })
}
/**
 * 分页请求数据
 * @param key
 * @param page
 * @param pageSize
 */
export const getDtaEventPageData = params => {
  return request({
    url: '/analyze/pageData',
    method: 'get',
    params: params
  })
}
