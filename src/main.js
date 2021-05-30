import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import * as utils from './utils/index.js'
import AFTableColumn from 'af-table-column' // wetest
import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import './mock'// mock
import Debug from './debug'
import permission from './directive/permission/index'
import colWidthLimit from './directive/el-table/colWidthLimit'

import * as filters from './filters' // global filters
// form- create
import 'pl-table/themes/index.css'
import formCreate from '@form-create/element-ui'

// npm i pl-table npm引入方式 如下 main.js
import plTable from 'pl-table'

import 'pl-table/themes/index.css' // 引入样式（必须引入)，vuecli3.0不需要配置，cli2.0请查看webpack是否配置了url-loader对woff，ttf文件的引用,不配置会报错哦

import 'pl-table/themes/plTableStyle.css' // 默认表格样式很丑 引入这个样式就可以好看啦（如果你不喜欢这个样式，就不要引入，不引入就跟ele表格样式一样）

// 解决在使用element-ui时
// 出现警告[Violation] Added non-passive event listener to a scroll-blocking ‘mousewheel’ event. Consider marking event handler as ‘passive’ to make the page more responsive
import 'default-passive-events'
Vue.use(plTable)

Vue.use(formCreate)
Vue.use(AFTableColumn)
Vue.config.devtools = true
Vue.use(Element, {
  size: Cookies.get('size') || 'mini', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

permission.install(Vue)
colWidthLimit.install(Vue)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.prototype.$utils = utils
if (process.env.NODE_ENV === 'development' || process.env.API_DEBUG === 'true') {
  window.debugApi = new Debug(process.env.BASE_API)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
