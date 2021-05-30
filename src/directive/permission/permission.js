
import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const ERROR_PERMISSION_NOTFOUND = `need permission! Like v-perm="'permission value'" or v-perm="['permission value']"`
    let noPermission = false
    if (value === null || value === undefined) {
      throw new Error(ERROR_PERMISSION_NOTFOUND)
    }
    const perms = store.getters && store.getters.buttonPerms
    if (perms === null || value === undefined) {
      // 不需要继续下去，直接删除元素 ，因为没有权限
      noPermission = true
    }
    // 判断是不是数组 [] , 数组的情况下，是多个匹配，而是字符串的情况下，单个
    if (!noPermission) {
      if (value instanceof Array) {
        if (value.length > 0) {
          noPermission = !value.some(vPerm => {
            return perms.includes(vPerm)
          })
        } else {
          // 直接不具备权限
          noPermission = true
        }
      } else if (typeof value === 'string') {
        noPermission = !perms.includes(value)
      } else {
        throw new Error(ERROR_PERMISSION_NOTFOUND)
      }
    }
    if (noPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
