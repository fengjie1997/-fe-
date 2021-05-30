import request from '@/utils/request'

export const fetchAreaTree = type => {
  return request({
    url: `/area/tree/${type}`,
    method: 'get'
  })
}
