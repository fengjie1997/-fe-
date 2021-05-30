const handleColWidthLimit = (newWidth, oldWidth, column, event) => {
  if (newWidth < column.minWidth) {
    column.width = column.realWidth = column.minWidth
  }
}

const colWidthLimit = {
  bind(el, binding, vnode) {
    const { componentInstance: $table } = vnode
    $table.$on('header-dragend', handleColWidthLimit)
  },
  inserted(el, binding, vnode) {
  },
  unbind(el, binding, vnode) {
    const { componentInstance: $table } = vnode
    $table.$off('header-dragend', handleColWidthLimit)
  }
}

const install = function(Vue) {
  Vue.directive('col-width-limit', colWidthLimit)
}

if (window.Vue) {
  window['col-width-limit'] = colWidthLimit
  Vue.use(install); // eslint-disable-line
}

colWidthLimit.install = install
export default colWidthLimit
