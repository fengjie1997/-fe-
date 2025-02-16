import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/views/common/layout/Layout'
import adminTableRouter from './modules/admin'
import dataTableRouter from './modules/data'
import systemTableRouter from './modules/system'
import deviceTableRouter from './modules/device'
import reportRouter from './modules/report'
import dataAnalyzeRouter from './modules/analyze'
import deviceMonitoredRouter from './modules/monitored'
import templateRouter from './modules/template'
import weTestRouter from './modules/weTest'
import testPlanRouter from './modules/testPlan'

/* Router Modules */
/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
 **/
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: resolve => (require(['@/views/common/redirect/index'], resolve))
  }]
},
{
  path: '/login',
  component: resolve => (require(['@/views/login/index'], resolve)),
  hidden: true
},
{
  path: '/auth-redirect',
  component: resolve => (require(['@/views/login/authredirect'], resolve)),
  hidden: true
},
{
  path: '/404',
  component: resolve => (require(['@/views/common/errorPage/404'], resolve)),
  hidden: true
},
{
  path: '/401',
  component: resolve => (require(['@/views/common/errorPage/401'], resolve)),
  hidden: true
}
/**
 * 首页
 */
// {
//   path: '',
//   component: Layout,
//   redirect: 'dashboard',
//   children: [{
//     path: 'dashboard',
//     component: resolve => (require(['@/views/home/index.vue'], resolve)),
//     name: 'Dashboard',
//     meta: {
//       title: 'dashboard',
//       icon: 'dashboard',
//       noCache: true,
//       affix: true,
//       perm: '/dashboard'
//     }
//   }]
// }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

export const asyncRoutes = [
  /**
   * 设备管理
   */
  deviceTableRouter,
  /**
   * 数据管理
   */
  dataTableRouter,
  /**
   * 数据分析
   */
  dataAnalyzeRouter,
  /**
   * 自动报表
   */
  reportRouter,
  /**
   * 设备监控
   */
  deviceMonitoredRouter,
  /**
   * 测试计划模板
   */
  templateRouter,
  /**
   * 系统管理
   */
  systemTableRouter,
  /**
   * admin pagepostReportTask
   */
  adminTableRouter,
  /**
   * 轨迹监控，另外弹出窗口
   */
  {
    path: '/airFleet',
    component: resolve => (require(['@/views/monitored/unit/trajectory.vue'], resolve)),
    hidden: true,
    name: 'airFleet'
  },
  /**
   * weTest
   */
  weTestRouter,
  /**
   * 测试计划
   */
  testPlanRouter

]
