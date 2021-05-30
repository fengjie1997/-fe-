import request from '@/utils/request'
import axios from 'axios'
const CancelToken = axios.CancelToken

export var regionUploadUrl = process.env.BASE_API + '/area/import'
// station city tree
export const fetchDataRegionTree = () => {
  return request({
    url: `/area/tree`,
    method: 'get'
  })
}
export const fetchGeometry = id => {
  let cancel
  const req = request({
    url: `/area/geometry/` + id,
    method: 'get',
    cancelToken: new CancelToken(function executor(c) {
      cancel = c
    })
  })
  req.cancel = cancel
  return req
}
// del
export const delRegion = ids => {
  return request({
    url: `/area/geometry/`,
    method: 'post',
    ids
  })
}
export const getAdminRegion = () => {
  return request({
    url: `/area/administrativeTree`,
    method: 'get'
  })
}
// get single
export const getRegionDetail = id => {
  let cancel
  const req = request({
    url: `/area/detail/` + id,
    method: 'get',
    cancelToken: new CancelToken(function executor(c) {
      cancel = c
    })
  })
  req.cancel = cancel
  return req
}
// edit form
export const editRegionForm = (id, data) => {
  return request({
    url: `/area/update/` + id,
    method: 'post',
    data
  })
}
// del
export const delRegionRecord = id => {
  return request({
    url: `/area/delete/`,
    method: 'post',
    data: id
  })
}

// edit form
export const addRegion = (data) => {
  return request({
    url: `/area/add`,
    method: 'post',
    data
  })
}

