/** System 模块 **/
import Layout from '@/views/common/layout/Layout'

const systemTableRouter = {
  path: '/system',
  component: Layout,
  name: 'system',
  redirect: 'noredirect',
  alwaysShow: true,
  meta: { title: 'system', icon: 'system', perm: '/system' },
  children: [
    {
      path: 'user',
      component: resolve => (require(['@/views/system/user/user.vue'], resolve)),
      name: 'user',
      meta: { title: 'userMgr', perm: '/user' }
    },
    {
      path: 'group',
      component: resolve => (require(['@/views/system/group/group.vue'], resolve)),
      name: 'group',
      meta: { title: 'groupMgr', perm: '/group' }
    },
    {
      path: 'role',
      component: resolve => (require(['@/views/system/role/role.vue'], resolve)),
      name: 'role',
      meta: { title: 'roleMgr', perm: '/role' }
    },
    {
      path: 'operate-log',
      component: resolve => (require(['@/views/system/operateLog/operateLog.vue'], resolve)),
      name: 'operateLog',
      meta: {
        title: 'operateLog',
        perm: '/operateLog'
      }
    },
    {
      path: 'sysconfig',
      component: resolve => (require(['@/views/system/config/index.vue'], resolve)),
      name: 'sysconfig',
      meta: { title: 'sysconfig', perm: '/sysconfig' }
    }
  ]
}
export default systemTableRouter
