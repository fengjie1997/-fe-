import request from '@/utils/request'
import axios from 'axios'
const CancelToken = axios.CancelToken
// road  tree
export const fetchRoadTree = () => {
  return request({
    url: `/road/tree`,
    method: 'get'
  })
}
export const fetchRoadList = (data, query) => {
  let cancel
  const req = request({
    url: `/road/detail`,
    method: 'post',
    params: query,
    data,
    cancelToken: new CancelToken(function executor(c) {
      cancel = c
    })
  })
  req.cancel = cancel
  return req
}
export function importData(data) {
  return request({
    url: `/road/import`,
    method: 'post',
    params: data
  })
}
export function administrativeTree() {
  return request({
    url: `/area/administrativeTree`,
    method: 'GET'
  })
}
export var roadUploadUrl = process.env.BASE_API + '/road/import'

export function deleteData(ids) {
  return request({
    url: `/road/delete`,
    method: 'post',
    data: ids
  })
}

export function deleteByDetailAreas(data) {
  return request({
    url: '/road/deleteByDetailAreas',
    method: 'POST',
    data
  })
}
