import request from '@/utils/request'

export function userInfo() {
  return request({
    url: '/user/current',
    method: 'get'
  })
}

export function fetchGroupList() {
  return request({
    url: '/group/currentVisible',
    method: 'get'
  })
}

/**
 * 获取角色树
 */
export function fetchRoleTree() {
  return request({
    url: '/user/currentRoleTree',
    method: 'get'
  })
}

/**
 * 区域树
 */
export const getAdminRegionTree = () => {
  return request({
    url: `/area/administrativeTree`,
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
