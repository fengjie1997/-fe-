import permission from './permission'

const install = function(Vue) {
  Vue.directive('perm', permission)
  if (window.Vue) {
    window['perm'] = permission
    Vue.use(install)
  }
}

permission.install = install
export default permission
