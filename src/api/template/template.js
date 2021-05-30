import request from '@/utils/request'

export function fetchTemplateTree() {
  return request({
    url: '/template/tree',
    method: 'get'
  })
}
