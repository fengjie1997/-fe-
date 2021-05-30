/** Admin 模块 **/
import Layout from '@/views/common/layout/Layout'

const weTestRouter = {
  path: '/weTest',
  component: Layout,
  name: 'weTest',
  redirect: 'noredirect',
  alwaysShow: true,
  meta: {
    title: 'weTest',
    icon: 'phone',
    perm: '/weTest'
  },
  children: [
    {
      path: 'business',
      component: resolve => (require(['@/views/weTest/business/index.vue'], resolve)),
      name: 'weTestBusinessConfig',
      meta: {
        title: 'weTestBusinessConfig',
        perm: '/weTestBusiness'
      }
    },
    {
      path: 'task',
      component: resolve => (require(['@/views/weTest/task/index.vue'], resolve)),
      name: 'weTestTaskMgr',
      meta: {
        title: 'weTestTaskMgr',
        perm: '/weTestTask'
      }
    },
    {
      path: 'data',
      component: resolve => (require(['@/views/weTest/data/index.vue'], resolve)),
      name: 'weTestDataMgr',
      meta: {
        title: 'weTestDataMgr',
        perm: '/weTestData'
      }
    },
    {
      path: 'device',
      component: resolve => (require(['@/views/weTest/device/index.vue'], resolve)),
      name: 'weTestDeviceMgr',
      meta: {
        title: 'weTestDeviceMgr',
        perm: '/weTestDevice'
      }
    }, {
      path: 'license/user',
      component: resolve => (require(['@/views/weTest/license/user.vue'], resolve)),
      name: 'weTestUserLicenseMar',
      meta: {
        title: 'weTestUserLicenseMar',
        perm: '/weTestUserLicense'
      }
    },
    {
      path: 'license/admin',
      component: resolve => (require(['@/views/weTest/license/index.vue'], resolve)),
      name: 'weTestAdminLicenseMar',
      meta: {
        title: 'weTestAdminLicenseMar',
        perm: '/weTestAdminLicense'
      }
    }
  ]
}
export default weTestRouter
