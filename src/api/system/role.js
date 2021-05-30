import request from '@/utils/request'

/**
 * 基础的CRUD
 * created by CcphAmy
 */
export function fetchList(query) {
  return request({
    url: '/role/list',
    method: 'get',
    params: query
  })
}

export function fetchMenuTreeByRoleId(editRoleId) {
  return request({
    url: `roleMenu/allowTree/${editRoleId}`,
    method: 'get'
  })
}

export function addRoleMenu(roleId, data) {
  return request({
    url: `/roleMenu/add/${roleId}`,
    method: 'post',
    data
  })
}

export function fetchGroupTreeByRoleId(editRoleId) {
  return request({
    url: `/roleGroup/allowTree/${editRoleId}`,
    method: 'get'
  })
}

export function fetchMenuByRoleId(roleId) {
  return request({
    url: `roleMenu/detail/${roleId}`,
    method: 'get'
  })
}

export function fetchDetail(id) {
  return request({
    url: `/role/detail/${id}`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: `/role/update/${id}`,
    method: 'post',
    data
  })
}

export function deleteOne(id) {
  return request({
    url: `/role/delete/${id}`,
    method: 'post'
  })
}

export function addRoleGroup(id, data) {
  return request({
    url: `/roleGroup/add/${id}`,
    method: 'post',
    data
  })
}

export function fetchGroupByRoleId(roleId) {
  return request({
    url: `roleGroup/detail/${roleId}`,
    method: 'get'
  })
}
// 当前登录用户的area管理和角色关系绑定，树形结构(admin时显示所有area)
export function fetchAreaByType(type) {
  return request({
    url: `/roleArea/currentRoleArea/${type}`,
    method: 'get'
  })
}
// 当前登录用户的area管理和角色关系绑定，树形结构(admin时显示所有area)
export function fetchCellTreeData() {
  return request({
    url: '/roleCell/currentCellTree',
    method: 'get'
  })
}
// area treeData
export const fetchAreaTreeData = (type = 1) => {
  return request({
    url: `/roleArea/currentRoleArea/${type}`,
    method: 'get'
  })
}
// /roleArea/detail/{id}
export const fetchRoleAreaById = id => {
  return request({
    url: `/roleArea/detail/${id}`,
    method: 'get'
  })
}

// /roleCell/save/{id}
export const addCellData = (id, data) => {
  return request({
    url: `/roleCell/save/${id}`,
    method: 'post',
    data
  })
}
// /area/administrativeTree
export const areaTree = id => {
  return request({
    url: `/roleArea/allowTree/${id}`,
    method: 'get'
  })
}
// /cell/tree
export const cellTree = id => {
  return request({
    url: `/roleCell/allowTree/${id}`,
    method: 'get'
  })
}
// addAreaPower
export const addAreaPower = (id, data) => {
  return request({
    url: `/roleArea/save/${id}`,
    method: 'post',
    data
  })
}
export const addCellPower = (roleId, data) => {
  return request({
    url: `/roleCell/save/${roleId}`,
    method: 'post',
    data
  })
}
// /roleArea/detail/{id}
export const roleArea = id => {
  return request({
    url: `/roleArea/detail/${id}`,
    method: 'get'
  })
}
// /roleCell/detail/{id}
export const roleCell = id => {
  return request({
    url: `/roleCell/detail/${id}`,
    method: 'get'
  })
}
