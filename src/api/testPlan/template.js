import request from '@/utils/request'

/**
 * 获取测试计划网络模板
 */
export const fetchTemplateList = (params) => {
  return request({
    url: `/uxConnection/list`,
    method: 'get',
    params: params
  })
}

export const fetchTemplateUpdate = (id, data) => {
  return request({
    url: `/uxConnection/update/${id}`,
    method: 'post',
    data: data
  })
}

export const fetchTemplateAdd = (data) => {
  return request({
    url: `/uxConnection/add`,
    method: 'post',
    data: data
  })
}

export const fetchTemplateDelete = (id) => {
  return request({
    url: `/uxConnection/delete/${id}`,
    method: 'post'
  })
}
/**
 * 获取测试计划服务模板
 */
export const fetchHostTemplateList = (params) => {
  return request({
    url: `/serverTemplate/list`,
    method: 'get',
    params: params
  })
}

export const fetchHostTemplateUpdate = (id, data) => {
  return request({
    url: `/serverTemplate/update/${id}`,
    method: 'post',
    data: data
  })
}

export const fetchHostTemplateAdd = (data) => {
  return request({
    url: `/serverTemplate/add`,
    method: 'post',
    data: data
  })
}

export const fetchHostTemplateDelete = (id) => {
  return request({
    url: `/serverTemplate/delete/${id}`,
    method: 'post'
  })
}

// 测试计划全局模板增
export const fetchAllTemplateAdd = (name, data) => {
  return request({
    url: `/uxTestplan/task/template`,
    method: 'post',
    params: {
      templateName: name
    },
    data: data
  })
}

// 测试计划全局模板删
export const fetchAllTemplateDelete = (id) => {
  return request({
    url: `/uxTestplan/task/template/delete/${id}`,
    method: 'get'
  })
}
// 测试计划全局模板list查
export const fetchAllTemplateList = (taskType) => {
  return request({
    url: `/uxTestplan/task/template/list/${taskType}`,
    method: 'get'
  })
}
// 测试计划全局模板单个查
export const fetchAllTemplate = (id) => {
  return request({
    url: `/uxTestplan/task/template/${id}`,
    method: 'get'
  })
}
