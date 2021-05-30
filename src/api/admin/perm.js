import request from '@/utils/request'

/**
 * created by CcphAmy
 */

/**
 * 菜单列表获取
 */
export function fetchMenuList() {
  return request({
    url: '/menu/tree',
    method: 'get'
  })
}

/**
 * 删除菜单
 */
export function deleteMenu(menuId) {
  return request({
    url: `/menu/delete/${menuId}`,
    method: 'post'
  })
}

/**
 * 添加菜单
 * @param parentId 父id
 * @param menuName 菜单名称
 * @param perm perm
 * @param isMenu 是否菜单
 */
export function addMenu(data) {
  return request({
    url: '/menu/add',
    method: 'post',
    /*
    data: {
      parentId: parentId,
      menuName: menuName,
      isMenu: isMenu,
      perm: perm
    }
    */
    data
  })
}

/**
 * 更新菜单信息
 * @param menuId
 * @param data
 */
export function updateMenu(menuId, data) {
  return request({
    url: `/menu/update/${menuId}`,
    method: 'post',
    data
  })
}

// -------------------- 接口 -----------------------------
/**
 * 接口列表获取
 */
export function fetchApiList() {
  return request({
    url: '/apiPerm/tree',
    method: 'get'
  })
}

/**
 * 删除接口
 */
export function deleteApi(apiId) {
  return request({
    url: `/apiPerm/delete/${apiId}`,
    method: 'post'
  })
}

/**
 * 添加接口
 * @param data
 */
export function addApi(data) {
  return request({
    url: '/apiPerm/add',
    method: 'post',
    data
  })
}

/**
 * 更新接口
 * @param apiId
 * @param data
 */
export function updateApi(apiId, data) {
  return request({
    url: `/apiPerm/update/${apiId}`,
    method: 'post',
    data
  })
}

// ------------------------挂载表--------------------
/**
 * 挂载树列表获取
 */
export function fetchMountList() {
  return request({
    url: `/menuApi/tree`,
    method: 'get'
  })
}

/**
 * 菜单对应接口
 * @param menuId menuId
 */
export function getSelectList(menuId) {
  return request({
    url: `/menuApi/detail/${menuId}`,
    method: 'get'
  })
}

/**
 * 菜单对应接口
 * @param menuId menuId
 */
export function setSelectList(menuId, data) {
  return request({
    url: `/menuApi/add/${menuId}`,
    method: 'post',
    data
  })
}

