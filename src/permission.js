import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import i18n from '@/lang'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  // 测试计划添加设备名称
  if (to.name === 'testPlanList') {
    to.meta.title = i18n.t('taskPlan.title.list') + '：' + to.params.deviceName
  }
  // 添加测试计划添加设备名称
  if (to.name === 'testPlanConf') {
    if (Number(to.params.planId) > 0) {
      to.meta.title = i18n.t('taskPlan.title.edit') + '：' + to.params.deviceName
    } else {
      to.meta.title = i18n.t('taskPlan.title.create') + '：' + to.params.deviceName
    }
  }
  // 添加测试计划添加设备名称
  if (to.name === 'testPlanEdit') {
    to.meta.title = i18n.t('taskPlan.title.update') + '：' + to.params.deviceName + '-' + to.params.planId
  }
  // console.log()
  NProgress.start() // start progress bar
  if (getToken()) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.menuPerms.length === 0) {
        // 获取用户信息
        store.dispatch('GetUserInfo').then(res => {
          // 判断当前用户是否已经拉取到权限信息
          store.dispatch('GetPermInfo').then(res => {
            const menuPerms = res.data.data.menus
            if (!menuPerms || menuPerms.length < 1) {
              store.dispatch('FedLogOut').then(() => {
                Message.error('menus is empty!')
                next({ path: '/' })
              })
            }
            store.dispatch('GenerateRoutes', { menuPerms }).then(accessRoutes => {
              // console.table(accessRoutes)
              // 根据roles权限生成可访问的路由表
              router.addRoutes(accessRoutes) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })

            // 刷新具备组树权限
            store.dispatch('refreshGroupTree')
            // 刷新角色树
            store.dispatch('refreshRoleTree')
            // 刷新区域树
            store.dispatch('refreshRegionTree')
          }).catch(err => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err)
              next({ path: '/' })
            })
          })
        }).catch(err => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err)
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
